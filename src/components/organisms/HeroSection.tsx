'use client';
import { Button } from '@/components/atoms/Button';
import { useTypewriter } from '@/hooks/use-typewriter';
import { OrganicShader } from './OrganicShader';
import styles from './HeroSection.module.css';

type HeroProps = {
  phrases: readonly string[];
  description: string;
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; href: string };
};
export function HeroSection({
  phrases,
  description,
  primaryAction,
  secondaryAction,
}: HeroProps) {
  const text = useTypewriter(phrases);
  return (
    <section id="inicio" className={styles.hero}>
      <OrganicShader />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1>
          <span>{text}</span>
          <span className={styles.cursor} aria-hidden="true">
            |
          </span>
        </h1>
        <p>{description}</p>
        <div className={styles.actions}>
          <Button href={primaryAction.href}>{primaryAction.label}</Button>
          <Button href={secondaryAction.href} variant="secondary">
            {secondaryAction.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
