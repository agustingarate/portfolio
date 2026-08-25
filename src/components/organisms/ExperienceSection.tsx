'use client';
import { useEffect, useRef, useState } from 'react';
import type { Experience } from '@/content/portfolio.types';
import { Container } from '@/components/atoms/Container';
import { SectionHeading } from '@/components/molecules/SectionHeading';
import { ExperienceItem } from '@/components/molecules/ExperienceItem';
import { Reveal } from '@/components/molecules/Reveal';
import styles from './Sections.module.css';
export function ExperienceSection({
  title,
  items,
}: {
  title: string;
  items: readonly Experience[];
}) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: '-35% 0px -45%', threshold: 0 },
    );
    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return (
    <section id="experiencia" className={styles.section}>
      <Container>
        <SectionHeading title={title} />
        <div className={styles.timeline}>
          {items.map((item, index) => (
            <div
              key={item.role}
              data-index={index}
              ref={(node) => {
                refs.current[index] = node;
              }}
            >
              <Reveal delay={index * 150}>
                <ExperienceItem item={item} active={index === active} />
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
