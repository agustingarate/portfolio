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
  return getArticleMetadata(slug, 'en');
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'en');

  if (!post) notFound();

  return (
    <BlogShell locale="en">
      <BlogPost locale="en" post={post} />
    </BlogShell>
  );
}
