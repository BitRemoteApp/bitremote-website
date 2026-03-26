import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  id?: string;
};

export function SectionLabel({ children, id }: Props) {
  return (
    <h2
      id={id}
      className="m-0 max-w-[24ch] text-[clamp(1.25rem,2vw,1.625rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-text-primary"
    >
      {children}
    </h2>
  );
}
