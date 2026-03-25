import type { Metadata } from 'next';

import { AppShowcaseClient } from '@/components/AppShowcaseClient';
import { BentoGridClient } from '@/components/BentoGridClient';
import { FaqAccordion } from '@/components/FaqAccordion';
import { HeroSection } from '@/components/HeroSection';
import { SectionLabel } from '@/components/SectionLabel';
import { SvgDivider } from '@/components/SvgDivider';
import { TextButton } from '@/components/TextButton';
import { FadeInSection } from '@/components/ui/FadeInSection';
import { supportedDownloaders } from '@/domain/downloaders';
import { LINKS } from '@/i18n/links';
import { defaultLocale, isLocale, type Locale } from '@/i18n/locales';
import { getMessages } from '@/i18n/messages';
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

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-16">
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

      <SvgDivider />

      <AppShowcaseClient />

      <SvgDivider />

      <FadeInSection as="section" id="features">
        <SectionLabel>{messages.sections.benefits.title}</SectionLabel>
        <div className="mt-4">
          <BentoGridClient items={messages.sections.benefits.items} />
        </div>
      </FadeInSection>

      <SvgDivider />

      <FadeInSection as="section" id="how-it-works">
        <SectionLabel>{messages.sections.quickstart.title}</SectionLabel>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {messages.sections.quickstart.steps.map((step, index) => (
            <div
              key={index}
              className="border border-border bg-surface rounded-md p-6"
            >
              <h3 className="m-0 mb-2 font-sans text-xl font-semibold leading-[1.2] text-text-primary">
                {step.title}
              </h3>
              <p className="m-0 text-text-secondary">{step.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 font-sans text-text-secondary">
          {messages.sections.quickstart.requirements}
        </p>
      </FadeInSection>

      <SvgDivider />

      <FadeInSection as="section" id="plus">
        <SectionLabel>{messages.sections.plus.title}</SectionLabel>
        <div className="mt-4">
          <h3 className="m-0 mb-2 font-sans text-xl font-semibold leading-[1.2] text-text-primary">
            {messages.sections.plus.frameTitle}
          </h3>
          <p className="mt-0 text-text-secondary">{messages.sections.plus.subtitle}</p>
          <ul className="m-0 list-disc pl-5">
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
      </FadeInSection>

      <SvgDivider />

      <FadeInSection as="section" id="faq">
        <SectionLabel>{messages.sections.faq.title}</SectionLabel>
        <div className="mt-4">
          <FaqAccordion items={messages.sections.faq.items} />
        </div>
      </FadeInSection>
    </main>
  );
}
