import type { Metadata } from 'next';

import { TextButton } from '@/components/TextButton';
import { FadeInSection } from '@/components/ui/FadeInSection';
import { eulaUrl } from '@/i18n/links';
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
    pathname: '/terms/',
    messages,
    page: 'terms',
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const messages = getMessages(locale);
  const href = eulaUrl(locale);
  const breadcrumbSchema = buildBreadcrumbSchema({
    locale,
    items: [
      { name: messages.nav.home, path: '/' },
      { name: messages.pages.terms.title, path: '/terms/' },
    ],
  });

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={serializeJsonLd(breadcrumbSchema)}
      />

      <FadeInSection as="div">
        <section aria-label={messages.pages.terms.title}>
          <p className="mt-0 text-text-secondary">{messages.pages.terms.body}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <TextButton href={href} target="_blank" rel="noreferrer">
              Open EULA
            </TextButton>
            <TextButton href={localePath(locale, '/')} variant="secondary">
              Back
            </TextButton>
          </div>
        </section>
      </FadeInSection>
    </main>
  );
}
