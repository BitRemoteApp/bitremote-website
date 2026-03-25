import type { Metadata } from 'next';

import { BitRemoteWordmark } from '@/components/BitRemoteWordmark';
import { TextButton } from '@/components/TextButton';
import { LINKS } from '@/i18n/links';
import { localeLabels, localeLang, locales } from '@/i18n/locales';
import { absoluteUrl, localePath, localeRoot } from '@/i18n/urls';

const description =
  'Choose your language to learn about BitRemote, the remote download manager app for NAS, seedbox, and home server workflows on Apple devices.';

export const metadata: Metadata = {
  title: 'BitRemote',
  description,
  keywords: ['bitremote', 'remote download manager app', 'nas download app'],
  alternates: {
    canonical: 'https://bitremote.app/',
    languages: {
      ...Object.fromEntries(
        locales.map((locale) => [localeLang[locale], absoluteUrl(localePath(locale, '/'))]),
      ),
      'x-default': 'https://bitremote.app/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://bitremote.app/',
    title: 'BitRemote',
    description,
    siteName: 'BitRemote',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'BitRemote',
    description,
  },
};

export default function RootPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-12">
      <div className="max-w-3xl">
        <BitRemoteWordmark />
      </div>
      <h1 className="sr-only">BitRemote</h1>

      <p className="mt-6 max-w-[62ch] text-base leading-7 text-text-secondary">
        Select a language to continue.
      </p>

      <div className="mt-8">
        <div className="grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
          {locales.map((l) => (
            <a
              key={l}
              className="group flex min-h-14 items-center justify-between rounded-[1.5rem] border border-border/70 bg-surface/75 px-5 py-4 font-sans text-base font-semibold text-text-primary no-underline transition-[border-color,background-color,transform] duration-150 hover:border-accent/30 hover:bg-surface hover:-translate-y-0.5 active:bg-surface"
              href={localeRoot(l)}
            >
              <span>
                {localeLabels[l]}
              </span>
              <span aria-hidden="true" className="text-sm text-text-secondary transition-colors duration-150 group-hover:text-accent">
                →
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <TextButton href={LINKS.appStore} target="_blank" rel="noreferrer">
          App Store
        </TextButton>
      </div>
    </main>
  );
}
