import type { Metadata } from 'next';

import { TextTabsNav } from '@/components/TextTabsNav';
import { defaultLocale, isLocale, locales, type Locale } from '@/i18n/locales';
import { getMessages } from '@/i18n/messages';
import { absoluteUrl, localePath } from '@/i18n/urls';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const messages = getMessages(locale);

  return {
    title: messages.site.name,
    description: messages.site.description,
    alternates: {
      canonical: absoluteUrl(localePath(locale, '/')),
      languages: {
        en: absoluteUrl(localePath('en', '/')),
        ja: absoluteUrl(localePath('ja', '/')),
        'zh-Hans': absoluteUrl(localePath('zh-hans', '/')),
        'zh-Hant': absoluteUrl(localePath('zh-hant', '/')),
      },
    },
  };
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
    <div className="site" data-locale={locale}>
      <TextTabsNav
        locale={locale}
        messages={messages}
        active="none"
        localeSwitchPath="/"
      />

      {children}

      <footer className="siteFooter">
        <div className="container">
          <div className="siteFooterRow">
            <div className="mono">
              <span style={{ color: 'var(--blue-strong)' }}>BitRemote</span>{' '}
              <span style={{ opacity: 0.85 }}>/ iOS · iPadOS · macOS</span>
            </div>

            <div className="mono" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href={localePath(locale, '/privacy/')}>{messages.pages.privacy.title}</a>
              <a href={localePath(locale, '/terms/')}>{messages.pages.terms.title}</a>
              <a href={localePath(locale, '/support/')}>{messages.pages.support.title}</a>
            </div>
          </div>

          <div className="siteFooterRow" style={{ marginTop: '0.75rem' }}>
            <div className="mono" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href={messages.links.twitter} target="_blank" rel="noreferrer">
                Twitter
              </a>
              <a href={messages.links.discord} target="_blank" rel="noreferrer">
                Discord
              </a>
              <a href={messages.links.telegram} target="_blank" rel="noreferrer">
                Telegram
              </a>
            </div>

            <div className="mono" style={{ opacity: 0.8 }}>
              © 2026 Ark Studios LLC.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
