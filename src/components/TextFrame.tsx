import { useId, type ReactNode } from 'react';

type Props = {
  title: string;
  label?: string;
  children: ReactNode;
};

export function TextFrame({ title, label, children }: Props) {
  const titleId = useId();

  return (
    <section className="border border-blue-line bg-transparent" aria-labelledby={titleId}>
      <header className="flex items-center justify-between gap-4 border-b border-blue-line px-4 py-3">
        <div id={titleId} className="font-mono text-[0.9rem] uppercase tracking-[0.1em] text-blue-strong">
          {title}
        </div>
        {label ? (
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
            {label}
          </div>
        ) : null}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}
