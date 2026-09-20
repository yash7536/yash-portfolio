import { Reveal } from "@/components/motion/Reveal";

export function Section({
  id,
  eyebrow,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-14 first:pt-0 border-b border-border/60 last:border-b-0 ${className}`}
    >
      <Reveal>
        <div className="text-[11px] font-mono uppercase tracking-widest text-subtle mb-3 block">
          {eyebrow}
        </div>
        {children}
      </Reveal>
    </section>
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-2xl lg:text-3xl font-normal text-ink tracking-tight leading-tight mb-4">
      {children}
    </h2>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-base leading-relaxed text-ink-soft mb-4 max-w-2xl">
      {children}
    </p>
  );
}
