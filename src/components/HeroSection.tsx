import { BitRemoteWordmark } from '@/components/BitRemoteWordmark';
import { PlatformBadgeStrip } from '@/components/PlatformBadgeStrip';
import { TextButton } from '@/components/TextButton';
import { LINKS } from '@/i18n/links';

type Props = {
  tagline: string;
  subhead: string;
  ctaLabel: string;
  siteName: string;
};

export function HeroSection({ tagline, subhead, ctaLabel, siteName }: Props) {
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
      <BitRemoteWordmark />
      <h1 className="sr-only">{siteName}</h1>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(240px,0.75fr)] lg:items-end">
        <div className="flex flex-col gap-5">
          <p className="m-0 max-w-[14ch] text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-text-primary">
            {tagline}
          </p>

          <p className="m-0 max-w-[62ch] text-base leading-7 text-text-secondary">
            {subhead}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <TextButton href={LINKS.appStore} target="_blank" rel="noreferrer">
              {ctaLabel}
            </TextButton>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-border/70 bg-surface/70 p-4 sm:p-5">
          <PlatformBadgeStrip />
        </div>
      </div>
    </section>
  );
}
