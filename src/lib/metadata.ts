import type { Metadata } from 'next';
import { getLocaleContent, localePath, type Locale } from '@/lib/i18n';

export function createLocaleMetadata(locale: Locale): Metadata {
  const content = getLocaleContent(locale);
  const path = localePath(locale);
  const url = `${content.metadata.siteUrl}${path}`;

  return {
    metadataBase: new URL(content.metadata.siteUrl),
    title: content.metadata.title,
    description: content.metadata.description,
    applicationName: content.identity.name,
    authors: [{ name: content.identity.name }],
    creator: content.identity.name,
    publisher: content.identity.name,
    keywords:
      locale === 'en'
        ? [
            'software developer',
            'mobile app development',
            'web development',
            'React Native',
            'Flutter',
            'artificial intelligence',
            'automation',
            'MVP',
          ]
        : [
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
      canonical: path,
      languages: { es: '/', en: '/en', 'x-default': '/' },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'es_AR',
      alternateLocale: locale === 'en' ? ['es_AR'] : ['en_US'],
      url,
      siteName: content.identity.name,
      title: content.metadata.title,
      description: content.metadata.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metadata.title,
      description: content.metadata.description,
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
}
