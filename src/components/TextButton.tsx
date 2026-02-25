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
    'group inline-flex items-center px-[0.45rem] py-[0.15rem] font-mono text-sm uppercase tracking-[0.08em] no-underline select-none transition duration-150 hover:bg-blue-strong hover:text-bg active:scale-[0.97] active:bg-blue-strong active:text-bg';
  const variantClassName =
    variant === 'secondary'
      ? 'text-fg opacity-80 hover:opacity-100 active:opacity-100'
      : 'text-blue-strong';

  return (
    <a
      className={`${baseClassName} ${variantClassName}`}
      href={href}
      target={target}
      rel={rel}
    >
      <span
        aria-hidden="true"
        className="mr-[0.55ch] text-current opacity-70 transition-opacity group-hover:opacity-100 group-active:opacity-100"
      >
        [
      </span>
      {children}
      <span
        aria-hidden="true"
        className="ml-[0.55ch] text-current opacity-70 transition-opacity group-hover:opacity-100 group-active:opacity-100"
      >
        ]
      </span>
    </a>
  );
}
