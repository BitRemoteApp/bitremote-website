import type { MetadataRoute } from 'next';

import { getDownloaderLandingEntries } from '@/domain/downloader-landings';
import { localeLang, locales } from '@/i18n/locales';
import { absoluteUrl, localePath } from '@/i18n/urls';
import { getLocalizedRouteEntries } from '@/seo/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl('/'),
    },
    ...getLocalizedRouteEntries().map(({ locale, pathname, url }) => ({
      url,
      alternates: {
        languages: Object.fromEntries(
          locales.map((candidateLocale) => [
            localeLang[candidateLocale],
            absoluteUrl(localePath(candidateLocale, pathname)),
          ]),
        ),
      },
    })),
    ...getDownloaderLandingEntries().map(({ locale, content }) => ({
      url: absoluteUrl(`/${locale}/downloaders/${content.slug}/`),
      alternates: {
        languages: {
          [localeLang[locale]]: absoluteUrl(`/${locale}/downloaders/${content.slug}/`),
        },
      },
    })),
  ];
}
