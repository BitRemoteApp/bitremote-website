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
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-16 md:gap-16">
      <section className="grid grid-cols-1 gap-6 rounded-[2rem] border border-border/70 bg-surface/75 px-6 py-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:px-8">
        <div className="inline-flex w-fit items-center rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
          {content.downloader}
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

      <section className="rounded-[1.75rem] border border-border/70 bg-surface/75 p-6 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
        <section aria-label={content.overviewTitle}>
          <p className="m-0 text-text-secondary">{content.overviewBody}</p>
        </section>
      </section>

      <section className="grid grid-cols-1 gap-4 min-[900px]:grid-cols-2">
        <section
          aria-label={content.capabilityTitle}
          className="rounded-[1.75rem] border border-border/70 bg-surface/75 p-6 shadow-[0_14px_36px_rgba(15,23,42,0.05)]"
        >
          <h2 className="m-0 mb-4 text-xl font-semibold text-text-primary">{content.capabilityTitle}</h2>
          <ul className="m-0 list-disc pl-5 text-text-secondary">
            {content.capabilityItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section
          aria-label={content.useCaseTitle}
          className="rounded-[1.75rem] border border-border/70 bg-surface/75 p-6 shadow-[0_14px_36px_rgba(15,23,42,0.05)]"
        >
          <h2 className="m-0 mb-4 text-xl font-semibold text-text-primary">{content.useCaseTitle}</h2>
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
