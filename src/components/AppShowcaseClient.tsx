'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

import { AppScreenshot } from '@/components/AppScreenshot';
import { IPhoneFrame } from '@/components/IPhoneFrame';
import { FadeInSection } from '@/components/ui/FadeInSection';

type DemoItem = {
  name: string;
  meta: string;
  progress: number;
};

type DemoTab = {
  id: string;
  label: string;
  title: string;
  summary: string;
  metricLabel: string;
  metricValue: string;
  detailLabel: string;
  detailValue: string;
  items: readonly DemoItem[];
};

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  helperTitle: string;
  helperBody: string;
  fallbackTitle: string;
  fallbackBody: string;
  tabs: readonly DemoTab[];
};

const SCREENSHOT = {
  slug: 'iphone-home',
  alt: 'BitRemote app home screen showing active downloads',
  width: 390,
  height: 844,
} as const;

export function AppShowcaseClient({
  eyebrow,
  title,
  body,
  helperTitle,
  helperBody,
  fallbackTitle,
  fallbackBody,
  tabs,
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id ?? '');

  useEffect(() => {
    setActiveTabId((currentTabId) => {
      if (tabs.some((tab) => tab.id === currentTabId)) {
        return currentTabId;
      }

      return tabs[0]?.id ?? '';
    });
  }, [tabs]);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

  if (!activeTab) {
    return (
      <FadeInSection as="section" className="py-4 lg:py-6">
        <div className="rounded-[2rem] border border-border/70 bg-surface/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <p className="m-0 text-sm font-medium text-accent">{fallbackTitle}</p>
          <p className="mb-0 mt-3 max-w-[60ch] text-text-secondary">{fallbackBody}</p>
        </div>
      </FadeInSection>
    );
  }

  return (
    <FadeInSection as="section" className="py-2 lg:py-4">
      <div className="rounded-[2rem] border border-border/70 bg-surface/80 px-5 py-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:px-7 sm:py-7">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.82fr)] lg:items-start">
          <div className="flex flex-col gap-6">
            <div className="max-w-3xl">
              <p className="m-0 text-sm font-medium text-accent">{eyebrow}</p>
              <h2 className="mt-3 text-[clamp(2rem,4vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-text-primary">
                {title}
              </h2>
              <p className="mb-0 mt-4 max-w-[62ch] text-base leading-7 text-text-secondary">
                {body}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const isActive = tab.id === activeTab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-semibold transition-[background-color,border-color,color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                      isActive
                        ? 'border-accent/30 bg-accent text-white shadow-[var(--button-primary-shadow)]'
                        : 'border-border/80 bg-[var(--button-secondary-bg)] text-text-secondary hover:border-border hover:bg-[var(--button-secondary-bg-hover)] hover:text-text-primary'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-[color-mix(in_srgb,var(--surface-alt)_78%,transparent)]">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-3 sm:px-5">
                <div>
                  <p className="m-0 text-sm font-semibold text-text-primary">{activeTab.title}</p>
                  <p className="m-0 mt-1 text-sm text-text-secondary">{activeTab.summary}</p>
                </div>
                <div className="hidden rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent sm:block">
                  {activeTab.metricValue}
                </div>
              </div>

              <motion.div
                key={activeTab.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: 'easeOut' }}
                className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(220px,0.8fr)]"
              >
                <div className="rounded-[1.5rem] border border-border/60 bg-bg/75 p-4">
                  <div className="grid gap-3">
                    {activeTab.items.map((item) => (
                      <div
                        key={`${activeTab.id}-${item.name}`}
                        className="rounded-[1.25rem] border border-border/50 bg-surface px-4 py-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="m-0 truncate text-sm font-semibold text-text-primary">
                              {item.name}
                            </p>
                            <p className="m-0 mt-1 text-sm text-text-secondary">{item.meta}</p>
                          </div>
                          <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                            {item.progress}%
                          </span>
                        </div>
                        <div className="mt-3 h-2 rounded-full bg-border/70">
                          <div
                            className="h-full rounded-full bg-accent transition-[width] duration-200 ease-out"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[1.5rem] border border-border/60 bg-bg/70 p-4">
                    <p className="m-0 text-sm text-text-secondary">{activeTab.metricLabel}</p>
                    <p className="mb-0 mt-2 text-2xl font-semibold tracking-[-0.03em] text-text-primary">
                      {activeTab.metricValue}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-border/60 bg-bg/70 p-4">
                    <p className="m-0 text-sm text-text-secondary">{activeTab.detailLabel}</p>
                    <p className="mb-0 mt-2 text-sm font-semibold text-text-primary">
                      {activeTab.detailValue}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-dashed border-border/70 bg-[var(--button-secondary-bg)] p-4">
                    <p className="m-0 text-sm font-semibold text-text-primary">{fallbackTitle}</p>
                    <p className="mb-0 mt-2 text-sm leading-6 text-text-secondary">
                      {fallbackBody}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="grid gap-4 lg:sticky lg:top-24">
            <div className="rounded-[1.75rem] border border-border/70 bg-[color-mix(in_srgb,var(--surface-alt)_74%,transparent)] p-4">
              <p className="m-0 text-sm font-medium text-accent">{helperTitle}</p>
              <p className="mb-0 mt-3 text-sm leading-6 text-text-secondary">{helperBody}</p>
            </div>
            <div className="rounded-[1.75rem] border border-border/70 bg-[color-mix(in_srgb,var(--surface-alt)_82%,transparent)] p-3">
              <IPhoneFrame>
                <AppScreenshot
                  slug={SCREENSHOT.slug}
                  alt={SCREENSHOT.alt}
                  width={SCREENSHOT.width}
                  height={SCREENSHOT.height}
                />
              </IPhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
