import type { Metadata } from 'next';

import { HomeView } from '@/components/HomeView';
import { SiteChrome } from '@/components/SiteChrome';
import { defaultLocale, localeHreflang, locales, type Locale } from '@/i18n/locales';
import { getMessages } from '@/i18n/messages';
import { absoluteUrl, localeRoot } from '@/i18n/urls';

const openGraphLocaleByLocale: Record<Locale, string> = {
  en: 'en_US',
  ja: 'ja_JP',
  'zh-hans': 'zh_CN',
  'zh-hant': 'zh_TW',
};

const messages = getMessages(defaultLocale);

export const metadata: Metadata = {
  title: messages.seo.home.title,
  description: messages.seo.home.description,
  keywords: messages.seo.home.keywords,
  alternates: {
    canonical: absoluteUrl('/'),
    languages: {
      ...Object.fromEntries(
        locales.map((locale) => [localeHreflang[locale], absoluteUrl(localeRoot(locale))]),
      ),
      'x-default': absoluteUrl('/'),
    },
  },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/'),
    siteName: messages.site.name,
    locale: openGraphLocaleByLocale[defaultLocale],
    alternateLocale: locales
      .filter((candidate) => candidate !== defaultLocale)
      .map((candidate) => openGraphLocaleByLocale[candidate]),
    title: messages.seo.home.title,
    description: messages.seo.home.description,
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
    title: messages.seo.home.title,
    description: messages.seo.home.description,
    images: [absoluteUrl('/opengraph.jpg')],
  },
};

export default function RootPage() {
  return (
    <SiteChrome locale={defaultLocale}>
      <HomeView locale={defaultLocale} />
    </SiteChrome>
  );
}
