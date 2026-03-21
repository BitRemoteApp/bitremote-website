import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DownloaderLandingPage } from '@/components/DownloaderLandingPage';
import {
  downloaderLandingSlugs,
  getDownloaderLandingContent,
  getDownloaderLandingEntries,
  type DownloaderLandingSlug,
} from '@/domain/downloader-landings';
import { defaultLocale, isLocale, type Locale } from '@/i18n/locales';
import { getMessages } from '@/i18n/messages';
import { buildBreadcrumbSchema, serializeJsonLd } from '@/seo/schema';
import { buildDownloaderLandingMetadata } from '@/seo/downloader-metadata';

export function generateStaticParams() {
  return getDownloaderLandingEntries().map(({ locale, content }) => ({
    locale,
    slug: content.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug: rawSlug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const slug = downloaderLandingSlugs.find((candidate) => candidate === rawSlug);

  if (!slug) {
    return {};
  }

  const content = getDownloaderLandingContent(locale, slug);
  if (!content) {
    return {};
  }

  return buildDownloaderLandingMetadata({
    locale,
    slug,
    content,
  });
}

export default async function DownloaderLandingRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug: rawSlug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const messages = getMessages(locale);
  const slug = downloaderLandingSlugs.find((candidate) => candidate === rawSlug) as
    | DownloaderLandingSlug
    | undefined;

  if (!slug) {
    notFound();
  }

  const content = getDownloaderLandingContent(locale, slug);
  if (!content) {
    notFound();
  }

  const breadcrumbSchema = buildBreadcrumbSchema({
    locale,
    items: [
      { name: messages.nav.home, path: '/' },
      { name: messages.sections.downloaders.title, path: '/' },
      { name: content.downloader, path: `/downloaders/${content.slug}/` },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={serializeJsonLd(breadcrumbSchema)}
      />
      <DownloaderLandingPage
        locale={locale}
        messages={messages}
        content={content}
      />
    </>
  );
}
