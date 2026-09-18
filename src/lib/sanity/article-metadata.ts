import type { Metadata } from 'next';
import { portfolioContent } from '@/content/portfolio';
import type { Locale } from '@/lib/i18n';
import { getPostBySlug } from './posts';

export async function getArticleMetadata(
  slug: string,
  locale: Locale,
): Promise<Metadata> {
  const post = await getPostBySlug(slug, locale);
  if (!post) return {};

  const basePath = locale === 'es' ? '/blog' : '/en/blog';
  const title = post.seoTitle ?? post.title;
  const description =
    post.seoDescription ??
    post.excerpt ??
    (locale === 'es'
      ? 'Artículo de Agustín Garate sobre productos digitales y desarrollo de software.'
      : 'An article by Agustín Garate on digital products and software development.');
  const openGraphImage = `${portfolioContent.metadata.siteUrl}/api/og/${locale}/${slug}`;
  const canonical = `${basePath}/${slug}`;
  const author = post.author?.name ?? portfolioContent.identity.name;

  return {
    title: `${title} | Agustín Garate`,
    description,
    authors: [{ name: author, url: portfolioContent.metadata.siteUrl }],
    alternates: {
      canonical,
      languages: {
        es: `/blog/${slug}`,
        en: `/en/blog/${slug}`,
        'x-default': `/blog/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      alternateLocale: locale === 'es' ? ['en_US'] : ['es_AR'],
      url: canonical,
      title,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [author],
      images: [{ url: openGraphImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@garate__',
      creator: '@garate__',
      title,
      description,
      images: [openGraphImage],
    },
  };
}
