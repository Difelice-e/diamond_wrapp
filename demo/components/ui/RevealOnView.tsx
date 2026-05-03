'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ease, duration, stagger, viewportOnce } from '@/lib/motion';

// Reveal-on-view wrapper. Fades + 8px upward translate at 40% intersection.
// Wrap children directly OR pass `as="section"` to render a different tag.
// For staggered children, use `stagger=true` + wrap each child in
// <RevealOnView.Item />.

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof typeof motion;
};

export function RevealOnView({ children, delay = 0, className = '', as = 'div' }: RevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as] as typeof motion.div;

  if (reduced) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{
        duration: duration.reveal,
        ease: ease.house,
        delay,
      }}
    >
      {children}
    </Component>
  );
}

// Staggered group — parent wraps a list of <RevealStaggered.Item />.

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: ease.house },
  },
};

export function RevealStaggered({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

RevealStaggered.Item = function Item({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
};
