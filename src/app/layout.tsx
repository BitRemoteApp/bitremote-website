import type { Metadata } from 'next';
import { LenisProvider } from '@/components/providers/LenisProvider';
import 'lenis/dist/lenis.css';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://bitremote.app'),
  title: 'BitRemote',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

const BACK_FORWARD_RELOAD_SCRIPT = `
(function(){
  var n=performance.getEntriesByType("navigation")[0];
  if(n&&n.type==="back_forward"){
    window.addEventListener("pageshow",function(e){
      if(!e.persisted){window.location.reload()}
    },{once:true})
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: BACK_FORWARD_RELOAD_SCRIPT }} />
      </head>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
