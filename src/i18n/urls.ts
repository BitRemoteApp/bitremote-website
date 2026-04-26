import { defaultLocale, type Locale } from './locales';

export function localePath(locale: Locale, path: string): string {
  if (path === '' || path === '/') {
    return locale === defaultLocale ? '/' : `/${locale}/`;
  }
  const trimmed = path.replace(/^\/+/, '').replace(/\/+$/, '');
  return `/${locale}/${trimmed}/`;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `https://bitremote.app${normalized}`;
}
