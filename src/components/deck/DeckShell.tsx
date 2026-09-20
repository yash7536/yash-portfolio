"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Deck } from "@/lib/decks/types";
import { SlideBody } from "./SlideBody";

export function DeckShell({ deck }: { deck: Deck }) {
  const [index, setIndex] = useState(0);
  // +1 = advancing (next slides in from the right), -1 = going back
  // (previous slides in from the left) — keeps Previous/Next feeling
  // spatially connected rather than just cross-fading.
  const [direction, setDirection] = useState(1);
  const total = deck.slides.length;
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      setDirection(clamped >= index ? 1 : -1);
      setIndex(clamped);
    },
    [total, index],
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setDirection(1);
        setIndex((i) => Math.min(total - 1, i + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setDirection(-1);
        setIndex((i) => Math.max(0, i - 1));
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [total]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 50;
    if (deltaX > threshold) goTo(index - 1);
    else if (deltaX < -threshold) goTo(index + 1);
    touchStartX.current = null;
  }

  const slide = deck.slides[index];
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <div className="flex items-center justify-between px-6 md:px-12 h-16 border-b border-border/60 shrink-0">
        <Link
          href={`/projects/${deck.projectSlug}`}
          className="text-xs font-mono uppercase tracking-wider text-muted hover:text-accent transition-colors"
        >
          ← Exit story
        </Link>
        <span className="font-serif text-base text-ink">{deck.projectName}</span>
        <span className="text-xs font-mono text-muted tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="h-0.5 bg-surface-2 shrink-0">
        <div
          className="h-0.5 bg-accent-deep transition-[width] duration-(--dur-slow) ease-(--ease-premium)"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      <main
        className="flex-1 flex items-center overflow-y-auto"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          key={index}
          className="w-full max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16 motion-safe:animate-[slide-in_var(--dur-slow)_var(--ease-premium)_both]"
          style={{ "--slide-dir": direction } as React.CSSProperties}
        >
          <SlideBody slide={slide} />
        </div>
      </main>

      <div className="flex items-center justify-between px-6 md:px-12 h-20 border-t border-border/60 shrink-0">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={isFirst}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider rounded border border-border text-ink hover:border-ink transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          ← Previous
        </button>

        <div className="hidden sm:flex items-center gap-1.5">
          {deck.slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-(--dur-medium) ease-(--ease-premium) hover:scale-125 ${
                i === index ? "w-5 bg-accent-deep" : "w-1.5 bg-surface-2 hover:bg-border"
              }`}
            />
          ))}
        </div>

        {isLast ? (
          <Link
            href={`/projects/${deck.projectSlug}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider rounded border border-ink bg-ink text-white hover:bg-accent hover:border-accent transition-colors"
          >
            Read Full Case Study →
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider rounded border border-ink bg-ink text-white hover:bg-accent hover:border-accent transition-colors"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
