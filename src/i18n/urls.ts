import type { Locale } from './locales';

export function localeRoot(locale: Locale): string {
  return `/${locale}/`;
}

export function localePath(locale: Locale, path: string): string {
  if (path === '/') return localeRoot(locale);
  const trimmed = path.replace(/^\/+/, '').replace(/\/+$/, '');
  return `/${locale}/${trimmed}/`;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `https://bitremote.app${normalized}`;
}
