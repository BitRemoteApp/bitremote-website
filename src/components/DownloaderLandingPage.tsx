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
  const cardClassName =
    'rounded-[1.75rem] border border-[var(--color-border-soft)] bg-surface shadow-[0_16px_36px_rgba(15,23,42,0.05)]';

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-16 md:gap-16 md:px-8 lg:px-8">
      <section className={`grid grid-cols-1 gap-6 px-6 py-8 sm:px-8 ${cardClassName}`}>
        <div className="inline-flex w-fit items-center rounded-full border border-[color-mix(in_srgb,var(--color-border-soft)_80%,var(--color-accent))] bg-[color-mix(in_srgb,var(--color-accent)_8%,var(--color-bg))] px-3 py-1 text-sm font-semibold text-[color-mix(in_srgb,var(--color-accent)_82%,var(--color-text-primary))]">
          {content.downloader}
        </div>
        <h1 className="m-0 text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.03em] text-text-primary">
          {content.heroTitle}
        </h1>
        <p className="m-0 max-w-[70ch] text-base leading-7 text-text-secondary">{content.heroBody}</p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <TextButton href={LINKS.appStore} target="_blank" rel="noreferrer" leadingIcon="apple">
            {messages.cta.appStore}
          </TextButton>
          <TextButton href={localePath(locale, '/')} variant="secondary">
            {messages.nav.home}
          </TextButton>
        </div>
      </section>

      <section className={`p-6 ${cardClassName}`}>
        <section aria-label={content.overviewTitle}>
          <h2 className="m-0 text-xl font-semibold tracking-[-0.02em] text-text-primary">
            {content.overviewTitle}
          </h2>
          <p className="mb-0 mt-4 text-base leading-7 text-text-secondary">{content.overviewBody}</p>
        </section>
      </section>

      <section className="grid grid-cols-1 gap-4 min-[900px]:grid-cols-2">
        <section
          aria-label={content.capabilityTitle}
          className={`p-6 ${cardClassName}`}
        >
          <h2 className="m-0 mb-4 text-xl font-semibold text-text-primary">{content.capabilityTitle}</h2>
          <ul className="m-0 list-none space-y-3 p-0 text-text-secondary">
            {content.capabilityItems.map((item) => (
              <li
                key={item}
                className="rounded-[1.1rem] border border-[var(--color-border-soft)] bg-[color-mix(in_srgb,var(--color-surface-alt)_36%,var(--color-surface))] px-4 py-3 text-sm leading-6"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-label={content.useCaseTitle}
          className={`p-6 ${cardClassName}`}
        >
          <h2 className="m-0 mb-4 text-xl font-semibold text-text-primary">{content.useCaseTitle}</h2>
          <ul className="m-0 list-none space-y-3 p-0 text-text-secondary">
            {content.useCaseItems.map((item) => (
              <li
                key={item}
                className="rounded-[1.1rem] border border-[var(--color-border-soft)] bg-[color-mix(in_srgb,var(--color-surface-alt)_36%,var(--color-surface))] px-4 py-3 text-sm leading-6"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
