import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  id?: string;
};

export function SectionLabel({ children, id }: Props) {
  return (
    <h2
      id={id}
      className="m-0 font-sans text-base uppercase tracking-wide text-accent"
    >
      {children}
    </h2>
  );
}
