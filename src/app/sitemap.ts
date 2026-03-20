import type { MetadataRoute } from 'next';

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
  ];
}
