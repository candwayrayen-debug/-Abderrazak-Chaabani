import type { SVGProps } from "react";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type P = SVGProps<SVGSVGElement>;

export const PhoneIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6.2 3h3l1.4 3.6-2 1.4a11.5 11.5 0 0 0 5.4 5.4l1.4-2L19 12.8v3a2 2 0 0 1-2.2 2A15.8 15.8 0 0 1 3.2 5.2 2 2 0 0 1 5.2 3z" />
  </svg>
);

export const WhatsappIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.86.5 3.6 1.4 5.1L2 22l5.2-1.54a9.9 9.9 0 0 0 4.84 1.24h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.47 2 12.04 2Zm0 17.98h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.09.91.82-3-.2-.31a8.13 8.13 0 0 1-1.25-4.34c0-4.5 3.68-8.17 8.2-8.17a8.17 8.17 0 0 1 0 16.33Zm4.5-6.11c-.25-.13-1.46-.72-1.68-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.96-.14.17-.29.19-.54.06-.24-.12-1.04-.38-1.98-1.22a7.5 7.5 0 0 1-1.37-1.7c-.14-.25-.02-.38.11-.5.11-.12.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.02 2.56.12.17 1.75 2.67 4.23 3.74.6.25 1.06.4 1.42.52.6.18 1.14.16 1.57.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const MailIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="2.8" y="5" width="18.4" height="14" rx="1.4" />
    <path d="m3.4 6.4 8.6 6.4 8.6-6.4" />
  </svg>
);

export const MapIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9 3.6 3.6 5.8v14.6L9 18.2l6 2.2 5.4-2.2V3.6L15 5.8Z" />
    <path d="M9 3.6v14.6M15 5.8v14.6" />
  </svg>
);

export const CalendarIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.2" y="5" width="17.6" height="16" rx="1.4" />
    <path d="M3.2 9.8h17.6M8 3v4M16 3v4" />
    <path d="M7.6 13.4h2.2M13.2 13.4h2.2M7.6 17h2.2M13.2 17h2.2" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7v5.2l3.2 2" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 12h15.5M14 6.5l5.5 5.5-5.5 5.5" />
  </svg>
);

export const ArrowUpRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8.6 7H17v8.4" />
  </svg>
);

export const ArrowLeft = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20 12H4.5M10 6.5 4.5 12l5.5 5.5" />
  </svg>
);

export const ArrowUpLeft = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M17 15.4V7H8.6" />
  </svg>
);

export const ChevronDown = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m4.5 12.5 5 5L19.5 6.5" />
  </svg>
);

export const CompassIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="m15.2 8.8-1.9 4.5-4.5 1.9 1.9-4.5Z" />
  </svg>
);

export const ShieldIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 2.8 4.8 5.6v6c0 4.3 3 8.1 7.2 9.6 4.2-1.5 7.2-5.3 7.2-9.6v-6Z" />
    <path d="M12 8.4v4.4M10.4 10.6h3.2" />
  </svg>
);

export const EarIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 9a5 5 0 0 1 10 0c0 2.6-2 3.4-3 5-.8 1.3-.4 3-2.2 3.6-1.4.5-2.6-.5-2.6-1.8" />
    <path d="M10.4 9a1.7 1.7 0 0 1 3.4 0" />
  </svg>
);

export const EyeIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M2.6 12S6 5.8 12 5.8 21.4 12 21.4 12 18 18.2 12 18.2 2.6 12 2.6 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const HandsIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M8.4 12.6V5.9a1.3 1.3 0 0 1 2.6 0v5.3" />
    <path d="M11 11.2V4.6a1.3 1.3 0 0 1 2.6 0v6.6" />
    <path d="M13.6 11.4V6.6a1.3 1.3 0 0 1 2.6 0v7.6c0 3.4-2.2 6.2-5.4 6.2-2.6 0-4-1.2-5-3.2L4 14.4a1.3 1.3 0 0 1 2.2-1.4l2.2 2.6" />
  </svg>
);

