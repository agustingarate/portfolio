import { Geist, Hanken_Grotesk, Inter } from 'next/font/google';
import type { Locale } from '@/lib/i18n';

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

export function LocaleLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <html
      lang={locale}
      className={`${hanken.variable} ${inter.variable} ${geist.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
