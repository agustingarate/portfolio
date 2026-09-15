import type { Metadata } from 'next';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { BlogShell } from '@/components/blog/BlogShell';
import { getPostsPage } from '@/lib/sanity/posts';

export const metadata: Metadata = {
  title: 'Blog | Agustín Garate',
  description:
    'Ideas sobre productos digitales, tecnología y desarrollo de software.',
  alternates: {
    canonical: '/blog',
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
    'es',
    Number(pageParam),
  );

  return (
    <BlogShell locale="es">
      <BlogIndex
        locale="es"
        posts={posts}
        page={page}
        totalPages={totalPages}
      />
    </BlogShell>
  );
}
