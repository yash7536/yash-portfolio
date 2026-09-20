"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element scrolls into view, then stays true.
 * Elements already in the viewport on mount (e.g. above-the-fold hero
 * content) reveal immediately — IntersectionObserver's first callback
 * fires right away for anything already intersecting.
 *
 * Falls back to "already revealed" if IntersectionObserver isn't
 * available, so content is never permanently stuck hidden.
 */
export function useReveal<T extends HTMLElement>(rootMargin = "0px 0px -10% 0px") {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // Extremely old browser with no IntersectionObserver support — defer
      // out of the synchronous effect body and just show the content.
      queueMicrotask(() => setRevealed(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      // threshold 0 — fires as soon as any part crosses rootMargin's line,
      // so tall blocks (a full case-study section) don't wait for 10% of
      // their own height to be visible before revealing.
      { rootMargin, threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, revealed] as const;
}
