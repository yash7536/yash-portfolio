import Link from "next/link";
import type { ProjectSummary } from "@/lib/projects";

export function ProjectCard({
  project,
  withBorder = true,
}: {
  project: ProjectSummary;
  withBorder?: boolean;
}) {
  return (
    <article
      id={project.slug}
      className={`bg-surface-card p-6 lg:p-8 rounded shadow-sm transition-[transform,box-shadow,border-color] duration-(--dur-medium) ease-(--ease-premium) hover:-translate-y-0.5 hover:shadow-md ${
        withBorder ? "border border-border/20 hover:border-border/60" : ""
      }`}
    >
      <div className="max-w-3xl space-y-5">
        <div>
          <div className="flex flex-wrap items-baseline gap-2 mb-3">
            <h3 className="font-serif text-2xl text-ink font-normal tracking-tight">
              {project.name}
            </h3>
            <span className="font-sans text-lg text-muted-2 font-normal">
              — {project.tagline}
            </span>
          </div>
          <p className="text-ink-soft leading-relaxed mb-5">{project.description}</p>

          <div className="pl-4 py-1 mb-5 border-l-2 border-accent/70">
            <span className="text-[11px] font-mono text-muted uppercase tracking-wider block mb-1">
              The Failure
            </span>
            <p className="font-serif text-lg text-ink italic font-normal">
              &ldquo;{project.failureQuote}&rdquo;
            </p>
            <p className="text-sm text-muted-2 mt-1">{project.failureDetail}</p>
          </div>

          <div className="py-3 border-y border-border/30">
            <span className="text-xs font-mono text-ink font-medium">
              {project.proofLine}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href={`/projects/${project.slug}/story`}
            className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded border border-ink bg-ink text-white hover:bg-accent hover:border-accent transition-colors inline-flex items-center"
          >
            View Story
          </Link>
          <Link
            href={`/projects/${project.slug}`}
            className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded border border-ink text-ink bg-transparent hover:bg-surface-2 transition-colors inline-flex items-center"
          >
            Read Full Case Study
          </Link>
          <a
            className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded border border-border text-ink bg-transparent hover:border-ink transition-colors inline-flex items-center"
            href={project.liveUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Live Prototype
          </a>
          <a
            className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded border border-border text-ink bg-transparent hover:border-ink transition-colors inline-flex items-center"
            href={project.githubUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}
