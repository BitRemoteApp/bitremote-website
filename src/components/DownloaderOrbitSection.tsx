'use client';

import { useEffect, useState } from 'react';

import type { CSSProperties } from 'react';

import { SectionLabel } from '@/components/SectionLabel';
import { FadeInSection } from '@/components/ui/FadeInSection';

type DownloaderLink = {
  downloader: string;
  href: string;
};

type DownloaderTint = {
  primary: string;
  secondary: string;
};

type Props = {
  title: string;
  description: string;
  items: Record<string, string>;
  downloaderLinks: DownloaderLink[];
  downloaderTints: Record<string, DownloaderTint>;
};

const ORBIT_POSITIONS = [
  'md:col-start-1 md:row-start-1 md:justify-self-end md:translate-x-4 md:-translate-y-3 md:rotate-[-3deg] lg:translate-x-10 lg:-translate-y-4',
  'md:col-start-3 md:row-start-1 md:justify-self-start md:translate-x-3 md:translate-y-6 md:rotate-[4deg] lg:translate-x-8 lg:translate-y-10',
  'md:col-start-1 md:row-start-2 md:justify-self-start md:-translate-x-3 md:translate-y-6 md:rotate-[2deg] lg:-translate-x-6 lg:translate-y-9',
  'md:col-start-3 md:row-start-2 md:justify-self-end md:translate-x-5 md:translate-y-[8rem] md:rotate-[-4deg] lg:translate-x-11 lg:translate-y-[12.5rem]',
  'md:col-start-2 md:row-start-3 md:justify-self-end md:-translate-x-[3.5rem] md:translate-y-[0.75rem] md:rotate-[3deg] lg:-translate-x-[6.25rem] lg:translate-y-[1.375rem]',
] as const;

const ORBIT_MOTION = [
  { duration: '8.8s', delay: '-1.6s', driftY: '0.55rem', driftX: '0.16rem' },
  { duration: '9.7s', delay: '-4.2s', driftY: '0.7rem', driftX: '0.22rem' },
  { duration: '8.1s', delay: '-2.8s', driftY: '0.48rem', driftX: '0.18rem' },
  { duration: '10.4s', delay: '-5.1s', driftY: '0.78rem', driftX: '0.2rem' },
  { duration: '9.1s', delay: '-3.4s', driftY: '0.58rem', driftX: '0.24rem' },
] as const;

function orbitTitleClassName(downloader: string) {
  return downloader.length > 20
    ? 'block text-[0.95rem] font-semibold leading-6 tracking-[-0.01em] text-text-primary sm:text-base lg:whitespace-nowrap lg:text-[1rem]'
    : 'block text-base font-semibold leading-6 text-text-primary sm:text-lg lg:whitespace-nowrap';
}

