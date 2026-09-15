import type { SocialLink } from '@/content/portfolio.types';
import { Container } from '@/components/atoms/Container';
import { Icon } from '@/components/atoms/Icon';
import { ShareButton } from '@/components/molecules/ShareButton';
import styles from './SiteFooter.module.css';
export function SiteFooter({
  name,
  socials,
  copyright,
  shareLabels,
  homeHref = '#inicio',
}: {
  name: string;
  socials: readonly SocialLink[];
  copyright: string;
  shareLabels: {
    button: string;
    text: string;
    copyLink: string;
    linkCopied: string;
    unableToCopy: string;
  };
  homeHref?: string;
}) {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <a href={homeHref} className={styles.name}>
          {name}
        </a>
        <nav className={styles.links} aria-label="Redes sociales">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <Icon name={social.icon} size={18} />
              <span>{social.label}</span>
            </a>
          ))}
        </nav>
        <ShareButton labels={shareLabels} tone="inverse" />
        <p>
          © {new Date().getFullYear()} {copyright}
        </p>
      </Container>
    </footer>
  );
}
