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

  // data-[active=true]:* classes are intentionally never applied.
  // Tab items respond to hover only — there is no persistent "current page" highlight by design.
  const tabLinkClassName =
    'relative inline-flex items-center px-[0.45rem] py-[0.15rem] font-sans text-sm uppercase text-text-primary opacity-[0.85] no-underline transition-colors duration-150 hover:bg-accent hover:text-bg hover:opacity-100 active:bg-accent active:text-bg active:opacity-100 data-[active=true]:bg-accent data-[active=true]:text-bg data-[active=true]:opacity-100';
  const localeLinkBaseClassName =
    'group inline-flex items-center px-[0.45rem] py-[0.15rem] font-sans text-sm uppercase no-underline select-none transition duration-150 hover:bg-accent hover:text-bg active:scale-[0.97] active:bg-accent active:text-bg';

  const localeLinkClassName = (isCurrent: boolean) =>
    isCurrent
      ? 'text-accent'
      : 'text-text-primary opacity-80 hover:opacity-100 active:opacity-100';

  const localeBracketClassName =
    'text-current opacity-70 transition-opacity group-hover:opacity-100 group-active:opacity-100';

  return (
    <nav
      className="sticky top-0 z-10 border-b border-border bg-[var(--bg-glass-92)] backdrop-blur"
      aria-label="Site"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-nowrap items-center gap-4 py-[0.9rem] whitespace-nowrap">
        <div className="no-scrollbar min-w-0 flex-1 overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch]">
          <div className="inline-flex min-w-max flex-nowrap items-baseline gap-x-5 gap-y-3 pb-[0.1rem] pl-[0.55rem]">
            <a className={tabLinkClassName} href={homeHref}>
              {nav.home}
            </a>
            <a className={tabLinkClassName} href={`${homeHref}#features`}>
              {nav.features}
            </a>
            <a className={tabLinkClassName} href={`${homeHref}#how-it-works`}>
              {nav.quickstart}
            </a>
            <a className={tabLinkClassName} href={`${homeHref}#plus`}>
              {nav.subscription}
            </a>
            <a className={tabLinkClassName} href={`${homeHref}#faq`}>
              {nav.faq}
            </a>
          </div>
        </div>

        <div className="hidden min-[480px]:block flex-shrink-0">
          <TextButton href={LINKS.appStore} target="_blank" rel="noreferrer">
            {messages.cta.appStore}
          </TextButton>
        </div>

        <div
          data-locale-switch
          className="ml-auto hidden flex-nowrap items-center gap-2"
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
                <span
                  aria-hidden="true"
                  className={`mr-[0.55ch] ${localeBracketClassName}`}
                >
                  [
                </span>
                {localeLabels[l]}
                <span
                  aria-hidden="true"
                  className={`ml-[0.55ch] ${localeBracketClassName}`}
                >
                  ]
                </span>
              </a>
            );
          })}
        </div>

        <div data-locale-picker className="relative ml-auto" ref={pickerRef}>
          <button
            type="button"
            className={`${localeLinkBaseClassName} cursor-pointer border-0 bg-transparent text-text-primary opacity-80 hover:opacity-100 active:opacity-100`}
            aria-expanded={isLocaleMenuOpen}
            aria-controls={localeMenuId}
            onClick={() => setIsLocaleMenuOpen((current) => !current)}
          >
            <span aria-hidden="true" className={`mr-[0.55ch] ${localeBracketClassName}`}>
              [
            </span>
            {localeLabels[locale]}
            <span aria-hidden="true" className={`ml-[0.55ch] ${localeBracketClassName}`}>
              ]
            </span>
          </button>

          {isLocaleMenuOpen ? (
            <div
              className="absolute right-0 top-[calc(100%+0.45rem)] z-20 border border-border bg-[var(--bg-glass-95)] py-[0.45rem] px-[0.55rem] backdrop-blur"
              id={localeMenuId}
              role="menu"
              aria-label="Language options"
            >
              <div className="table border-separate border-spacing-x-0 border-spacing-y-1">
                {locales.map((l) => {
                  const isCurrent = l === locale;
                  const rowBaseClassName =
                    'group table-row font-sans text-sm uppercase no-underline select-none transition duration-150';
                  const rowClassName = isCurrent
                    ? `${rowBaseClassName} text-accent`
                    : `${rowBaseClassName} text-text-primary opacity-80 hover:opacity-100 active:opacity-100`;

                  const cellClassName =
                    'table-cell py-[0.15rem] transition-colors group-hover:bg-accent group-hover:text-bg group-active:bg-accent group-active:text-bg';
                  return (
                    <a
                      key={l}
                      className={rowClassName}
                      href={localePath(l, currentPathWithinLocale)}
                      aria-current={l === locale ? 'page' : undefined}
                      role="menuitem"
                    >
                      <span
                        aria-hidden="true"
                        className={`${cellClassName} w-[1ch] text-left ${localeBracketClassName}`}
                      >
                        [
                      </span>
                      <span className={`${cellClassName} px-[0.55ch] text-center`}>
                        {localeLabels[l]}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`${cellClassName} w-[1ch] text-right ${localeBracketClassName}`}
                      >
                        ]
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
