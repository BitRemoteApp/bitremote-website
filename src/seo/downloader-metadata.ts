import type { Metadata } from 'next';

import {
  getAvailableDownloaderLandingLocales,
  type DownloaderLandingContent,
  type DownloaderLandingSlug,
} from '@/domain/downloader-landings';
import { localeLang, type Locale } from '@/i18n/locales';
import { absoluteUrl } from '@/i18n/urls';

function landingPath(locale: Locale, slug: DownloaderLandingSlug): string {
  return `/${locale}/downloaders/${slug}/`;
}

export function buildDownloaderLandingMetadata({
  locale,
  slug,
  content,
}: {
  locale: Locale;
  slug: DownloaderLandingSlug;
  content: DownloaderLandingContent;
}): Metadata {
  const canonical = absoluteUrl(landingPath(locale, slug));
  const availableLocales = getAvailableDownloaderLandingLocales(slug);

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    keywords: [content.primaryKeyword, content.clientName, 'BitRemote'],
    alternates: {
      canonical,
      languages: Object.fromEntries(
        availableLocales.map((candidateLocale) => [
          localeLang[candidateLocale],
          absoluteUrl(landingPath(candidateLocale, slug)),
        ]),
      ),
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: content.seoTitle,
      description: content.seoDescription,
      siteName: 'BitRemote',
    },
    twitter: {
      card: 'summary',
      title: content.seoTitle,
      description: content.seoDescription,
    },
  };
}
