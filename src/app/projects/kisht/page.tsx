import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { Toc } from "@/components/case-study/Toc";
import { Section, SectionHeading, Prose } from "@/components/case-study/Section";
import { Workflow } from "@/components/case-study/Workflow";
import { Quote } from "@/components/case-study/Callouts";
import { DataTable } from "@/components/case-study/DataTable";
import { CaseStudyFooterNav } from "@/components/case-study/FooterNav";
import { getProject } from "@/lib/projects";
import { briefs } from "@/lib/briefs";
import { CaseBrief, TradeoffTable } from "@/components/case-study/CaseBrief";

export const metadata: Metadata = {
  title: "Kisht — Case Study | Vishnu Yash Pandey",
  description:
    "A Hinglish / Marathi-English pre-due EMI reminder voice agent for a fictional lender, and the evaluation and launch decision for it.",
};

const toc = [
  { id: "section-00", label: "At a glance" },
  { id: "section-01", label: "01 — The Problem" },
  { id: "section-02", label: "02 — Scope" },
  { id: "section-03", label: "03 — The Policy Card" },
  { id: "section-04", label: "04 — Model Proposes, Code Decides" },
  { id: "section-05", label: "05 — Evaluation Design" },
  { id: "section-06", label: "06 — Launch Gates" },
  { id: "section-07", label: "07 — The Failure" },
  { id: "section-08", label: "08 — Real-User Test Plan" },
  { id: "section-09", label: "09 — Tradeoffs" },
  { id: "section-10", label: "10 — Status & Limitations" },
];

const linkCls = "text-accent hover:underline underline-offset-4";
const repo = "https://github.com/yash7536/kisht/blob/main";

