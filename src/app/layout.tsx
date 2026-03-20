import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://bitremote.app'),
  title: 'BitRemote | Remote Download Manager App',
  description:
    'Remote download manager app for NAS, seedbox, and home server workflows on iPhone, iPad, and Mac.',
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
  openGraph: {
    type: 'website',
    url: 'https://bitremote.app/',
    title: 'BitRemote | Remote Download Manager App',
    description:
      'Remote download manager app for NAS, seedbox, and home server workflows on iPhone, iPad, and Mac.',
    siteName: 'BitRemote',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'BitRemote | Remote Download Manager App',
    description:
      'Remote download manager app for NAS, seedbox, and home server workflows on iPhone, iPad, and Mac.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
