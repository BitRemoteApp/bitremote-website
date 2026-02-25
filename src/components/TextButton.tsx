import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  target?: '_blank' | '_self';
  rel?: string;
};

export function TextButton({
  href,
  children,
  variant = 'primary',
  target,
  rel,
}: Props) {
  return (
    <a
      className="textButton"
      data-variant={variant}
      href={href}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}

