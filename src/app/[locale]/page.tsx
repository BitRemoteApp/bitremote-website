import type { Metadata } from 'next';

import { AppShowcaseClient } from '@/components/AppShowcaseClient';
import { BentoGridClient } from '@/components/BentoGridClient';
import { FaqAccordion } from '@/components/FaqAccordion';
import { HeroSection } from '@/components/HeroSection';
import { SectionLabel } from '@/components/SectionLabel';
import { TextButton } from '@/components/TextButton';
import { FadeInSection } from '@/components/ui/FadeInSection';
import { downloaderSlugByDownloader } from '@/domain/downloader-landings';
import { supportedDownloaders } from '@/domain/downloaders';
import { LINKS } from '@/i18n/links';
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
  const downloaderLinks = supportedDownloaders.map((downloader) => ({
    downloader,
    href: localePath(locale, `/downloaders/${downloaderSlugByDownloader[downloader]}/`),
  }));

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-20 md:gap-20">
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
        />
      </FadeInSection>

      <FadeInSection
        as="section"
        className="rounded-[2rem] border border-border/70 bg-surface/70 px-5 py-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:px-8 sm:py-8"
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <div className="max-w-2xl">
            <SectionLabel>{messages.site.name}</SectionLabel>
            <p className="mt-4 max-w-[60ch] text-base leading-6 text-text-secondary">
              {messages.site.description}
            </p>
          </div>

          <AppShowcaseClient />
        </div>
      </FadeInSection>

      <FadeInSection as="section" id="downloaders">
        <div className="flex flex-col gap-6">
          <div className="max-w-2xl">
            <SectionLabel>{messages.sections.downloaders.title}</SectionLabel>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {downloaderLinks.map(({ downloader, href }) => (
              <a
                key={downloader}
                className="group flex min-h-28 flex-col justify-between rounded-[1.5rem] border border-border/70 bg-surface/70 p-5 no-underline transition-colors duration-150 hover:bg-surface hover:text-text-primary active:bg-surface"
                href={href}
              >
                <span className="text-sm font-medium text-accent">{messages.sections.downloaders.title}</span>
                <span className="text-lg font-semibold leading-6 text-text-primary">{downloader}</span>
                <span className="text-sm text-text-secondary transition-colors duration-150 group-hover:text-text-primary">
                  {messages.site.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </FadeInSection>

      <FadeInSection as="section" id="features">
        <div className="flex flex-col gap-4">
          <SectionLabel>{messages.sections.benefits.title}</SectionLabel>
          <div>
            <BentoGridClient items={messages.sections.benefits.items} />
          </div>
        </div>
      </FadeInSection>

      <FadeInSection as="section" id="how-it-works">
        <div className="flex flex-col gap-6">
          <div className="max-w-2xl">
            <SectionLabel>{messages.sections.quickstart.title}</SectionLabel>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {messages.sections.quickstart.steps.map((step, index) => (
              <div
                key={index}
                className="rounded-[1.5rem] border border-border/70 bg-surface/70 p-6"
              >
                <p className="m-0 mb-3 text-sm font-medium text-accent">0{index + 1}</p>
                <h3 className="m-0 mb-2 font-sans text-xl font-semibold leading-[1.2] text-text-primary">
                  {step.title}
                </h3>
                <p className="m-0 text-text-secondary">{step.body}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm text-text-secondary">
            {messages.sections.quickstart.requirements}
          </p>
        </div>
      </FadeInSection>

      <FadeInSection as="section" id="plus">
        <div className="rounded-[2rem] border border-border/70 bg-surface/70 px-5 py-6 sm:px-8 sm:py-8">
          <SectionLabel>{messages.sections.plus.title}</SectionLabel>
          <div className="mt-4 max-w-3xl">
            <h3 className="m-0 mb-2 font-sans text-xl font-semibold leading-[1.2] text-text-primary">
              {messages.sections.plus.frameTitle}
            </h3>
            <p className="mt-0 text-text-secondary">{messages.sections.plus.subtitle}</p>
            <ul className="m-0 list-disc pl-5 text-text-primary">
              {messages.sections.plus.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mb-0 mt-4 font-sans text-text-secondary">
              {messages.sections.plus.note}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
              <TextButton href={LINKS.appStore} target="_blank" rel="noreferrer">
                {messages.cta.appStore}
              </TextButton>
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
