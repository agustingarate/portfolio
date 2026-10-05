import type { Metadata } from 'next';
import { getLocaleContent, type Locale } from '@/lib/i18n';
import {
  servicePages,
  servicePath,
  type ServiceSlug,
} from '@/content/service-pages';

export function getServiceMetadata(
  locale: Locale,
  slug: ServiceSlug,
): Metadata {
  const content = getLocaleContent(locale);
  const service = servicePages[locale][slug];
  const path = servicePath(locale, slug);
  const url = `${content.metadata.siteUrl}${path}`;
  const image = `${content.metadata.siteUrl}${locale === 'en' ? '/en' : ''}/opengraph-image`;
  return {
    metadataBase: new URL(content.metadata.siteUrl),
    title: service.seoTitle,
    description: service.description,
    keywords: service.keywords,
    authors: [{ name: content.identity.name }],
    alternates: {
      canonical: path,
      languages: {
        es: servicePath('es', slug),
        en: servicePath('en', slug),
        'x-default': servicePath('es', slug),
      },
    },
    openGraph: {
      type: 'website',
      url,
      siteName: content.identity.name,
      locale: locale === 'en' ? 'en_US' : 'es_AR',
      alternateLocale: locale === 'en' ? ['es_AR'] : ['en_US'],
      title: service.seoTitle,
      description: service.description,
      images: [{ url: image, width: 1200, height: 630, alt: service.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.seoTitle,
      description: service.description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}
