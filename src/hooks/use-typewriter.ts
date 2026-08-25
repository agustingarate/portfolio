"use client";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

export function useTypewriter(phrases: readonly string[]) {
  const reduced = usePrefersReducedMotion();
  const [text, setText] = useState(phrases[0] ?? "");
  useEffect(() => {
    if (!phrases.length) return;
    if (reduced) {
      const staticTimer = setTimeout(() => setText(phrases[0]), 0);
      return () => clearTimeout(staticTimer);
    }
    let phrase = 0, char = phrases[0].length, deleting = false, timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = phrases[phrase];
      char = deleting ? Math.max(0, char - 1) : Math.min(current.length, char + 1);
      setText(current.slice(0, char));
      let delay = deleting ? 30 : 60;
      if (!deleting && char >= current.length) { deleting = true; delay = 2000; }
      else if (deleting && char === 0) { deleting = false; phrase = (phrase + 1) % phrases.length; delay = 500; }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 1000);
    return () => clearTimeout(timer);
  }, [phrases, reduced]);
  return text;
}
