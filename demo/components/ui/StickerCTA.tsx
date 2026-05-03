'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { ease, duration } from '@/lib/motion';

// Sticker-block primary CTA. Hot-pink fill, gold inner ring, 4px radius
// (NOT pill — see guide.md §6.7 anti-pattern #8). Hover: -1° to +1°
// rotation deterministic per element via `tilt` prop (random per instance,
// stable on each render so it doesn't jitter), 1.02 scale, accent-tinted
// shadow appears (not shifts) over 200ms.

type Props = {
  href: string;
  external?: boolean;
  tilt?: -1 | 1;
  fullWidth?: boolean;
  size?: 'md' | 'lg';
  children: React.ReactNode;
};

export function StickerCTA({
  href,
  external = false,
  tilt = 1,
  fullWidth = false,
  size = 'md',
  children,
}: Props) {
  const reduced = useReducedMotion();

  const padding = size === 'lg' ? 'px-8 py-5 text-subheading' : 'px-6 py-4 text-body';

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center gap-3 font-display font-bold uppercase tracking-display-s text-primary-on bg-primary rounded-sm ${padding} ${fullWidth ? 'w-full justify-center' : ''}`}
      style={{
        boxShadow: 'inset 0 0 0 2px var(--color-text-display)',
      }}
      initial={{ rotate: 0, scale: 1 }}
      whileHover={
        reduced
          ? undefined
          : {
              rotate: tilt,
              scale: 1.02,
              boxShadow:
                'inset 0 0 0 2px var(--color-text-display), 0 8px 28px rgba(230,59,124,0.45), 0 2px 6px rgba(230,59,124,0.25)',
              transition: { duration: duration.micro, ease: ease.state },
            }
      }
      whileTap={reduced ? undefined : { scale: 0.97 }}
      transition={{ duration: duration.micro, ease: ease.state }}
    >
      <span>{children}</span>
      <ArrowRight weight="bold" size={20} aria-hidden />
    </motion.a>
  );
}
