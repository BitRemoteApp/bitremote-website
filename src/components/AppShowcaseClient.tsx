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
  const [activeIndex, setActiveIndex] = useState(0);
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
  }, [isDesktop, itemsWithMedia.length]);

  return (
    <FadeInSection as="section" id={id} className="py-2 md:py-4">
      <div
        ref={sectionRef}
        data-fs
        style={isDesktop ? { minHeight: `${itemsWithMedia.length * 90}vh` } : undefined}
      >
      <div data-sm-carousel className="md:hidden">
        <SectionLabel>{title}</SectionLabel>
        <div className="-mx-6 mt-6 flex gap-4 overflow-x-auto pb-4 [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="w-2 shrink-0" />
          {itemsWithMedia.map((item, index) => (
            <div
              key={item.id}
              className="flex w-[80vw] max-w-[20rem] shrink-0 flex-col [scroll-snap-align:center]"
            >
              <div className="mt-2 mb-5 px-2">
                <h3 className="m-0 text-[1.1rem] font-semibold leading-[1.12] tracking-[-0.02em] text-text-primary">
                  <span className="mr-2 text-xs tracking-[0.08em] text-accent">0{index + 1}</span>
                  {item.title}
                </h3>
                <p className="m-0 mt-1.5 text-sm leading-5 text-text-secondary">{item.subtitle}</p>
              </div>
              <div className="mt-auto rounded-[2.5rem] border border-[var(--color-border-soft)] bg-surface p-3">
                <div className="overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_58%),var(--color-surface-alt)]">
                  <picture>
                    <source media="(prefers-color-scheme: dark)" srcSet={item.media.darkSrc} />
                    <img
                      src={item.media.lightSrc}
                      alt={item.media.alt}
                      width={1260}
                      height={2736}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full object-cover"
                    />
                  </picture>
                </div>
              </div>
            </div>
          ))}
          <div className="w-2 shrink-0" />
        </div>
      </div>

      <div
        className="hidden md:sticky md:flex md:items-start [@media(min-height:1000px)]:md:items-center md:overflow-y-hidden"
        style={{
          top: `calc(${navHeight}px + 1.5rem)`,
          height: `calc(100dvh - ${navHeight}px - 3rem)`,
        }}
      >
        <div className="grid w-full grid-cols-[minmax(0,0.92fr)_minmax(240px,0.78fr)] items-start gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.84fr)] md:gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(320px,0.92fr)] lg:gap-14">
          <div className="flex flex-col justify-start gap-6 pt-2 md:gap-[clamp(0.75rem,2dvh,1.75rem)] md:pt-3 lg:gap-[clamp(1rem,2dvh,2rem)] lg:pt-4">
            <SectionLabel>{title}</SectionLabel>

            {itemsWithMedia.map((_, i) => (
              <input
                key={i}
                type="radio"
                name="ft"
                id={`ft${i}`}
                defaultChecked={i === 0}
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
              />
            ))}

            <div className="grid gap-0 pt-3 md:pt-[clamp(0.5rem,1dvh,1rem)] lg:pt-[clamp(0.5rem,1.2dvh,1.25rem)]">
              {itemsWithMedia.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <label
                    key={item.id}
                    htmlFor={`ft${index}`}
                    className="grid min-h-[8.25rem] cursor-default content-center gap-4 border-b border-[var(--color-border-soft)] py-4 last:border-b-0 last:pb-0 first:pt-0 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-4 md:min-h-[clamp(5rem,12dvh,8.75rem)] md:gap-5 md:py-[clamp(0.625rem,1.5dvh,1.25rem)] lg:min-h-[clamp(5.5rem,12dvh,9.5rem)] lg:gap-6 lg:py-[clamp(0.75rem,1.8dvh,1.5rem)]"
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
                          'm-0 text-[1.3rem] font-semibold leading-[1.08] tracking-[-0.03em] transition-colors duration-500 md:text-[clamp(1.1rem,2dvh,1.45rem)] lg:text-[clamp(1.2rem,2dvh,1.7rem)]',
                          isActive ? 'text-text-primary' : 'text-text-secondary',
                        ].join(' ')}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={[
                          'm-0 mt-2 max-w-[34ch] text-[0.95rem] leading-6 transition-colors duration-500 md:mt-[clamp(0.25rem,0.8dvh,0.75rem)] md:max-w-[36ch] md:text-[clamp(0.8rem,1.6dvh,1rem)] md:leading-[clamp(1.25rem,2.2dvh,1.75rem)] lg:max-w-[38ch] lg:text-[clamp(0.85rem,1.6dvh,1.0625rem)]',
                          isActive ? 'text-text-secondary' : 'text-text-muted',
                        ].join(' ')}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="justify-self-end pt-2 md:pt-3 lg:pt-4">
            <div className="w-fit rounded-[3.75rem] border border-[var(--color-border-soft)] bg-surface p-3 md:rounded-[4.125rem] md:p-4 lg:rounded-[4.75rem] lg:p-5">
              <ScreenshotStage items={itemsWithMedia} activeIndex={activeIndex} />
            </div>
          </div>
        </div>
      </div>
      </div>
      <noscript>
        <style>{[
          '@media(min-width:768px){',
            '[data-feature-screenshot]{opacity:0!important;translate:0!important;scale:1!important}',
            '[data-feature-screenshot]:nth-child(1){opacity:1!important}',
            '[data-fs]:has(#ft0:checked) [data-feature-screenshot]:nth-child(1),',
            '[data-fs]:has(#ft1:checked) [data-feature-screenshot]:nth-child(2),',
            '[data-fs]:has(#ft2:checked) [data-feature-screenshot]:nth-child(3),',
            '[data-fs]:has(#ft3:checked) [data-feature-screenshot]:nth-child(4){opacity:1!important}',
            '[data-fs]:has(#ft1:checked) [data-feature-screenshot]:nth-child(1),',
            '[data-fs]:has(#ft2:checked) [data-feature-screenshot]:nth-child(1),',
            '[data-fs]:has(#ft3:checked) [data-feature-screenshot]:nth-child(1){opacity:0!important}',
            'label[for^=ft]{cursor:pointer}',
            'label[for^=ft]>:first-child{color:var(--color-text-muted)!important}',
            'label[for^=ft] h3{color:var(--color-text-secondary)!important}',
            'label[for^=ft] p{color:var(--color-text-muted)!important}',
            '[data-fs]:has(#ft0:checked) label[for=ft0]>:first-child,',
            '[data-fs]:has(#ft1:checked) label[for=ft1]>:first-child,',
            '[data-fs]:has(#ft2:checked) label[for=ft2]>:first-child,',
            '[data-fs]:has(#ft3:checked) label[for=ft3]>:first-child{color:var(--color-accent)!important}',
            '[data-fs]:has(#ft0:checked) label[for=ft0] h3,',
            '[data-fs]:has(#ft1:checked) label[for=ft1] h3,',
            '[data-fs]:has(#ft2:checked) label[for=ft2] h3,',
            '[data-fs]:has(#ft3:checked) label[for=ft3] h3{color:var(--color-text-primary)!important}',
            '[data-fs]:has(#ft0:checked) label[for=ft0] p,',
            '[data-fs]:has(#ft1:checked) label[for=ft1] p,',
            '[data-fs]:has(#ft2:checked) label[for=ft2] p,',
            '[data-fs]:has(#ft3:checked) label[for=ft3] p{color:var(--color-text-secondary)!important}',
          '}',
        ].join('')}</style>
      </noscript>
    </FadeInSection>
  );
}

function ScreenshotStage({
  items,
  activeIndex,
}: {
  items: Array<BenefitItem & { media: FeatureMedia }>;
  activeIndex: number;
}) {
  return (
    <div className="relative w-[15.5rem] overflow-hidden rounded-[3.5rem] bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_58%),var(--color-surface-alt)] md:w-[19rem] lg:w-[25rem]">

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_48%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_48%)]" />
      <div data-feature-screenshots className="relative aspect-[1260/2736] overflow-hidden rounded-[2.5rem] md:rounded-[2.75rem] lg:rounded-[3rem]">
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={item.id}
              data-feature-screenshot
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
