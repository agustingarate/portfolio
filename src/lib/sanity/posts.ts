import { cache } from 'react';
import type { PortableTextBlock } from '@portabletext/react';
import type { Locale } from '@/lib/i18n';
import { isSanityConfigured, sanityClient } from './client';

type SanityImage = {
  asset?: {
    _ref?: string;
  };
  alt?: string;
};

type SanityAuthor = {
  name?: string;
  role?: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  excerpt?: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  coverImage?: SanityImage;
  categories: string[];
  body: PortableTextBlock[];
  author?: SanityAuthor;
  seoTitle?: string;
  seoDescription?: string;
};

export const POSTS_PER_PAGE = 6;

export type BlogPostsPage = {
  posts: BlogPost[];
  page: number;
  totalPages: number;
};

const postProjection = `
  _id,
  "title": title[$locale],
  "excerpt": excerpt[$locale],
  "slug": slug.current,
  publishedAt,
  "updatedAt": _updatedAt,
  coverImage,
  "categories": coalesce(categories[]->title[$locale], []),
  "body": body[$locale],
  author,
  "seoTitle": seo.title[$locale],
  "seoDescription": seo.description[$locale]
`;

const postsQuery = `
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc) {
    ${postProjection}
  }
`;

const postsPageQuery = `{
  "posts": *[_type == "post" && defined(slug.current) && defined(publishedAt)]
    | order(publishedAt desc)[$start...$end] {
      ${postProjection}
    },
  "total": count(*[_type == "post" && defined(slug.current) && defined(publishedAt)])
}`;

const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug && defined(publishedAt)][0] {
    ${postProjection}
  }
`;

const postSlugsQuery = `
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]{
    "slug": slug.current
  }
`;

const fetchOptions = {
  next: { revalidate: 300, tags: ['sanity-posts'] },
};

export async function getPosts(locale: Locale): Promise<BlogPost[]> {
  if (!isSanityConfigured) return [];

  return sanityClient.fetch<BlogPost[]>(postsQuery, { locale }, fetchOptions);
}

export async function getPostsPage(
  locale: Locale,
  requestedPage: number,
): Promise<BlogPostsPage> {
  if (!isSanityConfigured) return { posts: [], page: 1, totalPages: 1 };

  const page = Math.max(1, Math.floor(requestedPage) || 1);
  const fetchPage = async (pageNumber: number) =>
    sanityClient.fetch<{ posts: BlogPost[]; total: number }>(
      postsPageQuery,
      {
        locale,
        start: (pageNumber - 1) * POSTS_PER_PAGE,
        end: pageNumber * POSTS_PER_PAGE,
      },
      fetchOptions,
    );

  const result = await fetchPage(page);
  const totalPages = Math.max(1, Math.ceil(result.total / POSTS_PER_PAGE));
  const resolvedPage = Math.min(page, totalPages);

  return {
    posts:
      resolvedPage === page
        ? result.posts
        : (await fetchPage(resolvedPage)).posts,
    page: resolvedPage,
    totalPages,
  };
}

export const getPostBySlug = cache(
  async (slug: string, locale: Locale): Promise<BlogPost | null> => {
    if (!isSanityConfigured) return null;

    return sanityClient.fetch<BlogPost | null>(
      postBySlugQuery,
      { locale, slug },
      fetchOptions,
    );
  },
);

export async function getPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];

  const posts = await sanityClient.fetch<{ slug: string }[]>(
    postSlugsQuery,
    {},
    fetchOptions,
  );
  return posts.map((post) => post.slug);
}
