'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { SectionLabel } from '@/components/SectionLabel';
import { FadeInSection } from '@/components/ui/FadeInSection';

type BenefitItem = {
  id: string;
  title: string;
  subtitle: string;
};

type Props = {
  id?: string;
  title: string;
  items: readonly BenefitItem[];
};

type FeatureMedia = {
  lightSrc: string;
  darkSrc: string;
  alt: string;
};

const FEATURE_MEDIA_BY_ID: Record<string, FeatureMedia> = {
  accessibilitySupport: {
    lightSrc: '/screenshots/light/sidebar-light.png',
    darkSrc: '/screenshots/dark/sidebar.png',
    alt: 'BitRemote sidebar showing accessible navigation and task filters',
  },
  comprehensiveTaskManagement: {
    lightSrc: '/screenshots/light/tasksview.png',
    darkSrc: '/screenshots/dark/tasksview.png',
    alt: 'BitRemote tasks view showing queue controls and task management actions',
  },
  activityMonitor: {
    lightSrc: '/screenshots/light/activity-monitor.png',
    darkSrc: '/screenshots/dark/activity-monitor.png',
    alt: 'BitRemote activity monitor showing live speed, statistics, and transfer activity',
  },
  taskInsightPanel: {
    lightSrc: '/screenshots/light/task-insight-panel.png',
    darkSrc: '/screenshots/dark/task-insight-panel.png',
    alt: 'BitRemote task insight panel showing task details, trackers, peers, and files',
  },
};

