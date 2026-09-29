import { useEffect, useRef, useState } from "react";

/** Observe un élément et ajoute la classe `is-in` lorsqu'il entre à l'écran. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; once?: boolean; rootMargin?: string }
) {
  const ref = useRef<T | null>(null);
  const { threshold = 0.18, once = true, rootMargin = "0px 0px -8% 0px" } = options ?? {};

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-in");
          }
        });
      },
      { threshold, rootMargin }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [threshold, once, rootMargin]);

  return ref;
}

/** Révèle en cascade tous les enfants portant [data-reveal] d'un conteneur. */
export function useStagger<T extends HTMLElement = HTMLDivElement>(delayStep = 90) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const items = Array.from(node.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!items.length) return;

    if (typeof IntersectionObserver === "undefined") {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const i = Math.min(Math.max(items.indexOf(el), 0), 6);
          el.style.transitionDelay = `${i * delayStep}ms`;
          el.classList.add("is-in");
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [delayStep]);

  return ref;
}

/** Progression de lecture de la page, de 0 à 1. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
        setScrolled(window.scrollY > 40);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { progress, scrolled };
}

/** Section actuellement visible (pour surligner la navigation). */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.15, 0.4, 0.7], rootMargin: "-20% 0px -55% 0px" }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ids]);

  return active;
}

/** Position de la souris dans un élément, en pourcentage (halo suiveur). */
export function usePointerGlow<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [pos, setPos] = useState({ x: 50, y: 50, active: false });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const move = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
        active: true,
      });
    };
    const leave = () => setPos((p) => ({ ...p, active: false }));
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", leave);
    };
  }, []);

  return { ref, pos };
}
