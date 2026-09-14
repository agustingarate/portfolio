import type { MetadataRoute } from 'next';
import { portfolioContent } from '@/content/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: portfolioContent.metadata.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          es: portfolioContent.metadata.siteUrl,
          en: `${portfolioContent.metadata.siteUrl}/en`,
          'x-default': portfolioContent.metadata.siteUrl,
        },
      },
    },
    {
      url: `${portfolioContent.metadata.siteUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          es: portfolioContent.metadata.siteUrl,
          en: `${portfolioContent.metadata.siteUrl}/en`,
          'x-default': portfolioContent.metadata.siteUrl,
        },
      },
    },
  ];
}
