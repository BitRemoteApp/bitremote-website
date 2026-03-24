'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { Easing } from 'motion/react';
import type { ReactNode } from 'react';

const easeOutQuart: Easing = [0.25, 0.46, 0.45, 0.94];

export const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutQuart },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutQuart },
  },
};

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'section' | 'div' | 'article';
  id?: string;
};

export function FadeInSection({ children, className, delay = 0, as = 'section', id }: Props) {
  const shouldReduceMotion = useReducedMotion();

  const MotionEl = motion[as];

  return (
    <MotionEl
      id={id}
      className={className}
      variants={sectionVariants}
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      transition={{ delay: shouldReduceMotion ? 0 : delay }}
    >
      {children}
    </MotionEl>
  );
}
