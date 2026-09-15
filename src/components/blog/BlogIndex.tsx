import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { sanityImageUrl } from '@/lib/sanity/image';
import type { BlogPost } from '@/lib/sanity/posts';
import styles from './BlogIndex.module.css';

const copy = {
  es: {
    eyebrow: 'Artículos y casos de éxito',
    title: 'Ideas sobre productos, tecnología y desarrollo.',
    empty: 'Las primeras publicaciones están en camino.',
    read: 'Leer artículo',
    previous: 'Anterior',
    next: 'Siguiente',
    page: 'Página',
  },
  en: {
    eyebrow: 'Articles and success stories',
    title: 'Ideas on products, technology and development.',
    empty: 'The first posts are on their way.',
    read: 'Read article',
    previous: 'Previous',
    next: 'Next',
    page: 'Page',
  },
} as const;

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-AR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function BlogIndex({
  locale,
  posts,
  page,
  totalPages,
}: {
  locale: Locale;
  posts: BlogPost[];
  page: number;
  totalPages: number;
}) {
  const labels = copy[locale];
  const basePath = locale === 'es' ? '/blog' : '/en/blog';

  return (
    <section className={styles.content}>
      <p className={styles.eyebrow}>{labels.eyebrow}</p>
      <h1>{labels.title}</h1>
      {posts.length === 0 ? (
        <p className={styles.empty}>{labels.empty}</p>
      ) : (
        <div className={styles.grid}>
          {posts.map((post) => {
            const imageUrl = post.coverImage?.asset
              ? sanityImageUrl(post.coverImage).width(1200).height(720).url()
              : null;

            return (
              <article className={styles.card} key={post._id}>
                <Link
                  aria-label={`${labels.read}: ${post.title}`}
                  className={styles.cardLink}
                  href={`${basePath}/${post.slug}`}
                >
                  <div className={styles.media}>
                    {imageUrl ? (
                      <Image
                        alt={post.coverImage?.alt ?? ''}
                        className={styles.image}
                        height={720}
                        sizes="(max-width: 767px) 100vw, 50vw"
                        src={imageUrl}
                        width={1200}
                      />
                    ) : (
                      <div className={styles.imageFallback} aria-hidden="true">
                        <span>AG.</span>
                        <small>{labels.eyebrow}</small>
                      </div>
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    <p className={styles.meta}>
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt, locale)}
                      </time>
                      {post.categories.length > 0
                        ? ` · ${post.categories.join(', ')}`
                        : ''}
                    </p>
                    <h2>{post.title}</h2>
                    {post.excerpt ? <p>{post.excerpt}</p> : null}
                    <span className={styles.readMore}>
                      {labels.read} <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      )}
      {totalPages > 1 ? (
        <nav className={styles.pagination} aria-label="Paginación">
          {page > 1 ? (
            <Link href={`${basePath}?page=${page - 1}`}>{labels.previous}</Link>
          ) : (
            <span aria-hidden="true">{labels.previous}</span>
          )}
          <p>
            {labels.page} {page} / {totalPages}
          </p>
          {page < totalPages ? (
            <Link href={`${basePath}?page=${page + 1}`}>{labels.next}</Link>
          ) : (
            <span aria-hidden="true">{labels.next}</span>
          )}
        </nav>
      ) : null}
    </section>
  );
}
