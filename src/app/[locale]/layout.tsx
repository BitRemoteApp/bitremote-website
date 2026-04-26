import { SiteChrome } from '@/components/SiteChrome';
import { defaultLocale, isLocale, locales, type Locale } from '@/i18n/locales';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return <SiteChrome locale={locale}>{children}</SiteChrome>;
}