export const QuillIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3.4 20.6c4.4.4 8-1 10.6-3.6 3-3 4.4-7.4 4.6-13.6-5 .6-9.4 2-12.2 4.8-2.4 2.4-3.2 5.6-2.6 8.8Z" />
    <path d="M8.6 15.4c2-3.4 4.8-6 8.6-7.8" />
  </svg>
);

export const EstateIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3.4 10.4 12 3.6l8.6 6.8" />
    <path d="M5.6 9.6v10.8h12.8V9.6" />
    <path d="M10 20.4v-6h4v6" />
  </svg>
);

export const TreeIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 20.6V9.4" />
    <circle cx="12" cy="5.6" r="2.4" />
    <path d="M12 13.2 6.6 9.8M12 13.2l5.4-3.4" />
    <circle cx="5" cy="9" r="2" />
    <circle cx="19" cy="9" r="2" />
    <path d="M8 20.6h8" />
  </svg>
);

export const SignatureIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 16.4c2.6 0 3.2-9 5.4-9 1.6 0 1.2 6.6 2.8 6.6 1.4 0 1.8-4 3.2-4 1.2 0 1 2.6 2.2 2.6.8 0 1.4-.6 2.4-1.6" />
    <path d="M3.4 20.4h17.2" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const SealIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="9.6" r="5.8" />
    <path d="M12 6.2v6.8M8.6 9.6h6.8" />
    <path d="m8.4 14.6-1.6 6 5.2-2.4 5.2 2.4-1.6-6" />
  </svg>
);

export const ScaleIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3.6v16.8M7 20.4h10M4.4 7.6h15.2" />
    <path d="M4.4 7.6 1.8 13.4a2.9 2.9 0 0 0 5.2 0Z" />
    <path d="M19.6 7.6 17 13.4a2.9 2.9 0 0 0 5.2 0Z" />
  </svg>
);

export const MenuIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3.6 7h16.8M3.6 12h16.8M3.6 17h10.8" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const MinusIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
);

export const iconMap = {
  compass: CompassIcon,
  shield: ShieldIcon,
  ear: EarIcon,
  eye: EyeIcon,
  hands: HandsIcon,
  seal: SealIcon,
  quill: QuillIcon,
  estate: EstateIcon,
  tree: TreeIcon,
  signature: SignatureIcon,
  plus: PlusIcon,
} as const;

export const Diamond = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 10 10" className={className} aria-hidden>
    <path d="M5 0 10 5 5 10 0 5Z" fill="currentColor" />
  </svg>
);

export type IconName = keyof typeof iconMap;

/** Monogramme « AC » dans un sceau doré. */
export function Monogram({
  className = "",
  size = 96,
  inverted = false,
}: {
  className?: string;
  size?: number;
  inverted?: boolean;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`mono-gold-${inverted ? "i" : "n"}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e9dcc2" />
          <stop offset="50%" stopColor="#c4a264" />
          <stop offset="100%" stopColor="#8f7132" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="56" stroke={`url(#mono-gold-${inverted ? "i" : "n"})`} strokeWidth="0.9" />
      <circle cx="60" cy="60" r="48" stroke={`url(#mono-gold-${inverted ? "i" : "n"})`} strokeWidth="0.5" opacity="0.5" />
      <text
        x="60"
        y="72"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="42"
        letterSpacing="1.5"
        fill={`url(#mono-gold-${inverted ? "i" : "n"})`}
      >
        AC
      </text>
    </svg>
  );
}

/** Filet ornemental — séparateur de sections. */
export function Ornament({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <svg viewBox="0 0 240 12" fill="none" className={className} aria-hidden>
      <path d="M0 6h84M156 6h84" stroke={dark ? "#0c241d" : "#b08d4a"} strokeWidth="0.7" opacity="0.55" />
      <path
        d="M120 1.2 124.8 6 120 10.8 115.2 6Z"
        stroke={dark ? "#0c241d" : "#b08d4a"}
        strokeWidth="0.8"
        fill="none"
      />
      <circle cx="101" cy="6" r="1.4" fill={dark ? "#0c241d" : "#b08d4a"} opacity="0.6" />
      <circle cx="139" cy="6" r="1.4" fill={dark ? "#0c241d" : "#b08d4a"} opacity="0.6" />
    </svg>
  );
}
