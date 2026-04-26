export const defaultLocale = 'en' as const;

export const locales = ['en', 'ja', 'zh-hans', 'zh-hant'] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  ja: '日本語',
  'zh-hans': '简体中文',
  'zh-hant': '繁體中文',
};

/** BCP 47 language tags for use in HTML `lang` attributes. */
export const localeLang: Record<Locale, string> = {
  en: 'en',
  ja: 'ja',
  'zh-hans': 'zh-Hans',
  'zh-hant': 'zh-Hant',
};

/** Region-based hreflang tags used for search crawler compatibility. */
export const localeHreflang: Record<Locale, string> = {
  en: 'en',
  ja: 'ja',
  'zh-hans': 'zh-CN',
  'zh-hant': 'zh-TW',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
