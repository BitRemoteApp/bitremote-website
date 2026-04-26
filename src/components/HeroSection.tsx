import Image from 'next/image';

import { PlatformBadgeStrip } from '@/components/PlatformBadgeStrip';
import type { PlatformId, PlatformItem } from '@/components/PlatformBadgeStrip';
import { TextButton } from '@/components/TextButton';
import { LINKS } from '@/i18n/links';

type Props = {
  tagline: string;
  subhead: string;
  ctaLabel: string;
  siteName: string;
  platforms: readonly {
    id: string;
    label: string;
    version: string;
  }[];
};

export function HeroSection({ tagline, subhead, ctaLabel, siteName, platforms }: Props) {
  const platformFootnote = 'iOS • iPadOS • macOS 26.0+';
  const platformItems: readonly PlatformItem[] = platforms.map((platform) => ({
    ...platform,
    id: (['iphone', 'ipad', 'mac'].includes(platform.id) ? platform.id : 'iphone') as PlatformId,
  }));

  return (
    <section className="relative flex flex-col gap-8 lg:gap-10">
      {/* Ambient glow — decorative only */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -top-16 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] max-w-[700px] aspect-[2/1]"
          style={{
            background: 'radial-gradient(ellipse at center, var(--hero-glow-color) 0%, transparent 70%)',
            filter: 'blur(48px)',
          }}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-[minmax(0,1.1fr)_minmax(180px,0.72fr)] sm:items-stretch lg:grid-cols-[minmax(0,1.25fr)_minmax(240px,0.75fr)]">
        <div className="flex h-full flex-col justify-between gap-6">
          <div className="flex flex-col gap-5">
            <h1 className="m-0 max-w-none text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-text-primary">
              <span className="mb-3 block text-[0.3em] font-medium tracking-[-0.02em] text-[color-mix(in_srgb,var(--color-text-secondary)_30%,var(--color-accent))]">
                {siteName}
              </span>
              <span className="block">{tagline}</span>
            </h1>

            <p className="m-0 max-w-[62ch] text-base leading-7 text-text-secondary">
              {subhead}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <TextButton href={LINKS.appStore} target="_blank" rel="noreferrer" leadingIcon="apple" dataHeroCta>
              {ctaLabel}
            </TextButton>
          </div>

          <p className="m-0 text-sm leading-6 text-text-muted sm:hidden">
            {platformFootnote}
          </p>
        </div>

        <div className="hidden h-full gap-4 sm:flex sm:flex-col sm:items-center sm:justify-start sm:justify-self-end lg:ml-auto lg:justify-between">
          <div className="block">
            <Image
              src="/icons/app-icon-light.png"
              alt={`${siteName} app icon`}
              width={96}
              height={96}
              className="block h-[13rem] w-[13rem] dark:hidden [filter:drop-shadow(0_0_0.7px_rgba(148,163,184,0.52))] md:h-[14.58rem] md:w-[14.58rem] lg:h-[17.82rem] lg:w-[17.82rem]"
            />
            <Image
              src="/icons/app-icon-dark.png"
              alt={`${siteName} app icon`}
              width={96}
              height={96}
              className="hidden h-[13rem] w-[13rem] dark:block md:h-[14.58rem] md:w-[14.58rem] lg:h-[17.82rem] lg:w-[17.82rem]"
            />
          </div>

          <div className="mt-auto flex h-11 w-fit max-w-[12rem] items-center rounded-full border border-[var(--color-border-soft)] bg-surface/70 px-3 sm:max-w-[12.75rem] sm:px-3.5 lg:max-w-[12.75rem]">
            <PlatformBadgeStrip items={platformItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
