import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { Toc } from "@/components/case-study/Toc";
import { Section, SectionHeading, Prose } from "@/components/case-study/Section";
import { Workflow } from "@/components/case-study/Workflow";
import { Quote } from "@/components/case-study/Callouts";
import { DataTable } from "@/components/case-study/DataTable";
import { Donut } from "@/components/case-study/Charts";
import { CaseStudyFooterNav } from "@/components/case-study/FooterNav";
import { getProject } from "@/lib/projects";

export const metadata: Metadata = {
  title: "NetSense AI — Case Study | Vishnu Yash Pandey",
  description:
    "A network-operations prototype connecting telemetry anomalies to the evidence and incident context engineers need to investigate them.",
};

const toc = [
  { id: "section-01", label: "01 — The Problem" },
  { id: "section-02", label: "02 — The Product Hypothesis" },
  { id: "section-03", label: "03 — How Detection Works" },
  { id: "section-04", label: "04 — Computed vs. Authored" },
  { id: "section-05", label: "05 — The Failure" },
  { id: "section-06", label: "06 — Evaluation" },
  { id: "section-07", label: "07 — Future Direction" },
  { id: "section-08", label: "08 — Real-User Testing" },
  { id: "section-09", label: "09 — Value & Limitations" },
];

export default function NetSenseCaseStudy() {
  const project = getProject("netsense-ai");

  return (
    <>
      <SiteHeader />
      <main className="w-full bg-surface flex-1">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <article className="w-full">
            <CaseStudyHero
              title="NetSense AI"
              tagline="A network-operations prototype connecting telemetry anomalies to the evidence and incident context engineers need to investigate them."
              stats={[
                { value: "6", label: "Evaluation profiles" },
                { value: "5/5", label: "Resolvable-scenario agreement" },
                { value: "30 min", label: "Sampling interval" },
              ]}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              deckHref="/projects/netsense-ai/story"
            />

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 lg:items-start">
              <Toc items={toc} />

              <div className="flex-1 min-w-0 max-w-3xl">
                <Section id="section-01" eyebrow="01 — The problem">
                  <SectionHeading>
                    Investigating a network anomaly means connecting pieces that live
                    in different places.
                  </SectionHeading>
                  <Prose>
                    Network-operations exposure during my Tata Teleservices
                    internship helped shape this problem framing; NetSense itself is
                    an independently built prototype using synthetic/demo telemetry,
                    not Tata production data.
                  </Prose>
                  <Workflow
                    title="Before Flow: Disconnected Incident Discovery"
                    steps={[
                      { label: "Monitor telemetry" },
                      { label: "Notice abnormal metric" },
                      { label: "Investigate affected link" },
                      { label: "Compare metrics" },
                      { label: "Assess signal" },
                      { label: "Find/create incident" },
                      { label: "Determine ownership" },
                      { label: "Continue investigation" },
                    ]}
                  />
                </Section>

                <Section id="section-02" eyebrow="02 — The product hypothesis">
                  <SectionHeading>The product hypothesis</SectionHeading>
                  <Prose>
                    The idea is that surfacing anomaly scoring directly beside link
                    context could reduce manual dashboard correlation.
                  </Prose>
                  <Workflow
                    title="After Flow: Unified Evidence Pipeline"
                    steps={[
                      { label: "Network overview", highlight: "accent" },
                      { label: "Flagged corridor/link", highlight: "accent" },
                      { label: "Evidence", highlight: "accent" },
                      { label: "Prediction/context", highlight: "accent" },
                      { label: "Linked incident", highlight: "accent" },
                      { label: "Timeline/evidence", highlight: "accent" },
                      { label: "Engineer/context", highlight: "accent" },
                      { label: "Human decision", highlight: "accent" },
                    ]}
                  />
                  <p className="text-xs font-mono text-muted italic mt-2">
                    Note: This is a product hypothesis, not a measured productivity
                    result.
                  </p>
                </Section>

                <Section id="section-03" eyebrow="03 — How detection works">
                  <SectionHeading>How detection works</SectionHeading>
                  <Prose>
                    The current detection system is deterministic and rule-based —
                    not a trained model. Telemetry (latency, packet loss, jitter,
                    bandwidth) sampled every 30 minutes across 6 links, with a 48-hour
                    trailing window and a 12-hour forecast/context horizon, on
                    synthetic/demo data.
                  </Prose>
                  <DataTable
                    columns={["Telemetry Metric", "Weight", "Sampling Window"]}
                    rows={[
                      ["Latency", "40%", "30m intervals"],
                      ["Packet Loss", "30%", "30m intervals"],
                      ["Jitter", "15%", "30m intervals"],
                      ["Bandwidth Utilization", "15%", "30m intervals"],
                    ]}
                  />
                  <Prose>
                    Weighted score vs. threshold 0.22 — below is healthy/no strong
                    live signal, at/above is attention/anomalous. A deterministic
                    cutoff, not a learned boundary.
                  </Prose>
                </Section>

                <Section id="section-04" eyebrow="04 — Computed vs. authored">
                  <SectionHeading>Computed vs. authored</SectionHeading>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2 max-w-2xl">
                    <div className="flex flex-col gap-3 border-l-2 border-accent pl-4">
                      <span className="text-xs font-mono text-accent uppercase tracking-wider">
                        Computed from telemetry
                      </span>
                      <ul className="flex flex-col gap-2 text-sm text-ink">
                        {["Latency", "Packet loss", "Jitter", "Bandwidth", "Anomaly score", "Health state"].map(
                          (item) => (
                            <li key={item} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-accent" />
                              {item}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3 border-l-2 border-outline-variant pl-4">
                      <span className="text-xs font-mono text-muted uppercase tracking-wider">
                        Authored demo context
                      </span>
                      <ul className="flex flex-col gap-2 text-sm text-ink-soft">
                        {["Prediction label", "Confidence", "Fault label", "Incident severity", "Engineer assignment"].map(
                          (item) => (
                            <li key={item} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-muted-2" />
                              {item}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-muted mt-6">
                    No telemetry-to-fault classifier, no dynamic assignment
                    algorithm, no autonomous incident creation or remediation today.
                  </p>
                </Section>

                <Section id="section-05" eyebrow="05 — The failure">
                  <SectionHeading>The failure</SectionHeading>
                  <Quote>&ldquo;A healthy score sat next to an active high-severity incident.&rdquo;</Quote>
                  <Prose>
                    Incident INC-395, Bengaluru–Hyderabad Core corridor: live anomaly
                    score ≈ 0.16 (healthy/no strong live signal) while the linked
                    incident record showed active, investigating, high severity,
                    fault label &ldquo;BGP Peer Dampening.&rdquo;
                  </Prose>
                  <Prose>
                    The score wasn&rsquo;t simply wrong — 0.16 was genuinely below
                    threshold at that instant. A single point-in-time score can look
                    healthy while the corridor is oscillating or intermittently
                    unstable over time — a temporal blind spot, not a bad threshold.
                    Kept visible rather than tuned away.
                  </Prose>
                </Section>

                <Section id="section-06" eyebrow="06 — Evaluation">
                  <SectionHeading>Evaluation</SectionHeading>
                  <Prose>
                    Six designed telemetry profiles — bifurcation, loss degradation,
                    saturation, stable, recovering, oscillation — a designed
                    evaluation set, not a production benchmark.
                  </Prose>
                  <div className="flex flex-col gap-2 p-4 border border-border/60 max-w-xl">
                    <span className="text-xs font-mono text-muted uppercase tracking-wider">
                      Deterministic Agreement
                    </span>
                    <span className="font-serif text-2xl text-ink">5/5 agreement</span>
                    <p className="text-sm text-muted-2">
                      For scenarios where the expected t=0 state was resolvable (of
                      the six profiles tested). This is rule-based detection
                      agreement, not ML accuracy.
                    </p>
                  </div>
                  <Prose>
                    The oscillation profile scored ≈ 0.16 and classified healthy
                    despite intermittent instability — the same failure pattern as
                    INC-395.
                  </Prose>
                  <div className="flex flex-col sm:flex-row items-center gap-8 pt-4 pb-2">
                    <Donut
                      segments={[
                        { value: 10, colorClass: "stroke-accent" },
                        { value: 2, colorClass: "stroke-error" },
                        { value: 1, colorClass: "stroke-muted-2" },
                      ]}
                      centerValue="13"
                      centerLabel="records"
                    />
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="flex items-center gap-1.5 text-xs font-mono text-ink">
                          <span className="w-2.5 h-2.5 bg-accent" /> 10 Consistent
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-mono text-error">
                          <span className="w-2.5 h-2.5 bg-error" /> 2 Flagged
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-mono text-muted">
                          <span className="w-2.5 h-2.5 bg-muted-2" /> 1 N/A
                        </span>
                      </div>
                      <p className="text-sm text-muted max-w-md">
                        Consistency audit: 10 consistent, 2 flagged, 1 N/A of 13
                        records (7 predictions, 6 incidents). Kept separate from
                        detection-agreement.
                      </p>
                    </div>
                  </div>
                </Section>

                <Section id="section-07" eyebrow="07 — Future direction">
                  <SectionHeading>
                    Rolling-window, variance-aware temporal scoring
                  </SectionHeading>
                  <Prose>
                    Rolling-window, variance-aware temporal scoring — weighing recent
                    behavior, variance and oscillation rather than a single snapshot.
                    Future work; not yet implemented.
                  </Prose>
                </Section>

                <Section id="section-08" eyebrow="08 — Real-user testing">
                  <SectionHeading>Real-user testing</SectionHeading>
                  <Prose>
                    Real-world testing was conducted with the prototype in a
                    confidential network-operations setting, using company data. The
                    underlying data, organization-specific findings, and detailed
                    user feedback cannot be disclosed under an NDA.
                  </Prose>
                  <div className="flex flex-col gap-6 mt-2 max-w-2xl">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-sans text-base font-medium text-ink">
                        Confidential real-world validation
                      </h3>
                      <p className="text-base text-ink-soft">
                        Real prototype use in a live network-operations context
                        provided feedback that informed the product framing. Detailed
                        evidence from that testing is not publicly disclosed.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-sans text-base font-medium text-ink">
                        Public evaluation
                      </h3>
                      <p className="text-base text-ink-soft">
                        The public case study instead uses synthetic/demo telemetry,
                        so the detection behavior, evaluation scenarios, and
                        limitations here can be inspected and reproduced by anyone
                        reading this page.
                      </p>
                    </div>
                  </div>
                </Section>

                <Section id="section-09" eyebrow="09 — Value & limitations">
                  <SectionHeading>Value & limitations</SectionHeading>
                  <Prose>
                    Potential value — reduced investigation friction, less context
                    switching, better decision context — is a hypothesis, not a
                    measured MTTR or productivity result.
                  </Prose>
                  <div className="flex flex-col gap-3 mt-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted">
                      Known Architectural Limitations
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 border-y border-border/60 py-4">
                      {[
                        "Point-in-time scoring can miss oscillating instability",
                        "Synthetic/demo telemetry, not production data",
                        "Narrow signal coverage",
                        "Confidence not a validated model",
                        "Authored demo context fields",
                        "No public real-user validation",
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
              prev={{ label: "SquadPay", href: "/projects/squadpay" }}
              next={{ label: "All work", href: "/#selected-work" }}
            />
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