export function AppShowcaseClient({ id, title, items }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const mobileStepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileDirection, setMobileDirection] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);
  const [navHeight, setNavHeight] = useState(84);

  const itemsWithMedia = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        media: FEATURE_MEDIA_BY_ID[item.id] ?? FEATURE_MEDIA_BY_ID.comprehensiveTaskManagement,
      })),
    [items],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const sync = () => setIsDesktop(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener('change', sync);

    return () => {
      mediaQuery.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    const updateNavHeight = () => {
      const nav = document.querySelector('nav[aria-label="Site"]');
      setNavHeight(nav instanceof HTMLElement ? nav.offsetHeight : 84);
    };

    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);

    return () => {
      window.removeEventListener('resize', updateNavHeight);
    };
  }, []);

  useEffect(() => {
    if (isDesktop) {
      let frame = 0;

      const update = () => {
        frame = 0;

        const section = sectionRef.current;
        if (!section) {
          return;
        }

        const rect = section.getBoundingClientRect();
        const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
        const progress = Math.min(Math.max(-rect.top / scrollable, 0), 0.9999);
        const nextIndex = Math.min(itemsWithMedia.length - 1, Math.floor(progress * itemsWithMedia.length));

        setActiveIndex(nextIndex);
      };

      const requestUpdate = () => {
        if (frame !== 0) {
          return;
        }

        frame = window.requestAnimationFrame(update);
      };

      update();
      window.addEventListener('scroll', requestUpdate, { passive: true });
      window.addEventListener('resize', requestUpdate);

      return () => {
        if (frame !== 0) {
          window.cancelAnimationFrame(frame);
        }
        window.removeEventListener('scroll', requestUpdate);
        window.removeEventListener('resize', requestUpdate);
      };
    }

    let frame = 0;

    const update = () => {
      frame = 0;

      const candidates = mobileStepRefs.current
        .map((element, index) => ({ element, index }))
        .filter(
          (entry): entry is { element: HTMLDivElement; index: number } =>
            entry.element instanceof HTMLDivElement,
        );

      if (candidates.length === 0) {
        return;
      }

      const viewportCenter = navHeight + (window.innerHeight - navHeight) / 2;
      let nextIndex = activeIndex;
      let bestDistance = Number.POSITIVE_INFINITY;

      candidates.forEach(({ element, index }) => {
        const rect = element.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);

        if (distance < bestDistance) {
          bestDistance = distance;
          nextIndex = index;
        }
      });

      if (nextIndex !== activeIndex) {
        setMobileDirection(nextIndex > activeIndex ? 1 : -1);
        setActiveIndex(nextIndex);
      }
    };

    const requestUpdate = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [activeIndex, isDesktop, itemsWithMedia.length, navHeight]);

  return (
    <FadeInSection as="section" id={id} className="py-2 md:py-4">
      <div
        ref={sectionRef}
        style={isDesktop ? { minHeight: `${itemsWithMedia.length * 90}vh` } : undefined}
      >
      <div className="grid gap-8 md:hidden">
        <div className="flex flex-col gap-6">
          <SectionLabel>{title}</SectionLabel>

          <div className="relative">
            <div
              className="sticky z-[1]"
              style={{ top: `calc(${navHeight}px + 1.5rem)` }}
            >
              <MobileShowcaseStage
                items={itemsWithMedia}
                activeIndex={activeIndex}
                direction={mobileDirection}
                navHeight={navHeight}
              />
            </div>

            <div className="mt-6 grid gap-0" aria-hidden="true">
              {itemsWithMedia.map((item, index) => (
                <div
                  key={item.id}
                  ref={(element) => {
                    mobileStepRefs.current[index] = element;
                  }}
                  className="min-h-[52vh] first:min-h-[42vh] last:min-h-[96vh]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="hidden md:sticky md:flex md:items-center"
        style={{
          top: `calc(${navHeight}px + 1.5rem)`,
          height: `calc(100dvh - ${navHeight}px - 3rem)`,
        }}
      >
        <div className="grid w-full grid-cols-[minmax(0,0.92fr)_minmax(240px,0.78fr)] items-start gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.84fr)] md:gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(320px,0.92fr)] lg:gap-14">
          <div className="flex flex-col justify-start gap-6 pt-2 md:gap-7 md:pt-3 lg:gap-8 lg:pt-4">
            <SectionLabel>{title}</SectionLabel>

            <div className="grid gap-0 pt-3 md:pt-4 lg:pt-5">
              {itemsWithMedia.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={item.id}
                    className="grid min-h-[8.25rem] content-center gap-4 border-b border-[var(--color-border-soft)] py-4 last:border-b-0 last:pb-0 first:pt-0 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-4 md:min-h-[8.75rem] md:gap-5 md:py-5 lg:min-h-[9.5rem] lg:gap-6 lg:py-6"
                  >
                    <div
                      className={[
                        'text-sm font-semibold tracking-[0.08em] transition-colors duration-500',
                        isActive ? 'text-accent' : 'text-text-muted',
                      ].join(' ')}
                    >
                      0{index + 1}
                    </div>
                    <div>
                      <h3
                        className={[
                          'm-0 text-[1.3rem] font-semibold leading-[1.08] tracking-[-0.03em] transition-colors duration-500 md:text-[1.45rem] lg:text-[1.7rem]',
                          isActive ? 'text-text-primary' : 'text-text-secondary',
                        ].join(' ')}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={[
                          'm-0 mt-2 max-w-[34ch] text-[0.95rem] leading-6 transition-colors duration-500 md:mt-3 md:max-w-[36ch] md:text-base md:leading-7 lg:max-w-[38ch] lg:text-[1.0625rem]',
                          isActive ? 'text-text-secondary' : 'text-text-muted',
                        ].join(' ')}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="justify-self-end pt-2 md:pt-3 lg:pt-4">
            <div className="w-fit rounded-[3.75rem] border border-[var(--color-border-soft)] bg-surface p-3 shadow-[0_18px_56px_rgba(15,23,42,0.12)] md:rounded-[4.125rem] md:p-4 lg:rounded-[4.75rem] lg:p-5">
              <ScreenshotStage items={itemsWithMedia} activeIndex={activeIndex} />
            </div>
          </div>
        </div>
      </div>
      </div>
    </FadeInSection>
  );
}

function MobileShowcaseStage({
  items,
  activeIndex,
  direction,
  navHeight,
}: {
  items: Array<BenefitItem & { media: FeatureMedia }>;
  activeIndex: number;
  direction: number;
  navHeight: number;
}) {
  const [displayedIndex, setDisplayedIndex] = useState(activeIndex);
  const transitioning = displayedIndex !== activeIndex;

  useEffect(() => {
    if (activeIndex === displayedIndex) return;
    const timeout = setTimeout(() => {
      setDisplayedIndex(activeIndex);
    }, 500);
    return () => clearTimeout(timeout);
  }, [activeIndex, displayedIndex]);

  const item = items[transitioning ? displayedIndex : activeIndex];
  const enterY = direction > 0 ? 40 : -40;

  return (
    <div className="relative rounded-[4.75rem] border border-[var(--color-border-soft)] bg-surface p-4 shadow-[var(--shadow-card)]">
      <div
        className="relative overflow-hidden rounded-[3.5rem] bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_58%),var(--color-surface-alt)]"
        style={{ height: `calc(100dvh - ${navHeight}px - 4.5rem)` }}
      >
        <div
          key={item.id}
          className="absolute inset-x-4 inset-y-4 flex flex-col gap-5"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? `translateY(${enterY}px)` : 'translateY(0)',
            transition: 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
            <div className="shrink-0">
              <h3 className="m-0 text-[1.45rem] font-semibold leading-[1.08] tracking-[-0.03em] text-text-primary">
                <span className="mr-3 text-sm tracking-[0.08em] text-accent align-[0.04em]">
                  0{activeIndex + 1}
                </span>
                <span>{item.title}</span>
              </h3>
              <p className="m-0 mt-3 text-[0.98rem] leading-7 text-text-secondary">
                {item.subtitle}
              </p>
            </div>

            <div className="relative flex flex-1 items-end justify-center overflow-hidden">
              <picture className="flex h-full w-full items-end justify-center">
                <source media="(prefers-color-scheme: dark)" srcSet={item.media.darkSrc} />
                <img
                  src={item.media.lightSrc}
                  alt={item.media.alt}
                  width={1260}
                  height={2736}
                  loading="lazy"
                  decoding="async"
                  className="apple-squircle h-auto max-h-full w-auto max-w-full rounded-[2.625rem] object-contain"
                />
              </picture>
            </div>
        </div>
      </div>
    </div>
  );
}

function ScreenshotStage({
  items,
  activeIndex,
  compact = false,
}: {
  items: Array<BenefitItem & { media: FeatureMedia }>;
  activeIndex: number;
  compact?: boolean;
}) {
  return (
    <div
      className={[
        'relative overflow-hidden rounded-[3.5rem] bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_58%),var(--color-surface-alt)]',
        compact ? 'mx-auto w-full max-w-[18rem]' : 'w-[15.5rem] md:w-[19rem] lg:w-[25rem]',
      ].join(' ')}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_48%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_48%)]" />
      <div className="relative aspect-[1260/2736] overflow-hidden rounded-[2.5rem] md:rounded-[2.75rem] lg:rounded-[3rem]">
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={item.id}
              className={[
                'absolute inset-0 block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                isActive
                  ? 'translate-y-0 scale-100 opacity-100'
                  : index < activeIndex
                    ? '-translate-y-[6%] scale-[0.97] opacity-0'
                    : 'translate-y-[6%] scale-[1.03] opacity-0',
              ].join(' ')}
              aria-hidden={!isActive}
            >
              <picture>
                <source media="(prefers-color-scheme: dark)" srcSet={item.media.darkSrc} />
                <img
                  src={item.media.lightSrc}
                  alt={item.media.alt}
                  width={1260}
                  height={2736}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </picture>
            </div>
          );
        })}
      </div>
    </div>
  );
}
