'use client';
import { Button } from '@/components/atoms/Button';
import { useMemo, useState } from 'react';
import { useTypewriter } from '@/hooks/use-typewriter';
import { LiquidMap } from './LiquidMap';
import { OrganicShader } from './OrganicShader';
import styles from './HeroSection.module.css';

type HeroProps = {
  headline?: string;
  phrases: readonly string[];
  description: string;
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; href: string };
};
export function HeroSection({
  headline = 'Hola, soy Agus — Ingeniero de software',
  phrases,
  description,
  primaryAction,
  secondaryAction,
}: HeroProps) {
  const [paused, setPaused] = useState(false);
  const statements = useMemo(() => phrases.slice(1), [phrases]);
  const typedStatement = useTypewriter(statements, paused);
  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.atmosphere} aria-hidden="true">
        <OrganicShader />
      </div>
      <div className={styles.art} aria-hidden="true">
        <div className={styles.orbit} />
        <LiquidMap />
        <span className={styles.cross}>+</span>
      </div>
      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span />
          Ingeniero de software
        </div>
        <h1>
          <span className={styles.srOnly}>{headline}</span>
          <span aria-hidden="true" className={styles.greeting}>
            <span>{phrases[0]?.split(' ')[0]}</span>
            <span>{phrases[0]?.split(' ').slice(1).join(' ')}</span>
          </span>
        </h1>
        <div className={styles.statements}>
          <p className={styles.statement} aria-hidden="true">
            {typedStatement}
            <span className={styles.cursor}>|</span>
          </p>
          <span className={styles.srOnly}>{statements.join('. ')}</span>
        </div>
        <button
          className={styles.motionToggle}
          type="button"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
        >
          {paused ? 'Reanudar animación' : 'Pausar animación'}{' '}
          <span aria-hidden="true">{paused ? '↗' : 'Ⅱ'}</span>
        </button>
        <div className={styles.actions}>
          <Button href={primaryAction.href}>{primaryAction.label}</Button>
          <Button href={secondaryAction.href} variant="secondary">
            {secondaryAction.label}
          </Button>
        </div>
        <div className={styles.caption}>
          <span aria-hidden="true">↘</span>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
