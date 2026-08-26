import type { MetadataRoute } from 'next';
import { portfolioContent } from '@/content/portfolio';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${portfolioContent.metadata.siteUrl}/sitemap.xml`,
  };
}
