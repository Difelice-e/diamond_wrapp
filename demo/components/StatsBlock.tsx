'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate, useReducedMotion } from 'framer-motion';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { ease, duration } from '@/lib/motion';

// Stats — three huge gold numbers + founder narrative right column.
// Aventis pattern adapted: no card chrome, no backgrounds, the size
// contrast carries the section. Numbers count up from 0 → target on
// viewport entry (single 1200ms tween). Reduced motion: shows targets
// directly.

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 950, suffix: '+', label: 'Clienti soddisfatti' },
  { value: 2547, suffix: '+', label: 'Wrapping completati' },
  { value: 14, suffix: '', label: 'Anni in bottega' },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(to);
      return;
    }
    const controls = animate(0, to, {
      duration: duration.load,
      ease: ease.house,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduced]);

  return (
    <span ref={ref}>
      {new Intl.NumberFormat('it-IT').format(display)}
      <span className="text-text-display-shadow">{suffix}</span>
    </span>
  );
}

export function StatsBlock() {
  return (
    <section id="bottega-stats" className="section bg-bg-base relative overflow-hidden">
      {/* Warm gold radial wash — atmospheric */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(201,168,94,0.08) 0%, rgba(201,168,94,0) 70%)',
        }}
      />

      <div className="container-layout relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-7">
          <SectionEyebrow index="03" accent>
            La bottega in numeri
          </SectionEyebrow>

          <ul className="mt-8 space-y-10 lg:space-y-14">
            {STATS.map((stat, i) => (
              <motion.li
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: duration.reveal, ease: ease.house, delay: i * 0.08 }}
                className="flex items-end gap-6 border-b border-border-subtle pb-6"
              >
                <div className="font-display font-black uppercase text-text-display leading-none tracking-display-xl text-[clamp(4rem,12vw,11rem)]">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="caption-mono text-text-muted pb-3 max-w-[14ch]">
                  {stat.label}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          className="lg:col-span-5 lg:pt-32 flex flex-col justify-end"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: duration.reveal, ease: ease.house, delay: 0.2 }}
        >
          <div className="border-l-2 border-primary pl-6 max-w-prose">
            <p className="body-lg text-text-default">
              Diamond Wrapp è la bottega di Orban Andreea a Città Sant&apos;Angelo.
              Tagli col Knifeless, pellicole BodyFence, garanzia 24 mesi.
            </p>
            <p className="body-lg text-text-display mt-5 font-medium">
              <span className="text-primary">Una macchina alla volta</span> —
              perché qui ci passa una macchina alla volta.
            </p>
          </div>
          <p className="caption-mono text-text-muted mt-8">
            ORBAN ANDREEA <span className="text-text-subtle">·</span> OWNER
          </p>
        </motion.div>
      </div>
    </section>
  );
}