export function DownloaderOrbitSection({
  title,
  description,
  items,
  downloaderLinks,
  downloaderTints,
}: Props) {
  const [isGridMode, setIsGridMode] = useState(false);

  useEffect(() => {
    const updateMode = () => {
      const nav = document.querySelector('nav[aria-label="Site"]');
      const navHeight = nav instanceof HTMLElement ? nav.offsetHeight : 84;
      const availableHeight = Math.round((window.innerHeight - navHeight) * 0.9);
      setIsGridMode(window.innerWidth <= 768 || availableHeight < 700);
    };

    updateMode();
    window.addEventListener('resize', updateMode);

    return () => {
      window.removeEventListener('resize', updateMode);
    };
  }, []);

  return (
    <FadeInSection as="section" id="downloader" className="md:px-8 lg:px-8">
      <div className="relative isolate">
        {!isGridMode ? (
          <div aria-hidden="true" className="downloaders-mesh pointer-events-none absolute inset-0 -z-10" />
        ) : null}
        {isGridMode ? (
          <div className="grid grid-cols-2 items-stretch gap-3 lg:grid-cols-3">
            <div className="flex min-h-28 h-full flex-col justify-center rounded-[1.75rem] border border-[var(--color-border-soft)] bg-surface px-5 py-4 shadow-[0_16px_36px_rgba(15,23,42,0.05)] sm:min-h-32 sm:px-6 sm:py-5">
              <h2 className="m-0 max-w-none text-[clamp(1.25rem,2vw,1.625rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-text-primary lg:whitespace-nowrap">
                {title}
              </h2>
              <p className="mb-0 mt-3 max-w-xl text-sm leading-6 text-text-secondary sm:text-base sm:leading-7">
                {description}
              </p>
            </div>

            {downloaderLinks.map(({ downloader, href }, index) => (
              <div key={downloader} className="h-full">
                <div
                  className="downloader-orbit-float h-full"
                  style={
                    {
                      '--orbit-duration': ORBIT_MOTION[index]?.duration,
                      '--orbit-delay': ORBIT_MOTION[index]?.delay,
                      '--orbit-drift-y': ORBIT_MOTION[index]?.driftY,
                      '--orbit-drift-x': ORBIT_MOTION[index]?.driftX,
                    } as CSSProperties
                  }
                >
                  <a
                  className="group relative flex min-h-28 h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-surface px-5 py-5 no-underline transition-[border-color,background-color,transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:bg-surface-alt"
                    href={href}
                    style={
                      {
                        '--downloader-primary': downloaderTints[downloader].primary,
                        '--downloader-secondary': downloaderTints[downloader].secondary,
                        borderColor:
                          'color-mix(in srgb, var(--color-border) 78%, var(--downloader-primary) 22%)',
                        boxShadow: '0 14px 36px color-mix(in srgb, var(--downloader-primary) 8%, transparent)',
                      } as CSSProperties
                    }
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        background:
                          'radial-gradient(circle at top right, color-mix(in srgb, var(--downloader-primary) 10%, transparent) 0%, transparent 42%), radial-gradient(circle at bottom left, color-mix(in srgb, var(--downloader-secondary) 8%, transparent) 0%, transparent 48%)',
                      }}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 scale-[0.98] opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100"
                      style={{
                        background:
                          'linear-gradient(145deg, color-mix(in srgb, var(--downloader-primary) 16%, transparent) 0%, transparent 36%), radial-gradient(circle at top right, color-mix(in srgb, var(--downloader-primary) 20%, transparent) 0%, transparent 42%), radial-gradient(circle at bottom left, color-mix(in srgb, var(--downloader-secondary) 18%, transparent) 0%, transparent 54%)',
                      }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute right-5 top-5 text-sm transition-[color,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
                      style={{
                        color: 'color-mix(in srgb, var(--downloader-primary) 78%, var(--color-text-secondary))',
                      }}
                    >
                      →
                    </span>
                    <div className="relative mt-1">
                      <span className="block text-base font-semibold leading-6 text-text-primary sm:text-lg">
                        {downloader}
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-text-secondary">
                        {items[downloader]}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:min-h-[28rem] md:grid-cols-3 md:grid-rows-3 md:items-center md:justify-items-center md:gap-x-4 md:gap-y-4 lg:min-h-[34rem] lg:gap-x-6 lg:gap-y-5">
            <div className="flex min-h-28 flex-col justify-center rounded-[1.75rem] border border-[var(--color-border-soft)] bg-surface px-5 py-4 shadow-[0_16px_36px_rgba(15,23,42,0.05)] sm:min-h-32 sm:px-6 sm:py-5 md:col-start-2 md:row-start-2 md:min-h-[11.5rem] md:w-full md:max-w-[18.5rem] md:rounded-[1.85rem] md:px-6 md:py-6 lg:min-h-[14rem] lg:max-w-[23rem] lg:rounded-[2rem] lg:px-8 lg:py-8">
              <h2 className="m-0 max-w-none text-[clamp(1.25rem,2vw,1.625rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-text-primary lg:whitespace-nowrap">
                {title}
              </h2>
              <p className="mb-0 mt-3 max-w-xl text-sm leading-6 text-text-secondary sm:text-base sm:leading-7 md:max-w-[29ch] lg:max-w-sm">
                {description}
              </p>
            </div>

            {downloaderLinks.map(({ downloader, href }, index) => (
              <div key={downloader} className={ORBIT_POSITIONS[index] ?? ''}>
                <div
                  className="downloader-orbit-float"
                  style={
                    {
                      '--orbit-duration': ORBIT_MOTION[index]?.duration,
                      '--orbit-delay': ORBIT_MOTION[index]?.delay,
                      '--orbit-drift-y': ORBIT_MOTION[index]?.driftY,
                      '--orbit-drift-x': ORBIT_MOTION[index]?.driftX,
                    } as CSSProperties
                  }
                >
                  <a
                    className="group relative flex min-h-24 flex-col overflow-hidden rounded-[1.5rem] border border-border/70 bg-surface px-4 py-4 no-underline transition-[border-color,background-color,transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:bg-surface-alt sm:min-h-28 sm:rounded-[1.75rem] sm:p-5 md:min-h-[7.25rem] md:w-full md:max-w-[13rem] md:p-4 lg:min-h-[8.75rem] lg:max-w-[16rem]"
                    href={href}
                    style={
                      {
                        '--downloader-primary': downloaderTints[downloader].primary,
                        '--downloader-secondary': downloaderTints[downloader].secondary,
                        borderColor:
                          'color-mix(in srgb, var(--color-border) 78%, var(--downloader-primary) 22%)',
                        boxShadow: '0 14px 36px color-mix(in srgb, var(--downloader-primary) 8%, transparent)',
                      } as CSSProperties
                    }
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        background:
                          'radial-gradient(circle at top right, color-mix(in srgb, var(--downloader-primary) 10%, transparent) 0%, transparent 42%), radial-gradient(circle at bottom left, color-mix(in srgb, var(--downloader-secondary) 8%, transparent) 0%, transparent 48%)',
                      }}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 scale-[0.98] opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100"
                      style={{
                        background:
                          'linear-gradient(145deg, color-mix(in srgb, var(--downloader-primary) 16%, transparent) 0%, transparent 36%), radial-gradient(circle at top right, color-mix(in srgb, var(--downloader-primary) 20%, transparent) 0%, transparent 42%), radial-gradient(circle at bottom left, color-mix(in srgb, var(--downloader-secondary) 18%, transparent) 0%, transparent 54%)',
                      }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute right-4 top-4 text-sm transition-[color,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 sm:right-5 sm:top-5 md:right-4 md:top-4"
                      style={{
                        color: 'color-mix(in srgb, var(--downloader-primary) 78%, var(--color-text-secondary))',
                      }}
                    >
                      →
                    </span>
                    <div className="relative mt-1 sm:mt-2 md:mt-1">
                      <span className={orbitTitleClassName(downloader)}>
                        {downloader}
                      </span>
                      <span className="mt-1.5 block text-sm leading-5 text-text-secondary sm:mt-2 sm:leading-6 md:mt-1.5 md:text-[0.8125rem] md:leading-5">
                        {items[downloader]}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </FadeInSection>
  );
}
