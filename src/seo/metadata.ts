import type { Metadata } from 'next';

import type { Messages } from '@/i18n/messages';
import { localeLang, locales, type Locale } from '@/i18n/locales';
import { absoluteUrl, localePath } from '@/i18n/urls';

type SeoPage = keyof Messages['seo'];

const openGraphLocaleByLocale: Record<Locale, string> = {
  en: 'en_US',
  ja: 'ja_JP',
  'zh-hans': 'zh_CN',
  'zh-hant': 'zh_TW',
};

function buildLanguageAlternates(pathname: string): Record<string, string> {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [localeLang[locale], absoluteUrl(localePath(locale, pathname))]),
    ),
    'x-default': absoluteUrl('/'),
  };
}

export function buildMetadataForCurrentLocalePage({
  locale,
  pathname,
  messages,
  page,
}: {
  locale: Locale;
  pathname: string;
  messages: Messages;
  page: SeoPage;
}): Metadata {
  const seo = messages.seo[page];
  const canonical = absoluteUrl(localePath(locale, pathname));

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(pathname),
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: messages.site.name,
      locale: openGraphLocaleByLocale[locale],
      alternateLocale: locales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => openGraphLocaleByLocale[candidate]),
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: absoluteUrl('/opengraph.jpg'),
          width: 3544,
          height: 1772,
          alt: messages.site.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [absoluteUrl('/opengraph.jpg')],
    },
  };
}
