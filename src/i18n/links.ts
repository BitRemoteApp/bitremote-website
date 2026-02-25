import type { Locale } from './locales';

export const LINKS = {
  appStore: 'https://apps.apple.com/app/id6477765303',
  twitter: 'https://twitter.com/bitremote',
  discord: 'https://discord.gg/x5TP2z6cFj',
  telegram: 'https://t.me/bitremote',
  githubIssues: 'https://github.com/BitRemoteApp/bitremote-website/issues',
} as const;

const LEGAL_LINKS = {
  privacyPolicy: {
    en: 'https://arkstudios.co.jp/en/privacy/bitremote',
    ja: 'https://arkstudios.co.jp/ja/privacy/bitremote',
  },
  eula: {
    en: 'https://arkstudios.co.jp/en/eula/bitremote',
    ja: 'https://arkstudios.co.jp/ja/eula/bitremote',
  },
} as const;

export function privacyPolicyUrl(locale: Locale): string {
  return locale === 'ja' ? LEGAL_LINKS.privacyPolicy.ja : LEGAL_LINKS.privacyPolicy.en;
}

export function eulaUrl(locale: Locale): string {
  return locale === 'ja' ? LEGAL_LINKS.eula.ja : LEGAL_LINKS.eula.en;
}
