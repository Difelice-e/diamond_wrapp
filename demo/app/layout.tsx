import type { Metadata } from 'next';
import { Big_Shoulders, Fragment_Mono, UnifrakturMaguntia } from 'next/font/google';
import './globals.css';

import { asset } from '@/lib/asset';
const bigShoulders = Big_Shoulders({
  subsets: ['latin'],
  variable: '--font-big-shoulders',
  weight: ['700', '800'],
  display: 'swap',
});

const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  variable: '--font-fragment-mono',
  weight: ['400'],
  display: 'swap',
});

const unifraktur = UnifrakturMaguntia({
  subsets: ['latin'],
  variable: '--font-unifraktur',
  weight: ['400'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Diamond Wrapp — Wrapping Auto a Città Sant’Angelo (PE)',
  description:
    'Bottega di car wrapping in Abruzzo. Ferrari, Bentley, Lancia HF Integrale, Nissan GTR. Tagli col Knifeless, pellicole BodyFence, garanzia 24 mesi.',
  metadataBase: new URL('https://diamondwrapp.com'),
  openGraph: {
    title: 'Diamond Wrapp — Wrapping Auto a Città Sant’Angelo',
    description:
      'Wrappiamo l’auto con cui arrivi qui. Anche la tua. Ferrari, Bentley, GTR, Lancia HF.',
    type: 'website',
    locale: 'it_IT',
  },
  icons: {
    icon: asset('/logo.png'),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="it"
      className={`${bigShoulders.variable} ${fragmentMono.variable} ${unifraktur.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
