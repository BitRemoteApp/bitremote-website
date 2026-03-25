'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';

/** Height of the sticky nav — must match the rendered nav element */
const NAV_SELECTOR = 'nav[aria-label="Site"]';

/**
 * Intercepts anchor-link clicks and scrolls via Lenis with a nav-height offset
 * so the target section isn't hidden behind the sticky nav.
 */
function AnchorScrollHandler() {
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!anchor) return;

      const url = new URL(anchor.href);
      // Only handle same-page hash links
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const hash = url.hash.slice(1);
      const target = document.getElementById(hash);
      if (!target) return;

      e.preventDefault();
      const nav = document.querySelector(NAV_SELECTOR);
      const navHeight = (nav instanceof HTMLElement ? nav.offsetHeight : 84) + 16;

      // Compensate for FadeInSection's translateY when the section hasn't animated in yet.
      // getBoundingClientRect() includes transforms, so a hidden section at translateY(24px)
      // would cause Lenis to overshoot by 24px once the entrance animation plays.
      const transform = new DOMMatrix(getComputedStyle(target).transform);
      const translateY = transform.m42;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: -navHeight - translateY });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - translateY;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}

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
        anchors: false,
      }}
    >
      <AnchorScrollHandler />
      {children}
    </ReactLenis>
  );
}
