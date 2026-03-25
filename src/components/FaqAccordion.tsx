type Item = {
  q: string;
  a: string;
};

type Props = {
  items: Item[];
};

export function FaqAccordion({ items }: Props) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details
          key={item.q}
          className="rounded-[1.25rem] border border-border bg-surface px-5 py-4 transition-[background-color,border-color,box-shadow] duration-150 hover:border-[var(--button-secondary-border-hover)] open:bg-surface-alt"
        >
          <summary className="cursor-pointer list-none font-sans text-base font-semibold leading-[1.35] text-text-primary marker:hidden">
            <span className="flex items-start justify-between gap-4">
              <span>{item.q}</span>
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-[var(--button-secondary-bg)] text-base font-medium leading-none text-text-secondary transition-colors duration-150"
              >
                +
              </span>
            </span>
          </summary>
          <div className="mt-3 max-w-[66ch] pr-10 text-text-secondary">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
