'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { StickerCTA } from '@/components/ui/StickerCTA';
import { SecondaryLink } from '@/components/ui/SecondaryLink';
import { ease, duration } from '@/lib/motion';

import { asset } from '@/lib/asset';
// Hero — full-bleed AUTO-CAROUSEL (4 photos, 5.5s cadence with 1.2s
// crossfade + subtle Ken Burns) + left-aligned bottom-half poster stack.
// Per Aventis hero pattern (the user's reference).
//
// Orchestrated 3-beat reveal on mount: bg fade-in 600ms, eyebrow+H1 stack
// 80ms staggered with 4px lift, body+CTA enter at 1000ms. Parallax bg
// 0.4y (capped 12% vh per §2.0.f). Scroll-linked dark overlay fade
// 0% → 60% as hero exits viewport.

const HERO_PHOTOS = [
  { src: asset('/photos/reference_4.jpg'), position: '68% center' },        // matte GTR detail (anchor)
  { src: asset('/photos/reference_6.jpg'), position: 'center 60%' },        // white GTR Nismo at workshop door
  { src: asset('/photos/cw_bmw_x4_26.jpg'), position: 'center 55%' },       // matte BMW X4 with brand watermark
  { src: asset('/photos/cw_lotus_exige_009.jpg'), position: 'center 55%' }, // Lotus Exige
] as const;

const PHOTO_INTERVAL_MS = 5500;

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.reveal,
      ease: ease.house,
      delay: 0.4 + i * 0.08,
    },
  }),
};

const ctaCluster = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.reveal,
      ease: ease.house,
      delay: 1.0,
    },
  },
};

export function HeroPosterStack() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  // Auto-cycle through carousel photos. Skip if user prefers reduced motion —
  // they get the first photo only (no cycling).
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_PHOTOS.length);
    }, PHOTO_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduced]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax: photo translates up to -12% of viewport height as we scroll past.
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-12%']);
  // Scroll-linked overlay fade: 0% opacity at top, 60% as hero exits.
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 0.6]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-bg-deep"
      aria-label="Diamond Wrapp — wrapping auto a Città Sant'Angelo"
    >
      {/* Carousel layer — framer-motion handles only the scroll parallax on
          the wrapper. Photo crossfade is pure CSS (opacity transition on a
          className toggle), which avoids the framer-motion mount/animate
          interaction bug that caused the bg-flash during photo changes
          (human-review fix v3). All photos render simultaneously stacked;
          only the active one is opaque. */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: photoY }}
      >
        {HERO_PHOTOS.map((photo, i) => {
          const active = i === index;
          return (
            <div
              key={photo.src}
              className="absolute inset-0 transition-opacity ease-out"
              style={{
                opacity: active ? 1 : 0,
                transitionDuration: '1200ms',
                // Ken Burns: active photo holds a slow scale-up; inactive
                // photos snap back to 1.0 so they're ready for the next cycle.
                transform: active && !reduced ? 'scale(1.06)' : 'scale(1.0)',
                transitionProperty: 'opacity, transform',
              }}
            >
              <Image
                src={photo.src}
                alt=""
                role="presentation"
                fill
                priority={i === 0}
                sizes="100vw"
                style={{ objectFit: 'cover', objectPosition: photo.position }}
              />
            </div>
          );
        })}
      </motion.div>

      {/* Static atmospheric gradient — warm-tone lift top-right + warm-dark
          scrim bottom-left (where the headline sits, per guide.md §5.2). */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(201,168,94,0.06) 0%, rgba(0,0,0,0) 30%, rgba(15,11,8,0) 60%, rgba(15,11,8,0.55) 100%), linear-gradient(to top, rgba(15,11,8,0.7) 0%, rgba(15,11,8,0) 50%)',
        }}
      />

      {/* Scroll-linked dark overlay (fades in as hero exits) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none bg-bg-deep"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content stack — bottom-half-left, Aventis pattern */}
      <div className="container-layout relative flex min-h-[100svh] flex-col justify-end pb-28 pt-32 md:pt-40">
        <div className="max-w-3xl">
          <motion.p
            className="eyebrow flex flex-wrap items-center gap-3"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <span className="inline-block w-8 h-px bg-primary align-middle" />
            <span>CITTÀ SANT'ANGELO</span>
            <span className="text-text-subtle">·</span>
            <span>ABRUZZO</span>
            <span className="text-text-subtle">·</span>
            <span>DAL 2010</span>
          </motion.p>

          <h1 className="h-display-xl mt-6">
            <motion.span className="block" custom={1} initial="hidden" animate="visible" variants={fadeUp}>
              WRAPPIAMO
            </motion.span>
            <motion.span className="block" custom={2} initial="hidden" animate="visible" variants={fadeUp}>
              SUPERCAR
            </motion.span>
            <motion.span className="block" custom={3} initial="hidden" animate="visible" variants={fadeUp}>
              IN BOTTEGA.
            </motion.span>
          </h1>

          <motion.p
            className="body-lg mt-8 max-w-xl text-text-default"
            initial="hidden"
            animate="visible"
            variants={ctaCluster}
          >
            Wrap completi e parziali, pellicole protettive PPF, oscuramento vetri,
            rivestimenti interni, rinnovo fari.<br />
            Pellicole BodyFence, tagli col Knifeless. Garanzia 24 mesi, completamente reversibile.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
            initial="hidden"
            animate="visible"
            variants={ctaCluster}
          >
            <StickerCTA
              href="https://wa.me/393892053275?text=Ciao%20Diamond%20Wrapp%2C%20vorrei%20un%20preventivo"
              external
              size="lg"
            >
              SCRIVICI SU WHATSAPP
            </StickerCTA>

            <SecondaryLink href="#lavori">GUARDA I LAVORI</SecondaryLink>
          </motion.div>
        </div>

        {/* Carousel progress dots — bottom-center, paired with the scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Foto in evidenza">
            {HERO_PHOTOS.map((p, i) => (
              <button
                key={p.src}
                onClick={() => setIndex(i)}
                aria-label={`Mostra foto ${i + 1} di ${HERO_PHOTOS.length}`}
                aria-selected={i === index}
                role="tab"
                className="group relative h-1.5 w-8 overflow-hidden rounded-pill bg-text-subtle/40 transition-colors duration-state hover:bg-text-muted/60"
              >
                <span
                  className="absolute inset-y-0 left-0 bg-text-display transition-all duration-state"
                  style={{
                    width: i === index ? '100%' : '0%',
                    backgroundColor: i === index ? 'var(--color-action-primary)' : undefined,
                  }}
                />
              </button>
            ))}
          </div>

          <motion.div
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.reveal, delay: 1.4, ease: ease.house }}
          >
            <span className="caption-mono text-text-muted">SCROLL</span>
            <motion.span
              aria-hidden
              className="block w-px h-10 bg-text-muted origin-top"
              animate={reduced ? undefined : { scaleY: [1, 0.4, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: ease.house }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
