import type { Locale } from '@/lib/i18n';
import { getLocaleContent } from '@/lib/i18n';
import { SiteFooter } from '@/components/organisms/SiteFooter';
import { SiteNavigation } from '@/components/organisms/SiteNavigation';
import styles from './BlogShell.module.css';

export function BlogShell({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const content = getLocaleContent(locale);
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#contenido-principal">
        {locale === 'es'
          ? 'Saltar al contenido principal'
          : 'Skip to main content'}
      </a>
      <SiteNavigation
        name={content.identity.name}
        items={content.navigation}
        locale={locale}
        labels={content.ui.navigation}
        enableImmersive={false}
      />
      <main id="contenido-principal">{children}</main>
      <SiteFooter
        name={content.identity.name}
        socials={content.socials}
        copyright={content.footer.copyright}
        shareLabels={content.ui.share}
        homeHref={locale === 'es' ? '/' : '/en'}
      />
    </div>
  );
}
