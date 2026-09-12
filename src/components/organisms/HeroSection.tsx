'use client';
import { Button } from '@/components/atoms/Button';
import { useState } from 'react';
import { LiquidMap } from './LiquidMap';
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
  return (
    <section id="inicio" className={styles.hero}>
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
        <div className={styles.statements} data-paused={paused}>
          {phrases.slice(1).map((phrase, index) => (
            <p
              className={styles.statement}
              key={phrase}
              style={{ '--phrase-index': index } as React.CSSProperties}
            >
              {phrase}
            </p>
          ))}
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
      </div>
      <div className={styles.caption}>
        <span aria-hidden="true">↘</span>
        <p>{description}</p>
      </div>
    </section>
  );
}
