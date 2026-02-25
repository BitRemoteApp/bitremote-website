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
    title: messages.pages.support.title,
    alternates: {
      canonical: absoluteUrl(localePath(locale, '/support/')),
    },
  };
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const messages = getMessages(locale);

  return (
    <main className="container siteMain">
      <TextFrame title={messages.pages.support.title} label="HELP_001">
        <p style={{ marginTop: 0, color: 'var(--ink-soft)' }}>{messages.pages.support.body}</p>

        <div className="heroActions" style={{ marginTop: '0.75rem' }}>
          <TextButton href={messages.links.discord} target="_blank" rel="noreferrer">
            Discord
          </TextButton>
          <TextButton href={messages.links.telegram} target="_blank" rel="noreferrer">
            Telegram
          </TextButton>
          <TextButton href={messages.links.twitter} target="_blank" rel="noreferrer">
            Twitter
          </TextButton>
        </div>

        <div className="heroActions" style={{ marginTop: '1.25rem' }}>
          <TextButton href={messages.links.appStore} target="_blank" rel="noreferrer">
            {messages.cta.appStore}
          </TextButton>
          <TextButton href={localePath(locale, '/')} variant="secondary">
            {messages.nav.home}
          </TextButton>
        </div>
      </TextFrame>
    </main>
  );
}
