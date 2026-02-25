import type { ReactNode } from 'react';

type Props = {
  title: string;
  label?: string;
  children: ReactNode;
};

export function TextFrame({ title, label, children }: Props) {
  return (
    <section className="frame">
      <header className="frameHeader">
        <div className="frameTitle">{title}</div>
        {label ? <div className="frameLabel">{label}</div> : null}
      </header>
      <div className="frameBody">{children}</div>
    </section>
  );
}

