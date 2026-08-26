import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Geist, Hanken_Grotesk, Inter } from 'next/font/google';
import { portfolioContent } from '@/content/portfolio';
import './globals.css';

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(portfolioContent.metadata.siteUrl),
  title: {
    default: portfolioContent.metadata.title,
    template: '%s | Agustin Garate',
  },
  description: portfolioContent.metadata.description,
  applicationName: portfolioContent.identity.name,
  authors: [{ name: portfolioContent.identity.name }],
  creator: portfolioContent.identity.name,
  publisher: portfolioContent.identity.name,
  appleWebApp: {
    capable: true,
    title: portfolioContent.identity.name,
  },
  keywords: [
    'desarrollador de software',
    'desarrollo de aplicaciones móviles',
    'desarrollo web',
    'React Native',
    'Flutter',
    'inteligencia artificial',
    'automatización',
    'MVP',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: '/',
    siteName: portfolioContent.identity.name,
    title: portfolioContent.metadata.title,
    description: portfolioContent.metadata.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: portfolioContent.metadata.title,
    description: portfolioContent.metadata.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fbfaee',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${hanken.variable} ${inter.variable} ${geist.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
