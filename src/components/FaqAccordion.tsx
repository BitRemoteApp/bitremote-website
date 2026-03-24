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
        <details key={item.q} className="border border-border bg-surface rounded-md px-6 py-4 transition-colors duration-150 open:bg-surface-alt">
          <summary className="group cursor-pointer font-sans uppercase tracking-wide text-text-primary">
            <span className="inline-flex items-center px-[0.45rem] py-[0.15rem] transition-colors duration-150 group-hover:bg-accent group-hover:text-bg group-active:bg-accent group-active:text-bg">
              {item.q}
            </span>
          </summary>
          <div className="mt-2 text-text-secondary">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
