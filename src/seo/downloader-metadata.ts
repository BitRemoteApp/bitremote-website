import type { Metadata } from 'next';

import type { DownloaderLandingContent, DownloaderLandingSlug } from '@/domain/downloader-landings';
import { localeLang, locales, type Locale } from '@/i18n/locales';
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

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    keywords: [content.primaryKeyword, content.clientName, 'BitRemote'],
    alternates: {
      canonical,
      languages: Object.fromEntries(
        locales.map((candidateLocale) => [localeLang[candidateLocale], absoluteUrl(landingPath(candidateLocale, slug))]),
      ),
    },
    openGraph: {
      type: 'article',
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
