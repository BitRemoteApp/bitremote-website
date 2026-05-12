import { locales, type Locale } from '@/i18n/locales';
import { absoluteUrl, localePath } from '@/i18n/urls';

export const localeStaticPaths = ['/', '/terms/'] as const;
export const localeLegalPaths = ['/terms/privacy/', '/terms/eula/', '/terms/scta/'] as const;
export const localeIndexedPaths = [...localeStaticPaths, ...localeLegalPaths] as const;

export function getLocalizedRouteEntries(): Array<{
  locale: Locale;
  pathname: (typeof localeIndexedPaths)[number];
  url: string;
}> {
  return locales.flatMap((locale) =>
    localeIndexedPaths.map((pathname) => ({
      locale,
      pathname,
      url: absoluteUrl(localePath(locale, pathname)),
    })),
  );
}
