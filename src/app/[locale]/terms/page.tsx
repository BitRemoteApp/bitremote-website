import type { Metadata } from 'next';

import { TextButton } from '@/components/TextButton';
import { TextFrame } from '@/components/TextFrame';
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
    title: messages.pages.terms.title,
    alternates: {
      canonical: absoluteUrl(localePath(locale, '/terms/')),
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const messages = getMessages(locale);
  const href = locale === 'ja' ? messages.links.eulaJa : messages.links.eulaEn;

  return (
    <main className="container siteMain">
      <TextFrame title={messages.pages.terms.title} label="LEGAL_002">
        <p style={{ marginTop: 0, color: 'var(--ink-soft)' }}>{messages.pages.terms.body}</p>
        <div className="heroActions" style={{ marginTop: '0.75rem' }}>
          <TextButton href={href} target="_blank" rel="noreferrer">
            Open EULA
          </TextButton>
          <TextButton href={localePath(locale, '/')} variant="secondary">
            Back
          </TextButton>
        </div>
      </TextFrame>
    </main>
  );
}
