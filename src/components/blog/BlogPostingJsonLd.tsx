import type { Locale } from '@/lib/i18n';
import { sanityImageUrl } from '@/lib/sanity/image';
import type { BlogPost } from '@/lib/sanity/posts';
import { portfolioContent } from '@/content/portfolio';

export function BlogPostingJsonLd({
  locale,
  post,
}: {
  locale: Locale;
  post: BlogPost;
}) {
  const basePath = locale === 'es' ? '/blog' : '/en/blog';
  const url = `${portfolioContent.metadata.siteUrl}${basePath}/${post.slug}`;
  const image = post.coverImage?.asset
    ? sanityImageUrl(post.coverImage).width(1200).height(630).url()
    : undefined;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: locale === 'es' ? 'es-AR' : 'en-US',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: {
      '@type': 'Person',
      name: post.author?.name ?? portfolioContent.identity.name,
      url: portfolioContent.metadata.siteUrl,
      jobTitle: post.author?.role,
    },
    publisher: {
      '@type': 'Person',
      name: portfolioContent.identity.name,
      url: portfolioContent.metadata.siteUrl,
    },
    ...(image ? { image } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
      }}
    />
  );
}
