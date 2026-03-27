export type PlatformId = 'iphone' | 'ipad' | 'mac';

export type PlatformItem = {
  id: PlatformId;
  label: string;
  version: string;
};

type Props = {
  items: readonly PlatformItem[];
};

const PLATFORM_ICON_PATHS = {
  iphone: '/icons/platform/iphone.svg',
  ipad: '/icons/platform/ipad.svg',
  mac: '/icons/platform/mac.svg',
} as const;

export function PlatformBadgeStrip({ items }: Props) {
  return (
    <div className="flex h-full flex-nowrap items-center justify-between gap-2.5">
      {items.map((item) => (
        <span
          key={item.id}
          className="group relative inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[var(--button-secondary-bg)] transition-[background-color,border-color,translate] duration-200 ease-out hover:border-[var(--color-border-soft)] hover:bg-surface hover:-translate-y-0.5 focus-within:border-[var(--color-border-soft)] focus-within:bg-surface"
        >
          <span className="inline-flex h-full w-full items-center justify-center text-accent">
            <span
              aria-hidden="true"
              className="h-4 w-4 bg-current"
              style={{
                WebkitMaskImage: `url(${PLATFORM_ICON_PATHS[item.id as keyof typeof PLATFORM_ICON_PATHS] ?? PLATFORM_ICON_PATHS.iphone})`,
                maskImage: `url(${PLATFORM_ICON_PATHS[item.id as keyof typeof PLATFORM_ICON_PATHS] ?? PLATFORM_ICON_PATHS.iphone})`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
              }}
            />
          </span>

          <span className="pointer-events-none absolute bottom-[calc(100%+0.6rem)] left-1/2 z-10 min-w-max -translate-x-1/2 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--bg-glass-95)] px-3 py-2 opacity-0 shadow-[0_18px_40px_rgba(15,23,42,0.12)] transition-[opacity,translate] duration-150 ease-out group-hover:-translate-y-1 group-hover:opacity-100 group-focus-within:-translate-y-1 group-focus-within:opacity-100">
            <span className="block whitespace-nowrap text-sm font-semibold leading-tight text-text-primary">{item.label}</span>
            <span className="mt-1 block whitespace-nowrap text-xs font-medium leading-tight text-text-secondary">{item.version}</span>
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-[var(--color-border-soft)] bg-[var(--bg-glass-95)]"
            />
          </span>
        </span>
      ))}
    </div>
  );
}
