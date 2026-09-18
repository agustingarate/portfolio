import { createBlogOpenGraphImage } from '@/components/blog/BlogOpenGraphImage';
import type { Locale } from '@/lib/i18n';

export const revalidate = 300;

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ locale: string; slug: string }>;
  },
) {
  const { locale, slug } = await params;

  if (locale !== 'es' && locale !== 'en') {
    return new Response('Locale not found', { status: 404 });
  }

  return createBlogOpenGraphImage(slug, locale as Locale);
}
