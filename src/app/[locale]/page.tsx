import type { Metadata } from 'next';

import { AsciiPanel } from '@/ascii-panel';
import { BitRemoteWordmark } from '@/components/BitRemoteWordmark';
import { FaqAccordion } from '@/components/FaqAccordion';
import { TextButton } from '@/components/TextButton';
import { TextFrame } from '@/components/TextFrame';
import { TextSeparator } from '@/components/TextSeparator';
import { supportedDownloaders } from '@/domain/downloaders';
import {
  downloaderSlugByDownloader,
  getDownloaderLandingContent,
} from '@/domain/downloader-landings';
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

  const benefits = messages.sections.benefits.items;
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

      <section
        className="grid grid-cols-1 items-stretch gap-5 min-[980px]:grid-cols-[1.05fr_0.95fr] min-[980px]:gap-8"
        id="top"
      >
        <div className="flex h-full flex-col">
          <BitRemoteWordmark />
          <h1 className="sr-only">{messages.site.name}</h1>

          <div className="min-h-4 grow-[2]" aria-hidden="true" />

          <p className="m-0 text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em]">
            {messages.site.tagline}
          </p>

          <div className="min-h-3 grow" aria-hidden="true" />

          <p className="m-0 max-w-[62ch] text-ink-soft">{messages.hero.subhead}</p>

          <div className="min-h-5 grow-[4]" aria-hidden="true" />

          <div
            className="mb-6 grid gap-[0.35rem] border border-blue-line bg-[var(--bg-glass-92)] px-3 py-3 font-mono"
            aria-label={messages.sections.downloaders.title}
          >
            <div className="text-xs uppercase tracking-[0.14em] text-blue-strong">
              [{messages.sections.downloaders.title}]
            </div>
            <div className="grid gap-1 text-[0.85rem] leading-[1.35] tracking-[0.06em] text-ink-soft [overflow-wrap:anywhere]">
              {supportedDownloaders.map((client) => {
                const slug = downloaderSlugByDownloader[client];
                const landingContent = slug ? getDownloaderLandingContent(locale, slug) : undefined;

                if (!landingContent || !slug) {
                  return (
                    <div key={client} className="opacity-90">
                      - {client}
                    </div>
                  );
                }

                return (
                  <a
                    key={client}
                    className="opacity-90 text-inherit no-underline transition-colors hover:text-blue-strong active:text-blue-strong"
                    href={localePath(locale, `/downloaders/${slug}/`)}
                  >
                    - {client}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <TextButton href={LINKS.appStore} target="_blank" rel="noreferrer">
              {messages.cta.appStore}
            </TextButton>
          </div>
        </div>

        <AsciiPanel />
      </section>

      <TextSeparator />

      <section id="features">
        <h2 className="m-0 font-mono text-base uppercase tracking-[0.12em] text-blue-strong">
          {messages.sections.benefits.title}
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 min-[900px]:grid-cols-2">
          {benefits.map((b, index) => {
            const subtitle = b.subtitle;

            return (
              <TextFrame
                key={b.id}
                title={b.title}
                label={`FIG_${String(index + 1).padStart(3, '0')}`}
              >
                <p className="m-0 text-ink-soft">{subtitle}</p>
              </TextFrame>
            );
          })}
        </div>
      </section>

      <TextSeparator />

      <section id="how-it-works">
        <h2 className="m-0 font-mono text-base uppercase tracking-[0.12em] text-blue-strong">
          {messages.sections.quickstart.title}
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 min-[900px]:grid-cols-2">
          {messages.sections.quickstart.steps.map((step, index) => (
            <TextFrame key={step.title} title={step.title} label={`STEP_${index + 1}`}>
              <p className="m-0 text-ink-soft">{step.body}</p>
            </TextFrame>
          ))}
        </div>
        <p className="mt-[0.9rem] font-mono tracking-[0.04em] text-ink-soft">
          {messages.sections.quickstart.requirements}
        </p>
      </section>

      <TextSeparator />

      <section id="plus">
        <h2 className="m-0 mb-4 font-mono text-base uppercase tracking-[0.12em] text-blue-strong">
          {messages.sections.plus.title}
        </h2>
        <TextFrame title={messages.sections.plus.frameTitle} label="PLUS_001">
          <p className="mt-0 text-ink-soft">{messages.sections.plus.subtitle}</p>
          <ul className="m-0 list-disc pl-5">
            {messages.sections.plus.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <p className="mb-0 mt-[0.9rem] font-mono tracking-[0.04em] text-ink-soft">
            {messages.sections.plus.note}
          </p>
        </TextFrame>
      </section>

      <TextSeparator />

      <section id="faq">
        <h2 className="m-0 font-mono text-base uppercase tracking-[0.12em] text-blue-strong">
          {messages.sections.faq.title}
        </h2>
        <div className="mt-4">
          <FaqAccordion items={messages.sections.faq.items} />
        </div>
      </section>
    </main>
  );
}
