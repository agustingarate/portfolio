'use client';

import { useEffect, useRef, useState } from 'react';
import type { Education } from '@/content/portfolio.types';
import { Chip } from '@/components/atoms/Chip';
import { Icon } from '@/components/atoms/Icon';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { setImmersiveScroll } from '@/lib/immersive-scroll';
import { EducationBackdrop } from './EducationBackdrop';
import styles from './EducationTimeline.module.css';

const PROGRESS_SCROLL_PORTION = 0.75;
const curveY = (progress: number) =>
  Number((72 - 25 * Math.sin(progress * Math.PI * 2)).toFixed(4));
const CURVE_PATH = Array.from({ length: 161 }, (_, index) => {
  const progress = index / 160;
  return `${index === 0 ? 'M' : 'L'} ${progress * 1000} ${curveY(progress)}`;
}).join(' ');

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
  const progressBarRef = useRef<SVGPathElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const celebrationFired = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      if (stickyRef.current) {
        stickyRef.current.style.setProperty('--education-entry', '1');
        stickyRef.current.style.setProperty('--education-title-entry', '1');
        stickyRef.current.style.setProperty('--education-track-entry', '1');
        stickyRef.current.style.setProperty('--education-detail-entry', '1');
        stickyRef.current.style.setProperty('--education-parallax', '0');
      }
      if (progressBarRef.current)
        progressBarRef.current.style.clipPath = 'inset(-10px -10px -10px 0)';
      if (capRef.current) {
        capRef.current.style.left = '100%';
        capRef.current.style.top = `${curveY(1)}px`;
      }
      setImmersiveScroll('education', false);
      return;
    }

    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    if (!wrapper || !sticky || milestones.length === 0) return;

    let start = 0;
    let timelineStart = 0;
    let distance = 1;
    let frame = 0;
    let immersive = false;
    let targetProgress = 0;
    let visualProgress = 0;
    let targetEntry = 0;
    let visualEntry = 0;
    let targetTitleEntry = 0;
    let visualTitleEntry = 0;
    let targetTrackEntry = 0;
    let visualTrackEntry = 0;
    let targetDetailEntry = 0;
    let visualDetailEntry = 0;
    let titleStart = 0;
    let trackStart = 0;
    let detailStart = 0;

    const measure = () => {
      start = wrapper.getBoundingClientRect().top + window.scrollY;
      const pinned = getComputedStyle(sticky).position === 'sticky';
      if (!pinned) start -= window.innerHeight * 0.5;
      distance = pinned
        ? Math.max(1, wrapper.offsetHeight - sticky.offsetHeight)
        : Math.max(1, wrapper.offsetHeight * 0.65);
      titleStart =
        (titleRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
      trackStart =
        (trackRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
      detailStart =
        (detailsRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
      timelineStart = Math.max(start, detailStart - window.innerHeight * 0.6);
    };
    const applyProgress = (nextProgress: number) => {
      const nextIndex = Math.min(
        milestones.length - 1,
        Math.floor(nextProgress * (milestones.length - 1) + 0.001),
      );

      if (progressBarRef.current)
        progressBarRef.current.style.clipPath = `inset(-10px ${nextProgress === 1 ? '-10px' : `${(1 - nextProgress) * 100}%`} -10px 0)`;
      if (capRef.current) {
        capRef.current.style.left = `${nextProgress * 100}%`;
        capRef.current.style.top = `${curveY(nextProgress)}px`;
      }

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
    };
    const applySceneMotion = (
      entryProgress: number,
      scrollProgress: number,
      titleProgress: number,
      trackProgress: number,
      detailProgress: number,
    ) => {
      const easeOut = (value: number) => 1 - Math.pow(1 - value, 3);
      sticky.style.setProperty('--education-entry', `${entryProgress}`);
      const titleEntry = easeOut(titleProgress);
      const trackEntry = easeOut(trackProgress);
      const detailEntry = easeOut(detailProgress);
      sticky.style.setProperty('--education-title-entry', `${titleEntry}`);
      sticky.style.setProperty('--education-track-entry', `${trackEntry}`);
      sticky.style.setProperty('--education-detail-entry', `${detailEntry}`);
      sticky.style.setProperty('--education-parallax', `${scrollProgress}`);
      sticky.style.setProperty(
        '--education-panel-x',
        `${(1 - entryProgress) * 92}vw`,
      );
      sticky.style.setProperty(
        '--education-title-y',
        `${(1 - titleEntry) * 42}px`,
      );
      sticky.style.setProperty(
        '--education-title-clip',
        `${(1 - titleEntry) * 100}%`,
      );
      sticky.style.setProperty(
        '--education-label-blur',
        `${(1 - trackEntry) * 8}px`,
      );
      sticky.style.setProperty(
        '--education-track-y',
        `${(1 - trackEntry) * 28}px`,
      );
      sticky.style.setProperty(
        '--education-track-scale',
        `${0.975 + trackEntry * 0.025}`,
      );
      sticky.style.setProperty(
        '--education-detail-y',
        `${(1 - detailEntry) * 42}px`,
      );
      sticky.style.setProperty(
        '--education-period-x',
        `${scrollProgress * -14}vw`,
      );
      sticky.style.setProperty('--education-mark-x', `${scrollProgress * 9}vw`);
      sticky.style.setProperty(
        '--education-title-parallax-y',
        `${scrollProgress * -38}px`,
      );
      sticky.style.setProperty(
        '--education-label-parallax-x',
        `${scrollProgress * -5}vw`,
      );
      sticky.style.setProperty(
        '--education-track-parallax-y',
        `${scrollProgress * 18}px`,
      );
      sticky.style.setProperty(
        '--education-detail-parallax-y',
        `${scrollProgress * 42}px`,
      );
      sticky.style.setProperty(
        '--education-detail-parallax-x',
        `${scrollProgress * 2.5}vw`,
      );
    };
    const readScroll = () => {
      const bounds = wrapper.getBoundingClientRect();
      targetEntry = Math.min(
        1,
        Math.max(
          0,
          (window.innerHeight * 0.72 - bounds.top) /
            (window.innerHeight * 0.58),
        ),
      );
      const elementEntry = (documentY: number, lead: number) =>
        Math.min(
          1,
          Math.max(
            0,
            (window.scrollY + window.innerHeight * lead - documentY) /
              (window.innerHeight * 0.3),
          ),
        );
      targetTitleEntry = elementEntry(titleStart, 0.84);
      targetTrackEntry = elementEntry(trackStart, 0.86);
      targetDetailEntry = elementEntry(detailStart, 0.9);
      const scrollProgress =
        targetDetailEntry >= 0.999
          ? Math.min(
              1,
              Math.max(0, (window.scrollY - timelineStart) / distance),
            )
          : 0;
      targetProgress = Math.min(1, scrollProgress / PROGRESS_SCROLL_PORTION);
      const nextImmersive =
        window.innerWidth >= 768 &&
        bounds.top <= 116 &&
        bounds.bottom >= sticky.offsetHeight + 24;
      if (nextImmersive !== immersive) {
        immersive = nextImmersive;
        setImmersiveScroll('education', immersive);
      }
    };
    const animate = () => {
      frame = 0;
      const delta = targetProgress - visualProgress;
      const entryDelta = targetEntry - visualEntry;
      const titleDelta = targetTitleEntry - visualTitleEntry;
      const trackDelta = targetTrackEntry - visualTrackEntry;
      const detailDelta = targetDetailEntry - visualDetailEntry;
      visualProgress += delta * 0.095;
      visualEntry += entryDelta * 0.085;
      visualTitleEntry += titleDelta * 0.1;
      visualTrackEntry += trackDelta * 0.085;
      visualDetailEntry += detailDelta * 0.075;
      if (Math.abs(delta) < 0.0004) visualProgress = targetProgress;
      if (Math.abs(entryDelta) < 0.0004) visualEntry = targetEntry;
      if (Math.abs(titleDelta) < 0.0004) visualTitleEntry = targetTitleEntry;
      if (Math.abs(trackDelta) < 0.0004) visualTrackEntry = targetTrackEntry;
      if (Math.abs(detailDelta) < 0.0004) visualDetailEntry = targetDetailEntry;
      applyProgress(visualProgress);
      applySceneMotion(
        visualEntry,
        visualProgress,
        visualTitleEntry,
        visualTrackEntry,
        visualDetailEntry,
      );
      if (
        visualProgress !== targetProgress ||
        visualEntry !== targetEntry ||
        visualTitleEntry !== targetTitleEntry ||
        visualTrackEntry !== targetTrackEntry ||
        visualDetailEntry !== targetDetailEntry
      )
        frame = requestAnimationFrame(animate);
    };
    const requestUpdate = () => {
      readScroll();
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const handleResize = () => {
      measure();
      requestUpdate();
    };

    measure();
    readScroll();
    visualProgress = targetProgress;
    visualEntry = targetEntry;
    visualTitleEntry = targetTitleEntry;
    visualTrackEntry = targetTrackEntry;
    visualDetailEntry = targetDetailEntry;
    applyProgress(visualProgress);
    applySceneMotion(
      visualEntry,
      visualProgress,
      visualTitleEntry,
      visualTrackEntry,
      visualDetailEntry,
    );
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
        <div className={styles.panel}>
          <EducationBackdrop />
          <div className={styles.content}>
            <h2 ref={titleRef} id="education-title">
              {title}
            </h2>
            <div className={styles.yearLabel} aria-live="polite">
              <span key={active?.label}>{active?.label}</span>
            </div>
            <div ref={trackRef} className={styles.track}>
              <div className={styles.rail} aria-hidden="true">
                <svg
                  className={styles.curve}
                  viewBox="0 0 1000 144"
                  preserveAspectRatio="none"
                >
                  <path d={CURVE_PATH} className={styles.railBase} />
                  <path
                    ref={progressBarRef}
                    d={CURVE_PATH}
                    className={styles.railProgress}
                  />
                </svg>
                <div ref={capRef} className={styles.cap}>
                  {displayActiveIndex === milestones.length - 1 ? (
                    <Icon name="sparkles" size={28} />
                  ) : (
                    <Icon name="school" size={54} />
                  )}
                </div>
              </div>
              <ol className={styles.nodes}>
                {milestones.map((milestone, index) => (
                  <li
                    key={milestone.year}
                    style={{
                      left: `${(index / Math.max(1, milestones.length - 1)) * 100}%`,
                      top: `${curveY(index / Math.max(1, milestones.length - 1))}px`,
                    }}
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
            <div ref={detailsRef} className={styles.details}>
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
        </div>
      </div>
    </section>
  );
}
