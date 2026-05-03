'use client';

import { MarqueeLayer } from '@/components/ui/MarqueeLayer';

// Section divider — graffiti-livery marquee strip. Constant linear scroll,
// NEVER speeds up on hover (guide.md §2.3). Two deployments planned: one
// after hero, one after Stats.

type Props = {
  reverse?: boolean;
  speed?: number;
};

const SLOGANS = [
  'WRAPPING TOTALE & PARZIALE',
  'PPF · PROTEZIONE PELLICOLA',
  'OSCURAMENTO VETRI',
  'INTERNI · CARBONIO · LEGNO',
  'COMMERCIAL & WALL WRAP',
  'RINNOVO FARI',
];

function Splatter({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      width="36"
      height="36"
      className={className}
      aria-hidden
    >
      {/* Hot-pink splatter glyph derived from reference_wrap.png aesthetic */}
      <path
        d="M28 6 L34 18 L46 14 L40 26 L52 30 L40 34 L46 46 L34 42 L28 50 L22 42 L10 46 L16 34 L4 30 L16 26 L10 14 L22 18 Z"
        fill="var(--color-action-primary)"
        opacity="0.95"
      />
      <circle cx="48" cy="10" r="2.4" fill="var(--color-action-primary)" />
      <circle cx="8" cy="50" r="1.8" fill="var(--color-action-primary)" />
      <circle cx="50" cy="46" r="1.4" fill="var(--color-text-display)" />
    </svg>
  );
}

function Hex({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28" className={className} aria-hidden>
      <polygon
        points="20,4 36,12 36,28 20,36 4,28 4,12"
        fill="none"
        stroke="var(--color-text-display)"
        strokeWidth="2"
        opacity="0.55"
      />
    </svg>
  );
}

export function MarqueeStrip({ reverse = false, speed = 40 }: Props) {
  return (
    <div className="relative w-full bg-bg-deep border-y border-border-subtle py-5 overflow-hidden">
      {/* Subtle vinyl-scuff diagonal striations behind the marquee */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, transparent 0px, transparent 14px, var(--color-text-display) 14px, var(--color-text-display) 15px)',
        }}
      />
      <MarqueeLayer reverse={reverse} speed={speed}>
        {SLOGANS.map((slogan, i) => (
          <div key={`${slogan}-${i}`} className="flex items-center gap-8 px-8">
            <span className="font-display font-bold uppercase text-text-display text-display-s leading-none tracking-display-s whitespace-nowrap">
              {slogan}
            </span>
            {i % 2 === 0 ? <Splatter /> : <Hex />}
          </div>
        ))}
      </MarqueeLayer>
    </div>
  );
}
