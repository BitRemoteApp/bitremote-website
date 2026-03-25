const PLATFORMS = ['iPhone & iPad', 'Mac'] as const;

export function PlatformBadgeStrip() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {PLATFORMS.map((label) => (
        <span
          key={label}
          className="inline-flex min-h-10 items-center rounded-full border border-border/80 bg-[var(--button-secondary-bg)] px-4 py-2 text-sm font-medium leading-none text-text-secondary"
        >
          {label}
        </span>
      ))}
    </div>
  );
}
