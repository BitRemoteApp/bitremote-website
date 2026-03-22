import type { Metadata } from 'next';

import { TextButton } from '@/components/TextButton';
import { LINKS } from '@/i18n/links';
import { defaultLocale, isLocale, type Locale } from '@/i18n/locales';
import { getMessages } from '@/i18n/messages';
import { localePath } from '@/i18n/urls';
import { buildMetadataForCurrentLocalePage } from '@/seo/metadata';
import { buildBreadcrumbSchema, serializeJsonLd } from '@/seo/schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const messages = getMessages(locale);

  return buildMetadataForCurrentLocalePage({
    locale,
    pathname: '/support/',
    messages,
    page: 'support',
  });
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const messages = getMessages(locale);
  const breadcrumbSchema = buildBreadcrumbSchema({
    locale,
    items: [
      { name: messages.nav.home, path: '/' },
      { name: messages.pages.support.title, path: '/support/' },
    ],
  });

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={serializeJsonLd(breadcrumbSchema)}
      />

      <section aria-label={messages.pages.support.title}>
        <p className="mt-0 text-text-secondary">{messages.pages.support.github}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <TextButton href={LINKS.github} target="_blank" rel="noreferrer">
            {messages.pages.support.githubButton}
          </TextButton>
        </div>

        <p className="mt-6 text-text-secondary">{messages.pages.support.body}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <TextButton href={LINKS.discord} target="_blank" rel="noreferrer">
            Discord
          </TextButton>
          <TextButton href={LINKS.telegram} target="_blank" rel="noreferrer">
            Telegram
          </TextButton>
          <TextButton href={LINKS.twitter} target="_blank" rel="noreferrer">
            Twitter
          </TextButton>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2">
          <TextButton href={LINKS.appStore} target="_blank" rel="noreferrer">
            {messages.cta.appStore}
          </TextButton>
          <TextButton href={localePath(locale, '/')} variant="secondary">
            {messages.nav.home}
          </TextButton>
        </div>
      </section>
    </main>
  );
}
