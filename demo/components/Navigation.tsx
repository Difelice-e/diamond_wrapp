'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { List, X } from '@phosphor-icons/react';
import { ease, duration } from '@/lib/motion';

import { asset } from '@/lib/asset';
// Sticky nav. Transparent at top, morphs to bg-deep + shadow-floating after
// 80px scroll. Mobile: hamburger → full-screen overlay (role="dialog",
// aria-modal, Escape closes, aria-expanded on toggle — all anti-pattern guards
// from skill catalogue).

const NAV_LINKS = [
  { href: '#servizi', label: 'Servizi' },
  { href: '#lavori', label: 'Lavori Firmati' },
  { href: '#bottega', label: 'La Bottega' },
  { href: '#contatti', label: 'Contatti' },
] as const;

const WA_HREF =
  'https://wa.me/393892053275?text=Ciao%20Diamond%20Wrapp%2C%20vorrei%20un%20preventivo';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Esc closes the mobile overlay. Body scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 transition-[background-color,box-shadow,border-color] duration-state ease-state border-b backdrop-blur-md ${
          scrolled
            ? 'bg-bg-deep/95 shadow-floating border-border-subtle'
            : 'bg-bg-deep/85 border-border-subtle/60'
        }`}
        style={{ zIndex: 100 }}
      >
        <div className="container-layout flex h-[var(--nav-h,72px)] items-center justify-between gap-6">
          <a href="/" className="block group" aria-label="Diamond Wrapp — homepage">
            <Image
              src={asset('/logo.png')}
              alt="Diamond Wrapp"
              width={800}
              height={272}
              priority
              className="h-9 md:h-11 w-auto transition-transform duration-state ease-state group-hover:scale-105"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Menu principale">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="caption-mono uppercase text-text-default hover:text-primary transition-colors duration-state ease-state"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-primary hover:bg-primary-hover text-primary-on font-display font-bold uppercase tracking-display-s text-caption transition-colors duration-state ease-state"
              style={{ boxShadow: 'inset 0 0 0 2px var(--color-text-display)' }}
            >
              WhatsApp
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Apri menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-sm border border-border-emphasis text-text-display"
          >
            <List size={22} weight="bold" />
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu di navigazione"
          className="fixed inset-0 z-overlay bg-bg-deep flex flex-col"
        >
          <div className="container-layout flex h-[var(--nav-h,72px)] items-center justify-between border-b border-border-subtle">
            <Image
              src={asset('/logo.png')}
              alt="Diamond Wrapp"
              width={800}
              height={272}
              className="h-9 w-auto"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Chiudi menu"
              className="inline-flex items-center justify-center h-10 w-10 rounded-sm border border-border-emphasis text-text-default"
              autoFocus
            >
              <X size={22} weight="bold" />
            </button>
          </div>

          <motion.nav
            className="container-layout flex-1 flex flex-col justify-between py-12"
            aria-label="Menu principale"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.state, ease: ease.state }}
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4 border-b border-border-subtle group"
                  >
                    <span className="caption-mono text-text-subtle">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display font-bold uppercase text-text-display text-display-s leading-none tracking-display-s group-hover:text-primary transition-colors duration-state">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-4">
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="w-full text-center inline-flex items-center justify-center gap-2 px-6 py-4 rounded-sm bg-primary hover:bg-primary-hover text-primary-on font-display font-bold uppercase tracking-display-s text-body transition-colors duration-state"
                style={{ boxShadow: 'inset 0 0 0 2px var(--color-text-display)' }}
              >
                Scrivici su WhatsApp →
              </a>
              <p className="caption-mono text-text-muted text-center">
                Via Mulino del Gioco 8 · Città Sant&apos;Angelo (PE)
              </p>
            </div>
          </motion.nav>
        </div>
      )}
    </>
  );
}
