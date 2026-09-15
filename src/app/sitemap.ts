import type { MetadataRoute } from 'next';
import { portfolioContent } from '@/content/portfolio';
import { getPosts } from '@/lib/sanity/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts('es');

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
    ...posts.flatMap((post) => [
      {
        url: `${portfolioContent.metadata.siteUrl}/blog/${post.slug}`,
        lastModified: post.publishedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: {
          languages: {
            es: `${portfolioContent.metadata.siteUrl}/blog/${post.slug}`,
            en: `${portfolioContent.metadata.siteUrl}/en/blog/${post.slug}`,
            'x-default': `${portfolioContent.metadata.siteUrl}/blog/${post.slug}`,
          },
        },
      },
      {
        url: `${portfolioContent.metadata.siteUrl}/en/blog/${post.slug}`,
        lastModified: post.publishedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: {
          languages: {
            es: `${portfolioContent.metadata.siteUrl}/blog/${post.slug}`,
            en: `${portfolioContent.metadata.siteUrl}/en/blog/${post.slug}`,
            'x-default': `${portfolioContent.metadata.siteUrl}/blog/${post.slug}`,
          },
        },
      },
    ]),
  ];
}
