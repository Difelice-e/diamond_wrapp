'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { Pullquote } from '@/components/ui/Pullquote';
import { RevealOnView } from '@/components/ui/RevealOnView';

import { asset } from '@/lib/asset';
// Workshop — editorial split. Photo left ~55%, pullquote right ~45%.
// Photo gets a subtle scroll-linked scale (1.0 → 1.04 over 20% viewport range).

export function WorkshopSplit() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const photoScale = useTransform(scrollYProgress, [0, 1], [1.0, reduced ? 1.0 : 1.06]);

  return (
    <section id="bottega" className="section bg-bg-deep relative overflow-hidden">
      {/* Atmospheric purple radial wash from logo filigree palette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 10% 80%, rgba(91,42,107,0.18) 0%, rgba(91,42,107,0) 70%)',
        }}
      />

      <div className="container-layout relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div ref={ref} className="lg:col-span-7 relative aspect-[4/5] lg:aspect-[4/5] overflow-hidden rounded-md shadow-deep">
          <motion.div className="absolute inset-0" style={{ scale: photoScale }}>
            <Image
              src={asset('/photos/reference_5.jpg')}
              alt="Interno della bottega Diamond Wrapp a Città Sant'Angelo"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </motion.div>
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(15,11,8,0.55) 0%, rgba(15,11,8,0) 50%)',
            }}
          />
          <p className="absolute bottom-5 left-5 caption-mono text-text-muted">
            VIA MULINO DEL GIOCO 8 · CITTÀ SANT&apos;ANGELO (PE)
          </p>
        </div>

        <RevealOnView className="lg:col-span-5">
          <SectionEyebrow index="06" accent>
            Dietro il vetro
          </SectionEyebrow>

          <h2 className="h-display-s mt-4">
            UNA MACCHINA<br />ALLA VOLTA.
          </h2>

          <p className="body-lg text-text-muted mt-6 mb-10 max-w-prose">
            La bottega è in zona industriale a Città Sant&apos;Angelo, in provincia
            di Pescara. Rotoli di pellicola al muro, terrazzo a terra, ponte
            sollevatore. Niente saletta d&apos;attesa con poltroncine — questo è
            un posto di lavoro.
          </p>

          <Pullquote cite="Orban Andreea" role="OWNER">
            Senza fretta, senza scorciatoie. Se non torniamo a casa con la
            guancia rossa per un pelo sbagliato, non l&apos;abbiamo finita.
          </Pullquote>
        </RevealOnView>
      </div>
    </section>
  );
}
