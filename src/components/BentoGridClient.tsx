'use client';

import { motion, useReducedMotion } from 'motion/react';

import { BentoCard } from '@/components/BentoCard';
import { staggerContainerVariants, staggerItemVariants } from '@/components/ui/FadeInSection';

type BenefitItem = {
  id: string;
  title: string;
  subtitle: string;
};

type Props = {
  items: BenefitItem[];
};

export function BentoGridClient({ items }: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
      variants={staggerContainerVariants}
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={staggerItemVariants}>
          <BentoCard title={item.title} body={item.subtitle} />
        </motion.div>
      ))}
    </motion.div>
  );
}
