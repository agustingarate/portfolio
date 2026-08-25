'use client';
import { useEffect, useMemo, useState } from 'react';
import type { NavigationItem } from '@/content/portfolio.types';
import { Icon } from '@/components/atoms/Icon';
import { useActiveSection } from '@/hooks/use-active-section';
import styles from './SiteNavigation.module.css';

export function SiteNavigation({
  name,
  items,
}: {
  name: string;
  items: readonly NavigationItem[];
}) {
  const ids = useMemo(() => items.map((item) => item.href.slice(1)), [items]);
  const active = useActiveSection(ids);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const update = () => setCompact(window.scrollY > 50);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const [first, ...rest] = name.split(' ');
  const last = rest.join(' ');
  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <a
            href="#inicio"
            className={`${styles.logo} ${compact ? styles.compact : ''}`}
            aria-label={`${name}, ir al inicio`}
          >
            <span>{first[0]}</span>
            <span className={styles.remainder}>{first.slice(1)} </span>
            <span>{last[0]}</span>
            <span className={styles.remainder}>{last.slice(1)}</span>
          </a>
          <nav className={styles.desktopNav} aria-label="Navegación principal">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={
                  active === item.href.slice(1) ? 'page' : undefined
                }
                className={active === item.href.slice(1) ? styles.active : ''}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a className={styles.cta} href="#contacto">
            Hablemos
          </a>
        </div>
      </header>
      <nav className={styles.mobileNav} aria-label="Navegación principal">
        {items.map((item) => {
          const selected = active === item.href.slice(1);
          return (
            <a
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={selected ? 'page' : undefined}
              className={selected ? styles.mobileActive : ''}
            >
              <Icon name={item.icon} size={20} />
            </a>
          );
        })}
      </nav>
    </>
  );
}
