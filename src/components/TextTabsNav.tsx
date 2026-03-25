'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import type { Locale } from '@/i18n/locales';
import { localeLabels, locales } from '@/i18n/locales';
import type { Messages } from '@/i18n/messages';
import { localePath } from '@/i18n/urls';
import { LINKS } from '@/i18n/links';
import { TextButton } from '@/components/TextButton';

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
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const [isLocaleMenuOpen, setIsLocaleMenuOpen] = useState(false);
  const localeMenuId = useId();
  const isHomePage = currentPathWithinLocale === '/';
  const isDownloaderPage = currentPathWithinLocale.startsWith('/downloaders/');

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
    'inline-flex min-h-11 items-center rounded-full px-4 py-2 font-sans text-sm font-medium text-text-secondary no-underline transition-colors duration-150 hover:bg-surface hover:text-text-primary active:bg-surface data-[active=true]:bg-accent data-[active=true]:text-white data-[active=true]:shadow-[0_10px_30px_rgba(37,99,235,0.18)]';
  const localeLinkBaseClassName =
    'inline-flex min-h-11 items-center rounded-full px-4 py-2 font-sans text-sm font-medium no-underline select-none transition-colors duration-150';

  const localeLinkClassName = (isCurrent: boolean) =>
    isCurrent
      ? 'bg-accent text-white shadow-[0_10px_28px_rgba(37,99,235,0.18)]'
      : 'text-text-secondary hover:bg-surface hover:text-text-primary active:bg-surface';

  const navItems = [
    { href: homeHref, label: nav.home, isActive: isHomePage && !isLocaleMenuOpen },
    { href: `${homeHref}#features`, label: nav.features, isActive: isHomePage },
    { href: `${homeHref}#downloaders`, label: nav.downloaders, isActive: isHomePage || isDownloaderPage },
    { href: `${homeHref}#how-it-works`, label: nav.quickstart, isActive: isHomePage },
    { href: `${homeHref}#plus`, label: nav.subscription, isActive: isHomePage },
    { href: `${homeHref}#faq`, label: nav.faq, isActive: isHomePage },
  ] as const;

  return (
    <nav
      className="sticky top-0 z-20 border-b border-border/80 bg-[var(--bg-glass-95)] backdrop-blur-xl"
      aria-label="Site"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-3 whitespace-nowrap">
        <div className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden">
          <div className="inline-flex min-w-max items-center gap-2 rounded-full border border-border/70 bg-surface/80 p-1.5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            {navItems.map((item) => (
              <a
                key={item.href}
                className={tabLinkClassName}
                href={item.href}
                data-active={item.isActive}
                aria-current={item.isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden shrink-0 sm:block">
          <TextButton href={LINKS.appStore} target="_blank" rel="noreferrer">
            {messages.cta.appStore}
          </TextButton>
        </div>

        <div
          data-locale-switch
          className="ml-auto hidden flex-nowrap items-center gap-2 rounded-full border border-border/70 bg-surface/80 p-1.5 lg:flex"
          aria-label="Language"
        >
          {locales.map((l) => {
            const isCurrent = l === locale;
            return (
              <a
                key={l}
                className={`${localeLinkBaseClassName} ${localeLinkClassName(isCurrent)}`}
                href={localePath(l, currentPathWithinLocale)}
                aria-current={l === locale ? 'page' : undefined}
              >
                {localeLabels[l]}
              </a>
            );
          })}
        </div>

        <div data-locale-picker className="relative ml-auto" ref={pickerRef}>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border/70 bg-surface/80 px-4 py-2 font-sans text-sm font-medium text-text-primary transition-colors duration-150 hover:bg-surface active:bg-surface lg:hidden"
            aria-expanded={isLocaleMenuOpen}
            aria-controls={localeMenuId}
            onClick={() => setIsLocaleMenuOpen((current) => !current)}
          >
            {localeLabels[locale]}
            <span aria-hidden="true" className="text-text-secondary">
              {isLocaleMenuOpen ? '−' : '+'}
            </span>
          </button>

          {isLocaleMenuOpen ? (
            <div
              className="absolute right-0 top-[calc(100%+0.55rem)] z-20 min-w-[12rem] rounded-3xl border border-border/70 bg-[var(--bg-glass-95)] p-2 shadow-[0_24px_48px_rgba(15,23,42,0.14)] backdrop-blur-xl"
              id={localeMenuId}
              role="menu"
              aria-label="Language options"
            >
              <div className="flex flex-col gap-1">
                {locales.map((l) => {
                  const isCurrent = l === locale;
                  const rowBaseClassName =
                    'inline-flex min-h-11 items-center justify-between rounded-2xl px-4 py-2 font-sans text-sm font-medium no-underline transition-colors duration-150';
                  const rowClassName = isCurrent
                    ? `${rowBaseClassName} bg-accent text-white shadow-[0_10px_28px_rgba(37,99,235,0.18)]`
                    : `${rowBaseClassName} text-text-primary hover:bg-surface active:bg-surface`;
                  return (
                    <a
                      key={l}
                      className={rowClassName}
                      href={localePath(l, currentPathWithinLocale)}
                      aria-current={l === locale ? 'page' : undefined}
                      role="menuitem"
                    >
                      <span>{localeLabels[l]}</span>
                      <span aria-hidden="true" className={isCurrent ? 'opacity-100' : 'opacity-0'}>
                        •
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
    </nav>
  );
}
