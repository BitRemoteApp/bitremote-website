type Props = {
  title: string;
  body: string;
};

export function BentoCard({ title, body }: Props) {
  return (
    <div className="relative h-full rounded-[1.75rem] border border-[var(--color-border-soft)] bg-surface/75 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-md">
      <h3 className="m-0 mb-3 font-sans text-xl font-semibold leading-[1.2] text-text-primary">
        {title}
      </h3>
      <p className="m-0 text-base leading-7 text-text-secondary">{body}</p>
    </div>
  );
}
