import Image from "next/image";
import type { Slide, Screenshot } from "@/lib/decks/types";

function Frame({ shot }: { shot: Screenshot }) {
  return (
    <figure
      className="w-full motion-safe:animate-[shot-in_var(--dur-slow)_var(--ease-premium)_both]"
      style={{ animationDelay: "160ms" }}
    >
      <div className="border border-border bg-surface-card overflow-hidden">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={1440}
          height={900}
          className="w-full h-auto block transition-transform duration-(--dur-medium) ease-(--ease-premium) hover:scale-[1.015]"
          priority={false}
        />
      </div>
      <figcaption className="mt-2 text-[11px] font-mono uppercase tracking-wider text-muted">
        {shot.caption}
      </figcaption>
    </figure>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-mono uppercase tracking-widest text-subtle mb-3">
      {children}
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight mb-5">
      {children}
    </h2>
  );
}

export function SlideBody({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case "product":
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
          <div>
            <Kicker>{slide.eyebrow}</Kicker>
            <h1 className="font-serif text-4xl sm:text-5xl text-ink tracking-tight mb-4">
              {slide.title}
            </h1>
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed mb-6 max-w-md">
              {slide.description}
            </p>
            <div className="text-xs font-mono text-ink font-medium border-y border-border/60 py-3 mb-6">
              {slide.proofLine}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={slide.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider rounded border border-ink bg-ink text-white hover:bg-accent hover:border-accent transition-colors"
              >
                Live Prototype ↗
              </a>
              <a
                href={slide.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider rounded border border-border text-ink hover:border-ink transition-colors"
              >
                GitHub ↗
              </a>
            </div>
          </div>
          <Frame shot={slide.screenshot} />
        </div>
      );

    case "problem":
      return (
        <div className="max-w-2xl">
          <Kicker>{slide.eyebrow}</Kicker>
          <Heading>{slide.title}</Heading>
          <p className="text-base sm:text-lg text-ink-soft leading-relaxed mb-8">
            {slide.body}
          </p>
          <div className="border-t border-border/60 pt-5">
            <div className="text-xs font-mono uppercase tracking-wider text-muted mb-3">
              Before
            </div>
            <div className="flex flex-wrap items-center gap-y-2 text-xs font-mono text-ink">
              {slide.before.map((step, i) => (
                <span key={step} className="flex items-center">
                  <span className="text-muted mr-1">{String(i + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                  {i < slide.before.length - 1 ? (
                    <span className="text-subtle mx-2">→</span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        </div>
      );

    case "insight":
      return (
        <div className={`grid grid-cols-1 ${slide.screenshot ? "lg:grid-cols-2" : ""} gap-10 items-center w-full`}>
          <div>
            <Kicker>{slide.eyebrow}</Kicker>
            <blockquote className="border-l-2 border-ink pl-4 font-serif text-xl sm:text-2xl italic text-ink mb-6">
              {slide.quote}
            </blockquote>
            <p className="text-base text-ink-soft leading-relaxed max-w-md">{slide.body}</p>
          </div>
          {slide.screenshot ? <Frame shot={slide.screenshot} /> : null}
        </div>
      );

    case "how-it-works":
      return (
        <div className={`grid grid-cols-1 ${slide.screenshot ? "lg:grid-cols-2" : ""} gap-10 items-center w-full`}>
          <div>
            <Kicker>{slide.eyebrow}</Kicker>
            <Heading>{slide.title}</Heading>
            <div className="flex flex-col gap-3 border-t border-border/60 pt-5">
              {slide.steps.map((step, i) => (
                <div key={step} className="flex items-center gap-3 text-sm text-ink">
                  <span className="text-xs font-mono text-muted w-6 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            {slide.note ? (
              <p className="text-xs font-mono text-muted italic mt-5">{slide.note}</p>
            ) : null}
          </div>
          {slide.screenshot ? <Frame shot={slide.screenshot} /> : null}
        </div>
      );

    case "failure":
      return (
        <div className={`grid grid-cols-1 ${slide.screenshot ? "lg:grid-cols-2" : ""} gap-10 items-center w-full`}>
          <div>
            <Kicker>{slide.eyebrow}</Kicker>
            <blockquote className="border-l-2 border-error pl-4 font-serif text-2xl sm:text-3xl italic text-ink mb-6">
              {slide.quote}
            </blockquote>
            <p className="text-base text-ink-soft leading-relaxed max-w-md">{slide.body}</p>
          </div>
          {slide.screenshot ? <Frame shot={slide.screenshot} /> : null}
        </div>
      );

    case "change":
      return (
        <div className={`grid grid-cols-1 ${slide.screenshot ? "lg:grid-cols-2 items-center" : ""} gap-10 w-full`}>
        <div className="max-w-2xl">
          <Kicker>{slide.eyebrow}</Kicker>
          <Heading>{slide.title}</Heading>
          <p className="text-base sm:text-lg text-ink-soft leading-relaxed mb-6">{slide.body}</p>
          {slide.flow ? (
            <div className="border-t border-border/60 pt-5 mb-4">
              <div className="flex flex-wrap items-center gap-y-2 text-xs font-mono text-ink">
                {slide.flow.map((step, i) => (
                  <span key={step} className="flex items-center">
                    <span className="text-muted mr-1">{String(i + 1).padStart(2, "0")}</span>
                    <span>{step}</span>
                    {i < slide.flow!.length - 1 ? (
                      <span className="text-subtle mx-2">→</span>
                    ) : null}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          {slide.note ? (
            <p className="text-sm text-muted-2 border-l-2 border-outline-variant pl-4">
              {slide.note}
            </p>
          ) : null}
        </div>
        {slide.screenshot ? <Frame shot={slide.screenshot} /> : null}
        </div>
      );

    case "evaluation":
      return (
        <div className="max-w-2xl">
          <Kicker>{slide.eyebrow}</Kicker>
          <Heading>{slide.title}</Heading>
          {slide.body ? (
            <p className="text-base text-ink-soft leading-relaxed mb-6">{slide.body}</p>
          ) : null}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-y border-border/60 mb-4">
            {slide.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-serif text-3xl sm:text-4xl text-ink">{stat.value}</span>
                <span className="text-xs font-mono text-muted uppercase tracking-wider mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
          {slide.note ? <p className="text-xs text-muted">{slide.note}</p> : null}
        </div>
      );

    case "testing":
      return (
        <div className="max-w-2xl">
          <Kicker>{slide.eyebrow}</Kicker>
          <Heading>{slide.title}</Heading>
          <p className="font-serif text-lg text-ink-soft italic leading-relaxed mb-6">
            {slide.body}
          </p>
          {slide.stats ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-border/60 mb-4">
              {slide.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-serif text-2xl sm:text-3xl text-ink">{stat.value}</span>
                  <span className="text-[11px] font-mono text-muted uppercase tracking-wider mt-2">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
          {slide.note ? <p className="text-xs text-muted">{slide.note}</p> : null}
        </div>
      );

    case "takeaway":
      return (
        <div className="max-w-2xl">
          <Kicker>{slide.eyebrow}</Kicker>
          <Heading>{slide.title}</Heading>
          <div className="flex flex-col gap-6">
            <div className="border-l-2 border-accent pl-4">
              <div className="text-xs font-mono uppercase tracking-wider text-muted mb-1">
                Product decision
              </div>
              <p className="text-base text-ink">{slide.decision}</p>
            </div>
            <div className="border-l-2 border-outline-variant pl-4">
              <div className="text-xs font-mono uppercase tracking-wider text-muted mb-1">
                Tradeoff
              </div>
              <p className="text-base text-ink-soft">{slide.tradeoff}</p>
            </div>
            <div className="border-l-2 border-outline-variant pl-4">
              <div className="text-xs font-mono uppercase tracking-wider text-muted mb-1">
                Remaining limitation
              </div>
              <p className="text-base text-ink-soft">{slide.limitation}</p>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
