'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Reveal.module.css';

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -3%', threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
      className={`${styles.reveal} ${visible ? styles.visible : ''} ${className}`}
    >
      {children}
    </div>
  );
}
