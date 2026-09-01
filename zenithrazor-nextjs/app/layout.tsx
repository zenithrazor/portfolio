import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import SiteFooter from '@/components/SiteFooter';
import './globals.css';
import './nav.css';
import './home.css';
import './inner.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zenithrazor.com'),
  title: 'ZenithRazor — Discord & Cloud Infrastructure Developer',
  description:
    'ZenithRazor is a Discord developer, hosting and cloud engineer, and Server Head at Apexis, a sponsorship agency. Available for Discord bot, server, and infrastructure work.',
  keywords: [
    'ZenithRazor',
    'Discord developer',
    'Discord bot developer',
    'cloud developer',
    'hosting developer',
    'Apexis',
    'sponsorship agency',
  ],
  openGraph: {
    title: 'ZenithRazor — Discord & Cloud Infrastructure Developer',
    description:
      'Discord developer, hosting and cloud engineer, and Server Head at Apexis, a sponsorship agency.',
    url: 'https://zenithrazor.com',
    siteName: 'ZenithRazor',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZenithRazor — Discord & Cloud Infrastructure Developer',
    description:
      'Discord developer, hosting and cloud engineer, and Server Head at Apexis, a sponsorship agency.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <div className="grain" />
        <NavBar />
        <main className="page-shell">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
