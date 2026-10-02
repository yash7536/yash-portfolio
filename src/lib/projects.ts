// Shared facts referenced from more than one place (homepage cards, case
// study hero, deck slide 1/5). Keeping them here once avoids the drift that
// happened across the old Stitch exports (mismatched labels, stats, links).
export type ProjectSummary = {
  slug: "noto" | "squadpay" | "netsense-ai";
  name: string;
  tagline: string;
  description: string;
  failureQuote: string;
  failureDetail: string;
  proofLine: string;
  liveUrl: string;
  githubUrl: string;
};

export const projects: ProjectSummary[] = [
  {
    slug: "noto",
    name: "Noto",
    tagline: "AI Meeting → Execution Copilot",
    description:
      "Noto turns messy meeting transcripts into evidence-backed, reviewable execution items — with human approval before decisions and actions become authoritative.",
    failureQuote: "A preference looked like a decision.",
    failureDetail:
      "Sara preferred a 15-minute slot, Devraj preferred 5 minutes, Marcus said “let's test both before deciding.” Noto initially collapsed conversational exploration into a finalized, authoritative decision.",
    proofLine: "18 transcripts · 54 ground-truth items · 78.0 F1 (best prompt-only version)",
    liveUrl: "https://noto-meeting-execution.vercel.app/dashboard",
    githubUrl: "https://github.com/yash7536/noto-meeting-execution",
  },
  {
    slug: "squadpay",
    name: "SquadPay",
    tagline: "Making Settling Up Less Awkward",
    description:
      "A shared-expense workflow where AI extracts messy receipt data, while deterministic logic handles the money — not a fintech product, an AI-assisted expense product.",
    failureQuote: "AI passed reconciliation and was still wrong.",
    failureDetail:
      "Extracted values were roughly 1,000× too small, but they were consistent with each other, so SquadPay's own reconciliation check passed. Agreeing numbers aren't the same as correct numbers.",
    proofLine: "15 evaluated receipts · 69/69 product tests passing · Gemini 3.6 Flash",
    liveUrl: "https://squadpayy.vercel.app/home",
    githubUrl: "https://github.com/yash7536/squadpayy",
  },
  {
    slug: "netsense-ai",
    name: "NetSense AI",
    tagline: "Network Fault Detection & Incident Investigation",
    description:
      "A network-operations prototype connecting telemetry anomalies to the evidence and incident context engineers need to investigate them. Deterministic, rule-based scoring on synthetic telemetry.",
    failureQuote: "A healthy score sat next to an active high-severity incident.",
    failureDetail:
      "A point-in-time composite anomaly score read 0.16 (healthy), while an oscillating, unstable corridor experienced an active, high-severity BGP Peer Dampening incident right beside it.",
    proofLine: "6 synthetic telemetry profiles · 5/5 resolvable-scenario agreement",
    liveUrl: "https://netsense-ai-bclu.vercel.app",
    githubUrl: "https://github.com/yash7536/netsense-ai",
  },
];

export function getProject(slug: ProjectSummary["slug"]) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project slug: ${slug}`);
  return project;
}
