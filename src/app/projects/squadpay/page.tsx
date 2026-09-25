import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { Toc } from "@/components/case-study/Toc";
import { Section, SectionHeading, Prose } from "@/components/case-study/Section";
import { InlineFlow } from "@/components/case-study/Workflow";
import { Quote, Note, StatRow, BulletList } from "@/components/case-study/Callouts";
import { DataTable } from "@/components/case-study/DataTable";
import { BarList, Donut } from "@/components/case-study/Charts";
import { CaseStudyFooterNav } from "@/components/case-study/FooterNav";
import { getProject } from "@/lib/projects";

export const metadata: Metadata = {
  title: "SquadPay — Case Study | Vishnu Yash Pandey",
  description:
    "AI extracts the receipt. Deterministic logic handles the money — how SquadPay caught a 1,000x extraction error that passed its own reconciliation.",
};

const toc = [
  { id: "section-01", label: "01 — The Problem" },
  { id: "section-02", label: "02 — The Workflow" },
  { id: "section-03", label: "03 — The Failure" },
  { id: "section-04", label: "04 — The Product Change" },
  { id: "section-05", label: "05 — Evaluation" },
  { id: "section-06", label: "06 — Where extraction still breaks" },
  { id: "section-07", label: "07 — Guardrail Stack" },
  { id: "section-08", label: "08 — Real-User Testing" },
  { id: "section-09", label: "09 — Product Decisions" },
];

