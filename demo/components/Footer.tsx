'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { FacebookLogo, InstagramLogo, WhatsappLogo, Phone, EnvelopeSimple } from '@phosphor-icons/react';

import { asset } from '@/lib/asset';
// Footer — oversized DIAMOND WRAPP wordmark (real logo PNG) + 4-column
// grid: Sitemap / Servizi / Contatti+Social / Dove. NO email signup
// (per site-plan "NOT on demo"). Slow filigree-rotation decoration in
// background corners (ambient motion only — non-interactive).

const SITEMAP = [
  { href: '/', label: 'Home' },
  { href: '#servizi', label: 'Servizi' },
  { href: '#lavori', label: 'Lavori Firmati' },
  { href: '#bottega', label: 'La Bottega' },
  { href: '#contatti', label: 'Contatti' },
];

const SERVIZI = ['Wrapping', 'PPF', 'Vetri', 'Interni', 'Commercial', 'Rinnovo Fari'];

export function Footer() {
  const reduced = useReducedMotion();

  return (
    <footer className="relative bg-bg-deep border-t border-border-subtle overflow-hidden">
      {/* Filigree decorations — ambient slow rotation, decorative only */}
      {!reduced && (
        <>
          <motion.span
            aria-hidden
            className="absolute -top-32 -right-32 block w-80 h-80 rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, var(--color-secondary-purple) 0%, transparent 30%, var(--color-secondary-purple-bright) 50%, transparent 80%)',
              opacity: 0.18,
              filter: 'blur(20px)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
          />
          <motion.span
            aria-hidden
            className="absolute -bottom-40 -left-40 block w-96 h-96 rounded-full"
            style={{
              background:
                'conic-gradient(from 180deg, var(--color-action-primary) 0%, transparent 35%, var(--color-text-display) 60%, transparent 100%)',
              opacity: 0.1,
              filter: 'blur(30px)',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 90, ease: 'linear', repeat: Infinity }}
          />
        </>
      )}

      <div className="container-layout relative pt-20 pb-12">
        {/* Brand mark — actual logo, centered, sized so it sits as a quiet
            signature rather than a billboard (per human review feedback). */}
        <div className="mb-14 lg:mb-16 flex justify-center">
          <Image
            src={asset('/logo.png')}
            alt="Diamond Wrapp"
            width={800}
            height={272}
            className="w-full max-w-[360px] md:max-w-[420px] h-auto"
            sizes="(max-width: 768px) 80vw, 420px"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {/* Sitemap */}
          <div>
            <p className="caption-mono text-text-muted mb-4">SITEMAP</p>
            <ul className="flex flex-col gap-3">
              {SITEMAP.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-text-default hover:text-primary transition-colors duration-state"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Servizi */}
          <div>
            <p className="caption-mono text-text-muted mb-4">SERVIZI</p>
            <ul className="flex flex-col gap-3">
              {SERVIZI.map((s) => (
                <li key={s}>
                  <a
                    href="#servizi"
                    className="text-text-default hover:text-primary transition-colors duration-state"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatti + Social merged */}
          <div>
            <p className="caption-mono text-text-muted mb-4">CONTATTI</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://wa.me/393892053275"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-text-default hover:text-primary transition-colors duration-state"
                >
                  <WhatsappLogo size={18} weight="bold" /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="tel:+393892053275"
                  className="inline-flex items-center gap-2 text-text-default hover:text-primary transition-colors duration-state"
                >
                  <Phone size={18} weight="bold" /> +39 389 205 3275
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@diamondwrapp.com"
                  className="inline-flex items-center gap-2 text-text-default hover:text-primary transition-colors duration-state break-all"
                >
                  <EnvelopeSimple size={18} weight="bold" /> info@diamondwrapp.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/Diamondwrapp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-text-default hover:text-primary transition-colors duration-state"
                >
                  <FacebookLogo size={18} weight="bold" /> Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-text-default hover:text-primary transition-colors duration-state"
                  aria-label="Instagram (coming soon)"
                >
                  <InstagramLogo size={18} weight="bold" /> Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Dove + hours */}
          <div>
            <p className="caption-mono text-text-muted mb-4">DOVE</p>
            <address className="not-italic text-text-default leading-pullquote">
              Via Mulino del Gioco 8<br />
              65013 Città Sant&apos;Angelo (PE)<br />
              Abruzzo, Italia
            </address>

            <p className="caption-mono text-text-muted mt-6 mb-2">ORARI</p>
            <dl className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-1 text-text-default">
              <dt className="caption-mono text-text-muted">LUN–VEN</dt>
              <dd>9:00–13:00<br />15:00–19:00</dd>
              <dt className="caption-mono text-text-muted mt-1">SAB</dt>
              <dd className="mt-1">9:00–13:00</dd>
            </dl>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between gap-4">
          <p className="caption-mono text-text-subtle">
            © {new Date().getFullYear()} DIAMOND WRAPP <span className="text-text-subtle">·</span> P.IVA IT 0000000000 <span className="text-text-subtle">·</span> POWERED BY{' '}
            <a
              href="https://grybroker.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-primary transition-colors duration-state"
            >
              GRY BROKER
            </a>
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li><a href="#" className="caption-mono text-text-subtle hover:text-primary transition-colors duration-state" data-page="privacy">PRIVACY</a></li>
            <li><a href="#" className="caption-mono text-text-subtle hover:text-primary transition-colors duration-state" data-page="cookie">COOKIE</a></li>
            <li><a href="#" className="caption-mono text-text-subtle hover:text-primary transition-colors duration-state" data-page="terms">TERMINI</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
