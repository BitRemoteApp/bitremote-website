import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  as?: 'section' | 'div' | 'article';
  id?: string;
};

export function FadeInSection({ children, className, as: Tag = 'section', id }: Props) {
  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  );
}
