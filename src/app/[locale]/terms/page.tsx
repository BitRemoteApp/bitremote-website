import type { Metadata } from 'next';

import { FadeInSection } from '@/components/ui/FadeInSection';
import { eulaUrl, privacyPolicyUrl } from '@/i18n/links';
import { defaultLocale, isLocale, type Locale } from '@/i18n/locales';
import { getMessages } from '@/i18n/messages';
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
  const eulaHref = eulaUrl(locale);
  const privacyHref = privacyPolicyUrl(locale);
  const breadcrumbSchema = buildBreadcrumbSchema({
    locale,
    items: [
      { name: messages.nav.home, path: '/' },
      { name: messages.pages.terms.title, path: '/terms/' },
    ],
  });

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-16 pt-6 md:px-8 md:pt-8 lg:px-8 lg:pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={serializeJsonLd(breadcrumbSchema)}
      />

      <FadeInSection as="div">
        <section aria-label={messages.pages.terms.title}>
          <h1 className="m-0 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-text-primary">
            {messages.pages.terms.title}
          </h1>
          <p className="mb-0 mt-5 text-base leading-7 text-text-secondary">
            {messages.pages.terms.body.split('\n').map((line, index) => (
              <span key={`${line}-${index}`} className="block">
                {line}
              </span>
            ))}
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <a
              href={privacyHref}
              target="_blank"
              rel="noreferrer"
              className="group relative block rounded-[1.5rem] border border-[var(--color-border-soft)] bg-surface/70 p-6 text-inherit no-underline transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-border-soft)_72%,var(--color-text-primary))] hover:bg-surface"
            >
              <span
                aria-hidden="true"
                className="absolute right-6 top-6 text-lg leading-none text-text-secondary transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-text-primary"
              >
                →
              </span>
              <h2 className="m-0 text-lg font-semibold tracking-[-0.02em] text-text-primary">
                {messages.pages.terms.privacyTitle}
              </h2>
              <p className="mb-0 mt-3 text-sm leading-6 text-text-secondary">
                {messages.pages.terms.privacyBody}
              </p>
            </a>

            <a
              href={eulaHref}
              target="_blank"
              rel="noreferrer"
              className="group relative block rounded-[1.5rem] border border-[var(--color-border-soft)] bg-surface/70 p-6 text-inherit no-underline transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-border-soft)_72%,var(--color-text-primary))] hover:bg-surface"
            >
              <span
                aria-hidden="true"
                className="absolute right-6 top-6 text-lg leading-none text-text-secondary transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-text-primary"
              >
                →
              </span>
              <h2 className="m-0 text-lg font-semibold tracking-[-0.02em] text-text-primary">
                {messages.pages.terms.eulaTitle}
              </h2>
              <p className="mb-0 mt-3 text-sm leading-6 text-text-secondary">
                {messages.pages.terms.eulaBody}
              </p>
            </a>
          </div>
        </section>
      </FadeInSection>
    </main>
  );
}
