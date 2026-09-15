'use client';
import { useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import type { NavigationItem } from '@/content/portfolio.types';
import { Icon } from '@/components/atoms/Icon';
import { useActiveSection } from '@/hooks/use-active-section';
import {
  IMMERSIVE_EVENT,
  isImmersiveScrollActive,
} from '@/lib/immersive-scroll';
import styles from './SiteNavigation.module.css';
import { localePath, type Locale } from '@/lib/i18n';

export function SiteNavigation({
  name,
  items,
  locale,
  labels,
  enableImmersive = true,
}: {
  name: string;
  items: readonly NavigationItem[];
  locale: Locale;
  labels: {
    mainLabel: string;
    homeLabel: string;
    contactCta: string;
    languageLabel: string;
    spanishLabel: string;
    englishLabel: string;
  };
  enableImmersive?: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ids = useMemo(
    () =>
      items
        .filter((item) => item.href.startsWith('#'))
        .map((item) => item.href.slice(1)),
    [items],
  );
  const active = useActiveSection(ids);
  const [compact, setCompact] = useState(false);
  const [immersive, setImmersive] = useState(false);
  const [navigationScroll, setNavigationScroll] = useState(false);
  useEffect(() => {
    const update = () => setCompact(window.scrollY > 50);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (!enableImmersive) return;
    const frame = requestAnimationFrame(() => {
      setImmersive(isImmersiveScrollActive());
    });
    const update = (event: Event) => {
      setImmersive(Boolean((event as CustomEvent<boolean>).detail));
    };
    window.addEventListener(IMMERSIVE_EVENT, update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(IMMERSIVE_EVENT, update);
    };
  }, [enableImmersive]);
  useEffect(() => {
    if (!navigationScroll) return;

    let releaseTimer = window.setTimeout(() => setNavigationScroll(false), 500);
    const scheduleRelease = () => {
      clearTimeout(releaseTimer);
      releaseTimer = window.setTimeout(() => setNavigationScroll(false), 180);
    };

    window.addEventListener('scroll', scheduleRelease, { passive: true });
    return () => {
      clearTimeout(releaseTimer);
      window.removeEventListener('scroll', scheduleRelease);
    };
  }, [navigationScroll]);

  const handleNavigationClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }
    setNavigationScroll(true);
  };

  const [first, ...rest] = name.split(' ');
  const last = rest.join(' ');
  const isBlog = pathname.includes('/blog');
  const navigationItems = items.map((item) => ({
    ...item,
    href:
      isBlog && item.href.startsWith('#')
        ? `${localePath(locale)}${item.href}`
        : item.href,
  }));
  const homeHref = isBlog ? localePath(locale) : '#inicio';
  const contactHref = isBlog ? `${localePath(locale)}#contacto` : '#contacto';
  const localizedHref = (targetLocale: Locale) => {
    const canonicalPath =
      pathname === '/en' ? '/' : pathname.replace(/^\/en(?=\/)/, '');
    const targetPath =
      targetLocale === 'en'
        ? canonicalPath === '/'
          ? '/en'
          : `/en${canonicalPath}`
        : canonicalPath;
    const query = searchParams.toString();
    return query ? `${targetPath}?${query}` : targetPath;
  };
  const isCurrent = (href: string) =>
    href.startsWith('#')
      ? active === href.slice(1)
      : pathname === href ||
        (href.endsWith('/blog') && pathname.startsWith(href));
  return (
    <>
      <header
        className={`${styles.header} ${immersive && !navigationScroll ? styles.immersive : ''}`}
        aria-hidden={enableImmersive && immersive && !navigationScroll}
        inert={enableImmersive && immersive && !navigationScroll}
      >
        <div className={styles.inner}>
          <a
            href={homeHref}
            className={`${styles.logo} ${compact ? styles.compact : ''}`}
            aria-label={`${name}, ${labels.homeLabel}`}
            onClick={handleNavigationClick}
          >
            <span>{first[0]}</span>
            <span className={styles.remainder}>{first.slice(1)} </span>
            <span>{last[0]}</span>
            <span className={styles.remainder}>{last.slice(1)}</span>
          </a>
          <nav className={styles.desktopNav} aria-label={labels.mainLabel}>
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? 'page' : undefined}
                className={isCurrent(item.href) ? styles.active : ''}
                onClick={handleNavigationClick}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            className={styles.cta}
            href={contactHref}
            onClick={handleNavigationClick}
          >
            {labels.contactCta}
          </a>
          <div className={styles.language} aria-label={labels.languageLabel}>
            <a
              href={localizedHref('es')}
              lang="es"
              aria-current={locale === 'es' ? 'true' : undefined}
              onClick={() => {
                document.cookie =
                  'locale=es; path=/; max-age=31536000; SameSite=Lax';
              }}
            >
              ES
            </a>
            <span aria-hidden="true">/</span>
            <a
              href={localizedHref('en')}
              lang="en"
              aria-current={locale === 'en' ? 'true' : undefined}
              onClick={() => {
                document.cookie =
                  'locale=en; path=/; max-age=31536000; SameSite=Lax';
              }}
            >
              EN
            </a>
          </div>
        </div>
      </header>
      <nav className={styles.mobileNav} aria-label={labels.mainLabel}>
        {navigationItems.map((item) => {
          const selected = isCurrent(item.href);
          return (
            <a
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={selected ? 'page' : undefined}
              className={selected ? styles.mobileActive : ''}
              onClick={handleNavigationClick}
            >
              <Icon name={item.icon} size={20} />
            </a>
          );
        })}
        <a
          className={styles.languageToggle}
          href={localizedHref(locale === 'es' ? 'en' : 'es')}
          lang={locale === 'es' ? 'en' : 'es'}
          aria-label={`${labels.languageLabel}: ${locale === 'es' ? labels.englishLabel : labels.spanishLabel}`}
          onClick={() => {
            document.cookie = `locale=${locale === 'es' ? 'en' : 'es'}; path=/; max-age=31536000; SameSite=Lax`;
          }}
        >
          {locale === 'es' ? 'EN' : 'ES'}
        </a>
      </nav>
    </>
  );
}
