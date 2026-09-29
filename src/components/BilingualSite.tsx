import { useEffect, useState } from "react";
import { common, copy, type Language, type SiteCopy } from "@/lib/siteCopy";
import { cn } from "@/utils/cn";
import { useActiveSection, useScrollProgress, useStagger } from "@/lib/hooks";
import {
  Monogram,
  ArrowRight,
  CheckIcon,
  CloseIcon,
  MailIcon,
  MapIcon,
  MenuIcon,
  PhoneIcon,
  PinIcon,
  WhatsappIcon,
  ChevronDown,
} from "./Icons";
import { Button, Eyebrow } from "./ui";

const heroImage = "/images/portrait.jpg";
const sectionIds = ["accueil", "a-propos", "services", "expertise", "contact"] as const;
const navHrefs = sectionIds.map((id) => `#${id}`);

function waUrl(message: string) {
  return `https://wa.me/${common.whatsappRaw}?text=${encodeURIComponent(message)}`;
}

function MaskLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 120 + delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <span className={cn("line-mask block overflow-hidden", on && "is-in")}>
      <span style={{ transitionDelay: `${delay}ms` }}>{children}</span>
    </span>
  );
}

export default function BilingualSite() {
  const [language, setLanguage] = useState<Language>("ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [rdvOpen, setRdvOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [langTick, setLangTick] = useState(0);
  const { progress, scrolled } = useScrollProgress();
  const active = useActiveSection([...sectionIds]);
  const aboutRef = useStagger<HTMLDivElement>(90);
  const methodRef = useStagger<HTMLDivElement>(110);
  const contactRef = useStagger<HTMLDivElement>(80);
  const valuesRef = useStagger<HTMLDivElement>(80);

  const text: SiteCopy = copy[language];
  const isArabic = language === "ar";

  useEffect(() => {
    document.documentElement.lang = text.lang;
    document.documentElement.dir = text.dir;
    document.title = isArabic
      ? "مكتب عبد الرزاق شعباني — عدل إشهاد"
      : "Abderrazak Chaabani — Adoul Echhad";
  }, [isArabic, text.dir, text.lang]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || rdvOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, rdvOpen]);

  const toggleLanguage = () => {
    setLanguage((current) => (current === "fr" ? "ar" : "fr"));
    setMenuOpen(false);
    setLangTick((n) => n + 1);
    setActiveService(0);
    setFormSent(false);
  };

  const appointmentMessage = isArabic
    ? `مرحبًا ${text.brandName}، أود طلب موعد في المكتب.`
    : `Bonjour ${text.brandName}, je souhaite prendre rendez-vous au cabinet.`;

  const sendForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setFormSent(true);
  };

  const resetForm = () => {
    setFormSent(false);
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  const marquee = [...text.values, ...text.values, ...text.values];

  return (
    <div
      className={cn("site-shell min-h-screen text-ink", isArabic && "site-arabic")}
      dir={text.dir}
    >
      {/* Scroll progress */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-gold via-gold-light to-gold"
          style={{
            transform: `scaleX(${progress})`,
            transformOrigin: isArabic ? "right" : "left",
          }}
        />
      </div>

      {/* ---------- Header ---------- */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-ink/8 bg-ivory/80 shadow-[0_10px_40px_-22px_rgba(16,24,22,0.28)] backdrop-blur-2xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[74px] max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#accueil" className="group flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-ink/8 bg-white shadow-sm transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
              <Monogram size={34} />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[1.1rem] text-ink sm:text-[1.22rem]">
                {text.brandName}
              </span>
              <span className="tracking-wide-label mt-1.5 block text-[0.6rem] font-medium tracking-[0.16em] text-gold-deep uppercase">
                {text.role}
              </span>
            </span>
          </a>

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label={isArabic ? "التنقل الرئيسي" : "Navigation principale"}
          >
            {text.nav.map((label, index) => {
              const id = sectionIds[index];
              return (
                <a
                  key={label}
                  href={navHrefs[index]}
                  className={cn(
                    "link-modern rounded-full px-4 py-2 text-[0.72rem] font-medium tracking-[0.08em] uppercase transition-all duration-500",
                    active === id
                      ? "is-active bg-white text-teal-ink shadow-sm"
                      : "text-ink-soft hover:bg-white/70 hover:text-teal-ink"
                  )}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleLanguage}
              className="btn-modern hidden rounded-full border border-ink/10 bg-white px-4 py-2.5 text-[0.68rem] font-medium tracking-[0.08em] text-teal-ink shadow-sm hover:border-gold/40 sm:inline-flex"
              aria-label={isArabic ? "Passer au français" : "Switch to Arabic"}
            >
              {text.switchLabel}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white text-ink shadow-sm transition-transform duration-500 hover:scale-105 lg:hidden"
              aria-label={menuOpen ? (isArabic ? "إغلاق" : "Fermer") : isArabic ? "القائمة" : "Menu"}
            >
              <span className="transition-transform duration-500">
                {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </span>
            </button>
            <Button onClick={() => setRdvOpen(true)} variant="ink" className="hidden px-5 py-2.5 sm:inline-flex">
              {text.hero.primary}
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "overflow-hidden border-t bg-ivory/95 backdrop-blur-xl transition-all duration-500 lg:hidden",
            menuOpen ? "max-h-[460px] border-ink/8 opacity-100" : "max-h-0 border-transparent opacity-0"
          )}
        >
          <div className="px-5 py-6">
            <nav className="flex flex-col gap-1">
              {text.nav.map((label, index) => (
                <a
                  key={label}
                  href={navHrefs[index]}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3.5 font-display text-2xl text-ink transition-colors hover:bg-white"
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  {label}
                </a>
              ))}
            </nav>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={toggleLanguage}
                className="rounded-full border border-ink/10 bg-white px-4 py-3.5 text-[0.68rem] font-medium tracking-[0.1em] text-ink uppercase"
              >
                {text.switchLabel}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setRdvOpen(true);
                }}
                className="rounded-full bg-teal-ink px-4 py-3.5 text-[0.68rem] font-medium tracking-[0.1em] text-ivory uppercase"
              >
                {text.hero.primary}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main key={langTick} className="lang-swap">
        {/* ---------- Hero ---------- */}
        <section id="accueil" className="relative overflow-hidden pt-[74px]">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute top-16 end-[-10rem] h-[32rem] w-[32rem] animate-float rounded-full bg-[radial-gradient(circle,rgba(184,149,74,0.16),transparent_68%)] blur-2xl" />
            <div className="absolute bottom-0 start-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(26,107,86,0.12),transparent_70%)] blur-2xl" />
          </div>

          <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:py-24">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <div className="animate-rise">
                <Eyebrow>{text.hero.kicker}</Eyebrow>
              </div>
              <h1 className="mt-6 max-w-3xl font-display text-[2.7rem] leading-[1.14] text-ink sm:text-5xl lg:text-[4.35rem]">
                <MaskLine delay={80}>{text.hero.title}</MaskLine>
              </h1>
              <p
                className="mt-7 max-w-xl animate-rise text-[1.05rem] leading-[1.9] text-ink-soft"
                style={{ animationDelay: "280ms" }}
              >
                {text.hero.body}
              </p>
              <div
                className="mt-9 flex flex-col gap-3 animate-rise sm:flex-row"
                style={{ animationDelay: "380ms" }}
              >
                <Button onClick={() => setRdvOpen(true)} variant="ink" arrow>
                  {text.hero.primary}
                </Button>
                <Button href="#a-propos" variant="soft">
                  {text.hero.secondary}
                </Button>
              </div>
              <div
                className="mt-10 flex flex-wrap items-center gap-3 animate-rise"
                style={{ animationDelay: "480ms" }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-ink/8 bg-white/80 px-3.5 py-2 text-[0.78rem] text-ink-soft shadow-sm">
                  <PinIcon className="h-3.5 w-3.5 text-gold-deep" />
                  {text.location}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-ink/8 bg-white/80 px-3.5 py-2 text-[0.78rem] text-ink-soft shadow-sm">
                  {text.hero.note}
                </span>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-5">
              <div
                className="relative mx-auto max-w-[390px] animate-scale-in lg:ms-auto"
                style={{ animationDelay: "160ms" }}
              >
                <div className="portrait-ring absolute -inset-3 animate-float" aria-hidden />
                <div className="portrait-frame group relative bg-teal-ink">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={heroImage}
                      alt={text.brandName}
                      className="img-pro animate-kenburns absolute inset-0 h-full w-full object-cover object-[center_16%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-ink via-teal-ink/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-ivory sm:p-7">
                      <p className="font-display text-[1.5rem] leading-tight">{text.brandName}</p>
                      <p className="tracking-wide-label mt-2 text-[0.68rem] font-medium tracking-[0.16em] text-gold-light uppercase">
                        {text.hero.portraitLabel}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-5 -start-4 grid h-[4.6rem] w-[4.6rem] place-items-center rounded-2xl border border-ink/8 bg-white shadow-[0_16px_40px_-20px_rgba(8,26,22,0.45)] sm:-start-6">
                  <Monogram size={42} />
                </div>
              </div>
            </div>
          </div>

          <a
            href="#a-propos"
            className="group mx-auto mb-8 hidden w-max flex-col items-center gap-2 text-ink-mute transition-colors hover:text-teal-ink lg:flex"
            aria-label={isArabic ? "استكشف" : "Découvrir"}
          >
            <span className="tracking-wide-label text-[0.58rem] tracking-[0.28em] uppercase">
              {isArabic ? "استكشف" : "Découvrir"}
            </span>
            <span className="relative block h-10 w-px overflow-hidden bg-ink/15">
              <span className="absolute inset-x-0 top-0 h-4 animate-[fall_2.2s_ease-in-out_infinite] bg-gold" />
            </span>
            <ChevronDown className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-y-1" />
          </a>
        </section>

        {/* ---------- Marquee ---------- */}
        <section className="relative overflow-hidden border-y border-ink/8 bg-white/70 py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ivory to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ivory to-transparent" />
          <div className="flex w-max animate-marquee items-center gap-10">
            {marquee.map(([number, title], i) => (
              <span key={`${number}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
                <span className="flex items-baseline gap-3">
                  <span className="font-display text-sm text-gold-deep">{number}</span>
                  <span className="font-display text-xl text-ink sm:text-2xl">{title}</span>
                </span>
                <svg viewBox="0 0 10 10" className="h-2 w-2 text-gold" aria-hidden>
                  <path d="M5 0 10 5 5 10 0 5Z" fill="currentColor" />
                </svg>
              </span>
            ))}
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section id="a-propos" className="relative py-20 sm:py-24 lg:py-28">
          <div ref={aboutRef} className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
            <div data-reveal className="reveal lg:col-span-5">
              <Eyebrow>{text.about.kicker}</Eyebrow>
              <h2 className="mt-5 font-display text-[2.35rem] leading-[1.2] text-ink sm:text-4xl lg:text-[2.85rem]">
                {text.about.title}
              </h2>
              <div className="group mt-9 overflow-hidden rounded-[1.5rem] border border-ink/8 shadow-[0_24px_48px_-28px_rgba(16,24,22,0.22)]">
                <img
                  src={heroImage}
                  alt={text.brandName}
                  className="img-pro h-[22rem] w-full object-cover object-[center_15%] sm:h-[26rem]"
                  loading="lazy"
                />
              </div>
            </div>

            <div data-reveal className="reveal flex flex-col justify-center lg:col-span-7 lg:ps-4">
              <p className="max-w-2xl text-[1.05rem] leading-[1.9] text-ink-soft">{text.about.body}</p>
              <div className="card-soft mt-9 p-6 sm:p-8">
                <p className="font-display text-2xl text-ink">{text.about.identity}</p>
                <p className="tracking-wide-label mt-2 text-[0.68rem] font-medium tracking-[0.16em] text-gold-deep uppercase">
                  {text.about.identityRole}
                </p>
                <dl className="mt-6 divide-y divide-ink/8">
                  {text.about.rows.map(([label, value]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 py-3.5 sm:grid-cols-[9rem_1fr]"
                    >
                      <dt className="tracking-wide-label text-[0.65rem] font-medium tracking-[0.14em] text-ink-mute uppercase">
                        {label}
                      </dt>
                      <dd className="font-display text-lg text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Values ---------- */}
        <section className="border-y border-ink/8 bg-white/55 py-10">
          <div ref={valuesRef} className="mx-auto grid max-w-[1280px] gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
            {text.values.map(([number, title, body]) => (
              <article
                key={number}
                data-reveal
                className="reveal card-lift rounded-3xl border border-ink/8 bg-white p-6"
              >
                <span className="font-display text-lg text-gold-deep">{number}</span>
                <h3 className="mt-4 font-display text-2xl text-ink">{title}</h3>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-ink-soft">{body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- Services ---------- */}
        <section id="services" className="relative bg-ivory-deep py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Eyebrow>{text.services.kicker}</Eyebrow>
                <h2 className="mt-5 font-display text-[2.35rem] leading-[1.2] text-ink sm:text-4xl lg:text-[2.85rem]">
                  {text.services.title}
                </h2>
              </div>
              <p className="max-w-md text-[0.98rem] leading-[1.85] text-ink-soft lg:col-span-5">
                {text.services.body}
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5">
                <div className="card-soft overflow-hidden p-2">
                  {text.services.items.map(([title, summary], index) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => setActiveService(index)}
                      className={cn(
                        "group flex w-full items-start gap-4 rounded-2xl px-4 py-4 text-start transition-all duration-500",
                        activeService === index
                          ? "bg-teal-ink text-ivory shadow-[0_14px_32px_-16px_rgba(8,26,22,0.55)]"
                          : "text-ink hover:bg-ivory-deep"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-1 font-display text-sm transition-colors",
                          activeService === index ? "text-gold-light" : "text-ink-mute"
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-lg sm:text-xl">{title}</span>
                        <span
                          className={cn(
                            "mt-1.5 block text-[0.82rem] leading-relaxed transition-colors duration-500",
                            activeService === index ? "text-ivory/70" : "text-ink-mute"
                          )}
                        >
                          {summary}
                        </span>
                      </span>
                      <ArrowRight
                        className={cn(
                          "h-4 w-4 transition-all duration-500 rtl:rotate-180",
                          activeService === index
                            ? "text-gold-light translate-x-0.5 rtl:-translate-x-0.5"
                            : "text-ink-mute group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="card-soft relative min-h-[320px] overflow-hidden p-8 sm:p-10">
                  <div className="absolute end-0 top-0 h-36 w-36 rounded-bl-[5rem] bg-gradient-to-bl from-gold/12 to-transparent" />
                  <div key={activeService} className="panel-in relative">
                    <span className="tracking-wide-label text-[0.68rem] font-medium tracking-[0.18em] text-gold-deep uppercase">
                      {String(activeService + 1).padStart(2, "0")} / 06
                    </span>
                    <h3 className="mt-5 font-display text-3xl text-ink sm:text-4xl">
                      {text.services.items[activeService][0]}
                    </h3>
                    <p className="mt-4 max-w-xl font-display text-[1.25rem] leading-[1.6] text-teal">
                      {text.services.items[activeService][1]}
                    </p>
                    <div className="mt-7 flex items-start gap-3 border-s-2 border-gold/60 ps-4">
                      <div>
                        <span className="tracking-wide-label block text-[0.62rem] font-medium tracking-[0.16em] text-gold-deep uppercase">
                          {text.services.detailLabel}
                        </span>
                        <p className="mt-2 max-w-xl text-[0.97rem] leading-[1.9] text-ink-soft">
                          {text.services.items[activeService][2]}
                        </p>
                      </div>
                    </div>
                    <Button onClick={() => setRdvOpen(true)} variant="ink" arrow className="mt-8">
                      {text.services.action}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Method ---------- */}
        <section
          id="expertise"
          className="noise relative overflow-hidden bg-teal-ink py-20 text-ivory sm:py-24 lg:py-28"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 end-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(184,149,74,0.2),transparent_65%)]" />
          </div>
          <div ref={methodRef} className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
            <div data-reveal className="reveal">
              <Eyebrow tone="light">{text.method.kicker}</Eyebrow>
              <h2 className="mt-5 max-w-2xl font-display text-[2.35rem] leading-[1.25] sm:text-4xl lg:text-[2.85rem]">
                {text.method.title}
              </h2>
            </div>
            <div className="mt-4 h-px w-24 origin-left bg-gold/70 draw-line" />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {text.method.items.map(([number, title, body]) => (
                <div
                  key={number}
                  data-reveal
                  className="reveal group rounded-3xl border border-ivory/10 bg-white/[0.04] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:bg-white/[0.08] sm:p-7"
                >
                  <span className="font-display text-xl text-gold-light">{number}</span>
                  <h3 className="mt-6 font-display text-2xl transition-colors group-hover:text-gold-pale sm:text-[1.7rem]">
                    {title}
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-[1.8] text-ivory/65">{body}</p>
                  <span className="mt-6 block h-px w-8 bg-gold/60 transition-all duration-500 group-hover:w-16" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="relative py-20 sm:py-24 lg:py-28">
          <div ref={contactRef} className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <div data-reveal className="reveal max-w-2xl">
              <Eyebrow>{text.contact.kicker}</Eyebrow>
              <h2 className="mt-5 font-display text-[2.35rem] leading-[1.2] text-ink sm:text-4xl lg:text-[2.85rem]">
                {text.contact.title}
              </h2>
              <p className="mt-5 text-[1.02rem] leading-[1.85] text-ink-soft">{text.contact.body}</p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div data-reveal className="reveal lg:col-span-5">
                <div className="card-soft overflow-hidden">
                  {[
                    {
                      icon: PhoneIcon,
                      label: isArabic ? "الهاتف" : "Téléphone",
                      value: common.phone,
                      href: `tel:${common.phoneRaw}`,
                    },
                    {
                      icon: WhatsappIcon,
                      label: "WhatsApp",
                      value: common.whatsapp,
                      href: waUrl(appointmentMessage),
                      external: true,
                    },
                    {
                      icon: MailIcon,
                      label: "Email",
                      value: common.email,
                      href: `mailto:${common.email}`,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer noopener" : undefined}
                        className="group flex items-center gap-4 border-b border-ink/6 px-5 py-5 transition-all duration-500 hover:bg-ivory-deep/70 sm:px-6"
                      >
                        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-ink/8 bg-ivory text-teal transition-all duration-500 group-hover:rotate-6 group-hover:border-gold group-hover:bg-gold group-hover:text-white">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="tracking-wide-label block text-[0.65rem] font-medium tracking-[0.14em] text-ink-mute uppercase">
                            {item.label}
                          </span>
                          <span className="mt-1 block font-display text-xl text-ink">{item.value}</span>
                        </span>
                      </a>
                    );
                  })}
                  <div className="flex items-start gap-4 px-5 py-5 sm:px-6">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-ink/8 bg-ivory text-teal">
                      <PinIcon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-display text-xl text-ink">{text.contact.address}</span>
                      <span className="mt-1 block text-sm text-ink-mute">{text.contact.addressDetail}</span>
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-ink/8 bg-white px-5 py-4 text-sm text-ink-soft shadow-sm">
                  <MapIcon className="h-4 w-4 shrink-0 text-gold-deep" />
                  {text.contact.hours}
                </div>
              </div>

              <div data-reveal className="reveal lg:col-span-7">
                <div className="relative overflow-hidden rounded-[1.75rem] bg-teal-ink p-7 text-ivory shadow-[0_28px_60px_-30px_rgba(8,26,22,0.5)] sm:p-10">
                  <div
                    aria-hidden
                    className="absolute end-0 top-0 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(184,149,74,0.22),transparent_65%)]"
                  />
                  <div className="relative">
                    <h3 className="font-display text-3xl">
                      {formSent ? text.contact.success : text.contact.formTitle}
                    </h3>
                    {formSent ? (
                      <div className="panel-in mt-8 rounded-3xl border border-gold/30 bg-gold/[0.08] p-7 text-center">
                        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold-light">
                          <CheckIcon className="h-6 w-6" />
                        </span>
                        <p className="mt-5 font-display text-2xl">{text.contact.success}</p>
                        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ivory/65">
                          {text.contact.successBody}
                        </p>
                        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                          <Button
                            href={waUrl(
                              [appointmentMessage, form.name, form.phone, form.message]
                                .filter(Boolean)
                                .join("\n")
                            )}
                            target="_blank"
                            variant="gold"
                            arrow
                          >
                            WhatsApp
                          </Button>
                          <Button variant="ghost-dark" onClick={resetForm}>
                            {text.contact.newMessage}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <form className="mt-8 space-y-5" onSubmit={sendForm}>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <label className="block text-[0.68rem] font-medium tracking-[0.1em] text-ivory/55 uppercase">
                            {text.contact.name}
                            <input
                              required
                              className="input-modern mt-2"
                              placeholder={text.contact.placeholderName}
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                          </label>
                          <label className="block text-[0.68rem] font-medium tracking-[0.1em] text-ivory/55 uppercase">
                            {text.contact.phone}
                            <input
                              className="input-modern mt-2"
                              placeholder={common.phone}
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            />
                          </label>
                          <label className="block text-[0.68rem] font-medium tracking-[0.1em] text-ivory/55 uppercase">
                            {text.contact.email}
                            <input
                              type="email"
                              className="input-modern mt-2"
                              placeholder={common.email}
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                          </label>
                          <label className="block text-[0.68rem] font-medium tracking-[0.1em] text-ivory/55 uppercase">
                            {text.contact.subject}
                            <select className="input-modern mt-2 appearance-none" defaultValue={text.contact.subjects[0]}>
                              {text.contact.subjects.map((subject) => (
                                <option key={subject} className="bg-teal-ink text-ivory">
                                  {subject}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                        <label className="block text-[0.68rem] font-medium tracking-[0.1em] text-ivory/55 uppercase">
                          {text.contact.message}
                          <textarea
                            required
                            rows={4}
                            className="input-modern mt-2 resize-none"
                            placeholder={text.contact.placeholderMessage}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                          />
                        </label>
                        <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                          <Button type="submit" variant="gold" arrow>
                            {text.contact.send}
                          </Button>
                          <Button type="button" variant="ghost-dark" onClick={() => setRdvOpen(true)}>
                            {text.hero.primary}
                          </Button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="noise relative overflow-hidden bg-teal-ink pt-16 pb-8 text-ivory" dir={text.dir}>
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-10 border-b border-ivory/12 pb-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <span className="inline-grid place-items-center rounded-2xl border border-ivory/15 bg-white/5 p-3">
                <Monogram size={52} inverted />
              </span>
              <h2 className="mt-5 font-display text-3xl">{text.brandName}</h2>
              <p className="mt-2 text-sm text-ivory/55">
                {text.role} · {text.location}
              </p>
            </div>
            <div className="lg:col-span-7 lg:text-end">
              <p className="font-display text-2xl leading-[1.4] sm:text-3xl">{text.footer.line}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Button onClick={() => setRdvOpen(true)} variant="gold" arrow>
                  {text.hero.primary}
                </Button>
                <Button href={waUrl(appointmentMessage)} target="_blank" variant="ghost-dark">
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-7 text-[0.75rem] text-ivory/45 sm:flex-row">
            <span>{text.footer.rights}</span>
            <span dir="ltr">
              {common.phone} · {common.email}
            </span>
          </div>
        </div>
      </footer>

      <a
        href={waUrl(appointmentMessage)}
        target="_blank"
        rel="noreferrer noopener"
        className="fixed bottom-5 end-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#1f7a4d] text-white shadow-[0_16px_36px_-12px_rgba(8,26,22,0.55)] transition-transform duration-500 hover:scale-110 sm:bottom-7 sm:end-7"
        aria-label="WhatsApp"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full border border-[#3f9c6b]" aria-hidden />
        <WhatsappIcon className="relative h-7 w-7" />
      </a>

      {rdvOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-teal-ink/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
          dir={text.dir}
        >
          <button
            type="button"
            className="absolute inset-0 animate-fade-in"
            onClick={() => setRdvOpen(false)}
            aria-label={isArabic ? "إغلاق" : "Fermer"}
          />
          <div className="panel-in relative z-10 w-full max-w-lg overflow-hidden rounded-[1.75rem] bg-ivory p-7 text-ink shadow-2xl sm:p-9">
            <button
              type="button"
              onClick={() => setRdvOpen(false)}
              className="absolute top-5 end-5 grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink-mute transition-all duration-500 hover:rotate-90 hover:border-ink/20 hover:text-ink"
              aria-label={isArabic ? "إغلاق" : "Fermer"}
            >
              <CloseIcon className="h-4.5 w-4.5" />
            </button>
            <Eyebrow>{text.hero.kicker}</Eyebrow>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">{text.hero.primary}</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              {isArabic
                ? "تواصلوا معنا مباشرة عبر واتساب لتأكيد الموعد."
                : "Contactez directement le cabinet via WhatsApp pour confirmer votre rendez-vous."}
            </p>
            <a
              href={waUrl(appointmentMessage)}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-modern mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-teal-ink px-6 py-4 text-[0.72rem] font-medium tracking-[0.12em] text-ivory uppercase"
            >
              <WhatsappIcon className="h-5 w-5" /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
