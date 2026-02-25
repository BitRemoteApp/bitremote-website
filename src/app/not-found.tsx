import { TextButton } from '@/components/TextButton';

export default function NotFound() {
  return (
    <main className="container" style={{ padding: '3rem 0 4rem' }}>
      <h1 className="mono" style={{ margin: 0, color: 'var(--blue-strong)' }}>
        [404] NOT FOUND
      </h1>
      <p className="heroSubhead" style={{ marginTop: '0.75rem' }}>
        This page could not be found.
      </p>
      <div className="heroActions" style={{ marginTop: '1rem' }}>
        <TextButton href="/en/">Go to /en/</TextButton>
      </div>
    </main>
  );
}

