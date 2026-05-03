'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { ease, duration } from '@/lib/motion';

import { asset } from '@/lib/asset';
// Lavori Firmati — DEMO'S SIGNATURE MOMENT.
//
// Sticky-scroll layout: each case study is a CSS grid where the photo column
// is `position: sticky` and the text column is a vertical stack of three
// reveal blocks each ~70vh tall. The grid's intrinsic height is driven by
// the text column (~250vh), so the photo stays pinned for the whole case
// study, then unsticks cleanly as the next case enters viewport — no dead
// "image alone" gap (the bug from the v1 layout, where outer min-h-[260vh]
// outran the actual text content).

type RevealBlock = {
  label: string;
  body: string;
};

type Case = {
  index: string;
  title: string;
  subtitle: string;
  accentTitle?: string;     // UnifrakturMaguntia accent — reserved for this section ONLY
  primary: { src: string; alt: string; position?: string };
  alt?: { src: string; position?: string };
  blocks: [RevealBlock, RevealBlock, RevealBlock];
};

const CASES: Case[] = [
  {
    index: '01',
    title: 'Lancia Delta HF Integrale',
    subtitle: 'Livrea Martini Racing — restauro completo',
    accentTitle: 'Lavori Firmati',
    primary: { src: asset('/photos/cw_lancia_delta_integrale_25.jpg'), alt: '', position: 'center 55%' },
    blocks: [
      {
        label: 'IL BRIEF',
        body:
          'Riportare la Delta HF Integrale alla livrea Martini Racing originale del 1986. Pellicola laminata, no vernice — il restauro deve essere reversibile.',
      },
      {
        label: 'LA LAVORAZIONE',
        body:
          'Sei mesi in bottega. 14 tagli manuali sul cofano col Knifeless tape, ogni stripe posata a tre mani. Mascheratura su cornici, fari, e maniglie originali.',
      },
      {
        label: 'IL RISULTATO',
        body:
          'Una replica fedele al millimetro, sotto cui la vernice del 1986 resta intatta. Garanzia 24 mesi sulla pellicola, reversibilità completa quando il proprietario vorrà.',
      },
    ],
  },
  {
    index: '02',
    title: 'Nissan GT-R',
    subtitle: 'Cambio cromatico matte gunmetal',
    primary: { src: asset('/photos/cw_nissan_gtr_013.jpg'), alt: '', position: 'center 50%' },
    alt: { src: asset('/photos/cw_nissan_gtr_014.jpg'), position: 'center 60%' },
    blocks: [
      {
        label: 'IL BRIEF',
        body:
          'Dal grigio Nardo originale al matte gunmetal con pinze acid-green. Total wrap esterno + protezione PPF sui frontali.',
      },
      {
        label: 'LA LAVORAZIONE',
        body:
          'Tre giorni in bottega. Pellicola opaca posata in pezzi unici per cofano, tetto, e parafanghi. BodyFence sui paraurti anteriori e sul cofano per il prossimo decennio di sassolini.',
      },
      {
        label: 'IL RISULTATO',
        body:
          'Una GT-R che cambia carattere senza una pennellata di vernice. Reversibile al 100%, garantita 24 mesi.',
      },
    ],
  },
  {
    index: '03',
    title: 'Range Rover Evoque',
    subtitle: 'Total wrap matte black, vernice originale al sicuro',
    primary: { src: asset('/photos/cw_range_rover_evoque_017.jpg'), alt: '', position: 'center 55%' },
    alt: { src: asset('/photos/cw_range_rover_evoque_018.jpg'), position: 'center 50%' },
    blocks: [
      {
        label: 'IL BRIEF',
        body:
          'Cambio cromatico al matte black completo. Pellicola opaca su tutta la carrozzeria, dettagli neri lucidi a contrasto su griglia, paraurti e cornici.',
      },
      {
        label: 'LA LAVORAZIONE',
        body:
          'Tre giorni in bottega. Pellicola posata in pezzi unici per cofano, tetto e portiere. Cura millimetrica sui passaruota e sulle modanature — la pellicola lavora in continuo, niente sollevamenti ai bordi.',
      },
      {
        label: 'IL RISULTATO',
        body:
          'Una Evoque trasformata in tactical matte, con la vernice originale intatta sotto. Reversibile al 100%, garantita 24 mesi.',
      },
    ],
  },
];

