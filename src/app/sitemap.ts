import type { MetadataRoute } from 'next';

import {
  getAvailableDownloaderLandingLocales,
  getDownloaderLandingEntries,
} from '@/domain/downloader-landings';
import { localeLang, locales } from '@/i18n/locales';
import { absoluteUrl, localePath } from '@/i18n/urls';
import { getLocalizedRouteEntries } from '@/seo/routes';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl('/'),
      lastModified,
    },
    {
      url: absoluteUrl('/llms.txt'),
      lastModified,
    },
    {
      url: absoluteUrl('/llms-full.txt'),
      lastModified,
    },
    ...getLocalizedRouteEntries().map(({ locale, pathname, url }) => ({
      url,
      lastModified,
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
      lastModified,
      alternates: {
        languages: Object.fromEntries(
          getAvailableDownloaderLandingLocales(content.slug).map((candidateLocale) => [
            localeLang[candidateLocale],
            absoluteUrl(`/${candidateLocale}/downloaders/${content.slug}/`),
          ]),
        ),
      },
    })),
  ];
}
