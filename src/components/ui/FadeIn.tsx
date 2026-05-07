'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Disables the inView trigger and plays on mount instead (use for hero). */
  immediate?: boolean;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function FadeIn({ children, delay = 0, className, immediate = false }: FadeInProps) {
  const transition = { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      {...(immediate
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once: true, amount: 0.2 } })}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
