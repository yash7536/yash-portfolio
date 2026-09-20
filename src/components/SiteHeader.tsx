import Link from "next/link";
import { nav } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur border-b border-border/60">
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-lg font-medium text-ink tracking-tight hover:opacity-80 transition-opacity duration-(--dur-fast) ease-(--ease-premium)"
        >
          Vishnu Yash Pandey
        </Link>
        <nav className="flex items-center gap-5 md:gap-8 text-[11px] md:text-xs font-mono tracking-wider uppercase text-muted">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-accent transition-colors duration-(--dur-fast) ease-(--ease-premium)"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
