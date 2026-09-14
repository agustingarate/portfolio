'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { argentinaPath, rosario } from '@/lib/hero/map-shape';
import styles from './LiquidMap.module.css';

export function LiquidMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    // Keep Three.js out of the initial hero bundle and load it only in-browser.
    import('@/lib/hero/metal-scene')
      .then(({ createMetalScene }) => {
        if (cancelled || !canvasRef.current) return;
        try {
          dispose = createMetalScene(
            canvasRef.current,
            reduced ||
              window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          );
          setReady(true);
        } catch (error) {
          console.warn('Hero 3D unavailable; displaying static map.', error);
          setReady(false);
        }
      })
      .catch(() => {
        if (!cancelled) setReady(false);
      });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [reduced]);

  return (
    <>
      {!ready && (
        <svg
          className={styles.canvas}
          viewBox="0 0 100 130"
          fill="none"
          aria-hidden="true"
        >
          <path
            d={argentinaPath}
            stroke="#111827"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <g className={styles.fallbackMarker}>
            <circle
              className={styles.fallbackHalo}
              cx={rosario.x * 100}
              cy={rosario.y * 100}
              r="5.5"
            />
            <circle
              className={styles.fallbackDot}
              cx={rosario.x * 100}
              cy={rosario.y * 100}
              r="2.7"
            />
          </g>
        </svg>
      )}
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    </>
  );
}
