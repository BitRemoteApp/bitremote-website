'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  // Default to true (no Lenis) — matches server render, avoids hydration mismatch
  const [skipLenis, setSkipLenis] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setSkipLenis(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSkipLenis(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (skipLenis) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
