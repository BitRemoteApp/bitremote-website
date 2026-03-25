import { TextTabsNav } from '@/components/TextTabsNav';
import { defaultLocale, isLocale, localeLang, locales, type Locale } from '@/i18n/locales';
import { getMessages } from '@/i18n/messages';
import { localePath } from '@/i18n/urls';

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
  const messages = getMessages(locale);

  return (
    <div className="flex min-h-screen flex-col gap-12" data-locale={locale} lang={localeLang[locale]}>
      <TextTabsNav
        locale={locale}
        messages={messages}
      />

      {children}

      <footer className="mt-auto border-t border-border/80 bg-surface/40 pb-10 pt-8 text-text-secondary">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex flex-col gap-5 font-sans md:flex-row md:items-center md:justify-between">
            <nav className="flex flex-wrap items-center gap-2" aria-label="Footer">
              <a
                className="inline-flex min-h-11 items-center rounded-full px-4 py-2 text-text-secondary no-underline transition-colors duration-150 hover:bg-surface hover:text-text-primary active:bg-surface"
                href={localePath(locale, '/support/')}
              >
                {messages.pages.support.title}
              </a>
              <a
                className="inline-flex min-h-11 items-center rounded-full px-4 py-2 text-text-secondary no-underline transition-colors duration-150 hover:bg-surface hover:text-text-primary active:bg-surface"
                href={localePath(locale, '/privacy/')}
              >
                {messages.pages.privacy.title}
              </a>
              <a
                className="inline-flex min-h-11 items-center rounded-full px-4 py-2 text-text-secondary no-underline transition-colors duration-150 hover:bg-surface hover:text-text-primary active:bg-surface"
                href={localePath(locale, '/terms/')}
              >
                {messages.pages.terms.title}
              </a>
            </nav>

            <div className="text-sm opacity-80">© 2026 Ark Studios LLC.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
