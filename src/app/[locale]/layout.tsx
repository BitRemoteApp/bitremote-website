import { TextTabsNav } from '@/components/TextTabsNav';
import { LINKS } from '@/i18n/links';
import { defaultLocale, isLocale, localeLang, locales, type Locale } from '@/i18n/locales';
import { getMessages } from '@/i18n/messages';
import { localePath } from '@/i18n/urls';

export const dynamicParams = false;

function FooterIcon({
  children,
  href,
  label,
}: Readonly<{
  children: React.ReactNode;
  href: string;
  label: string;
}>) {
  return (
    <a
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-text-secondary transition-colors duration-150 hover:bg-surface hover:text-text-primary"
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
      aria-label={label}
    >
      {children}
    </a>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.6 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.21-3.37-1.21-.46-1.2-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.1 0-1.13.39-2.05 1.03-2.78-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0 1 12 6.9c.85 0 1.7.12 2.5.37 1.9-1.34 2.74-1.06 2.74-1.06.55 1.42.2 2.47.1 2.73.64.73 1.03 1.65 1.03 2.78 0 3.97-2.34 4.84-4.58 5.09.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.59.69.49A10.2 10.2 0 0 0 22 12.26C22 6.6 17.52 2 12 2Z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M21.44 6.66c-.67.3-1.39.5-2.15.59a3.78 3.78 0 0 0 1.65-2.08 7.4 7.4 0 0 1-2.38.93 3.69 3.69 0 0 0-2.74-1.21 3.75 3.75 0 0 0-3.72 3.78c0 .3.03.58.1.86-3.1-.16-5.84-1.67-7.68-3.98a3.82 3.82 0 0 0-.5 1.9 3.79 3.79 0 0 0 1.66 3.15 3.65 3.65 0 0 1-1.69-.48v.05a3.77 3.77 0 0 0 2.99 3.71 3.63 3.63 0 0 1-1.68.07 3.73 3.73 0 0 0 3.48 2.65A7.42 7.42 0 0 1 3 18.53a10.43 10.43 0 0 0 5.7 1.7c6.83 0 10.57-5.77 10.57-10.78 0-.16 0-.33-.01-.49a7.66 7.66 0 0 0 1.84-1.96 7.3 7.3 0 0 1-2.11.6 3.8 3.8 0 0 0 1.61-2.1Z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M19.54 5.34A16.4 16.4 0 0 0 15.5 4l-.2.4c1.47.35 2.15.85 2.15.85a13.3 13.3 0 0 0-5.45-1.1 13.3 13.3 0 0 0-5.45 1.1s.72-.53 2.34-.88l-.14-.37a16.3 16.3 0 0 0-4.04 1.34C2.16 9.44 1.5 13.42 1.82 17.34A16.6 16.6 0 0 0 6.77 20l1.08-1.5c-1.87-.57-2.58-1.38-2.58-1.38.21.16.42.3.63.44a9.4 9.4 0 0 0 1.8.84c.98.34 2.04.51 3.12.5 1.08.01 2.15-.16 3.13-.5.62-.2 1.22-.49 1.8-.84.21-.14.42-.28.63-.44 0 0-.73.83-2.6 1.39L14.86 20a16.5 16.5 0 0 0 4.95-2.67c.38-4.54-.65-8.49-3.27-11.99ZM9.12 14.92c-.97 0-1.77-.9-1.77-2s.78-2 1.77-2c1 0 1.8.9 1.78 2 0 1.1-.79 2-1.78 2Zm5.76 0c-.97 0-1.77-.9-1.77-2s.78-2 1.77-2 1.8.9 1.78 2c0 1.1-.78 2-1.78 2Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M21.94 4.66c.26-1.16-.42-1.62-1.47-1.24L2.98 10.26c-1.14.46-1.12 1.1-.2 1.38l4.49 1.4 10.4-6.56c.49-.3.94-.14.57.2l-8.43 7.6-.32 4.73c.47 0 .68-.22.94-.48l2.18-2.16 4.54 3.42c.84.47 1.43.23 1.64-.79l3.15-14.34Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Zm1.52.32 7.02 5.38a.75.75 0 0 0 .92 0l7.02-5.38H4.52Z" />
    </svg>
  );
}

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

      <footer className="mt-auto border-t border-[var(--color-border-soft)] bg-surface/40 pb-10 pt-8 text-text-secondary">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-3 font-sans">
            <nav className="flex items-center" aria-label="Footer legal">
              <a
                className="inline-flex min-h-11 items-center rounded-full px-3 py-2 text-base text-text-secondary no-underline transition-colors duration-150 hover:text-text-primary"
                href={localePath(locale, '/terms/')}
              >
                {messages.pages.terms.title}
              </a>
            </nav>
            <div className="flex items-center gap-1">
              <FooterIcon href={LINKS.github} label="GitHub">
                <GithubIcon />
              </FooterIcon>
              <FooterIcon href={LINKS.twitter} label="Twitter">
                <TwitterIcon />
              </FooterIcon>
              <FooterIcon href={LINKS.discord} label="Discord">
                <DiscordIcon />
              </FooterIcon>
              <FooterIcon href={LINKS.telegram} label="Telegram">
                <TelegramIcon />
              </FooterIcon>
              <FooterIcon href={LINKS.email} label="Email">
                <MailIcon />
              </FooterIcon>
            </div>

            <div className="ml-auto text-base opacity-80">© 2026 Ark Studios LLC.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
