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
  const baseClassName =
    'inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-sm font-semibold leading-none no-underline transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:scale-[0.98]';
  const variantClassName =
    variant === 'secondary'
      ? 'border-border bg-[var(--button-secondary-bg)] text-text-primary shadow-none hover:border-[var(--button-secondary-border-hover)] hover:bg-[var(--button-secondary-bg-hover)]'
      : 'border-transparent bg-accent text-white shadow-[var(--button-primary-shadow)] hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--shadow-raise)]';

  return (
    <a
      className={`${baseClassName} ${variantClassName}`}
      href={href}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}
