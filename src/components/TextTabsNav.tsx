'use client';

import { useEffect, useId, useRef, useState } from 'react';

import type { Locale } from '@/i18n/locales';
import { localeLabels, locales } from '@/i18n/locales';
import type { Messages } from '@/i18n/messages';
import { localePath } from '@/i18n/urls';

type Active = 'home' | 'support' | 'none';

type Props = {
  locale: Locale;
  messages: Messages;
  active?: Active;
  localeSwitchPath: string;
};

const MIN_TABS_VIEWPORT = 320;

export function TextTabsNav({
  locale,
  messages,
  active = 'none',
  localeSwitchPath,
}: Props) {
  const nav = messages.nav;
  const homeHref = localePath(locale, '/');
  const navInnerRef = useRef<HTMLDivElement | null>(null);
  const localeLinksRef = useRef<HTMLDivElement | null>(null);
  const tabsViewportRef = useRef<HTMLDivElement | null>(null);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const [useCompactLocalePicker, setUseCompactLocalePicker] = useState(false);
  const [isLocaleMenuOpen, setIsLocaleMenuOpen] = useState(false);
  const localeMenuId = useId();

  useEffect(() => {
    const updateLayoutMode = () => {
      const navInner = navInnerRef.current;
      const localeLinks = localeLinksRef.current;
      const tabsViewport = tabsViewportRef.current;
      if (!navInner || !localeLinks || !tabsViewport) {
        return;
      }

      const gap = 16;
      const requiredWidth = localeLinks.scrollWidth + gap + MIN_TABS_VIEWPORT;
      const shouldUseCompactPicker = navInner.clientWidth < requiredWidth;

      setUseCompactLocalePicker(shouldUseCompactPicker);
      if (!shouldUseCompactPicker) {
        setIsLocaleMenuOpen(false);
      }
    };

    updateLayoutMode();

    const resizeObserver = new ResizeObserver(updateLayoutMode);
    if (navInnerRef.current) {
      resizeObserver.observe(navInnerRef.current);
    }

    window.addEventListener('resize', updateLayoutMode);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateLayoutMode);
    };
  }, []);

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

  return (
    <nav className="tabsNav" aria-label="Site">
      <div
        className="container tabsNavInner"
        ref={navInnerRef}
        data-compact-locale={useCompactLocalePicker ? "true" : "false"}
      >
        <div className="tabsViewport" ref={tabsViewportRef}>
          <div className="tabsGroup">
            <a className="tabLink" data-active={active === 'home'} href={homeHref}>
              {nav.home}
            </a>
            <a className="tabLink" href={`${homeHref}#features`}>
              {nav.features}
            </a>
            <a className="tabLink" href={`${homeHref}#downloaders`}>
              {nav.downloaders}
            </a>
            <a className="tabLink" href={`${homeHref}#how-it-works`}>
              {nav.howItWorks}
            </a>
            <a className="tabLink" href={`${homeHref}#faq`}>
              {nav.faq}
            </a>
            <a
              className="tabLink"
              data-active={active === 'support'}
              href={localePath(locale, '/support/')}
            >
              {nav.support}
            </a>
          </div>
        </div>

        <div className="localeSwitch" aria-label="Language" ref={localeLinksRef}>
          {locales.map((l) => (
            <a
              key={l}
              className="textButton"
              data-variant={l === locale ? 'primary' : 'secondary'}
              href={localePath(l, localeSwitchPath)}
              aria-current={l === locale ? 'page' : undefined}
            >
              {localeLabels[l]}
            </a>
          ))}
        </div>

        {useCompactLocalePicker ? (
          <div className="localePicker" ref={pickerRef}>
            <button
              type="button"
              className="textButton localePickerTrigger"
              data-variant="secondary"
              aria-expanded={isLocaleMenuOpen}
              aria-controls={localeMenuId}
              onClick={() => setIsLocaleMenuOpen((current) => !current)}
            >
              {localeLabels[locale]}
            </button>

            {isLocaleMenuOpen ? (
              <div className="localePickerMenu" id={localeMenuId} role="menu" aria-label="Language options">
                {locales.map((l) => (
                  <a
                    key={l}
                    className="textButton"
                    data-variant={l === locale ? 'primary' : 'secondary'}
                    href={localePath(l, localeSwitchPath)}
                    aria-current={l === locale ? 'page' : undefined}
                    role="menuitem"
                  >
                    {localeLabels[l]}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </nav>
  );
}
