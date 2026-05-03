'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { SecondaryLink } from '@/components/ui/SecondaryLink';
import { RevealOnView } from '@/components/ui/RevealOnView';
import { ease, duration } from '@/lib/motion';

import { asset } from '@/lib/asset';
// Servizi — native CSS scroll-snap horizontal carousel. 6 cards, all
// photo-led now that the client supplied real shots for each vertical.
// Structure: Wrapping / PPF / Vetri / Interni / Commercial / Wall.

type Service = {
  index: string;
  title: string;
  body: string;
  src: string;
  position?: string;
};

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Wrapping',
    body: 'Lucido, opaco, metalizzato, carbonio, alluminio. Total-look o cambio cromatico parziale.',
    src: asset('/photos/cw_mitsubishi_l200_16.jpg'),
    position: 'center 55%',
  },
  {
    index: '02',
    title: 'PPF',
    body: 'Pellicola BodyFence in poliuretano self-healing. La vernice intatta sotto, per anni.',
    src: asset('/photos/ppf_1.jpeg'),
    position: 'center',
  },
  {
    index: '03',
    title: 'Vetri',
    body: 'Oscuramento omologato. Filtri solari + privacy, posati col Knifeless senza graffi.',
    src: asset('/photos/v_1.jpeg'),
    position: 'center',
  },
  {
    index: '04',
    title: 'Interni',
    body: 'Cruscotto, plance, dettagli. Texture pelle, carbonio, legno, alluminio spazzolato.',
    src: asset('/photos/i_1.jpeg'),
    position: 'center 60%',
  },
  {
    index: '05',
    title: 'Commercial',
    body: 'Furgoni in livrea, vetture aziendali. La grafica del tuo brand sulla strada.',
    src: asset('/photos/c_1.jpeg'),
    position: 'center',
  },
  {
    index: '06',
    title: 'Wall Wrap',
    body: 'Pareti, vetrine, retail. Stampe in grande formato per allestimenti commerciali.',
    src: asset('/photos/w_1.jpeg'),
    position: 'center',
  },
];

function Card({ service }: { service: Service }) {
  return (
    <article className="relative aspect-[4/5] overflow-hidden rounded-md bg-bg-raised shadow-raised group">
      <Image
        src={service.src}
        alt=""
        role="presentation"
        fill
        sizes="(max-width: 768px) 80vw, 38vw"
        style={{ objectFit: 'cover', objectPosition: service.position }}
        className="transition-transform duration-state ease-state group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(15,11,8,0.88) 0%, rgba(15,11,8,0.25) 45%, rgba(15,11,8,0) 70%)',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <p className="caption-mono text-primary mb-2">
          {service.index} / SERVIZIO
        </p>
        <h3 className="font-display font-bold uppercase text-text-display text-display-s leading-display-h2 tracking-display-s">
          {service.title}
        </h3>
        <p className="text-text-default text-caption mt-2 max-w-xs">
          {service.body}
        </p>
      </div>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-state rounded-md"
        style={{
          boxShadow:
            'inset 0 0 0 2px var(--color-action-primary), 0 8px 28px rgba(230,59,124,0.32)',
        }}
      />
    </article>
  );
}

export function ServiziCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const gap = 24;
    const stride = card ? card.offsetWidth + gap : el.clientWidth;
    el.scrollBy({ left: stride * dir, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section id="servizi" className="section bg-bg-base">
      <div className="container-layout">
        <RevealOnView className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <SectionEyebrow index="02" accent>
              SERVIZI
            </SectionEyebrow>
            <h2 className="h-display mt-4">COSA WRAPPIAMO.</h2>
            <p className="body-lg text-text-muted mt-5 max-w-prose">
              Sei verticali sotto un tetto solo. Auto, furgoni, vetrine, interni.
              La stessa cura, dalla supercar di sabato mattina al furgone del lunedì.
            </p>
          </div>
          <div className="flex items-center gap-3 self-end">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              aria-label="Servizio precedente"
              className="inline-flex items-center justify-center h-12 w-12 rounded-sm border border-border-emphasis text-text-display hover:text-primary hover:border-primary transition-colors duration-state"
            >
              <CaretLeft size={20} weight="bold" />
            </button>
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              aria-label="Servizio successivo"
              className="inline-flex items-center justify-center h-12 w-12 rounded-sm border border-border-emphasis text-text-display hover:text-primary hover:border-primary transition-colors duration-state"
            >
              <CaretRight size={20} weight="bold" />
            </button>
          </div>
        </RevealOnView>
      </div>

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto pb-6 px-[var(--layout-padding-x)] snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          scrollPadding: 'var(--layout-padding-x)',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
        {SERVICES.map((service) => (
          <motion.div
            key={service.index}
            data-card
            className="snap-start shrink-0 w-[78vw] sm:w-[55vw] md:w-[38vw] lg:w-[28vw] max-w-[400px]"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: duration.reveal, ease: ease.house }}
          >
            <Card service={service} />
          </motion.div>
        ))}
        <div className="shrink-0 w-[var(--layout-padding-x)]" aria-hidden />
      </div>

      <div className="container-layout mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div
          className="h-1 w-full max-w-xs bg-border-subtle rounded-pill overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-label="Progresso carousel servizi"
        >
          <span
            className="block h-full bg-primary transition-all duration-state"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
        <SecondaryLink href="https://wa.me/393892053275" external>
          MANDACI LA TUA AUTO
        </SecondaryLink>
      </div>
    </section>
  );
}
