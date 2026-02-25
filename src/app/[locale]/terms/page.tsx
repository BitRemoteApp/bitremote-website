import type { Metadata } from 'next';

import { TextButton } from '@/components/TextButton';
import { TextFrame } from '@/components/TextFrame';
import { eulaUrl } from '@/i18n/links';
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
  const href = eulaUrl(locale);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-16">
      <TextFrame title={messages.pages.terms.title} label="LEGAL_002">
        <p className="mt-0 text-ink-soft">{messages.pages.terms.body}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
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
