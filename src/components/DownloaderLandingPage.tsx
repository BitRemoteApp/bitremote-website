import { TextButton } from '@/components/TextButton';
import { TextFrame } from '@/components/TextFrame';
import { TextSeparator } from '@/components/TextSeparator';
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
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-blue-strong">
          [{content.downloader}]
        </div>
        <h1 className="m-0 text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em]">
          {content.heroTitle}
        </h1>
        <p className="m-0 max-w-[70ch] text-ink-soft">{content.heroBody}</p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <TextButton href={LINKS.appStore} target="_blank" rel="noreferrer">
            {messages.cta.appStore}
          </TextButton>
          <TextButton href={localePath(locale, '/')} variant="secondary">
            {messages.nav.home}
          </TextButton>
        </div>
      </section>

      <TextSeparator />

      <section>
        <TextFrame title={content.overviewTitle} label="DLP_001">
          <p className="m-0 text-ink-soft">{content.overviewBody}</p>
        </TextFrame>
      </section>

      <TextSeparator />

      <section className="grid grid-cols-1 gap-4 min-[900px]:grid-cols-2">
        <TextFrame title={content.capabilityTitle} label="DLP_002">
          <ul className="m-0 list-disc pl-5 text-ink-soft">
            {content.capabilityItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </TextFrame>

        <TextFrame title={content.useCaseTitle} label="DLP_003">
          <ul className="m-0 list-disc pl-5 text-ink-soft">
            {content.useCaseItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </TextFrame>
      </section>
    </main>
  );
}
