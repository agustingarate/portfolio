'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { LifecyclePhase } from '@/content/portfolio.types';
import { Container } from '@/components/atoms/Container';
import { setImmersiveScroll } from '@/lib/immersive-scroll';
import styles from './ProjectLifecycle.module.css';

const TOTAL_WEEKS = 8;
export function ProjectLifecycle({
  title,
  hint,
  weeks,
  phases,
}: {
  title: string;
  hint: string;
  weeks: readonly string[];
  phases: readonly LifecyclePhase[];
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLSpanElement>(null);
  const activeIdRef = useRef(phases[0]?.id);
  const [activeId, setActiveId] = useState(phases[0]?.id);
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    let start = 0;
    let distance = 1;
    let pinnedHeight = window.innerHeight;
    let frame = 0;
    let immersive = false;
    const setImmersive = (next: boolean) => {
      if (next === immersive) return;
      immersive = next;
      setImmersiveScroll('project-lifecycle', next);
    };
    const measure = () => {
      start = node.getBoundingClientRect().top + window.scrollY;
      pinnedHeight =
        node.firstElementChild?.getBoundingClientRect().height ??
        window.innerHeight;
      distance = Math.max(1, node.offsetHeight - pinnedHeight);
    };
    const update = () => {
      frame = 0;
      const next = Math.min(
        1,
        Math.max(0, (window.scrollY - start) / distance),
      );
      if (todayRef.current)
        todayRef.current.style.left = `${(next * 100).toFixed(3)}%`;
      const viewport = viewportRef.current;
      if (viewport && window.innerWidth < 768) {
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;
        viewport.scrollLeft = next * Math.max(0, maxScroll);
      }
      const bounds = node.getBoundingClientRect();
      setImmersive(
        window.innerWidth >= 768 &&
          bounds.top <= 116 &&
          bounds.bottom >= pinnedHeight + 24,
      );
      const nextActive = phases.reduce(
        (current, phase) =>
          phase.startWeek <= next * TOTAL_WEEKS ? phase : current,
        phases[0],
      );
      if (nextActive.id !== activeIdRef.current) {
        activeIdRef.current = nextActive.id;
        setActiveId(nextActive.id);
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
      setImmersive(false);
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [phases]);
  const active = useMemo(
    () => phases.find((phase) => phase.id === activeId) ?? phases[0],
    [activeId, phases],
  );
  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.sticky}>
        <Container>
          <h3>{title}</h3>
          <div className={styles.panel}>
            <div ref={viewportRef} className={styles.viewport}>
              <div className={styles.chart}>
                <div className={styles.weekHeader}>
                  <span />
                  <div>
                    {weeks.map((label) => (
                      <span key={label}>{label}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.rows}>
                  <div className={styles.progressArea} aria-hidden="true">
                    <span ref={todayRef} className={styles.today}>
                      <i>Hoy</i>
                    </span>
                  </div>
                  {phases.map((phase) => {
                    const isActive = phase.id === active.id;
                    return (
                      <div className={styles.row} key={phase.id}>
                        <span className={styles.label}>{phase.title}</span>
                        <div className={styles.track}>
                          <span
                            className={`${styles.bar} ${styles[phase.tone]} ${isActive ? styles.active : ''}`}
                            style={{
                              left: `${(phase.startWeek / TOTAL_WEEKS) * 100}%`,
                              width: `${(phase.duration / TOTAL_WEEKS) * 100}%`,
                            }}
                          >
                            {phase.title}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <p className={styles.hint}>{hint}</p>
            <div className={styles.description} aria-live="polite">
              <strong>{active.title}</strong>
              <span>{active.description}</span>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
