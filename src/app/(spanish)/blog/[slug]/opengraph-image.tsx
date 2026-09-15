import {
  contentType,
  createBlogOpenGraphImage,
  size,
} from '@/components/blog/BlogOpenGraphImage';

export { contentType, size };

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return createBlogOpenGraphImage(slug, 'es');
}
