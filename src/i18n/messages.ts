import type { Locale } from './locales';

import en from '@/messages/en.json';
import ja from '@/messages/ja.json';
import zhHans from '@/messages/zh-hans.json';
import zhHant from '@/messages/zh-hant.json';

export type Messages = typeof en;

const MESSAGES_BY_LOCALE: Record<Locale, Messages> = {
  en,
  ja,
  'zh-hans': zhHans,
  'zh-hant': zhHant,
};

export function getMessages(locale: Locale): Messages {
  return MESSAGES_BY_LOCALE[locale];
}

