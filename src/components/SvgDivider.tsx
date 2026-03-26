type Props = {
  className?: string;
};

export function SvgDivider({ className }: Props) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={
        'h-px bg-[linear-gradient(to_right,transparent,var(--color-border)_25%,var(--color-border)_75%,transparent)]' +
        (className ? ' ' + className : '')
      }
    />
  );
}
