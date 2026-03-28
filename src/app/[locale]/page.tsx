import type { Metadata } from 'next';

import { AppShowcaseClient } from '@/components/AppShowcaseClient';
import { DownloaderOrbitSection } from '@/components/DownloaderOrbitSection';
import { FaqAccordion } from '@/components/FaqAccordion';
import { HeroSection } from '@/components/HeroSection';
import { SectionLabel } from '@/components/SectionLabel';
import { FadeInSection } from '@/components/ui/FadeInSection';
import { downloaderSlugByDownloader } from '@/domain/downloader-landings';
import { supportedDownloaders } from '@/domain/downloaders';
import { defaultLocale, isLocale, type Locale } from '@/i18n/locales';
import { getMessages } from '@/i18n/messages';
import { localePath } from '@/i18n/urls';
import { buildMetadataForCurrentLocalePage } from '@/seo/metadata';
import {
  buildFaqPageSchema,
  buildSoftwareApplicationSchema,
  serializeJsonLd,
} from '@/seo/schema';

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
    pathname: '/',
    messages,
    page: 'home',
  });
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const messages = getMessages(locale);

  const softwareApplicationSchema = buildSoftwareApplicationSchema({
    locale,
    messages,
    supportedDownloaders,
  });
  const faqPageSchema = buildFaqPageSchema(messages);
  const downloaderTints: Record<string, { primary: string; secondary: string }> = {
    aria2: { primary: '#3a3a3a', secondary: '#7a7a7a' },
    qBittorrent: { primary: '#4f88d6', secondary: '#b8daf7' },
    Transmission: { primary: '#a61e1e', secondary: '#a9adb4' },
    'Synology Download Station': { primary: '#f39a17', secondary: '#ffbf57' },
    'QNAP Download Station': { primary: '#46c24a', secondary: '#c7f06e' },
  };
  const downloaderLinks = supportedDownloaders.map((downloader) => ({
    downloader,
    href: localePath(locale, `/downloaders/${downloaderSlugByDownloader[downloader]}/`),
  }));

  return (
    <main id="main-content" className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-4 md:gap-20 md:px-8 md:pt-5 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={serializeJsonLd(softwareApplicationSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={serializeJsonLd(faqPageSchema)}
      />

      <FadeInSection as="div" id="top">
        <HeroSection
          tagline={messages.site.tagline}
          subhead={messages.hero.subhead}
          ctaLabel={messages.cta.appStore}
          siteName={messages.site.name}
          platforms={messages.hero.platforms}
        />
      </FadeInSection>

      <AppShowcaseClient
        id="feature"
        title={messages.sections.benefits.title}
        items={messages.sections.benefits.items}
      />

      <div className="sm:mb-32">
        <DownloaderOrbitSection
          title={messages.sections.downloaders.title}
          description={messages.sections.downloaders.description}
          items={messages.sections.downloaders.items}
          downloaderLinks={downloaderLinks}
          downloaderTints={downloaderTints}
        />
      </div>

      <FadeInSection as="section" id="how-it-works">
        <div className="flex flex-col gap-6">
          <SectionLabel>{messages.sections.quickstart.title}</SectionLabel>

          <div className="relative mt-4 sm:mt-5">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--color-border-soft)_90%,transparent)_12%,color-mix(in_srgb,var(--color-border-soft)_90%,transparent)_88%,transparent)] sm:left-0 sm:right-0 sm:top-[1.1rem] sm:h-px sm:w-auto sm:bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-border-soft)_90%,transparent)_12%,color-mix(in_srgb,var(--color-border-soft)_90%,transparent)_88%,transparent)]"
            />

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {messages.sections.quickstart.steps.map((step, index) => (
              <div key={index} className="relative grid grid-cols-[2.3rem_minmax(0,1fr)] gap-4 sm:block">
                <div className="relative z-[1] flex h-9 w-9 items-center justify-center self-start rounded-full border border-[var(--color-border-soft)] bg-[color-mix(in_srgb,var(--color-surface)_92%,var(--color-bg))] text-sm font-semibold text-accent shadow-[0_10px_24px_rgba(15,23,42,0.06)] sm:mx-auto">
                  0{index + 1}
                </div>

                <div className="pt-0.5 sm:pt-6 sm:text-center">
                  <h3 className="m-0 font-sans text-[1.4rem] font-semibold leading-[1.15] tracking-[-0.025em] text-text-primary">
                    {step.title}
                  </h3>
                  <p className="m-0 mt-2 max-w-[34ch] text-base leading-7 text-text-secondary sm:mx-auto">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection as="section" id="faq">
        <div className="flex flex-col gap-4">
          <SectionLabel>{messages.sections.faq.title}</SectionLabel>
          <div>
            <FaqAccordion items={messages.sections.faq.items} />
          </div>
        </div>
      </FadeInSection>
    </main>
  );
}
