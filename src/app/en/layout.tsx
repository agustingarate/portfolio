import type { Metadata, Viewport } from 'next';
import { LocaleLayout } from '@/app/_components/LocaleLayout';
import '@/app/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fbfaee',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://agustingarate.com'),
};

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LocaleLayout locale="en">{children}</LocaleLayout>;
}