function CaseStudy({ caseData, idx }: { caseData: Case; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Scroll-linked image cross-fade across the whole case study's scroll range.
  // Primary photo holds for the first ~60% of scroll, then crossfades to the
  // alt photo in the final ~30%.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const primaryOpacity = useTransform(scrollYProgress, [0, 0.55, 0.8], [1, 1, 0]);
  const altOpacity = useTransform(scrollYProgress, [0, 0.55, 0.8], [0, 0, 1]);

  return (
    <div ref={ref} className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
      {/* Sticky photo column — wider (col-span-7) per human review. The
          inner sticky wrapper holds at top of viewport (below nav) for the
          duration of the right column's scroll. */}
      <div className="lg:col-span-7">
        <div className="lg:sticky lg:top-[calc(var(--nav-h,72px)+1.5rem)]">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[calc(100svh-var(--nav-h,72px)-3rem)] overflow-hidden rounded-md bg-bg-raised shadow-deep">
            <motion.div
              className="absolute inset-0"
              style={{ opacity: caseData.alt && !reduced ? primaryOpacity : 1 }}
            >
              <Image
                src={caseData.primary.src}
                alt={caseData.primary.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority={idx === 0}
                style={{ objectFit: 'cover', objectPosition: caseData.primary.position }}
              />
            </motion.div>

            {caseData.alt && (
              <motion.div className="absolute inset-0" style={{ opacity: altOpacity }}>
                <Image
                  src={caseData.alt.src}
                  alt=""
                  role="presentation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  style={{ objectFit: 'cover', objectPosition: caseData.alt.position }}
                />
              </motion.div>
            )}

            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(15,11,8,0.9) 0%, rgba(15,11,8,0) 100%)',
              }}
            />
            <div className="absolute left-5 bottom-5 flex items-baseline gap-3">
              <span className="font-display font-black text-text-display text-display-s leading-none tracking-display-s">
                {caseData.index}
              </span>
              <span className="caption-mono text-primary">/ LAVORI FIRMATI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Text column — drives container height. Header + 3 blocks of ~70vh
          each give a natural ~250vh scroll length, so the photo pin holds
          for the whole study and unpins precisely at the next case. */}
      <div className="lg:col-span-5 flex flex-col">
        <header className="lg:min-h-[25vh] flex flex-col justify-end pb-6 lg:pb-8">
          {caseData.accentTitle && (
            <p
              className="font-accent text-text-display text-heading mb-3"
              aria-hidden
            >
              {caseData.accentTitle}
            </p>
          )}
          <h3 className="h-display-s">{caseData.title}</h3>
          <p className="body-lg text-text-muted mt-3">{caseData.subtitle}</p>
        </header>

        {caseData.blocks.map((block, i) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: duration.reveal, ease: ease.house }}
            className="lg:min-h-[40vh] flex flex-col justify-center py-8 lg:py-6 border-l-2 border-border-emphasis pl-6 hover:border-primary transition-colors duration-state"
          >
            <p className="caption-mono text-primary mb-3">
              {String(i + 1).padStart(2, '0')} <span className="text-text-subtle">/</span> {block.label}
            </p>
            <p className="body-lg text-text-default">{block.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function LavoriFirmatiSticky() {
  return (
    <section id="lavori" className="section bg-bg-base relative">
      <div className="container-layout">
        <div className="max-w-3xl mb-16 lg:mb-24">
          <SectionEyebrow index="04" accent>
            Lavori Firmati
          </SectionEyebrow>
          <h2 className="h-display mt-4">
            BUILD CHE NON SI<br />VEDONO IN GIRO.
          </h2>
          <p className="body-lg text-text-muted mt-6 max-w-prose">
            Una galleria di lavorazioni complete passate sul ponte. Per ognuna:
            il brief, la lavorazione, il risultato — uno per volta, senza fretta.
          </p>
        </div>

        <div className="flex flex-col gap-24 lg:gap-40">
          {CASES.map((caseData, idx) => (
            <CaseStudy key={caseData.index} caseData={caseData} idx={idx} />
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <a
            href="https://wa.me/393892053275?text=Ciao%20Diamond%20Wrapp%2C%20vorrei%20fare%20un%20lavoro%20firmato"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-5 rounded-sm bg-primary hover:bg-primary-hover text-primary-on font-display font-bold uppercase tracking-display-s text-subheading transition-colors duration-state"
            style={{ boxShadow: 'inset 0 0 0 2px var(--color-text-display)' }}
          >
            VOGLIO LA MIA SU QUESTA LISTA →
          </a>
        </div>
      </div>
    </section>
  );
}
