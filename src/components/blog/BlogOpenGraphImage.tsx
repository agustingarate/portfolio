import { ImageResponse } from 'next/og';
import type { Locale } from '@/lib/i18n';
import { getPostBySlug } from '@/lib/sanity/posts';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const labels = {
  es: {
    publication: 'Artículo · Agustín Garate',
    fallback: 'Ideas en proceso',
  },
  en: {
    publication: 'Article · Agustín Garate',
    fallback: 'Ideas in progress',
  },
} as const;

export async function createBlogOpenGraphImage(slug: string, locale: Locale) {
  const post = await getPostBySlug(slug, locale);
  const label = labels[locale];
  const title = post?.title ?? label.fallback;
  const category = post?.categories[0];

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '74px 82px',
        color: '#1f1e29',
        background: '#fbfaee',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          color: '#5f5792',
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
        }}
      >
        <span
          style={{
            display: 'flex',
            width: 54,
            height: 3,
            background: '#5f5792',
          }}
        />
        {category ?? label.publication}
      </div>
      <div
        style={{
          display: 'flex',
          maxWidth: '950px',
          fontSize: title.length > 56 ? 66 : 78,
          fontWeight: 700,
          letterSpacing: -3.2,
          lineHeight: 1.02,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#5d5b67',
          fontSize: 25,
        }}
      >
        <span>agustingarate.com</span>
        <span style={{ color: '#7950a7', fontSize: 36, fontWeight: 700 }}>
          AG.
        </span>
      </div>
    </div>,
    size,
  );
}
