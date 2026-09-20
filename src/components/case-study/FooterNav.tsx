import Link from "next/link";

export function CaseStudyFooterNav({
  prev,
  next,
}: {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}) {
  return (
    <div className="border-t border-border/60 mt-16 pt-8 pb-12 flex justify-between items-center text-xs font-mono uppercase tracking-wider text-muted">
      {prev ? (
        <Link href={prev.href} className="hover:text-accent transition-colors">
          ← {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="hover:text-accent transition-colors">
          {next.label} →
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
