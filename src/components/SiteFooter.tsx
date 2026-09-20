import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border/60 bg-surface">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
        <div>{site.footerTagline}</div>
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${site.email}`}
            className="hover:text-accent transition-colors duration-(--dur-fast) ease-(--ease-premium)"
          >
            Email
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-(--dur-fast) ease-(--ease-premium)"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-(--dur-fast) ease-(--ease-premium)"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