export default function KishtCaseStudy() {
  const project = getProject("kisht");

  return (
    <>
      <SiteHeader />
      <main className="w-full bg-surface flex-1">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <article className="w-full">
            <CaseStudyHero
              eyebrow="Fictional lender · sample data · results not run yet"
              title="Kisht"
              tagline="A voice agent for one narrow job, a pre-due EMI reminder in Hinglish and Marathi-English, and the evaluation that decides whether it should launch."
              stats={[
                { value: "88", label: "Scripted borrower scenarios" },
                { value: "4", label: "Language varieties" },
                { value: "167", label: "Automated tests" },
              ]}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
            />

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 lg:items-start">
              <Toc items={toc} />

              <div className="flex-1 min-w-0 max-w-3xl">
                <Section id="section-00" eyebrow="At a glance — problem, why AI, solution, tradeoffs">
                  <CaseBrief brief={briefs["kisht"]} />
                </Section>

                <Section id="section-01" eyebrow="01 — The problem">
                  <SectionHeading>
                    The cheapest call in collections is the one before anything is
                    missed.
                  </SectionHeading>
                  <Prose>
                    A pre-due reminder asks for one thing: a date. Lenders send SMS,
                    which borrowers ignore, or pay human callers to make thousands of
                    near-identical calls. Many borrowers in Pune and Mumbai switch
                    between Hindi, Marathi and English in the same sentence, and an
                    English-only bot or a keypad IVR loses them.
                  </Prose>
                  <Prose>
                    There are two users. The collections lead wants fewer human calls
                    and recorded promise dates, with zero compliance risk. The borrower
                    wants a short, polite call in their own language, and a human when
                    things aren&rsquo;t simple.
                  </Prose>
                  <Workflow
                    title="The call Kisht is allowed to make"
                    steps={[
                      { label: "Automated greeting", highlight: "accent" },
                      { label: "Verify by name", highlight: "accent" },
                      { label: "State amount & due date", highlight: "accent" },
                      { label: "Answer 3 FAQs", highlight: "accent" },
                      { label: "Capture a promise date", highlight: "accent" },
                      { label: "Close" },
                      { label: "Or: hand off to a human" },
                    ]}
                  />
                </Section>

                <Section id="section-02" eyebrow="02 — Scope">
                  <SectionHeading>Deliberately narrow</SectionHeading>
                  <Prose>
                    Kisht does pre-due reminders only: no overdue collections, no
                    negotiation, no settlements, no payment links, no telephony. Every
                    one of those adds a way to harm a borrower before the basic call is
                    proven safe. The lender, Sahayak Finance, is fictional, and every
                    borrower, loan and amount is sample data.
                  </Prose>
                </Section>

                <Section id="section-03" eyebrow="03 — The policy card">
                  <SectionHeading>The agent may only say what is on the card</SectionHeading>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2 max-w-2xl">
                    <div className="flex flex-col gap-3 border-l-2 border-accent pl-4">
                      <span className="text-xs font-mono text-accent uppercase tracking-wider">
                        Permitted
                      </span>
                      <ul className="flex flex-col gap-2 text-sm text-ink">
                        {[
                          "Say it is automated, in a fixed greeting",
                          "Verify by name before any loan detail",
                          "State ₹4,250 due 5 November, exactly as on the card",
                          "Answer 3 FAQs: how to pay, late charge, date change → human",
                          "Capture a promise inside the allowed window",
                          "Hand off anything else",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-accent mt-2 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3 border-l-2 border-error pl-4">
                      <span className="text-xs font-mono text-error uppercase tracking-wider">
                        Blocked in code
                      </span>
                      <ul className="flex flex-col gap-2 text-sm text-ink-soft">
                        {[
                          "Any number not on the card: rates, waivers, other dates",
                          "Threats or pressure: police, legal action, telling family",
                          "Disclosure to anyone but the borrower",
                          "Asking for OTP, PIN, Aadhaar, PAN or account numbers",
                          "Calls outside 08:00–19:00 (RBI recovery-agent conduct, 2022)",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-error mt-2 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-muted mt-6">
                    The conduct rules come from RBI circulars (2022 recovery agents,
                    2015 NBFC Fair Practices Code, 2008 recovery agents). A newer 2025
                    NBFC direction has not been read yet and is flagged in{" "}
                    <a href={`${repo}/docs/SOURCES.md`} className={linkCls}>
                      docs/SOURCES.md
                    </a>
                    .
                  </p>
                </Section>

                <Section id="section-04" eyebrow="04 — Model proposes, code decides">
                  <SectionHeading>Every reply is checked before it is spoken</SectionHeading>
                  <Prose>
                    Gemini returns each reply as JSON: the text, an intent and a
                    proposed next step. Nothing reaches the borrower until code has
                    checked it. A blocked draft gets one retry, then a fixed handoff
                    line.
                  </Prose>
                  <DataTable
                    columns={["Guard (code)", "What it catches"]}
                    rows={[
                      ["Number guard", "Any amount, date or % not on the card, including “chaar hazaar do sau pachaas”, Devanagari digits and “paanch tareekh”"],
                      ["Handoff backstop", "Disputes, hardship, wrong number, third parties, rate or waiver questions and abuse that the model missed"],
                      ["Promise parser", "The final date after self-corrections (“8 ko… nahi nahi 10 ko” → 10 Nov), checked against the window"],
                      ["State machine", "Disclosing the loan before identity, skipping steps, illegal transitions"],
                      ["Script checks", "Threats, sensitive-data requests, other people’s loans"],
                    ]}
                  />
                  <Prose>
                    Two sets of numbers are reported separately: what the model tried,
                    including drafts a guard blocked, and what the borrower actually
                    heard. A safe system can still hide an unsafe model, and the launch
                    decision needs to see both.
                  </Prose>
                </Section>

                <Section id="section-05" eyebrow="05 — Evaluation design">
                  <SectionHeading>88 scripted borrowers, run three times each</SectionHeading>
                  <Prose>
                    Each scenario fixes the borrower&rsquo;s lines and the expected
                    outcome; only the agent varies. Running each one three times gives
                    a consistency score (pass^3), not just an average.
                  </Prose>
                  <DataTable
                    columns={["Dimension", "Coverage"]}
                    rows={[
                      ["Language", "Hinglish 36 · Marathi-English 20 · English 18 · Hindi (Devanagari) 14"],
                      ["Expected outcome", "Handoff 49 · promise with exact date 35 · closed as already paid 4"],
                      ["Personas", "14, from cooperative and busy to hardship, wrong number, family member, dispute, abusive, confused elderly"],
                      ["Disruptions", "Clean 51 · off-script 16 · self-correction 9 · interruption 8 · noise 7"],
                    ]}
                  />
                  <Prose>
                    The scenarios were drafted with AI assistance and are labelled
                    that way. I review every one before any result is published,
                    including native-speaker checks for the Marathi-English and
                    Devanagari rows. Two people label a 25% sample, and agreement is
                    reported as Cohen&rsquo;s kappa. An LLM judge is used only for
                    script compliance, and only once it agrees with the humans
                    (κ ≥ 0.6).
                  </Prose>
                </Section>

                <Section id="section-06" eyebrow="06 — Launch gates">
                  <SectionHeading>Targets set before any run</SectionHeading>
                  <DataTable
                    columns={["Gate", "Target", "Critical"]}
                    rows={[
                      ["Invented numbers heard by borrower", "0", "Yes"],
                      ["Correct handoff (system)", "≥ 98%", "Yes"],
                      ["Script compliance (model drafts)", "≥ 98%", "Yes"],
                      ["Task completion", "≥ 85%", "No"],
                      ["Unnecessary handoff", "≤ 10%", "No"],
                      ["Consistency (pass^3)", "≥ 80%", "No"],
                      ["p95 model latency per turn", "≤ 2,000 ms", "No"],
                    ]}
                  />
                  <Prose>
                    The app can say &ldquo;No-go&rdquo; or &ldquo;Not yet&rdquo;. It
                    never says &ldquo;Go&rdquo; by itself, because that needs a person,
                    the label review and a real-user test. Today the decision reads
                    &ldquo;Not yet: run evals&rdquo;.
                  </Prose>
                </Section>

                <Section id="section-07" eyebrow="07 — The failure">
                  <SectionHeading>The eval harness needed its own test</SectionHeading>
                  <Quote>&ldquo;The launch memo said ready while two targets were failing.&rdquo;</Quote>
                  <Prose>
                    I ran the full eval runner in a browser with the model API faked.
                    The launch memo generator only counted the critical gates, so with
                    two non-critical targets failing it still printed &ldquo;scripted
                    gates met&rdquo;. A memo like that is how a team talks itself into
                    a launch.
                  </Prose>
                  <Prose>
                    The memo now lists every target that misses, and a test covers
                    that case. It was the reminder that the decision layer is part of
                    the product and gets tested like the rest of it.
                  </Prose>
                </Section>

                <Section id="section-08" eyebrow="08 — Real-user test plan">
                  <SectionHeading>What scripted borrowers can&rsquo;t show</SectionHeading>
                  <Prose>
                    Scripted borrowers don&rsquo;t adapt, so the eval is optimistic.
                    The plan in{" "}
                    <a href={`${repo}/docs/REAL_USER_TEST.md`} className={linkCls}>
                      docs/REAL_USER_TEST.md
                    </a>{" "}
                    is 15–20 people, including code-mixers over 55, for about 60 calls,
                    with consent read aloud. Speech-recognition errors are scored
                    separately from agent errors so a bad transcript isn&rsquo;t blamed
                    on the model. Not done yet.
                  </Prose>
                </Section>

                <Section id="section-09" eyebrow="09 — Tradeoffs">
                  <SectionHeading>What each decision cost, and why it was worth it</SectionHeading>
                  <TradeoffTable brief={briefs["kisht"]} />
                  <p className="text-sm text-muted mt-4">
                    The full decision log is in{" "}
                    <a href={`${repo}/docs/DECISIONS.md`} className={linkCls}>
                      docs/DECISIONS.md
                    </a>
                    .
                  </p>
                </Section>

                <Section id="section-10" eyebrow="10 — Status & limitations">
                  <SectionHeading>Where it stands</SectionHeading>
                  <Prose>
                    Built, tested and deployed. No live-model eval has been run yet,
                    so every metric in the app says &ldquo;not run yet&rdquo; rather
                    than showing a number. The demo mode replays three hand-written
                    transcripts, labelled as hand-written, and the guards run on them
                    for real.
                  </Prose>
                  <div className="flex flex-col gap-3 mt-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted">
                      Known limitations
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 border-y border-border/60 py-4">
                      {[
                        "No live-model results yet",
                        "Scenarios AI-drafted, review in progress",
                        "Browser speech recognition on code-mixed audio is unproven",
                        "Fictional lender; no human-cost baseline yet",
                        "Real-user test not done",
                        "2025 RBI NBFC conduct direction not yet read",
                      ].map((item, i) => (
                        <div key={item} className="flex items-start gap-3">
                          <span className="text-xs font-mono text-error">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm text-ink">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Section>
              </div>
            </div>

            <CaseStudyFooterNav
              prev={{ label: "NetSense AI", href: "/projects/netsense-ai" }}
              next={{ label: "All work", href: "/#selected-work" }}
            />
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
