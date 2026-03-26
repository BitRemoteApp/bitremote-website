'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import type { Locale } from '@/i18n/locales';
import { localeLabels, localeLang, locales } from '@/i18n/locales';
import type { Messages } from '@/i18n/messages';
import { LINKS } from '@/i18n/links';
import { localePath } from '@/i18n/urls';

type Props = {
  locale: Locale;
  messages: Messages;
};

export function TextTabsNav({
  locale,
  messages,
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  const nav = messages.nav;
  const homeHref = localePath(locale, '/');
  const pathname = usePathname();
  const localePrefix = `/${locale}`;
  const currentPathWithinLocale = pathname.startsWith(localePrefix)
    ? pathname.slice(localePrefix.length) || '/'
    : '/';
  const isHomePage = currentPathWithinLocale === '/';
  const isTermsPage = currentPathWithinLocale === '/terms/';
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [isLocaleMenuOpen, setIsLocaleMenuOpen] = useState(false);
  const [navVeilHeight, setNavVeilHeight] = useState(0);
  const [isHeroCtaVisible, setIsHeroCtaVisible] = useState(!isTermsPage);
  const localeMenuId = useId();

  useEffect(() => {
    const updateNavVeilHeight = () => {
      const shell = shellRef.current;
      setNavVeilHeight((shell?.offsetHeight ?? 0) + 50);
    };

    updateNavVeilHeight();
    window.addEventListener('resize', updateNavVeilHeight);

    return () => {
      window.removeEventListener('resize', updateNavVeilHeight);
    };
  }, []);

  useEffect(() => {
    if (isTermsPage) {
      setIsHeroCtaVisible(false);
      return;
    }

    if (!isHomePage) {
      setIsHeroCtaVisible(true);
      return;
    }

    const heroCta = document.querySelector('[data-hero-cta="true"]');

    if (!(heroCta instanceof HTMLElement)) {
      setIsHeroCtaVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroCtaVisible(entry?.isIntersecting ?? false);
      },
      {
        threshold: 0.45,
        rootMargin: '-10% 0px -12% 0px',
      },
    );

    observer.observe(heroCta);

    return () => {
      observer.disconnect();
    };
  }, [isHomePage, isTermsPage, pathname]);

  useEffect(() => {
    if (!isLocaleMenuOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      const picker = pickerRef.current;
      if (!picker || picker.contains(event.target as Node)) {
        return;
      }
      setIsLocaleMenuOpen(false);
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLocaleMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onEscape);
    };
  }, [isLocaleMenuOpen]);

  const tabLinkClassName =
    'inline-flex min-h-11 items-center rounded-full px-4 py-2 font-sans text-sm font-medium text-text-secondary no-underline transition-colors duration-150 hover:bg-surface hover:text-text-primary active:bg-surface';
  const localeLinkBaseClassName =
    'inline-flex min-h-11 items-center rounded-full px-4 py-2 font-sans text-sm font-medium no-underline select-none transition-colors duration-150';

  const localeLinkClassName = (isCurrent: boolean) =>
    isCurrent
      ? 'bg-accent text-[var(--color-accent-contrast)] shadow-[0_10px_28px_rgba(37,99,235,0.18)] hover:bg-[var(--color-accent-hover)] hover:text-[var(--color-accent-contrast)]'
      : 'text-text-secondary hover:bg-surface hover:text-text-primary active:bg-surface';
  const compactCtaClassName =
    'min-h-11 shrink-0 items-center rounded-full border border-[color-mix(in_srgb,var(--color-accent)_18%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent)_8%,var(--color-bg))] px-4 py-2 text-sm font-semibold leading-none text-[color-mix(in_srgb,var(--color-accent)_92%,var(--color-text-primary))] no-underline transition-[background-color,border-color,color] duration-150 hover:border-[color-mix(in_srgb,var(--color-accent)_32%,var(--color-border))] hover:bg-[color-mix(in_srgb,var(--color-accent)_14%,var(--color-bg))] hover:text-[color-mix(in_srgb,var(--color-accent)_92%,var(--color-text-primary))]';

  const navItems = [
    { href: homeHref, label: nav.home },
    { href: `${homeHref}#feature`, label: nav.feature },
    { href: `${homeHref}#downloader`, label: nav.downloaders },
    { href: `${homeHref}#how-it-works`, label: nav.quickstart },
    { href: `${homeHref}#faq`, label: nav.faq },
  ] as const;

  const localeLabelClassName = (value: Locale) =>
    value === 'ja'
      ? 'text-[0.97rem] font-normal tracking-[-0.01em]'
      : value.startsWith('zh-')
        ? 'font-["PingFang_SC","PingFang_TC","Hiragino_Sans_GB","Noto_Sans_CJK_SC","Noto_Sans_CJK_TC","Microsoft_YaHei","Microsoft_JhengHei",sans-serif] text-[0.94rem] font-normal tracking-[-0.01em]'
        : 'font-normal';

  return (
    <nav
      className="sticky top-3 z-20 px-3 sm:px-4"
      aria-label="Site"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-3 -z-10"
        style={{ height: navVeilHeight || undefined }}
      >
        <div className="h-full w-full bg-[color-mix(in_srgb,var(--color-bg)_46%,transparent)] backdrop-blur-[28px] [mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_100%)]" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <div
          ref={shellRef}
          className="relative flex w-full items-center gap-3 rounded-[1.85rem] border border-[color-mix(in_srgb,var(--color-border)_78%,var(--color-bg))] bg-[color-mix(in_srgb,var(--color-bg)_72%,transparent)] px-3 py-3 shadow-[0_20px_44px_rgba(15,23,42,0.08)] backdrop-blur-2xl supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--color-bg)_50%,transparent)] sm:px-4"
        >
        <div className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="inline-flex min-w-max items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                className={tabLinkClassName}
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {!isHeroCtaVisible ? (
            <motion.div
              key="nav-cta"
              initial={shouldReduceMotion ? false : { opacity: 0, y: -6, scale: 0.96 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: shouldReduceMotion ? 0.12 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                className={`${compactCtaClassName} inline-flex`}
                href={LINKS.appStore}
                target="_blank"
                rel="noreferrer"
                aria-label={messages.cta.appStore}
              >
                <span aria-hidden="true" className="inline-flex items-center gap-2 text-inherit">
                  <span className="inline-block text-[1.2em] leading-none"></span>
                  <span className="text-sm font-medium tracking-[0.02em] text-inherit">{messages.cta.download}</span>
                </span>
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div data-locale-switch className="ml-auto hidden" aria-label="Language" hidden>
          {locales.map((l) => {
            const isCurrent = l === locale;
            return (
              <a
                key={l}
                className={`${localeLinkBaseClassName} ${localeLinkClassName(isCurrent)}`}
                href={localePath(l, currentPathWithinLocale)}
                aria-current={l === locale ? 'page' : undefined}
              >
                <span className={localeLabelClassName(l)} lang={localeLang[l]}>
                  {localeLabels[l]}
                </span>
              </a>
            );
          })}
        </div>

        <div data-locale-picker className="relative ml-auto" ref={pickerRef}>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-border)_82%,var(--color-bg))] bg-[color-mix(in_srgb,var(--color-surface)_82%,var(--color-bg))] px-4 py-2 font-sans text-sm font-medium text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.24)] transition-colors duration-150 hover:bg-surface active:bg-surface"
            aria-expanded={isLocaleMenuOpen}
            aria-controls={localeMenuId}
            onClick={() => setIsLocaleMenuOpen((current) => !current)}
          >
            <span className={localeLabelClassName(locale)} lang={localeLang[locale]}>
              {localeLabels[locale]}
            </span>
            <span aria-hidden="true" className="text-text-secondary">
              {isLocaleMenuOpen ? '▴' : '▾'}
            </span>
          </button>

          {isLocaleMenuOpen ? (
            <div
              className="absolute right-0 top-[calc(100%+0.55rem)] z-20 min-w-[12rem] rounded-3xl border border-[color-mix(in_srgb,var(--color-border)_78%,var(--color-bg))] bg-[color-mix(in_srgb,var(--color-bg)_94%,transparent)] p-2 shadow-[0_24px_48px_rgba(15,23,42,0.14)] backdrop-blur-2xl supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--color-bg)_98%,transparent)]"
              id={localeMenuId}
              role="menu"
              aria-label="Language options"
            >
              <div className="flex flex-col gap-1">
                {locales.map((l) => {
                  const isCurrent = l === locale;
                  const rowBaseClassName =
                    'inline-flex min-h-11 items-center justify-between rounded-2xl px-4 py-2 font-sans text-sm font-normal no-underline transition-colors duration-150';
                  const rowClassName = isCurrent
                    ? `${rowBaseClassName} bg-accent text-[var(--color-accent-contrast)] shadow-[0_10px_28px_rgba(37,99,235,0.18)] hover:bg-[var(--color-accent-hover)] hover:text-[var(--color-accent-contrast)]`
                    : `${rowBaseClassName} text-text-primary hover:bg-surface hover:text-text-primary active:bg-surface`;
                  return (
                    <a
                      key={l}
                      className={rowClassName}
                      href={localePath(l, currentPathWithinLocale)}
                      aria-current={l === locale ? 'page' : undefined}
                      role="menuitem"
                    >
                      <span className={localeLabelClassName(l)} lang={localeLang[l]}>
                        {localeLabels[l]}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        <noscript>
          <style>{'[data-locale-switch]{display:flex}[data-locale-picker]{display:none}'}</style>
        </noscript>
        </div>
      </div>
    </nav>
  );
}
