'use client';

import { useEffect, useRef, useState } from 'react';
import type { Education } from '@/content/portfolio.types';
import { Chip } from '@/components/atoms/Chip';
import { Container } from '@/components/atoms/Container';
import { Icon } from '@/components/atoms/Icon';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { setImmersiveScroll } from '@/lib/immersive-scroll';
import styles from './EducationTimeline.module.css';

// Reserve the final part of the sticky section so the graduation state can be
// seen before the section releases back to the document scroll.
const PROGRESS_SCROLL_PORTION = 0.75;

export function EducationTimeline({
  title,
  degree,
  institution,
  institutionLogo,
  description,
  topics,
  milestones,
}: Education) {
  const wrapperRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const celebrationFired = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      if (progressBarRef.current)
        progressBarRef.current.style.transform = 'scaleX(1)';
      if (capRef.current) capRef.current.style.left = '100%';
      setImmersiveScroll('education', false);
      return;
    }

    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    if (!wrapper || !sticky || milestones.length === 0) return;

    let start = 0;
    let distance = 1;
    let frame = 0;
    let immersive = false;

    const measure = () => {
      start = wrapper.getBoundingClientRect().top + window.scrollY;
      distance = Math.max(1, wrapper.offsetHeight - sticky.offsetHeight);
    };
    const update = () => {
      frame = 0;
      const scrollProgress = Math.min(
        1,
        Math.max(0, (window.scrollY - start) / distance),
      );
      const nextProgress = Math.min(
        1,
        scrollProgress / PROGRESS_SCROLL_PORTION,
      );
      const nextIndex = Math.min(
        milestones.length - 1,
        Math.floor(nextProgress * milestones.length),
      );

      if (progressBarRef.current)
        progressBarRef.current.style.transform = `scaleX(${nextProgress})`;
      if (capRef.current) capRef.current.style.left = `${nextProgress * 100}%`;

      if (nextIndex !== activeRef.current) {
        activeRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }

      if (nextIndex === milestones.length - 1 && !celebrationFired.current) {
        celebrationFired.current = true;
        void import('@/lib/celebrate').then(({ celebrate }) => celebrate());
      } else if (nextIndex < milestones.length - 1) {
        celebrationFired.current = false;
      }

      const bounds = wrapper.getBoundingClientRect();
      const nextImmersive =
        window.innerWidth >= 768 &&
        bounds.top <= 116 &&
        bounds.bottom >= sticky.offsetHeight + 24;
      if (nextImmersive !== immersive) {
        immersive = nextImmersive;
        setImmersiveScroll('education', immersive);
      }

    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const handleResize = () => {
      measure();
      requestUpdate();
    };

    measure();
    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      cancelAnimationFrame(frame);
      setImmersiveScroll('education', false);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [milestones, reducedMotion]);

  const displayActiveIndex = reducedMotion
    ? Math.max(0, milestones.length - 1)
    : activeIndex;
  const active = milestones[displayActiveIndex] ?? milestones[0];

  return (
    <section
      id="educacion"
      ref={wrapperRef}
      className={styles.wrapper}
      aria-labelledby="education-title"
    >
      <div ref={stickyRef} className={styles.sticky}>
        <Container>
          <h2 id="education-title">{title}</h2>
          <div className={styles.card}>
            <div className={styles.yearLabel} aria-live="polite">
              <span key={active?.label}>{active?.label}</span>
            </div>
            <div className={styles.track}>
              <div className={styles.rail} aria-hidden="true">
                <div ref={progressBarRef} className={styles.railProgress} />
                <div ref={capRef} className={styles.cap}>
                  {displayActiveIndex === milestones.length - 1 ? (
                    <span aria-hidden="true">🎉</span>
                  ) : (
                    <Icon name="school" size={54} />
                  )}
                </div>
              </div>
              <ol className={styles.nodes}>
                {milestones.map((milestone, index) => (
                  <li
                    key={milestone.year}
                    className={`${index < displayActiveIndex ? styles.complete : ''} ${index === displayActiveIndex ? styles.active : ''}`}
                    aria-current={
                      index === displayActiveIndex ? 'step' : undefined
                    }
                  >
                    <span className={styles.dot} aria-hidden="true" />
                    <span>{milestone.year}</span>
                    <span className="sr-only">{milestone.label}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className={styles.details}>
              <h3>{degree}</h3>
              <div className={styles.institution}>
                <Icon name={institutionLogo} size={18} />
                <strong>{institution}</strong>
              </div>
              <p>{description}</p>
              <div className={styles.topics}>
                {topics.map((topic) => (
                  <Chip key={topic}>{topic}</Chip>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
