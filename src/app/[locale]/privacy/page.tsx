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
    title: messages.pages.privacy.title,
    alternates: {
      canonical: absoluteUrl(localePath(locale, '/privacy/')),
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const messages = getMessages(locale);
  const href = locale === 'ja' ? messages.links.privacyPolicyJa : messages.links.privacyPolicyEn;

  return (
    <main className="container siteMain">
      <TextFrame title={messages.pages.privacy.title} label="LEGAL_001">
        <p style={{ marginTop: 0, color: 'var(--ink-soft)' }}>{messages.pages.privacy.body}</p>
        <div className="heroActions" style={{ marginTop: '0.75rem' }}>
          <TextButton href={href} target="_blank" rel="noreferrer">
            Open policy
          </TextButton>
          <TextButton href={localePath(locale, '/')} variant="secondary">
            Back
          </TextButton>
        </div>
      </TextFrame>
    </main>
  );
}
