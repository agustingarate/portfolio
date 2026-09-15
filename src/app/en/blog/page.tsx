import type { Metadata } from 'next';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { BlogShell } from '@/components/blog/BlogShell';
import { getPostsPage } from '@/lib/sanity/posts';

export const metadata: Metadata = {
  title: 'Blog | Agustín Garate',
  description:
    'Ideas on digital products, technology and software development.',
  alternates: {
    canonical: '/en/blog',
    languages: { es: '/blog', en: '/en/blog', 'x-default': '/blog' },
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const { posts, page, totalPages } = await getPostsPage(
    'en',
    Number(pageParam),
  );

  return (
    <BlogShell locale="en">
      <BlogIndex
        locale="en"
        posts={posts}
        page={page}
        totalPages={totalPages}
      />
    </BlogShell>
  );
}
