'use client';

import { motion, useReducedMotion } from 'motion/react';

import { FadeInSection, staggerContainerVariants, staggerItemVariants } from '@/components/ui/FadeInSection';
import { IPhoneFrame } from '@/components/IPhoneFrame';
import { AppScreenshot } from '@/components/AppScreenshot';

const SCREENSHOTS = [
  { slug: 'iphone-home', alt: 'BitRemote app home screen showing active downloads', width: 390, height: 844 },
] as const;

export function AppShowcaseClient() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <FadeInSection as="section" className="py-12 lg:py-16">
      <h2 className="m-0 mb-8 text-center font-sans text-xl font-semibold">
        See it in action
      </h2>
      <motion.div
        className="flex flex-wrap justify-center gap-6"
        variants={staggerContainerVariants}
        initial={shouldReduceMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
      >
        {SCREENSHOTS.map((shot) => (
          <motion.div key={shot.slug} variants={staggerItemVariants}>
            <IPhoneFrame>
              <AppScreenshot
                slug={shot.slug}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
              />
            </IPhoneFrame>
          </motion.div>
        ))}
      </motion.div>
    </FadeInSection>
  );
}
