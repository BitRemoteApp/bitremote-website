import type { Metadata } from 'next';

import type { Downloader } from '@/domain/downloaders';
import {
  getAvailableDownloaderLandingLocales,
  type DownloaderLandingContent,
  type DownloaderLandingSlug,
} from '@/domain/downloader-landings';
import { localeLang, type Locale } from '@/i18n/locales';
import { absoluteUrl } from '@/i18n/urls';

const platforms = ['iPhone', 'iPad', 'Mac', 'iOS', 'iPadOS', 'macOS'] as const;

function buildDownloaderKeywords(downloader: Downloader, primaryKeyword: string): string[] {
  return [
    primaryKeyword,
    downloader,
    'BitRemote',
    ...platforms.map((platform) => `${downloader} ${platform}`),
  ];
}

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
    keywords: buildDownloaderKeywords(content.downloader, content.primaryKeyword),
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(
          availableLocales.map((candidateLocale) => [
            localeLang[candidateLocale],
            absoluteUrl(landingPath(candidateLocale, slug)),
          ]),
        ),
        'x-default': absoluteUrl(landingPath('en', slug)),
      },
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
