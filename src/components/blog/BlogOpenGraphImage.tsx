import { ImageResponse } from 'next/og';
import type { Locale } from '@/lib/i18n';
import { getPostBySlug } from '@/lib/sanity/posts';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const labels = {
  es: {
    publication: 'Artículo',
    byline: 'Agustín Garate · Productos digitales, tecnología y desarrollo',
    fallback: 'Ideas en proceso',
  },
  en: {
    publication: 'Article',
    byline: 'Agustín Garate · Digital products, technology and development',
    fallback: 'Ideas in progress',
  },
} as const;

export async function createBlogOpenGraphImage(slug: string, locale: Locale) {
  const post = await getPostBySlug(slug, locale);
  const label = labels[locale];
  const title = post?.title ?? label.fallback;

  return new ImageResponse(
    <div
      style={{
        background: '#fbfaee',
        color: '#1c1c1a',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '72px 84px',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          color: '#3300e0',
          display: 'flex',
          fontSize: 25,
          fontWeight: 700,
          marginBottom: '32px',
        }}
      >
        {label.publication}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: title.length > 56 ? 62 : 76,
          fontWeight: 600,
          letterSpacing: '-2.8px',
          lineHeight: 0.99,
          maxWidth: '760px',
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: 'flex',
          color: '#464557',
          fontSize: 23,
          marginTop: '38px',
        }}
      >
        {label.byline}
      </div>
    </div>,
    size,
  );
}
