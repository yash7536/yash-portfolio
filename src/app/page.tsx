import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

const povFailures = [
  {
    name: "Noto",
    quote: "“A preference looked like a decision.”",
    body: "Sara preferred 15 minutes, Devraj preferred 5, Marcus said “let's test both before deciding.” Noto initially collapsed conversational exploration into a finalized, authoritative decision.",
    fix: "Ground candidate decisions directly to transcript spans and require explicit human review before committing them.",
  },
  {
    name: "SquadPay",
    quote: "“AI passed reconciliation and was still wrong.”",
    body: "Receipt extraction produced numeric line-item values roughly 1,000× too small, but they were consistent with each other, so SquadPay's own reconciliation check passed. Agreeing numbers aren't the same as correct numbers.",
    fix: "Keep transaction arithmetic deterministic and check for anomalies: unusual decimal precision, suspiciously low totals, non-positive totals.",
  },
  {
    name: "NetSense AI",
    quote: "“A healthy score sat next to an active high-severity incident.”",
    body: "A point-in-time composite anomaly score read 0.16 (Normal), while an oscillating, unstable corridor experienced an active, high-severity BGP Peer Dampening incident right beside it.",
    fix: "Future direction: rolling-window / variance-aware scoring (not yet implemented).",
  },
];

const aboutPoints = [
  {
    title: "Where AI belongs",
    lead: "I decide where the model stops.",
    body: "In Noto it proposes and a person approves. In SquadPay it reads the receipt and deterministic code handles the money. One receipt still reconciled while 1,000× too small, so SquadPay now checks for unusual totals.",
  },
  {
    title: "Evidence before claims",
    lead: "Each number says what it can't prove.",
    body: "Noto's guardrail passed a targeted retest, but I haven't rerun the full benchmark, so I claim no gain from it. SquadPay's second run gained one receipt from a rate-limit recovery, so I don't credit the model.",
  },
  {
    title: "Real users",
    lead: "Noto's benchmark missed the failure that changed the product.",
    body: "Eight people testing it found it. In one test meeting, two people preferred different options and a third said “test both before deciding.” Noto initially treated that discussion as a decision when nothing had been decided.",
  },
  {
    title: "Failures stay visible",
    lead: "NetSense scored a corridor healthy during an active incident, and I left it visible.",
    body: "Retuning the threshold would have hidden a blind spot in point-in-time scoring. Rolling-window scoring is future direction, not built.",
  },
];

const resumeExperience = {
  org: "Tata Teleservices Limited",
  role: "AI Product Manager Intern",
  meta: "May–Jun 2026 · Noida",
  bullets: [
    "Competitive benchmarking",
    "Data-backed product & client pitches",
    "PRDs, user stories & acceptance criteria",
    "GenAI exploration",
    "Network-operations exposure",
  ],
};

const resumeProjects = [
  {
    name: "Noto",
    role: "AI Meeting → Execution Copilot",
    proof: "18 transcripts · 54 ground-truth items · 78.0 F1",
  },
  {
    name: "SquadPay",
    role: "AI-Assisted Bill Splitting",
    proof: "15 evaluated receipts · 69/69 product tests",
  },
  {
    name: "NetSense AI",
    role: "Network Operations Prototype",
    proof: "6 telemetry profiles · 5/5 resolvable scenarios",
  },
];

const resumeEducation = [
  {
    name: "Amity University Lucknow",
    years: "2023–2027",
    detail: "B.Tech — Computer Science & Engineering · CGPA 7.10",
  },
  {
    name: "City Montessori School, Lucknow",
    years: "2021",
    detail: "ISC — PCM · 90%",
  },
];

const resumeCertifications = [
  "IBM AI Product Manager",
  "EA Product Management",
  "Google Agile PM",
  "Datacom Partnering with AI",
  "Adobe University Hackathon 2026",
];

const resumeSkills = [
  "AI Product Management",
  "Product Discovery",
  "Product Strategy",
  "PRDs",
  "AI Evaluation",
  "LLM Evaluation",
  "User Testing",
  "Guardrails",
  "Human-in-the-Loop",
  "Generative AI",
  "Agile",
];

function ResumeSectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-ink font-medium">
        {children}
      </h3>
      <div className="mt-2 border-t border-border-strong" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="w-full bg-surface flex-1">
        {/* Hero */}
        <section className="w-full bg-surface py-16 md:py-24" id="hero">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="w-full max-w-4xl flex flex-col items-start space-y-6">
              <Reveal as="h1" delay={40} className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-ink tracking-tight leading-tight w-full max-w-3xl">
                I build AI products from messy problems to working, tested workflows.
              </Reveal>
              <Reveal as="p" delay={90} className="text-base sm:text-lg text-ink-soft w-full max-w-2xl leading-relaxed">
                I&rsquo;m interested in what happens between a model&rsquo;s output and
                a user&rsquo;s decision — where evidence, deterministic logic, human
                review, and real-world failures shape the product.
              </Reveal>
              <Reveal delay={170} className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 w-full">
                <a
                  href="#selected-work"
                  className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded border border-ink bg-ink text-white hover:bg-accent hover:border-accent transition-colors inline-flex items-center justify-center whitespace-nowrap"
                >
                  View selected work
                </a>
                <a
                  href="#resume"
                  className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded border border-ink text-ink bg-transparent hover:bg-surface-2 transition-colors inline-flex items-center justify-center whitespace-nowrap"
                >
                  Resume
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* POV */}
        <section className="w-full bg-surface-3 py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Reveal className="max-w-3xl mb-10">
              <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal mb-3">
                The interesting part happens after the model works.
              </h2>
              <p className="text-lg text-ink-soft leading-relaxed">
                Anyone can pipe a prompt through an API and produce plausible prose.
                The product work begins when you must decide where AI actually
                belongs, where deterministic logic is safer, how evidence is
                surfaced to a skeptical operator, and how to gracefully absorb
                failure when the model is wrong.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {povFailures.map((item, i) => (
                <Reveal
                  key={item.name}
                  delay={i * 90}
                  className={`p-6 flex flex-col justify-between ${
                    i < povFailures.length - 1 ? "md:border-r border-border/40" : ""
                  }`}
                >
                  <div>
                    <div className="mb-4">
                      <span className="text-[11px] font-mono text-muted block mb-1">
                        {item.name}
                      </span>
                      <h3 className="font-sans text-lg font-semibold text-ink">
                        {item.quote}
                      </h3>
                    </div>
                    <p className="text-sm text-ink-soft mb-4 leading-relaxed">{item.body}</p>
                  </div>
                  <div className="pt-4 border-t border-border/30 text-sm text-ink-soft">
                    {item.fix}
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120} className="mt-10 pt-4 border-t border-border/30 flex justify-end">
              <span className="font-serif text-2xl text-ink italic">
                — Those failures changed the products.
              </span>
            </Reveal>
          </div>
        </section>

        {/* Selected Work */}
        <section className="w-full bg-surface py-16 md:py-24" id="selected-work">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-12">
            <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border">
              <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
                Selected Work
              </h2>
            </Reveal>
            <div className="space-y-8">
              {projects.map((project, i) => (
                <Reveal key={project.slug} delay={i * 80}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="w-full bg-surface-3 py-16" id="about">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Reveal className="max-w-2xl mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal mb-3">
                I build it, break it, and check what changed.
              </h2>
              <p className="text-ink-soft leading-relaxed">
                I&rsquo;m a final-year CS student at Amity University Lucknow,
                focused on AI product management. I&rsquo;ve built three working
                products, and I test each one until something breaks, change the
                product, then check whether the change helped. Here&rsquo;s how
                that has gone.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {aboutPoints.map((point, i) => (
                <Reveal
                  key={point.title}
                  delay={i * 80}
                  className={`p-6 flex flex-col justify-between ${
                    i < aboutPoints.length - 1 ? "sm:border-r border-border/40" : ""
                  }`}
                >
                  <div>
                    <h3 className="font-sans text-lg text-ink mb-2 font-normal">
                      {point.title}
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed">
                      <strong className="font-medium text-ink">{point.lead}</strong>{" "}
                      {point.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Resume */}
        <section className="w-full bg-surface py-16 md:py-20" id="resume">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <Reveal className="text-center">
                <div className="text-[11px] font-mono uppercase tracking-widest text-subtle mb-2">
                  Resume
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
                  Experience &amp; Education
                </h2>
              </Reveal>
              <div className="mt-6 border-t border-border/60" />

              <div className="mt-10 space-y-10">
                <Reveal>
                  <ResumeSectionLabel>Experience</ResumeSectionLabel>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                    <div>
                      <h4 className="font-sans text-base sm:text-lg font-semibold text-ink">
                        {resumeExperience.org}
                      </h4>
                      <p className="text-xs font-mono text-accent font-medium">
                        {resumeExperience.role}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-muted shrink-0">
                      {resumeExperience.meta}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm text-ink-soft list-none">
                    {resumeExperience.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-accent mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={40}>
                  <ResumeSectionLabel>Selected AI Product Work</ResumeSectionLabel>
                  <div className="space-y-4">
                    {resumeProjects.map((p) => (
                      <div key={p.name}>
                        <h4 className="font-sans text-base font-semibold text-ink">{p.name}</h4>
                        <p className="text-sm text-ink-soft">{p.role}</p>
                        <p className="mt-0.5 text-xs font-mono text-muted">{p.proof}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={80}>
                  <ResumeSectionLabel>Education</ResumeSectionLabel>
                  <div className="space-y-4">
                    {resumeEducation.map((edu) => (
                      <div key={edu.name}>
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                          <h4 className="font-sans text-base font-semibold text-ink">{edu.name}</h4>
                          <span className="text-xs font-mono text-muted shrink-0">{edu.years}</span>
                        </div>
                        <p className="text-sm text-ink-soft">{edu.detail}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={120}>
                  <ResumeSectionLabel>Certifications</ResumeSectionLabel>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {resumeCertifications.join(" · ")}
                  </p>
                </Reveal>

                <Reveal delay={160}>
                  <ResumeSectionLabel>Product &amp; AI</ResumeSectionLabel>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {resumeSkills.join(" · ")}
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="w-full bg-surface-2 py-16 md:py-20" id="contact">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center sm:text-left">
            <Reveal className="max-w-2xl">
              <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal mb-3">
                Let&rsquo;s build something useful.
              </h2>
              <p className="text-lg text-ink-soft mb-6 leading-relaxed">
                Building AI products where model output meets real-world decisions.
              </p>
              <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
                <a
                  className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded border border-ink bg-ink text-white hover:bg-accent hover:border-accent transition-colors inline-flex items-center"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
