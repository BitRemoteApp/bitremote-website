import type { Messages } from '@/i18n/messages';
import { LINKS } from '@/i18n/links';
import { localeLang, type Locale } from '@/i18n/locales';
import { absoluteUrl, localePath } from '@/i18n/urls';

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function serializeJsonLd(schema: object): { __html: string } {
  return {
    __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
  };
}

export function buildSoftwareApplicationSchema({
  locale,
  messages,
  supportedClients,
}: {
  locale: Locale;
  messages: Messages;
  supportedClients: readonly string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: messages.site.name,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'iOS 26.0, iPadOS 26.0, macOS 26.0 or later',
    inLanguage: localeLang[locale],
    description: messages.seo.home.description,
    url: absoluteUrl(localePath(locale, '/')),
    downloadUrl: LINKS.appStore,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      ...messages.sections.benefits.items.map((item) => item.title),
      ...supportedClients,
    ],
    sameAs: [LINKS.appStore, LINKS.github],
  };
}

export function buildFaqPageSchema(messages: Messages) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: messages.sections.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function buildBreadcrumbSchema({
  locale,
  items,
}: {
  locale: Locale;
  items: BreadcrumbItem[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localePath(locale, item.path)),
    })),
  };
}
