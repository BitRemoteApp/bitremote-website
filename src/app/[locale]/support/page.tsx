import type { Metadata } from 'next';

import { TextButton } from '@/components/TextButton';
import { TextFrame } from '@/components/TextFrame';
import { LINKS } from '@/i18n/links';
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
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-16">
      <TextFrame title={messages.pages.support.title} label="HELP_001">
        <p className="mt-0 text-ink-soft">{messages.pages.support.github}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <TextButton href={LINKS.githubIssues} target="_blank" rel="noreferrer">
            {messages.pages.support.githubButton}
          </TextButton>
        </div>

        <p className="mt-6 text-ink-soft">{messages.pages.support.body}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <TextButton href={LINKS.discord} target="_blank" rel="noreferrer">
            Discord
          </TextButton>
          <TextButton href={LINKS.telegram} target="_blank" rel="noreferrer">
            Telegram
          </TextButton>
          <TextButton href={LINKS.twitter} target="_blank" rel="noreferrer">
            Twitter
          </TextButton>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2">
          <TextButton href={LINKS.appStore} target="_blank" rel="noreferrer">
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
