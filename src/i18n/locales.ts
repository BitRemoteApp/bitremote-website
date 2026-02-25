export const defaultLocale = 'en' as const;

export const locales = ['en', 'ja', 'zh-hans', 'zh-hant'] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  ja: '日本語',
  'zh-hans': '简体中文',
  'zh-hant': '繁體中文',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

