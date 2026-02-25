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
        <details key={item.q} className="border border-blue-line bg-transparent px-4 py-3">
          <summary className="group cursor-pointer font-mono uppercase tracking-[0.1em] text-fg">
            <span className="inline-flex items-center px-[0.45rem] py-[0.15rem] transition-colors duration-150 group-hover:bg-blue-strong group-hover:text-bg group-active:bg-blue-strong group-active:text-bg">
              {item.q}
            </span>
          </summary>
          <div className="mt-2 text-ink-soft">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
