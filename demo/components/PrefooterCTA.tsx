'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { StickerCTA } from '@/components/ui/StickerCTA';

import { asset } from '@/lib/asset';
// Pre-footer CTA — full-bleed Ferrari in workshop with vinyl rolls visible.
// Warm-dark scrim at 55% so H2 reads. Subtle parallax on bg (0.2y, lighter
// than hero per §2.0.f).

export function PrefooterCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-8%']);

  return (
    <section
      id="contatti"
      ref={ref}
      className="relative min-h-[80vh] w-full flex items-center overflow-hidden bg-bg-deep"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ y: photoY }}>
        <Image
          src={asset('/photos/cw_ferrari_458_003.jpg')}
          alt=""
          role="presentation"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 45%' }}
        />
      </motion.div>

      {/* Heavy warm-dark scrim — H2 readability is the priority here */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(15,11,8,0.85) 0%, rgba(15,11,8,0.55) 60%, rgba(15,11,8,0.35) 100%), linear-gradient(to top, rgba(15,11,8,0.7) 0%, rgba(15,11,8,0) 60%)',
        }}
      />

      <div className="container-layout relative py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="caption-mono text-primary mb-5">
            06 / PRENOTA UN PREVENTIVO
          </p>
          <h2 className="h-display">
            PRONTO A WRAPPARE<br />LA TUA?
          </h2>
          <p className="body-lg text-text-default mt-8 max-w-xl">
            Mandaci una foto della tua auto e dicci dove vorresti arrivare.
            Ti rispondiamo lo stesso giorno con un preventivo gratuito.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <StickerCTA
              href="https://wa.me/393892053275?text=Ciao%20Diamond%20Wrapp%2C%20vorrei%20un%20preventivo"
              external
              size="lg"
              tilt={-1}
            >
              SCRIVICI SU WHATSAPP
            </StickerCTA>
            <a
              href="mailto:info@diamondwrapp.com"
              className="caption-mono uppercase text-text-default border-b border-border-emphasis hover:border-primary hover:text-primary transition-colors duration-state pb-1"
            >
              info@diamondwrapp.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
