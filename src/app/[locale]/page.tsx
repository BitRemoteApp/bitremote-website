import type { Metadata } from 'next';

import { AsciiSplitPanel } from '@/components/AsciiSplitPanel';
import { BitRemoteWordmark } from '@/components/BitRemoteWordmark';
import { FaqAccordion } from '@/components/FaqAccordion';
import { TextButton } from '@/components/TextButton';
import { TextFrame } from '@/components/TextFrame';
import { TextSeparator } from '@/components/TextSeparator';
import { defaultLocale, isLocale, type Locale } from '@/i18n/locales';
import { getMessages } from '@/i18n/messages';
import { absoluteUrl, localePath } from '@/i18n/urls';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const messages = getMessages(locale);

  return {
    title: messages.site.name,
    description: messages.site.description,
    alternates: {
      canonical: absoluteUrl(localePath(locale, '/')),
    },
  };
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

  return (
    <main className="container siteMain">
      <section className="hero" id="top">
        <div>
          <BitRemoteWordmark />
          <h1 className="srOnly">{messages.site.name}</h1>

          <p className="heroHeading" aria-label={messages.site.tagline}>
            {messages.site.tagline}
          </p>
          <p className="heroSubhead">{messages.hero.subhead}</p>

          <div className="heroActions">
            <TextButton href={messages.links.appStore} target="_blank" rel="noreferrer">
              {messages.cta.appStore}
            </TextButton>
            <TextButton href="#downloaders" variant="secondary">
              {messages.cta.supportedDownloaders}
            </TextButton>
          </div>
        </div>

        <AsciiSplitPanel
          imageSrc="/assets/screenshots/tasks-iphone.png"
          imageAlt="BitRemote tasks view screenshot"
          captionLeft={messages.hero.splitCaptionLeft}
          captionRight={messages.hero.splitCaptionRight}
        />
      </section>

      <TextSeparator />

      <section id="features">
        <div className="sectionTitleRow">
          <h2 className="sectionTitle">{messages.sections.benefits.title}</h2>
        </div>

        <div className="grid2">
          {benefits.map((b, index) => (
            <TextFrame key={b.id} title={b.title} label={`FIG_${String(index + 1).padStart(3, '0')}`}>
              <p style={{ margin: 0, color: 'var(--ink-soft)' }}>{b.subtitle}</p>
            </TextFrame>
          ))}
        </div>
      </section>

      <TextSeparator />

      <section id="downloaders">
        <h2 className="sectionTitle">{messages.sections.downloaders.title}</h2>
        <TextFrame title={messages.sections.downloaders.title} label="SPEC_001">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            {messages.sections.downloaders.items.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </TextFrame>
      </section>

      <TextSeparator />

      <section id="how-it-works">
        <h2 className="sectionTitle">{messages.sections.howItWorks.title}</h2>
        <div className="grid2" style={{ marginTop: '1rem' }}>
          {messages.sections.howItWorks.steps.map((step, index) => (
            <TextFrame key={step.title} title={step.title} label={`STEP_${index + 1}`}>
              <p style={{ margin: 0, color: 'var(--ink-soft)' }}>{step.body}</p>
            </TextFrame>
          ))}
        </div>
        <p className="mono" style={{ marginTop: '0.9rem', color: 'var(--ink-soft)' }}>
          {messages.sections.howItWorks.requirements}
        </p>
      </section>

      <TextSeparator />

      <section id="plus">
        <h2 className="sectionTitle">{messages.sections.plus.title}</h2>
        <TextFrame title={messages.sections.plus.title} label="PLUS_001">
          <p style={{ marginTop: 0, color: 'var(--ink-soft)' }}>
            {messages.sections.plus.subtitle}
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            {messages.sections.plus.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <p className="mono" style={{ marginBottom: 0, marginTop: '0.9rem', color: 'var(--ink-soft)' }}>
            {messages.sections.plus.note}
          </p>
        </TextFrame>
      </section>

      <TextSeparator />

      <section id="faq">
        <h2 className="sectionTitle">{messages.sections.faq.title}</h2>
        <div style={{ marginTop: '1rem' }}>
          <FaqAccordion items={messages.sections.faq.items} />
        </div>
        <div className="heroActions" style={{ marginTop: '1rem' }}>
          <TextButton href={localePath(locale, '/support/')} variant="secondary">
            {messages.nav.support}
          </TextButton>
        </div>
      </section>
    </main>
  );
}
