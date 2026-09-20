"use client";

import { useReveal } from "@/components/motion/useReveal";

export function BarList({
  items,
}: {
  items: { label: string; from?: number; to: number; display: string }[];
}) {
  const [ref, revealed] = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="space-y-4 my-6 max-w-xl">
      {items.map((item, i) => (
        <div key={item.label} className="flex flex-col gap-1">
          <div
            className="flex justify-between items-baseline mb-1 text-xs font-mono transition-opacity duration-(--dur-medium) ease-(--ease-premium)"
            style={{ opacity: revealed ? 1 : 0, transitionDelay: revealed ? `${i * 70 + 260}ms` : "0ms" }}
          >
            <span>{item.label}</span>
            <span className="font-semibold text-ink">{item.display}</span>
          </div>
          <div className="w-full h-1.5 bg-surface-2 relative rounded-full overflow-hidden">
            {item.from !== undefined ? (
              <div
                className="bg-muted-2 h-1.5 absolute left-0 transition-[width] duration-(--dur-slow) ease-(--ease-premium)"
                style={{ width: revealed ? `${item.from}%` : "0%", transitionDelay: `${i * 70}ms` }}
              />
            ) : null}
            <div
              className="bg-accent-deep h-1.5 absolute left-0 transition-[width] duration-(--dur-slow) ease-(--ease-premium)"
              style={{ width: revealed ? `${item.to}%` : "0%", transitionDelay: `${i * 70}ms` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Simple two/three-segment donut built from stroke-dasharray circles,
// matching the exact construction Stitch used.
export function Donut({
  segments,
  total: totalOverride,
  centerValue,
  centerLabel,
  caption,
}: {
  segments: { value: number; colorClass: string }[];
  total?: number;
  centerValue: string;
  centerLabel?: string;
  caption?: string;
}) {
  const [ref, revealed] = useReveal<HTMLDivElement>();
  const total = totalOverride ?? (segments.reduce((sum, s) => sum + s.value, 0) || 1);
  const circumference = 251.3; // 2 * pi * 40

  const arcs = segments.reduce<
    { colorClass: string; length: number; dasharray: string; dashoffset: number }[]
  >((acc, seg) => {
    const cursor = acc.reduce((sum, a) => sum + a.length, 0);
    const length = (seg.value / total) * circumference;
    acc.push({
      colorClass: seg.colorClass,
      length,
      dasharray: `${length} ${circumference}`,
      dashoffset: -cursor,
    });
    return acc;
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            className="stroke-surface-2"
            cx="50"
            cy="50"
            fill="transparent"
            r="40"
            strokeWidth="12"
          />
          {arcs.map((arc, i) => (
            <circle
              key={i}
              className={arc.colorClass}
              cx="50"
              cy="50"
              fill="transparent"
              r="40"
              strokeWidth="12"
              strokeDasharray={arc.dasharray}
              style={{
                strokeDashoffset: revealed ? arc.dashoffset : arc.dashoffset + arc.length,
                transition: "stroke-dashoffset var(--dur-slow) var(--ease-premium)",
                transitionDelay: `${i * 90 + 120}ms`,
              }}
            />
          ))}
        </svg>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-(--dur-medium) ease-(--ease-premium)"
          style={{ opacity: revealed ? 1 : 0, transitionDelay: revealed ? "360ms" : "0ms" }}
        >
          <span className="font-serif text-2xl text-ink">{centerValue}</span>
          {centerLabel ? (
            <span className="text-[11px] font-mono text-muted -mt-1">{centerLabel}</span>
          ) : null}
        </div>
      </div>
      {caption ? <p className="text-xs font-mono text-muted mt-2">{caption}</p> : null}
    </div>
  );
}
