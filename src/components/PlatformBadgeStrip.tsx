const PLATFORMS = ['iPhone & iPad', 'Mac'] as const;

export function PlatformBadgeStrip() {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {PLATFORMS.map((label) => (
        <span
          key={label}
          className="border border-border rounded-sm px-2 py-[0.15rem] font-sans text-sm uppercase tracking-wide text-text-muted"
        >
          {label}
        </span>
      ))}
    </div>
  );
}
