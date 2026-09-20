import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

type Stat = { value: string; label: string };

export function CaseStudyHero({
  eyebrow,
  title,
  tagline,
  stats,
  liveUrl,
  githubUrl,
  deckHref,
}: {
  eyebrow?: string;
  title: string;
  tagline: string;
  stats: Stat[];
  liveUrl: string;
  githubUrl: string;
  deckHref: string;
}) {
  return (
    <header className="pb-12 pt-12 md:pt-16">
      <Reveal delay={0}>
        {eyebrow ? (
          <div className="text-[11px] font-mono uppercase tracking-widest text-subtle mb-3 block">
            {eyebrow}
          </div>
        ) : null}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-ink tracking-tight mb-4">
          {title}
        </h1>
      </Reveal>
      <Reveal delay={70} as="p" className="font-serif text-xl sm:text-2xl text-ink-soft italic leading-relaxed mb-6 max-w-3xl">
        {tagline}
      </Reveal>

      <Reveal
        delay={140}
        className="grid grid-cols-2 gap-x-6 gap-y-5 py-6 border-y border-border/60 mb-8"
        style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, minmax(0,1fr))` }}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-1 min-w-0">
            <div className="font-serif text-xl sm:text-3xl lg:text-4xl text-ink leading-tight break-words">
              {stat.value}
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </Reveal>

      <Reveal delay={210} className="flex flex-wrap items-center gap-3 sm:gap-4">
        <Link
          href={deckHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded border border-ink bg-ink text-white hover:bg-accent hover:border-accent transition-colors"
        >
          View Story
        </Link>
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded border border-border text-ink hover:border-ink transition-colors"
        >
          Live Prototype <span className="text-sm external-arrow">↗</span>
        </a>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded border border-border text-ink hover:border-ink transition-colors"
        >
          GitHub <span className="text-sm external-arrow">↗</span>
        </a>
      </Reveal>
    </header>
  );
}
