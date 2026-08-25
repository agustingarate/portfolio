"use client";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import styles from "./PointerGlow.module.css";
export function PointerGlow() {
  const ref = useRef<HTMLDivElement>(null); const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => { ref.current?.style.setProperty("--pointer-x", `${event.clientX}px`); ref.current?.style.setProperty("--pointer-y", `${event.clientY}px`); }); };
    window.addEventListener("pointermove", move, { passive: true }); return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); };
  }, [reduced]);
  return <div ref={ref} className={styles.glow} aria-hidden="true" />;
}
