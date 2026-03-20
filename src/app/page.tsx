import type { Metadata } from 'next';

import { BitRemoteWordmark } from '@/components/BitRemoteWordmark';
import { TextButton } from '@/components/TextButton';
import { LINKS } from '@/i18n/links';
import { localeLabels, locales } from '@/i18n/locales';
import { localeRoot } from '@/i18n/urls';

export const metadata: Metadata = {
  title: 'BitRemote | Remote Download Manager App',
  description:
    'Choose your language to learn about BitRemote, the remote download manager app for NAS, seedbox, and home server workflows on Apple devices.',
  keywords: ['bitremote', 'remote download manager app', 'nas download app'],
  alternates: {
    canonical: 'https://bitremote.app/',
  },
  openGraph: {
    type: 'website',
    url: 'https://bitremote.app/',
    title: 'BitRemote | Remote Download Manager App',
    description:
      'Choose your language to learn about BitRemote, the remote download manager app for NAS, seedbox, and home server workflows on Apple devices.',
    siteName: 'BitRemote',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'BitRemote | Remote Download Manager App',
    description:
      'Choose your language to learn about BitRemote, the remote download manager app for NAS, seedbox, and home server workflows on Apple devices.',
  },
};

export default function RootPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-12">
      <BitRemoteWordmark />
      <h1 className="sr-only">BitRemote</h1>

      <p className="mt-4 max-w-[62ch] text-ink-soft">Select a language to continue.</p>

      <div className="mt-5 flex justify-center">
        <div className="table border-separate border-spacing-x-0 border-spacing-y-2">
          {locales.map((l) => (
            <a
              key={l}
              className="group table-row font-mono text-sm uppercase tracking-[0.08em] text-blue-strong no-underline select-none"
              href={localeRoot(l)}
            >
              <span
                aria-hidden="true"
                className="table-cell w-[1ch] py-[0.15rem] text-left text-current opacity-70 transition-opacity group-hover:bg-blue-strong group-hover:text-bg group-hover:opacity-100 group-active:bg-blue-strong group-active:text-bg group-active:opacity-100"
              >
                [
              </span>
              <span className="table-cell py-[0.15rem] px-[0.55ch] text-center transition-colors group-hover:bg-blue-strong group-hover:text-bg group-active:bg-blue-strong group-active:text-bg">
                {localeLabels[l]}
              </span>
              <span
                aria-hidden="true"
                className="table-cell w-[1ch] py-[0.15rem] text-right text-current opacity-70 transition-opacity group-hover:bg-blue-strong group-hover:text-bg group-hover:opacity-100 group-active:bg-blue-strong group-active:text-bg group-active:opacity-100"
              >
                ]
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
