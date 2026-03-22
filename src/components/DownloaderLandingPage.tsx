import { TextButton } from '@/components/TextButton';
import type { DownloaderLandingContent } from '@/domain/downloader-landings';
import { LINKS } from '@/i18n/links';
import type { Messages } from '@/i18n/messages';
import type { Locale } from '@/i18n/locales';
import { localePath } from '@/i18n/urls';

export function DownloaderLandingPage({
  locale,
  messages,
  content,
}: {
  locale: Locale;
  messages: Messages;
  content: DownloaderLandingContent;
}) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-16">
      <section className="grid grid-cols-1 gap-5">
        <div className="font-sans text-xs uppercase tracking-wider text-accent">
          [{content.downloader}]
        </div>
        <h1 className="m-0 text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em]">
          {content.heroTitle}
        </h1>
        <p className="m-0 max-w-[70ch] text-text-secondary">{content.heroBody}</p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <TextButton href={LINKS.appStore} target="_blank" rel="noreferrer">
            {messages.cta.appStore}
          </TextButton>
          <TextButton href={localePath(locale, '/')} variant="secondary">
            {messages.nav.home}
          </TextButton>
        </div>
      </section>

      <hr className="border-t border-border my-12" />

      <section>
        <section aria-label={content.overviewTitle}>
          <p className="m-0 text-text-secondary">{content.overviewBody}</p>
        </section>
      </section>

      <hr className="border-t border-border my-12" />

      <section className="grid grid-cols-1 gap-4 min-[900px]:grid-cols-2">
        <section aria-label={content.capabilityTitle}>
          <ul className="m-0 list-disc pl-5 text-text-secondary">
            {content.capabilityItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-label={content.useCaseTitle}>
          <ul className="m-0 list-disc pl-5 text-text-secondary">
            {content.useCaseItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
