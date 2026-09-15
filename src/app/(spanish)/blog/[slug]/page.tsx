import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPost } from '@/components/blog/BlogPost';
import { BlogShell } from '@/components/blog/BlogShell';
import { getArticleMetadata } from '@/lib/sanity/article-metadata';
import { getPostBySlug, getPostSlugs } from '@/lib/sanity/posts';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return getArticleMetadata(slug, 'es');
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'es');

  if (!post) notFound();

  return (
    <BlogShell locale="es">
      <BlogPost locale="es" post={post} />
    </BlogShell>
  );
}
