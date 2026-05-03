'use client';

import { ArrowUpRight } from '@phosphor-icons/react';

// Subordinate text-link with arrow. Used for tel:/mailto: + Stats CTA +
// Servizi end-of-section. Visual hierarchy: NEVER as prominent as StickerCTA.

type Props = {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function SecondaryLink({ href, external = false, children, className = '' }: Props) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`group inline-flex items-center gap-2 font-display font-semibold uppercase tracking-display-s text-text-display hover:text-primary transition-colors duration-state ease-state ${className}`}
    >
      <span className="border-b border-border-emphasis group-hover:border-primary pb-0.5 transition-colors duration-state">
        {children}
      </span>
      <ArrowUpRight
        weight="bold"
        size={18}
        aria-hidden
        className="transition-transform duration-state ease-state group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
