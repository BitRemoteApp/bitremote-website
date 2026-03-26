export function BitRemoteWordmark() {
  return (
    <div className="inline-flex max-w-full flex-col gap-3 text-left" aria-hidden="true">
      <div className="inline-flex w-fit items-center gap-3 rounded-full border border-border/80 bg-[var(--wordmark-surface)] px-3 py-2 shadow-[var(--shadow-card)]">
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="text-[clamp(2rem,4vw,3.375rem)] font-semibold leading-none tracking-[-0.055em] text-text-primary">
          BitRemote
        </span>
      </div>
      <span className="pl-1 text-sm font-medium leading-[1.3] text-text-secondary">
        Remote download management for Apple devices
      </span>
    </div>
  );
}
