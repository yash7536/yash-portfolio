"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

export function Toc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    // A section counts as "active" once it has crossed just below the
    // sticky header, and stays active until the next one does the same.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="w-full lg:w-56 shrink-0">
      <div className="lg:sticky lg:top-24 flex flex-col gap-3">
        <span className="text-[11px] font-mono text-subtle uppercase tracking-widest pb-2 border-b border-border/60">
          Table of Contents
        </span>
        <nav className="flex flex-col gap-2 text-xs font-mono">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`py-0.5 ${
                  isActive ? "text-ink font-medium" : "text-muted hover:text-accent transition-colors duration-(--dur-medium) ease-(--ease-premium)"
                }`}
                style={{
                  boxShadow: isActive ? "inset 3px 0 0 var(--color-accent)" : "inset 3px 0 0 transparent",
                  paddingLeft: isActive ? "0.6rem" : "0px",
                  transition:
                    "color var(--dur-medium) var(--ease-premium), box-shadow var(--dur-medium) var(--ease-premium), padding-left var(--dur-medium) var(--ease-premium)",
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
