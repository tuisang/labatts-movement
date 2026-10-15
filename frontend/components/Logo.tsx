import { useId } from "react";

/**
 * Tuistech Movement logo mark.
 * A "T" that doubles as an athlete: head, outstretched arms, torso —
 * with speed lines trailing behind to show motion.
 */
export function LogoMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  const id = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Tuistech Movement logo"
      className={className}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#d24200" />
          <stop offset="1" stopColor="#a83300" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill={`url(#${id}-bg)`} />
      {/* head */}
      <circle cx="20" cy="12" r="4.4" fill="#fff" />
      {/* arms (T crossbar), slightly raised for motion */}
      <path d="M8.5 22.5 L31 20" stroke="#fff" strokeWidth="5.4" strokeLinecap="round" fill="none" />
      {/* torso (T stem) */}
      <path d="M19.8 22 L18.2 38" stroke="#fff" strokeWidth="5.4" strokeLinecap="round" fill="none" />
      {/* speed lines */}
      <path d="M36 25 H42" stroke="#ffdbd0" strokeWidth="2.6" strokeLinecap="round" opacity=".9" />
      <path d="M34 31 H40" stroke="#ffdbd0" strokeWidth="2.6" strokeLinecap="round" opacity=".65" />
      <path d="M31 37 H36" stroke="#ffdbd0" strokeWidth="2.6" strokeLinecap="round" opacity=".4" />
    </svg>
  );
}

export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={38} />
      <span className="font-headline-md text-headline-md font-bold text-primary whitespace-nowrap leading-none">
        Tuistech Movement
      </span>
    </span>
  );
}
