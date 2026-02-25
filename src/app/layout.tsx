import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://beta.bitremote.app'),
  title: {
    default: 'BitRemote',
    template: '%s | BitRemote',
  },
  description: 'An Apple platforms app to control your downloaders remotely.',
  icons: {
    icon: '/favicon.svg',
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
