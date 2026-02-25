import type { Metadata } from 'next';

import { TextButton } from '@/components/TextButton';
import { TextFrame } from '@/components/TextFrame';
import { privacyPolicyUrl } from '@/i18n/links';
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
  const href = privacyPolicyUrl(locale);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-16">
      <TextFrame title={messages.pages.privacy.title} label="LEGAL_001">
        <p className="mt-0 text-ink-soft">{messages.pages.privacy.body}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
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
