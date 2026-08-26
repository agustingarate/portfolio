import type { MetadataRoute } from 'next';
import { portfolioContent } from '@/content/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: portfolioContent.metadata.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
