type Props = {
  title: string;
  body: string;
};

export function BentoCard({ title, body }: Props) {
  return (
    <div className="relative bg-[var(--bg-panel-88)] backdrop-blur-md border border-border rounded-lg p-6 shadow-card">
      <h3 className="m-0 mb-2 font-sans text-xl font-semibold leading-[1.2] text-text-primary">
        {title}
      </h3>
      <p className="m-0 text-text-secondary">{body}</p>
    </div>
  );
}
