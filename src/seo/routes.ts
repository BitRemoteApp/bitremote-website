import { locales, type Locale } from '@/i18n/locales';
import { absoluteUrl, localePath } from '@/i18n/urls';

export const localeStaticPaths = ['/', '/privacy/', '/terms/', '/support/'] as const;

export function getLocalizedRouteEntries(): Array<{
  locale: Locale;
  pathname: (typeof localeStaticPaths)[number];
  url: string;
}> {
  return locales.flatMap((locale) =>
    localeStaticPaths.map((pathname) => ({
      locale,
      pathname,
      url: absoluteUrl(localePath(locale, pathname)),
    })),
  );
}
