import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { Toc } from "@/components/case-study/Toc";
import { Section, SectionHeading, Prose } from "@/components/case-study/Section";
import { Workflow } from "@/components/case-study/Workflow";
import { Quote, Note, BulletList } from "@/components/case-study/Callouts";
import { DataTable } from "@/components/case-study/DataTable";
import { BarList } from "@/components/case-study/Charts";
import { CaseStudyFooterNav } from "@/components/case-study/FooterNav";
import { getProject } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Noto — Case Study | Vishnu Yash Pandey",
  description:
    "A reviewable execution layer between conversation and work — how Noto turns meeting transcripts into evidence-backed execution items.",
};

const toc = [
  { id: "section-01", label: "01 — The problem" },
  { id: "section-02", label: "02 — The insight" },
  { id: "section-03", label: "03 — Where AI stops" },
  { id: "section-04", label: "04 — The failure" },
  { id: "section-05", label: "05 — The product change" },
  { id: "section-06", label: "06 — Evaluation" },
  { id: "section-07", label: "07 — Real-user testing" },
  { id: "section-08", label: "08 — Product decisions" },
  { id: "section-09", label: "09 — Limitations & Docs" },
];

export default function NotoCaseStudy() {
  const project = getProject("noto");

  return (
    <>
      <SiteHeader />
      <main className="w-full bg-surface flex-1">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <article className="w-full">
            <CaseStudyHero
              title="Noto"
              tagline="A reviewable execution layer between conversation and work."
              stats={[
                { value: "18", label: "Transcripts" },
                { value: "54", label: "Ground-truth items" },
                { value: "78.0 F1", label: "Best prompt-only version" },
              ]}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              deckHref="/projects/noto/story"
            />

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 lg:items-start">
              <Toc items={toc} />

              <div className="flex-1 min-w-0 max-w-3xl">
                <Section id="section-01" eyebrow="01 — The problem">
                  <SectionHeading>
                    A transcript records what people said. It doesn&rsquo;t record what
                    was decided.
                  </SectionHeading>
                  <Prose>
                    A meeting transcript captures the conversation. It does not
                    automatically establish what was actually decided, who owns an
                    action, what the deadline is, whether a statement was a preference
                    rather than a decision, or whether a later comment superseded an
                    earlier one.
                  </Prose>
                  <Workflow
                    title="Status Quo Workflow"
                    steps={[
                      { label: "Transcript" },
                      { label: "Memory" },
                      { label: "Interpretation" },
                      { label: "Slack/WhatsApp" },
                      { label: "Unclear ownership" },
                      { label: "Execution" },
                    ]}
                  />
                </Section>

                <Section id="section-02" eyebrow="02 — The insight">
                  <Quote>
                    &ldquo;The system shouldn&rsquo;t just tell the user what it thinks
                    happened. It should show why.&rdquo;
                  </Quote>
                  <Prose>
                    Every extracted item carries a source quote and a transcript
                    reference the user can inspect.
                  </Prose>
                  <Workflow
                    title="Noto Deterministic & Reviewable Pipeline"
                    steps={[
                      { label: "Transcript" },
                      { label: "AI extraction" },
                      { label: "Evidence" },
                      { label: "Deterministic validation" },
                      { label: "Ambiguity/conflict" },
                      { label: "Human review" },
                      { label: "Approved record" },
                      { label: "Email/Jira/Notion", highlight: "accent" },
                    ]}
                  />
                </Section>

                <Section id="section-03" eyebrow="03 — Where AI stops">
                  <SectionHeading>
                    AI proposes. The system validates. The human approves.
                  </SectionHeading>
                  <Prose>
                    The model proposes candidate decisions, actions, owners, deadlines,
                    open questions and risks. Deterministic system logic checks
                    evidence, ambiguity, conflicts, deferral language and (where
                    supported) supersession. Nothing becomes authoritative until a
                    human approves it, edits it, rejects it, or resolves the
                    ambiguity.
                  </Prose>
                </Section>

                <Section id="section-04" eyebrow="04 — The failure">
                  <Quote>&ldquo;A preference looked like a decision.&rdquo;</Quote>
                  <Prose>
                    Sara preferred a 15-minute slot. Devraj preferred 5 minutes.
                    Marcus said, &ldquo;Let&rsquo;s test both options before
                    deciding.&rdquo; Noto initially read that exchange as a finalized
                    decision. It wasn&rsquo;t one — it was a deferral. The system had
                    silently converted uncertainty into certainty.
                  </Prose>
                  <Note>
                    The deeper problem wasn&rsquo;t semantic ambiguity in the
                    abstract — it was that the product needed to understand the
                    decision state of what was said (preference, proposal,
                    discussion, disagreement, deferral, pending approval, finalized
                    decision), not collapse all of it into &ldquo;decision.&rdquo;
                  </Note>
                </Section>

                <Section id="section-05" eyebrow="05 — The product change">
                  <SectionHeading>A preference-vs-decision guardrail</SectionHeading>
                  <Prose>
                    Noto gained explicit handling for deferral language —
                    &ldquo;decide later,&rdquo; &ldquo;test both before
                    deciding,&rdquo; &ldquo;wait for approval,&rdquo;
                    &ldquo;revisit,&rdquo; &ldquo;decide after X.&rdquo; Flagged items
                    stay open for human review instead of resolving to a finalized
                    decision.
                  </Prose>
                  <Note>
                    The targeted scenario was retested and no longer resolved to a
                    false decision, and the 41 regression tests pass (41/41) — but
                    those are pass/fail checks on known cases. The full benchmark was
                    not rerun after this guardrail shipped, so no accuracy,
                    precision, recall or F1 improvement is claimed for it.
                  </Note>
                </Section>

                <Section id="section-06" eyebrow="06 — Evaluation">
                  <SectionHeading>
                    Frozen Gold Set v1.1 — 18 transcripts, 54 hand-verified
                    ground-truth items. Stage 1 tested three prompt-only versions
                    of the raw model:
                  </SectionHeading>
                  <DataTable
                    columns={["Version", "Precision", "Recall", "F1"]}
                    rows={[
                      ["C1 — Baseline prompt", "61.2%", "75.9%", "67.8"],
                      ["C2 — + Evidence requirement", "65.1%", "75.9%", "70.1"],
                      ["C3 — + Evidence + guardrail instructions", "71.9%", "85.2%", "78.0"],
                    ]}
                  />
                  <BarList
                    items={[
                      { label: "C1 Baseline prompt", to: 67.8, display: "67.8" },
                      { label: "C2 + Evidence requirement", to: 70.1, display: "70.1" },
                      { label: "C3 + Evidence + guardrail instructions", to: 78.0, display: "78.0" },
                    ]}
                  />
                  <Prose>
                    C1–C3 are three prompt-only conditions, all scored on the same
                    18 transcripts and 54 items. They ran against the raw model
                    before any validation code existed, so C3 is still a prompt
                    asking the model to behave. That result is why validation became
                    code that checks the model instead of instructions it can
                    ignore.
                  </Prose>
                  <Prose>
                    Stage 2 scored the deployed pipeline (extraction, deterministic
                    validation, evidence verification) against that same gold set:
                    77.8% precision, 90.7% recall, 83.8% F1, and 100% evidence
                    grounding. It produced 49 correct items out of 63 predictions,
                    with 14 false positives and 5 false negatives. The gold set is
                    the same; the system being tested is different.
                  </Prose>
                  <Note>
                    The Stage 2 (production-style) run predates the later preference
                    guardrail, so it is not evidence the guardrail caused these
                    numbers. The 41/41 regression suite is a separate check on known
                    cases. It is not part of the frozen benchmark and is not a third
                    benchmark configuration.
                  </Note>
                </Section>

                <Section id="section-07" eyebrow="07 — Real-user testing">
                  <Prose>
                    Tested with 8 known people — 3 college club coordinators, 2
                    students working on projects, 1 software developer, and 2
                    startup-team members. (Some testers, including club
                    coordinators, worked from the same starting transcript, so
                    they aren&rsquo;t independent scenarios.) Directional, not
                    statistically significant.
                  </Prose>
                  <Quote>&ldquo;The benchmark didn&rsquo;t catch this. Real users did.&rdquo;</Quote>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted mb-4 mt-2">
                    Core Findings
                  </div>
                  <BulletList
                    items={[
                      "An owner was wrong in one test — why owner grounding is checked in code and “unclear owner” is a review state, not a guess.",
                      "One unresolved question wasn’t surfaced clearly enough. A known UX gap, not fixed.",
                      "Deadline and dependency ambiguity lingered.",
                      "The preference-vs-decision failure appeared directly in a test meeting — the one that led to the guardrail above. 2/8 participants observed Noto treating something as a decision when they did not consider it one, and 1/8 was unsure.",
                    ]}
                  />
                  <div className="text-xs font-mono uppercase tracking-widest text-muted mb-4 mt-8">
                    By the numbers (8 participants, overlapping responses — not summed)
                  </div>
                  <BulletList
                    items={[
                      "Before Noto: 5 described using an AI/recording-based approach, 2 mentioned transcript download if available, and 1 mentioned Google Colab.",
                      "Most useful: 3/8 pointed to the execution plan, 1/8 to extraction itself, and 4/8 to having everything in one place — the value wasn’t only AI extraction, but the resulting execution information being organized.",
                      "Action-item clarity: 4/8 usually found action items clear; 4/8 experienced some degree of ambiguity (2/8 sometimes unclear, 2/8 often unclear).",
                      "Evidence and source quotes: 5/8 found them useful, 3/8 found them useful sometimes.",
                      "Review habits: 5/8 said they would review AI-generated output before relying on it.",
                      "Missed information: 2/8 reported that Noto had missed something at least once.",
                      "Reuse: 6/8 said they would use Noto again if needed.",
                      "Older UI: 1/8 found the older UI’s appearance unclear. That UI was subsequently simplified.",
                    ]}
                  />
                </Section>

                <Section id="section-08" eyebrow="08 — Product decisions">
                  <div className="font-serif text-2xl text-ink italic mb-8">
                    Reviewability over maximum automation.
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {[
                      [
                        "Evidence-first extraction",
                        "Every candidate action maps directly to verifiable transcript tokens.",
                      ],
                      [
                        "Human approval required",
                        "Nothing becomes an authoritative record without affirmative operator signoff.",
                      ],
                      [
                        "Uncertainty stays visible",
                        "No confidence percentages. Unclear owners, missing deadlines and conflicting statements are flagged as named review states instead of guessed.",
                      ],
                      [
                        "Conflicts surfaced, not resolved",
                        "Conflicting statements prompt human arbitration rather than arbitrary AI tie-breaking.",
                      ],
                      [
                        "Decision history preserved",
                        "Superseded points remain logged rather than overwritten.",
                      ],
                      [
                        "Copy-ready outputs",
                        "Jira and Notion outputs are copy-ready text, not live integrations — the MVP tests whether the extraction and review workflow is useful before adding integration surface area.",
                      ],
                    ].map(([title, body]) => (
                      <div key={title} className="border-b border-border/60 pb-4">
                        <div className="font-medium text-base text-ink mb-1">{title}</div>
                        <p className="text-sm text-muted-2">{body}</p>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section id="section-09" eyebrow="09 — Limitations & Docs">
                  <BulletList
                    items={[
                      "Full benchmark not rerun with the later guardrail; the 41/41 regression tests show it works on known cases, not that overall accuracy improved.",
                      "Ambiguity handling over-flags: 61.5% precision in the production-style run.",
                      "Supersession detection is brittle: 0 of 4 in the production-style run.",
                      "The frozen gold set has no risk-type items, so risk extraction is unevaluated.",
                      "Audio transcription is not included in the core MVP scope.",
                      "Jira/Notion outputs are copy-ready only, not native integrations.",
                    ]}
                  />
                  <div className="border-t border-border/60 pt-6 mt-8">
                    <p className="text-sm text-muted-2 leading-relaxed max-w-2xl">
                      Full documentation lives in the repo — PRD, AI system design,
                      evaluation methodology, user research notes, and product
                      decisions log.
                    </p>
                  </div>
                </Section>
              </div>
            </div>

            <CaseStudyFooterNav
              prev={{ label: "All work", href: "/#selected-work" }}
              next={{ label: "SquadPay", href: "/projects/squadpay" }}
            />
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
