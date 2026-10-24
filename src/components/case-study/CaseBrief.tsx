import type { CaseBriefData } from "@/lib/briefs";

function Block({
  label,
  ruled = false,
  children,
}: {
  label: string;
  ruled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${ruled ? "pt-6 mt-6 border-t border-border/60" : ""}`}>
      <span className="text-[11px] font-mono uppercase tracking-widest text-accent">{label}</span>
      {children}
    </div>
  );
}

// "At a glance": the problem, why AI, the solution and the tradeoffs, before
// the detailed sections. Hairline rules and whitespace only, no filled cards.
export function CaseBrief({ brief }: { brief: CaseBriefData }) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-10">
        <Block label="Problem">
          <p className="text-base leading-relaxed text-ink-soft">{brief.problem}</p>
        </Block>
        <div className="border-t border-border/60 pt-6 md:border-t-0 md:pt-0">
          <Block label="Why AI">
            <p className="text-base leading-relaxed text-ink-soft">{brief.whyAi}</p>
          </Block>
        </div>
      </div>
      <Block label="Solution" ruled>
        <p className="text-base leading-relaxed text-ink-soft max-w-2xl">{brief.solution}</p>
      </Block>
      <Block label="Tradeoffs" ruled>
        <ul className="flex flex-col gap-3 max-w-2xl">
          {brief.tradeoffs.map((t) => (
            <li key={t.decision} className="flex items-start gap-3 text-sm">
              <span className="text-muted-2 font-mono">—</span>
              <span>
                <span className="text-ink font-medium">{t.decision}.</span>{" "}
                <span className="text-muted-2">Cost: {t.cost}</span>
              </span>
            </li>
          ))}
        </ul>
      </Block>
    </div>
  );
}

export function TradeoffTable({ brief }: { brief: CaseBriefData }) {
  return (
    <div className="overflow-x-auto -mx-1 px-1 my-2">
      <table className="w-full min-w-[560px] text-left border-collapse">
        <thead>
          <tr className="border-b border-border-strong/80">
            {["Decision", "What it cost", "Why it was worth it"].map((h) => (
              <th
                key={h}
                className="py-3 pr-4 text-[11px] font-mono uppercase tracking-wider text-muted font-normal align-bottom"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {brief.tradeoffs.map((t) => (
            <tr key={t.decision} className="border-b border-border/60 align-top">
              <td className="py-4 pr-4 text-sm text-ink font-medium w-[34%]">{t.decision}</td>
              <td className="py-4 pr-4 text-sm text-ink-soft w-[30%]">{t.cost}</td>
              <td className="py-4 text-sm text-ink-soft">{t.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
