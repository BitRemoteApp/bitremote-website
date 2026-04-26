import type { Metadata } from 'next';

import { TextButton } from '@/components/TextButton';
import { supportedDownloaders } from '@/domain/downloaders';
import { LINKS } from '@/i18n/links';
import { defaultLocale, localeHreflang, localeLabels, localeLang, locales } from '@/i18n/locales';
import { getMessages } from '@/i18n/messages';
import { absoluteUrl, localeRoot } from '@/i18n/urls';
import {
  buildSoftwareApplicationSchema,
  serializeJsonLd,
} from '@/seo/schema';

const messages = getMessages(defaultLocale);

export const metadata: Metadata = {
  title: messages.seo.languageSelector.title,
  description: messages.seo.languageSelector.description,
  keywords: messages.seo.languageSelector.keywords,
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
    title: messages.seo.languageSelector.title,
    description: messages.seo.languageSelector.description,
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
    title: messages.seo.languageSelector.title,
    description: messages.seo.languageSelector.description,
    images: [absoluteUrl('/opengraph.jpg')],
  },
};

export default function RootPage() {
  const softwareApplicationSchema = buildSoftwareApplicationSchema({
    locale: defaultLocale,
    messages,
    supportedDownloaders,
  });

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center gap-10 px-6 py-16 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={serializeJsonLd(softwareApplicationSchema)}
      />

      <section className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(17rem,0.55fr)] md:items-end">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <h1 className="m-0 max-w-none text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-text-primary">
              <span className="mb-3 block text-[0.3em] font-medium tracking-[-0.02em] text-[color-mix(in_srgb,var(--color-text-secondary)_30%,var(--color-accent))]">
                {messages.site.name}
              </span>
              <span className="block">{messages.site.tagline}</span>
            </h1>
            <p className="m-0 max-w-[62ch] text-base leading-7 text-text-secondary">
              {messages.seo.languageSelector.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <TextButton href={LINKS.appStore} target="_blank" rel="noreferrer" leadingIcon="apple">
              {messages.cta.appStore}
            </TextButton>
            <TextButton href={localeRoot(defaultLocale)} variant="secondary">
              {messages.nav.home}
            </TextButton>
          </div>
        </div>

        <nav aria-label={messages.nav.language} className="grid gap-2">
          {locales.map((locale) => (
            <a
              key={locale}
              href={localeRoot(locale)}
              hrefLang={localeHreflang[locale]}
              lang={localeLang[locale]}
              className="inline-flex min-h-14 items-center justify-between rounded-[1.25rem] border border-border bg-surface px-5 py-3 font-sans text-base font-medium text-text-primary no-underline transition-[background-color,border-color,translate] duration-150 hover:-translate-y-0.5 hover:border-[var(--button-secondary-border-hover)] hover:bg-[var(--button-secondary-bg-hover)]"
            >
              <span>{localeLabels[locale]}</span>
              <span aria-hidden="true" className="text-text-secondary">→</span>
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}