"use client";

import { useReveal } from "@/components/motion/useReveal";

export function Quote({
  children,
  tone = "ink",
}: {
  children: React.ReactNode;
  tone?: "ink" | "error";
}) {
  const [ref, revealed] = useReveal<HTMLQuoteElement>();
  const ruleColor = tone === "error" ? "bg-error" : "bg-ink";

  return (
    <blockquote
      ref={ref}
      className="relative pl-4 my-6 italic font-serif text-lg text-ink"
    >
      <span
        aria-hidden
        className={`absolute left-0 top-0 bottom-0 w-[2px] ${ruleColor} origin-top transition-transform duration-(--dur-medium) ease-(--ease-premium) ${
          revealed ? "scale-y-100" : "scale-y-0"
        }`}
      />
      <span
        className="block transition-opacity duration-(--dur-slow) ease-(--ease-premium)"
        style={{ opacity: revealed ? 1 : 0, transitionDelay: revealed ? "90ms" : "0ms" }}
      >
        {children}
      </span>
    </blockquote>
  );
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-outline-variant pl-4 py-1 my-4">
      <p className="text-sm text-muted-2 leading-relaxed max-w-2xl">{children}</p>
    </div>
  );
}

export function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-3 text-sm font-sans text-ink max-w-2xl">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="text-muted-2 font-mono">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-border/60">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col">
          <span className="font-serif text-3xl sm:text-4xl text-ink">{stat.value}</span>
          <span className="text-xs font-mono text-muted uppercase tracking-wider mt-2">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
