'use client';

// CSS-only infinite marquee primitive. NEVER speeds up on hover (per guide.md
// §2.3) — variable speed reads as "look at me" not "I'm always here".
// One copy width must be ≥ max viewport (anti-pattern guard for visible gap on
// loop). We render the children twice and translate by -50% over the duration.
// Reduced motion: pauses to a static graphic via `animation-play-state: paused`
// applied at the root via `@media (prefers-reduced-motion: reduce)` — already
// in tokens.css §a11y.

import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
  speed?: number; // seconds per cycle
  reverse?: boolean;
  className?: string;
};

export function MarqueeLayer({ children, speed = 40, reverse = false, className = '' }: Props) {
  // Hydration-safe — render the marquee only after mount so SSR markup
  // matches the initial DOM (avoids hydration mismatch on the duplicated
  // children block).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`relative w-full overflow-hidden ${className}`} aria-hidden>
      <div
        data-marquee
        className="flex w-max"
        style={{
          animation: mounted
            ? `dw-marquee ${speed}s linear infinite ${reverse ? 'reverse' : 'normal'}`
            : undefined,
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>{children}</div>
      </div>

      <style jsx>{`
        @keyframes dw-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-marquee] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
