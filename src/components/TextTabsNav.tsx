'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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
  const nav = messages.nav;
  const homeHref = localePath(locale, '/');
  const pathname = usePathname();
  const localePrefix = `/${locale}`;
  const currentPathWithinLocale = pathname.startsWith(localePrefix)
    ? pathname.slice(localePrefix.length) || '/'
    : '/';
  const isHomePage = currentPathWithinLocale === '/';
  const isTermsPage = currentPathWithinLocale === '/terms/';
  const pickerRef = useRef<HTMLDetailsElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLDetailsElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [localeMenuOpenAt, setLocaleMenuOpenAt] = useState<string | null>(null);
  const [mobileMenuOpenAt, setMobileMenuOpenAt] = useState<string | null>(null);
  const isLocaleMenuOpen = localeMenuOpenAt === pathname;
  const isMobileMenuOpen = mobileMenuOpenAt === pathname;
  const setIsLocaleMenuOpen = useCallback((open: boolean) => setLocaleMenuOpenAt(open ? pathname : null), [pathname]);
  const setIsMobileMenuOpen = useCallback((open: boolean) => setMobileMenuOpenAt(open ? pathname : null), [pathname]);
  const [navVeilHeight, setNavVeilHeight] = useState(0);
  const [isHeroCtaVisible, setIsHeroCtaVisible] = useState(isHomePage);
  const localeMenuId = `locale-menu-${locale}`;
  const mobileMenuId = `mobile-menu-${locale}`;

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
    if (!isHomePage) {
      return;
    }

    const heroCta = document.querySelector('[data-hero-cta="true"]');

    if (!(heroCta instanceof HTMLElement)) {
      window.setTimeout(() => {
        setIsHeroCtaVisible(false);
      }, 0);
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
  }, [isHomePage, pathname]);

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
  }, [isLocaleMenuOpen, setIsLocaleMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      const trigger = mobileMenuButtonRef.current;
      const menu = mobileMenuRef.current;
      if (!menu) {
        return;
      }
      if (menu.contains(event.target as Node) || trigger?.contains(event.target as Node)) {
        return;
      }
      setIsMobileMenuOpen(false);
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onEscape);
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

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
  const mobileMenuButtonClassName =
    'inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-border)_82%,var(--color-bg))] bg-[color-mix(in_srgb,var(--color-surface)_82%,var(--color-bg))] text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.24)] transition-colors duration-150 hover:bg-surface active:bg-surface';
  const localeRowBaseClassName =
    'inline-flex min-h-11 items-center justify-between rounded-2xl px-4 py-2 font-sans text-sm font-normal no-underline transition-colors duration-150';
  const localeRowClassName = (isCurrent: boolean) =>
    isCurrent
      ? `${localeRowBaseClassName} bg-accent text-[var(--color-accent-contrast)] shadow-[0_10px_28px_rgba(37,99,235,0.18)] hover:bg-[var(--color-accent-hover)] hover:text-[var(--color-accent-contrast)]`
      : `${localeRowBaseClassName} text-text-primary hover:bg-surface hover:text-text-primary active:bg-surface`;

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
  const shouldShowNavCta = !isHomePage || !isHeroCtaVisible;

  return (
    <nav
      className="sticky top-3 z-20 px-3 sm:px-4"
      aria-label="Site"
    >
      <div
        data-nav-veil
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
          <details
            data-mobile-menu-button
            className="md:hidden"
            ref={mobileMenuButtonRef}
            open={isMobileMenuOpen || undefined}
          >
            <summary
              className={`${mobileMenuButtonClassName} cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden`}
              aria-expanded={isMobileMenuOpen}
              aria-controls={mobileMenuId}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
            >
              <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden="true" className="relative h-4 w-4">
                <span
                  className={`absolute left-0 top-[2px] h-[1.5px] w-4 rounded-full bg-current transition-transform duration-200 ${isMobileMenuOpen ? 'translate-y-[5px] rotate-45' : ''}`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-[1.5px] w-4 rounded-full bg-current transition-opacity duration-200 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                />
                <span
                  className={`absolute left-0 top-[12px] h-[1.5px] w-4 rounded-full bg-current transition-transform duration-200 ${isMobileMenuOpen ? '-translate-y-[5px] -rotate-45' : ''}`}
                />
              </span>
            </summary>
            <div
              ref={mobileMenuRef}
              id={mobileMenuId}
              className="absolute inset-x-0 top-[calc(100%+0.7rem)] z-20 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ left: '-0.75rem', right: '-0.75rem' }}
            >
              <div className="overflow-hidden rounded-[1.7rem] border border-[color-mix(in_srgb,var(--color-border)_78%,var(--color-bg))] bg-[color-mix(in_srgb,var(--color-bg)_94%,transparent)] p-2.5 shadow-[0_24px_48px_rgba(15,23,42,0.14)] backdrop-blur-2xl supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--color-bg)_98%,transparent)]">
                <div className="flex flex-col gap-1.5">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      className="inline-flex min-h-11 items-center rounded-[1.15rem] px-4 py-2 font-sans text-[0.95rem] font-medium text-text-primary no-underline transition-colors duration-150 hover:bg-surface active:bg-surface"
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                <div className="my-2 h-px bg-[color-mix(in_srgb,var(--color-border)_78%,transparent)]" />

                <div className="px-2 pb-1 pt-0.5">
                  <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-text-secondary/80">
                    {nav.language}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {locales.map((l) => {
                    const isCurrent = l === locale;
                    return (
                      <a
                        key={l}
                        className={localeRowClassName(isCurrent)}
                        href={localePath(l, currentPathWithinLocale)}
                        aria-current={l === locale ? 'page' : undefined}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className={localeLabelClassName(l)} lang={localeLang[l]}>
                          {localeLabels[l]}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </details>

          <div className="flex-1 md:hidden" />

          <div
            data-primary-tabs
            className="hidden min-w-0 flex-1 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:block"
          >
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

          <div
            data-nav-cta
            className="ml-auto transition-[opacity,transform] duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              opacity: shouldShowNavCta ? 1 : 0,
              transform: shouldShowNavCta ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.96)',
              pointerEvents: shouldShowNavCta ? 'auto' : 'none',
            }}
          >
                <a
                  className={`${compactCtaClassName} inline-flex`}
                  href={LINKS.appStore}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={messages.cta.appStore}
              tabIndex={shouldShowNavCta ? undefined : -1}
                >
                  <span aria-hidden="true" className="inline-flex items-center gap-2 text-inherit">
                    <span className="inline-block text-[1.2em] leading-none"></span>
                    <span className="text-sm font-medium tracking-[0.02em] text-inherit">{messages.cta.download}</span>
                  </span>
                </a>
          </div>

          <div data-locale-switch className="ml-auto hidden" aria-label="Language">
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

          <details
            data-locale-picker
            className="relative ml-auto hidden md:block"
            ref={pickerRef}
            open={isLocaleMenuOpen || undefined}
          >
            <summary
              className="inline-flex min-h-11 cursor-pointer select-none list-none items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-border)_82%,var(--color-bg))] bg-[color-mix(in_srgb,var(--color-surface)_82%,var(--color-bg))] px-4 py-2 font-sans text-sm font-medium text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.24)] transition-colors duration-150 hover:bg-surface active:bg-surface [&::-webkit-details-marker]:hidden"
              aria-expanded={isLocaleMenuOpen}
              aria-controls={localeMenuId}
              onClick={(e) => {
                e.preventDefault();
                setIsLocaleMenuOpen(!isLocaleMenuOpen);
              }}
            >
              <span className={localeLabelClassName(locale)} lang={localeLang[locale]}>
                {localeLabels[locale]}
              </span>
              <span aria-hidden="true" className="text-text-secondary">
                {isLocaleMenuOpen ? '▴' : '▾'}
              </span>
            </summary>

            <div
              className="absolute right-0 top-[calc(100%+0.55rem)] z-20 min-w-[12rem] rounded-3xl border border-[color-mix(in_srgb,var(--color-border)_78%,var(--color-bg))] bg-[color-mix(in_srgb,var(--color-bg)_94%,transparent)] p-2 shadow-[0_24px_48px_rgba(15,23,42,0.14)] backdrop-blur-2xl supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--color-bg)_98%,transparent)]"
              id={localeMenuId}
              role="menu"
              aria-label="Language options"
            >
              <div className="flex flex-col gap-1">
                {locales.map((l) => {
                  const isCurrent = l === locale;
                  return (
                    <a
                      key={l}
                      className={localeRowClassName(isCurrent)}
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
          </details>

          <noscript>
            <style>{'[data-nav-cta]{opacity:1!important;transform:none!important;pointer-events:auto!important}[data-nav-veil]{height:7rem}'}</style>
          </noscript>
        </div>
      </div>
    </nav>
  );
}
