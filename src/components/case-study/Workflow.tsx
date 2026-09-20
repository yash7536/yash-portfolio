"use client";

import { useReveal } from "@/components/motion/useReveal";

type Step = { label: string; highlight?: "accent" | "error" };

const STEP_STAGGER_MS = 55;

function stepStyle(revealed: boolean, i: number): React.CSSProperties {
  return {
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(6px)",
    transitionDelay: revealed ? `${i * STEP_STAGGER_MS}ms` : "0ms",
  };
}

// Single visual treatment for every workflow diagram across all three case
// studies: numbered steps, hairline top border, no filled boxes.
export function Workflow({ title, steps }: { title: string; steps: Step[] }) {
  const [ref, revealed] = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="py-4 border-y border-border/60">
      <div className="text-xs font-mono uppercase tracking-wider text-muted mb-3">
        {title}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-5">
        {steps.map((step, i) => (
          <div
            key={`${step.label}-${i}`}
            className="flex flex-col gap-1 transition-[opacity,transform] duration-(--dur-medium) ease-(--ease-premium)"
            style={stepStyle(revealed, i)}
          >
            <span
              className={`text-xs font-mono ${
                step.highlight === "accent"
                  ? "text-accent font-semibold"
                  : step.highlight === "error"
                    ? "text-error font-semibold"
                    : "text-muted-2"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`font-medium text-sm ${
                step.highlight === "accent"
                  ? "text-accent"
                  : step.highlight === "error"
                    ? "text-error"
                    : "text-ink"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Inline arrow-chain variant, used where Stitch used a single flowing line
// (SquadPay's before/after flows) rather than a grid.
export function InlineFlow({ title, steps }: { title: string; steps: Step[] }) {
  const [ref, revealed] = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="py-4 border-y border-border/60">
      <div className="text-xs font-mono uppercase tracking-wider text-muted mb-3">
        {title}
      </div>
      <div className="flex flex-wrap items-center gap-y-2 text-xs font-mono text-ink">
        {steps.map((step, i) => (
          <span
            key={`${step.label}-${i}`}
            className="flex items-center transition-[opacity,transform] duration-(--dur-medium) ease-(--ease-premium)"
            style={stepStyle(revealed, i)}
          >
            <span
              className={`mr-1 ${
                step.highlight === "accent"
                  ? "text-accent font-semibold"
                  : step.highlight === "error"
                    ? "text-error font-semibold"
                    : "text-muted"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={
                step.highlight === "accent"
                  ? "text-accent font-semibold"
                  : step.highlight === "error"
                    ? "text-error font-semibold"
                    : ""
              }
            >
              {step.label}
            </span>
            {i < steps.length - 1 ? (
              <span className="text-[#888888] mx-2">→</span>
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}
