'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { ease, duration } from '@/lib/motion';
import { CarIllustration } from '@/components/CarIllustration';

// Simulatore — interactive wrap configurator. The car is an imported
// 3/4-view illustration whose body sheet metal is driven by two CSS
// vars (--bp primary, --bs shade) defined on the SVG root. Finish
// changes the relationship between primary and shade (gloss = strong
// contrast; matte = flat) and can override the fill entirely (cromo
// = chrome gradient; carbon = weave pattern).

type Finish = 'lucido' | 'satinato' | 'opaco' | 'cromo' | 'carbon';

type Color = {
  id: string;
  label: string;
  display: string;
  fill: string;
  isPattern?: boolean;
};

const FINISHES: { id: Finish; label: string }[] = [
  { id: 'lucido', label: 'LUCIDO' },
  { id: 'satinato', label: 'SATINATO' },
  { id: 'opaco', label: 'OPACO' },
  { id: 'cromo', label: 'CROMO' },
  { id: 'carbon', label: 'CARBON' },
];

const COLORS: Color[] = [
  { id: 'rosa', label: 'Rosa Diamond', display: 'ROSA', fill: '#E63B7C' },
  { id: 'martini', label: 'Rosso Martini', display: 'MARTINI', fill: '#C42333' },
  { id: 'perla', label: 'Bianco Perla', display: 'PERLA', fill: '#E8E2D4' },
  { id: 'gunmetal', label: 'Gunmetal', display: 'GUNMETAL', fill: '#5A5E62' },
  { id: 'nero', label: 'Nero Profondo', display: 'NERO', fill: '#1A1814' },
  { id: 'verde', label: 'Verde Acido', display: 'ACIDO', fill: '#9BC53D' },
  { id: 'oro', label: 'Oro Champagne', display: 'CHAMPAGNE', fill: '#B8956A' },
  { id: 'mimetico', label: 'Mimetico', display: 'MIMETICO', fill: 'url(#camoPattern)', isPattern: true },
];

// Per-finish darkening of the shade tone relative to primary.
// Gloss = strong contrast; satin = mild; matte = barely there.
const SHADE_DARKEN: Record<Finish, number> = {
  lucido: 0.30,
  satinato: 0.16,
  opaco: 0.05,
  cromo: 0,
  carbon: 0,
};

function darken(hex: string, amount: number): string {
  const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
  if (!m) return hex;
  const [r, g, b] = [m[1], m[2], m[3]].map((x) => parseInt(x, 16));
  const adj = (c: number) =>
    Math.max(0, Math.round(c * (1 - amount))).toString(16).padStart(2, '0');
  return `#${adj(r)}${adj(g)}${adj(b)}`;
}

function resolveBodyFills(color: Color, finish: Finish): { bp: string; bs: string } {
  if (finish === 'cromo') return { bp: 'url(#chromeGrad)', bs: 'url(#chromeShadeGrad)' };
  if (finish === 'carbon') return { bp: 'url(#carbonPattern)', bs: 'url(#carbonShadePattern)' };
  if (color.isPattern) return { bp: 'url(#camoPattern)', bs: 'url(#camoShadePattern)' };
  return { bp: color.fill, bs: darken(color.fill, SHADE_DARKEN[finish]) };
}

export function WrapSimulator() {
  const [finish, setFinish] = useState<Finish>('lucido');
  const [colorId, setColorId] = useState<string>('rosa');

  const color = COLORS.find((c) => c.id === colorId)!;
  const finishLabel = FINISHES.find((f) => f.id === finish)!.label;
  const { bp, bs } = resolveBodyFills(color, finish);

  return (
    <section id="simulatore" className="section bg-bg-base relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 30%, rgba(230,59,124,0.07) 0%, rgba(230,59,124,0) 70%)',
        }}
      />

      <div className="container-layout relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: duration.reveal, ease: ease.house }}
        >
          <SectionEyebrow index="04" accent>
            Configura
          </SectionEyebrow>
          <h2 className="mt-8 font-display font-black uppercase text-text-display leading-display tracking-display-xl text-[clamp(3rem,8vw,7rem)]">
            Scegli il tuo
            <br />
            veleno.
          </h2>
        </motion.div>

        <motion.div
          className="lg:col-span-5 lg:pt-24"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: duration.reveal, ease: ease.house, delay: 0.1 }}
        >
          <p className="body-lg text-text-muted max-w-prose">
            Oltre 200 pellicole in magazzino. Otto qui in vetrina —
            ogni finitura su ogni colore, controllata col tuo pannello sotto luce
            naturale prima di tagliare un solo centimetro.
          </p>
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: duration.reveal, ease: ease.house, delay: 0.15 }}
        >
          <div className="relative bg-bg-raised rounded-md overflow-hidden border border-border-subtle">
            <div className="absolute top-5 left-5 z-10 px-3 py-1.5 bg-bg-deep border border-border-subtle">
              <span className="caption-mono text-text-muted">DW · {finishLabel}</span>
            </div>
            <CarIllustration bodyPrimary={bp} bodyShade={bs} />
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-5 flex flex-col gap-7"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: duration.reveal, ease: ease.house, delay: 0.25 }}
        >
          <div>
            <p className="caption-mono text-text-muted">DW · {color.id.toUpperCase()}</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={color.display}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: duration.micro, ease: ease.house }}
                className="mt-2 font-display font-black uppercase text-text-display leading-display-h2 text-[clamp(2rem,4vw,3.5rem)]"
              >
                {color.display}
              </motion.p>
            </AnimatePresence>
          </div>

          <div>
            <p className="eyebrow text-text-muted mb-3">FINITURA</p>
            <div className="grid grid-cols-5 gap-2">
              {FINISHES.map((f) => {
                const active = finish === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFinish(f.id)}
                    className={`caption-mono py-3 border text-center transition-colors ${
                      active
                        ? 'bg-text-default text-text-inverse border-text-default'
                        : 'bg-bg-raised text-text-muted border-border-subtle hover:border-border-emphasis hover:text-text-default'
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="eyebrow text-text-muted mb-3">COLORE</p>
            <div className="grid grid-cols-8 gap-2">
              {COLORS.map((c) => {
                const active = colorId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setColorId(c.id)}
                    aria-label={c.label}
                    title={c.label}
                    className={`relative aspect-square overflow-hidden border-2 transition-all ${
                      active
                        ? 'border-primary scale-[1.06]'
                        : 'border-transparent hover:border-border-emphasis'
                    }`}
                    style={!c.isPattern ? { background: c.fill } : undefined}
                  >
                    {c.isPattern && (
                      <svg viewBox="0 0 32 32" className="w-full h-full block">
                        <defs>
                          <pattern id={`swatch-${c.id}`} patternUnits="userSpaceOnUse" width="16" height="12">
                            <rect width="16" height="12" fill="#3A4A2A" />
                            <path d="M 1,3 q 3,-2 6,1 q 2,3 -2,4 q -4,1 -4,-5 z" fill="#5A6038" />
                            <path d="M 9,1 q 4,1 3,5 q -2,3 -5,1 q -2,-3 2,-6 z" fill="#243018" />
                            <path d="M 11,7 q 3,0 4,3 q -1,3 -4,2 q -2,-1 0,-5 z" fill="#4A3A22" />
                          </pattern>
                        </defs>
                        <rect width="32" height="32" fill={`url(#swatch-${c.id})`} />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="caption-mono text-text-subtle">
            200+ pellicole in magazzino.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