export default function SquadPayCaseStudy() {
  const project = getProject("squadpay");

  return (
    <>
      <SiteHeader />
      <main className="w-full bg-surface flex-1">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <article className="w-full">
            <CaseStudyHero
              title="SquadPay"
              tagline="Splitting the bill is easy. Asking friends to pay you back is awkward."
              stats={[
                { value: "15", label: "Evaluated receipts" },
                { value: "69/69", label: "Product tests passing" },
                { value: "Gemini 3.6 Flash", label: "Extraction model" },
              ]}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              deckHref="/projects/squadpay/story"
            />

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 lg:items-start">
              <Toc items={toc} />

              <div className="flex-1 min-w-0 max-w-3xl">
                <Section id="section-01" eyebrow="01 — The Problem">
                  <SectionHeading>
                    The painful part isn&rsquo;t the split. It&rsquo;s the follow-up.
                  </SectionHeading>
                  <p className="font-serif text-lg text-ink-soft leading-relaxed mb-6 max-w-2xl">
                    People forget who owes what, do arithmetic by hand, hesitate to
                    ask friends for repayment, and send the same message twice.
                    SquadPay is an AI-assisted shared-expense product — not primarily
                    an AI product. AI is used only where it helps: reading a receipt.
                    It never becomes the authority on the money.
                  </p>
                  <InlineFlow
                    title="Before Flow"
                    steps={[
                      { label: "Receipt" },
                      { label: "Manual calculation" },
                      { label: "Remember who owes what" },
                      { label: "Message people individually" },
                      { label: "Track repayment" },
                    ]}
                  />
                </Section>

                <Section id="section-02" eyebrow="02 — The Workflow">
                  <SectionHeading>
                    Deterministic split core with AI ingestion
                  </SectionHeading>
                  <InlineFlow
                    title="After Flow (SquadPay Engine)"
                    steps={[
                      { label: "Receipt image" },
                      { label: "AI extraction (Gemini)", highlight: "accent" },
                      { label: "Review/edit" },
                      { label: "Deterministic split" },
                      { label: "Outstanding amounts" },
                      { label: "WhatsApp repayment request" },
                    ]}
                  />
                  <Prose>
                    Gemini extracts merchant, items, quantities, prices, tax/charges
                    and total. Everything downstream — schema validation,
                    reconciliation, anomaly checks, the split math — is deterministic.
                    Repayment goes out as a WhatsApp{" "}
                    <code className="font-mono text-xs bg-surface-2 px-1.5 py-0.5 rounded text-ink">
                      wa.me
                    </code>{" "}
                    link, not native payment processing.
                  </Prose>
                  <Quote>&ldquo;AI extracts the receipt. Deterministic logic handles the money.&rdquo;</Quote>
                </Section>

                <Section id="section-03" eyebrow="03 — The Failure">
                  <Quote tone="error">&ldquo;AI passed reconciliation and was still wrong.&rdquo;</Quote>
                  <Prose>
                    One Indonesian receipt produced extracted values roughly 1,000×
                    too small: the model read a thousands separator as a decimal
                    point. The numbers were internally consistent with each other,
                    so SquadPay&rsquo;s own reconciliation check passed. The values
                    were still wrong. This was an AI extraction error, not a
                    calculation error.
                  </Prose>
                  <Note>
                    <span className="font-semibold text-ink">Lesson:</span>{" "}
                    Reconciliation can prove numbers agree with each other. It
                    can&rsquo;t prove they&rsquo;re the right numbers.
                  </Note>
                </Section>

                <Section id="section-04" eyebrow="04 — The Product Change">
                  <SectionHeading>A deterministic anomaly detector</SectionHeading>
                  <Prose>
                    A new check watches for unusual decimal precision, suspiciously
                    low totals, and non-positive totals. It is not machine learning —
                    an explainable, rule-based safety layer that flags output for
                    review. It does not catch every incorrect receipt.
                  </Prose>
                  <Prose>
                    The warning appeared for the known scale-error case when tested.
                    A later live edit exposed a second issue — the warning
                    didn&rsquo;t reliably reappear after a materially different edit,
                    due to a dismissal-key bug. That was fixed and retested.
                  </Prose>
                  <InlineFlow
                    title="Detection & Iteration Loop"
                    steps={[
                      { label: "AI extraction error" },
                      { label: "Reconciliation passes" },
                      { label: "Anomaly detector added", highlight: "accent" },
                      { label: "Targeted test" },
                      { label: "Dismissal-key issue found", highlight: "error" },
                      { label: "Fix" },
                      { label: "Retest" },
                    ]}
                  />
                </Section>

                <Section id="section-05" eyebrow="05 — Evaluation">
                  <SectionHeading>Evaluation on 15 real-world receipts</SectionHeading>
                  <Prose>
                    15 real, public/licensed receipts — 11 from ExpressExpense Sample
                    Receipt Dataset, 1 from OCR.space public demo image, 3 from CORD.
                    Ground truth created by hand and arithmetic-checked, not
                    AI-generated.
                  </Prose>
                  <DataTable
                    columns={[
                      "Run",
                      "Attempted",
                      "Parsed",
                      "Item",
                      "Qty",
                      "Price",
                      "Tax",
                      "Total",
                      "Complete",
                      "Reconciliation",
                    ]}
                    rows={[
                      [
                        "Baseline",
                        "15",
                        "11",
                        "84%",
                        "100%",
                        "91%",
                        "73%",
                        "91%",
                        "33% (5/15)",
                        <span key="r1" className="text-accent-deep font-semibold">
                          100% of parsed
                        </span>,
                      ],
                      [
                        "Second run",
                        "15",
                        "12",
                        "86%",
                        "100%",
                        "92%",
                        "75%",
                        "92%",
                        "40% (6/15)",
                        <span key="r2" className="text-accent-deep font-semibold">
                          100% of parsed
                        </span>,
                      ],
                    ]}
                  />
                  <div className="text-xs font-mono uppercase tracking-wider text-muted mb-4 mt-8">
                    Field-level accuracy comparison (Baseline vs. Second run)
                  </div>
                  <BarList
                    items={[
                      { label: "Item", from: 84, to: 86, display: "84% → 86%" },
                      { label: "Quantity", from: 100, to: 100, display: "100% → 100%" },
                      { label: "Price", from: 91, to: 92, display: "91% → 92%" },
                      { label: "Tax", from: 73, to: 75, display: "73% → 75%" },
                      { label: "Total", from: 91, to: 92, display: "91% → 92%" },
                    ]}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-border/60 mb-6">
                    <Donut
                      segments={[
                        { value: 11, colorClass: "stroke-accent-deep" },
                        { value: 3, colorClass: "stroke-muted-2" },
                        { value: 1, colorClass: "stroke-ink" },
                      ]}
                      centerValue="15"
                      caption="11 ExpressExpense · 3 CORD · 1 OCR.space"
                    />
                    <Donut
                      segments={[{ value: 11, colorClass: "stroke-ink" }]}
                      total={15}
                      centerValue="11 / 15"
                      caption="Baseline parse rate (11 parsed / 4 failed)"
                    />
                    <Donut
                      segments={[{ value: 12, colorClass: "stroke-accent-deep" }]}
                      total={15}
                      centerValue="12 / 15"
                      caption="Second-run parse rate (12 parsed / 3 failed)"
                    />
                  </div>
                  <Note>
                    Note: The second run followed system and error-handling
                    changes, but its extractions matched the baseline except for one
                    receipt: a rate-limit failure in the baseline that succeeded on
                    rerun. That one-receipt gain is not evidence of better
                    extraction. 100% reconciliation never equals 100% receipt
                    accuracy.
                  </Note>
                </Section>

                <Section id="section-06" eyebrow="06 — Where extraction still breaks">
                  <SectionHeading>Edge cases in raw receipt data</SectionHeading>
                  <div className="divide-y divide-border/60 max-w-2xl">
                    {[
                      "Tax vs. gratuity (35.62 vs. 13.22 tax + 22.40 gratuity): the model combined them as its prompt instructs, but the ground-truth tax field was narrower — an evaluation mismatch, not a model error",
                      "VAT-inclusive receipt taxed as 0 despite correct total",
                      "Dropped digits/misread POS abbreviations in item names",
                      "Negative discount/coupon values fail schema validation (3 receipts)",
                      "One retryable Gemini rate-limit failure in the baseline, distinct from a bad extraction (it succeeded on rerun)",
                    ].map((item, i) => (
                      <div key={item} className="py-3.5 flex items-start gap-4">
                        <span className="text-xs font-mono text-muted pt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section id="section-07" eyebrow="07 — Guardrail Stack">
                  <SectionHeading>Multi-stage defensive architecture</SectionHeading>
                  <InlineFlow
                    title="Multi-stage defensive architecture"
                    steps={[
                      { label: "Schema validation" },
                      { label: "Reconciliation" },
                      { label: "Anomaly detection" },
                      { label: "Human review" },
                      { label: "Retry/error classification" },
                      { label: "Manual fallback" },
                    ]}
                  />
                  <Prose>
                    No single layer is sufficient alone. No claim of zero
                    hallucinations, 100% accuracy, or autonomous financial
                    processing.
                  </Prose>
                </Section>

                <Section id="section-08" eyebrow="08 — Real-User Testing">
                  <SectionHeading>Field observation signals</SectionHeading>
                  <p className="font-serif text-lg text-ink-soft leading-relaxed mb-6 max-w-2xl">
                    Tested with 12 known people. The testing confirmed the social
                    friction around asking friends for repayment: some described
                    friends paying back later, including in cash, while others
                    normally asked for money at the moment but hesitated depending
                    on the person or situation. Splitting the bill is easy. Asking
                    friends to pay you back is awkward.
                  </p>
                  <StatRow
                    stats={[
                      { value: "9/12", label: "Found repayment requests an issue" },
                      { value: "10/12", label: "Would check AI extraction first" },
                      { value: "12/12", label: "Expected integrated UPI/payment" },
                      { value: "8/12", label: "Would use SquadPay again" },
                    ]}
                  />
                  <Note>
                    12 known people, not a statistically representative sample.
                    Reasons participants gave for repayment hesitation included
                    concern that friends might get offended, friends saying
                    they&rsquo;d already paid for something previously, and friends
                    saying they didn&rsquo;t have money at the moment. Checking AI
                    extraction first is a review habit, not a statement that
                    participants distrusted AI.
                  </Note>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted mb-4 mt-8">
                    By the numbers (overlapping signals — not summed)
                  </div>
                  <BulletList
                    items={[
                      "Before SquadPay: 3/12 said they’d otherwise use other apps or ask friends to pay directly.",
                      "AI extraction failure: 3/12 reported an extraction issue where not all dishes were added.",
                      "What was useful: 3/12 pointed to reminders to pay, 2/12 to AI bill scanning, 4/12 to the ease of adding dishes/amounts among selected people, and 3/12 to the simple UI.",
                      "Older UI (since fixed): 6/12 found adding dishes or people somewhat unclear, 1/12 found it confusing because it didn’t behave like a typical payment app, 4/12 needed direct help, and 3/12 needed to work out the item-level splitting interaction — others figured it out themselves.",
                      "Design feedback (since applied): asked what they’d change, 4/12 said nothing, 4/12 wanted a more minimal visual treatment, and 4/12 mentioned the logo.",
                    ]}
                  />
                </Section>

                <Section id="section-09" eyebrow="09 — Product Decisions, Value & Limitations">
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-muted">
                        Product Decisions
                      </span>
                      <p className="text-base leading-relaxed text-ink-soft max-w-2xl">
                        Financial calculations stay deterministic · human review
                        available · discount/coupon modeling deliberately deferred ·
                        no ML confidence model yet · UPI/GPay is future work ·
                        anonymous/demo states separated.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-muted">
                        Value Hypothesis
                      </span>
                      <Quote>
                        &ldquo;Make settling up easier without making the user
                        distrust the numbers.&rdquo;
                      </Quote>
                      <p className="text-xs text-muted">
                        Not yet measured: time saved, retention, revenue.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-muted">
                        Known Limitations
                      </span>
                      <p className="text-base leading-relaxed text-ink-soft max-w-2xl">
                        Locale/currency not generalized · discount/coupon not fully
                        modeled · reconciliation ≠ semantic correctness · anomaly
                        detection not comprehensive · UPI/GPay not implemented ·
                        testing is directional only.
                      </p>
                    </div>
                  </div>
                </Section>
              </div>
            </div>

            <CaseStudyFooterNav
              prev={{ label: "Noto", href: "/projects/noto" }}
              next={{ label: "NetSense AI", href: "/projects/netsense-ai" }}
            />
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
