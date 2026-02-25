import { BitRemoteWordmark } from '@/components/BitRemoteWordmark';
import { TextButton } from '@/components/TextButton';
import { localeLabels, locales } from '@/i18n/locales';
import { localeRoot } from '@/i18n/urls';

export default function RootPage() {
  return (
    <main className="container" style={{ padding: '3rem 0 4rem' }}>
      <BitRemoteWordmark />
      <h1 className="srOnly">BitRemote</h1>

      <p className="heroSubhead" style={{ marginTop: '1rem' }}>
        Select a language to continue.
      </p>

      <div className="heroActions" style={{ marginTop: '1rem' }}>
        {locales.map((l) => (
          <TextButton key={l} href={localeRoot(l)}>
            {localeLabels[l]}
          </TextButton>
        ))}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <TextButton href="https://apps.apple.com/app/id6477765303" target="_blank" rel="noreferrer">
          App Store
        </TextButton>
      </div>
    </main>
  );
}

