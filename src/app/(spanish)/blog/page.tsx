import type { Metadata } from 'next';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { BlogShell } from '@/components/blog/BlogShell';
import { portfolioContent } from '@/content/portfolio';
import { getPostsPage } from '@/lib/sanity/posts';

const title = 'Blog | Agustín Garate';
const description =
  'Ideas prácticas sobre productos digitales, tecnología, inteligencia artificial y desarrollo de software para crear experiencias web y móviles de calidad.';
const url = `${portfolioContent.metadata.siteUrl}/blog`;
const socialImage = `${portfolioContent.metadata.siteUrl}/opengraph-image`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/blog',
    languages: { es: '/blog', en: '/en/blog', 'x-default': '/blog' },
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    alternateLocale: ['en_US'],
    url,
    siteName: portfolioContent.identity.name,
    title,
    description,
    images: [{ url: socialImage, width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@garate__',
    creator: '@garate__',
    title,
    description,
    images: [socialImage],
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

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${url}#blog`,
        url,
        name: title,
        description,
        inLanguage: 'es-AR',
        publisher: { '@id': `${portfolioContent.metadata.siteUrl}/#person` },
      },
      {
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: 'es-AR',
        isPartOf: { '@id': `${portfolioContent.metadata.siteUrl}/#website` },
        mainEntity: { '@id': `${url}#blog` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <BlogShell locale="es">
        <BlogIndex
          locale="es"
          posts={posts}
          page={page}
          totalPages={totalPages}
        />
      </BlogShell>
    </>
  );
}
