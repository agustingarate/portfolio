import type { SocialLink } from '@/content/portfolio.types';
import { Container } from '@/components/atoms/Container';
import styles from './SiteFooter.module.css';
export function SiteFooter({
  name,
  socials,
  copyright,
}: {
  name: string;
  socials: readonly SocialLink[];
  copyright: string;
}) {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <a href="#inicio" className={styles.name}>
          {name}
        </a>

        <p>
          © {new Date().getFullYear()} {copyright}
        </p>
      </Container>
    </footer>
  );
}
