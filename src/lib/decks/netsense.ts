import type { Deck } from "./types";
import { getProject } from "@/lib/projects";

const project = getProject("netsense-ai");

export const netsenseDeck: Deck = {
  projectSlug: "netsense-ai",
  projectName: "NetSense AI",
  slides: [
    {
      kind: "product",
      eyebrow: "01 — Product",
      title: "NetSense AI",
      description: project.description,
      proofLine: project.proofLine,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      screenshot: {
        src: "/screenshots/netsense/overview.png",
        alt: "NetSense AI overview: network baseline, active signals, open incidents, and corridors needing review across core transit links",
        caption: "NetSense AI — Overview (live prototype, synthetic data)",
      },
    },
    {
      kind: "problem",
      eyebrow: "02 — Problem",
      title: "Investigating a network anomaly means connecting pieces that live in different places.",
      body: "Network-operations exposure during a Tata Teleservices internship helped shape this problem framing; NetSense itself is an independently built prototype using synthetic/demo telemetry, not Tata production data.",
      before: [
        "Monitor telemetry",
        "Notice abnormal metric",
        "Investigate affected link",
        "Compare metrics",
        "Assess signal",
        "Find/create incident",
      ],
    },
    {
      kind: "insight",
      eyebrow: "03 — Product insight",
      title: "The product hypothesis",
      quote: "Surfacing anomaly scoring directly beside link context could reduce manual dashboard correlation.",
      body: "A hypothesis, not a measured productivity result — kept honest throughout the case study.",
    },
    {
      kind: "how-it-works",
      eyebrow: "04 — How it works",
      title: "Deterministic, rule-based scoring — not a trained model",
      steps: [
        "Telemetry in (latency, packet loss, jitter, bandwidth)",
        "Weighted score: latency 40% · loss 30% · jitter 15% · bandwidth 15%",
        "Threshold 0.22 — deterministic cutoff, not a learned boundary",
        "Evidence shown beside link context, prediction, and linked incident",
      ],
      note: "Computed from telemetry: score and health state. Authored demo context: prediction label, confidence, fault label, severity, engineer assignment.",
      screenshot: {
        src: "/screenshots/netsense/link-detail.png",
        alt: "NetSense AI telemetry tiles for the Bengaluru–Hyderabad Core link: health score, RTT latency, packet loss, jitter, bandwidth utilisation, and an anomaly index of 0.16 against a 0.22 threshold",
        caption: "NetSense AI — Bengaluru–Hyderabad Core telemetry vs. threshold (live prototype, synthetic data; cropped)",
      },
    },
    {
      kind: "failure",
      eyebrow: "05 — The failure",
      title: "The failure",
      quote: "A healthy score sat next to an active high-severity incident.",
      body: "Incident INC-395, Bengaluru–Hyderabad Core corridor: live anomaly score ≈ 0.16 (healthy/no strong live signal) while the linked incident record showed active, investigating, high severity, fault label “BGP Peer Dampening.” A single point-in-time score can look healthy while a corridor is oscillating or intermittently unstable over time — a temporal blind spot, kept visible rather than tuned away.",
      screenshot: {
        src: "/screenshots/netsense/incidents.png",
        alt: "NetSense AI incidents queue showing incident INC-395 on the Bengaluru–Hyderabad Core link, fault profile BGP Peer Dampening, high severity, status investigating",
        caption: "NetSense AI — Incident INC-395 (live prototype, synthetic data)",
      },
    },
    {
      kind: "change",
      eyebrow: "06 — What changed",
      title: "Kept visible, not tuned away",
      body: "Rather than quietly raising the threshold to hide the blind spot, the failure mode was documented and scoped as future work: rolling-window, variance-aware temporal scoring — weighing recent behavior and oscillation instead of a single snapshot.",
      note: "This is future direction only — it has not been implemented.",
    },
    {
      kind: "evaluation",
      eyebrow: "07 — Evaluation",
      title: "Six designed telemetry profiles",
      body: "Bifurcation, loss degradation, saturation, stable, recovering, oscillation — a designed evaluation set, not a production benchmark.",
      stats: [
        { value: "5/5", label: "Resolvable-scenario agreement" },
        { value: "10/13", label: "Consistency-audit records consistent" },
        { value: "0.16", label: "Oscillation profile score (still “healthy”)" },
      ],
      note: "This is rule-based detection agreement, not ML accuracy. The oscillation profile shows the same failure pattern as INC-395, on purpose.",
    },
    {
      kind: "testing",
      eyebrow: "08 — Real-world testing",
      title: "Confidential real-world validation",
      body: "Real-world testing was conducted with the prototype in a confidential network-operations setting, using company data. The underlying data, organization-specific findings, and detailed user feedback cannot be disclosed under an NDA.",
      note: "The public case study instead uses synthetic/demo telemetry, so the detection behavior, evaluation scenarios, and limitations here can be inspected and reproduced by anyone reading this page.",
    },
    {
      kind: "takeaway",
      eyebrow: "09 — Product takeaway",
      title: "Value is a hypothesis, not a measured result",
      decision: "Keep the temporal blind spot visible in the product rather than tune the threshold to hide it.",
      tradeoff: "A deterministic, explainable score over a black-box model — at the cost of missing intermittent, oscillating instability at any single point in time.",
      limitation: "Synthetic/demo telemetry, narrow signal coverage, and no publicly-disclosable real-user validation (confidential testing exists but isn't detailed here).",
    },
  ],
};
