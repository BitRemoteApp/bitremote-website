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
    <div className="flex min-h-screen flex-col gap-9" data-locale={locale} lang={localeLang[locale]}>
      <TextTabsNav
        locale={locale}
        messages={messages}
      />

      {children}

      <footer className="border-t border-blue-line pb-10 pt-6 text-ink-soft">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 font-mono tracking-[0.04em]">
            <nav className="flex flex-wrap items-center gap-x-3 gap-y-2" aria-label="Footer">
              <a
                className="inline-flex items-center px-[0.4rem] py-[0.15rem] text-blue-strong no-underline transition-colors duration-150 hover:bg-blue-strong hover:text-bg active:bg-blue-strong active:text-bg"
                href={localePath(locale, '/support/')}
              >
                {messages.pages.support.title}
              </a>
              <span aria-hidden="true" className="opacity-50">
                |
              </span>
              <a
                className="inline-flex items-center px-[0.4rem] py-[0.15rem] text-blue-strong no-underline transition-colors duration-150 hover:bg-blue-strong hover:text-bg active:bg-blue-strong active:text-bg"
                href={localePath(locale, '/privacy/')}
              >
                {messages.pages.privacy.title}
              </a>
              <span aria-hidden="true" className="opacity-50">
                |
              </span>
              <a
                className="inline-flex items-center px-[0.4rem] py-[0.15rem] text-blue-strong no-underline transition-colors duration-150 hover:bg-blue-strong hover:text-bg active:bg-blue-strong active:text-bg"
                href={localePath(locale, '/terms/')}
              >
                {messages.pages.terms.title}
              </a>
            </nav>

            <div className="opacity-80">© 2026 Ark Studios LLC.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
