import { IPhoneFrame } from '@/components/IPhoneFrame';
import { AppScreenshot } from '@/components/AppScreenshot';

const SCREENSHOTS = [
  { slug: 'iphone-home', alt: 'BitRemote app home screen showing active downloads', width: 390, height: 844 },
] as const;

export function AppShowcase() {
  return (
    <>
      {SCREENSHOTS.map((shot) => (
        <IPhoneFrame key={shot.slug}>
          <AppScreenshot
            slug={shot.slug}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
          />
        </IPhoneFrame>
      ))}
    </>
  );
}
