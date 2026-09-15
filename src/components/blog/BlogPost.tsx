import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import type { Locale } from '@/lib/i18n';
import { sanityImageUrl } from '@/lib/sanity/image';
import type { BlogPost as BlogPostData } from '@/lib/sanity/posts';
import { ShareButton } from '@/components/molecules/ShareButton';
import { BlogPostingJsonLd } from './BlogPostingJsonLd';
import styles from './BlogPost.module.css';

const copy = {
  es: {
    back: 'Todos los artículos',
    share: 'Compartir artículo',
    copyLink: 'Copiar enlace',
    linkCopied: 'Enlace copiado',
    unableToCopy: 'No se pudo copiar el enlace.',
  },
  en: {
    back: 'All articles',
    share: 'Share article',
    copyLink: 'Copy link',
    linkCopied: 'Link copied',
    unableToCopy: 'The link could not be copied.',
  },
} as const;

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-AR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function BlogPost({
  locale,
  post,
}: {
  locale: Locale;
  post: BlogPostData;
}) {
  const basePath = locale === 'es' ? '/blog' : '/en/blog';
  const imageUrl = post.coverImage?.asset
    ? sanityImageUrl(post.coverImage).width(1600).height(900).url()
    : null;

  return (
    <article className={styles.article}>
      <BlogPostingJsonLd locale={locale} post={post} />
      <Link className={styles.back} href={basePath}>
        ← {copy[locale].back}
      </Link>
      <header className={styles.header}>
        <p className={styles.meta}>
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt, locale)}
          </time>
          {post.categories.length > 0 ? ` · ${post.categories.join(', ')}` : ''}
        </p>
        <h1>{post.title}</h1>
        {post.excerpt ? <p className={styles.excerpt}>{post.excerpt}</p> : null}
        <div className={styles.share}>
          <ShareButton
            labels={{
              button: copy[locale].share,
              text: post.title,
              copyLink: copy[locale].copyLink,
              linkCopied: copy[locale].linkCopied,
              unableToCopy: copy[locale].unableToCopy,
            }}
          />
        </div>
      </header>
      {imageUrl ? (
        <Image
          alt={post.coverImage?.alt ?? ''}
          className={styles.image}
          height={900}
          priority
          sizes="(max-width: 860px) 100vw, 860px"
          src={imageUrl}
          width={1600}
        />
      ) : null}
      <div className={styles.body}>
        <PortableText
          value={post.body}
          components={{
            marks: {
              code: ({ children }) => <code>{children}</code>,
              link: ({ children, value }) => {
                const href = typeof value?.href === 'string' ? value.href : '';
                const isExternal = href.startsWith('http');
                return href ? (
                  <a
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noreferrer' : undefined}
                  >
                    {children}
                  </a>
                ) : (
                  children
                );
              },
            },
            block: {
              blockquote: ({ children }) => <blockquote>{children}</blockquote>,
            },
            types: {
              image: ({ value }) => {
                const imageUrl = value?.asset
                  ? sanityImageUrl(value).width(1440).url()
                  : null;

                return imageUrl ? (
                  <figure>
                    <Image
                      alt={value.alt ?? ''}
                      height={960}
                      sizes="(max-width: 767px) calc(100vw - 40px), 720px"
                      src={imageUrl}
                      width={1440}
                    />
                  </figure>
                ) : null;
              },
            },
          }}
        />
      </div>
    </article>
  );
}
