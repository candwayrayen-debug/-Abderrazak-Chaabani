import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { ArrowRight } from "./Icons";

type Variant = "ink" | "gold" | "ghost" | "ghost-dark" | "soft";

const variants: Record<Variant, string> = {
  ink: "bg-teal-ink text-ivory border border-teal-ink hover:bg-teal-deep hover:border-teal-deep shadow-[0_14px_32px_-16px_rgba(10,31,25,0.55)]",
  gold: "bg-gold text-teal-ink border border-gold hover:bg-gold-light hover:border-gold-light shadow-[0_14px_32px_-16px_rgba(184,149,74,0.55)]",
  soft: "bg-white text-teal-ink border border-ink/8 hover:border-gold/40 hover:shadow-[0_12px_28px_-18px_rgba(18,26,23,0.2)]",
  ghost: "bg-transparent text-ink border border-ink/12 hover:border-gold hover:text-gold-deep",
  "ghost-dark": "bg-transparent text-ivory border border-ivory/20 hover:border-gold-light hover:text-gold-light",
};

export function Button({
  children,
  variant = "ink",
  href,
  onClick,
  className,
  type = "button",
  arrow = false,
  target,
  disabled,
}: {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  arrow?: boolean;
  target?: string;
  disabled?: boolean;
}) {
  const classes = cn(
    "btn-modern group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5",
    "text-[0.7rem] font-medium tracking-[0.14em] uppercase",
    "disabled:pointer-events-none disabled:opacity-45",
    variants[variant],
    className
  );

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={target}
        rel={target === "_blank" ? "noreferrer noopener" : undefined}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {inner}
    </button>
  );
}

export function Eyebrow({
  children,
  tone = "gold",
  className,
}: {
  children: ReactNode;
  tone?: "gold" | "light" | "dark";
  className?: string;
}) {
  const tones = {
    gold: "text-gold-deep",
    light: "text-gold-light",
    dark: "text-ink-mute",
  };
  return (
    <span
      className={cn(
        "tracking-wide-label inline-flex items-center gap-3 text-[0.68rem] font-medium tracking-[0.22em] uppercase",
        tones[tone],
        className
      )}
    >
      <span className="h-px w-6 bg-current opacity-50" aria-hidden />
      {children}
    </span>
  );
}
