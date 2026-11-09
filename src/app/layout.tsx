import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Anek_Bangla } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const anekBangla = Anek_Bangla({
  variable: '--font-anek-bangla',
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Green Delta Smart IVR | Self-Service Insurance Portal',
  description:
    'Interactive Visual IVR (VIVR) self-service portal for Green Delta Insurance Company (GDIC). Instant insurance quotations, bancassurance, policy status, branch locations, and 24/7 hotline 16457.',
  keywords: [
    'Green Delta Insurance',
    'GDIC',
    'Smart IVR',
    'Visual IVR',
    'VIVR',
    'Motor Insurance',
    'Nibedita',
    'Health Insurance',
    'Fire Insurance',
    'Bancassurance',
    '16457',
    'Bangladesh Insurance'
  ],
  authors: [{ name: 'Green Delta Insurance Company' }]
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#16325B'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} ${anekBangla.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anek+Bangla:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full bg-slate-900 text-slate-900 dark:text-slate-100 font-sans overflow-hidden select-none">
        {children}
      </body>
    </html>
  );
}
