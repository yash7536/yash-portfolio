import type { Deck } from "./types";
import { getProject } from "@/lib/projects";

const project = getProject("noto");

export const notoDeck: Deck = {
  projectSlug: "noto",
  projectName: "Noto",
  slides: [
    {
      kind: "product",
      eyebrow: "01 — Product",
      title: "Noto",
      description: project.description,
      proofLine: project.proofLine,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      screenshot: {
        src: "/screenshots/noto/dashboard.png",
        alt: "Noto dashboard showing meetings processed, execution items extracted, items needing review, and approved & exported counts",
        caption: "Noto — Dashboard (live prototype, seeded demo data)",
      },
    },
    {
      kind: "problem",
      eyebrow: "02 — Problem",
      title: "A transcript records what people said. It doesn't record what was decided.",
      body: "A meeting transcript captures the conversation. It does not automatically establish what was actually decided, who owns an action, what the deadline is, whether a statement was a preference rather than a decision, or whether a later comment superseded an earlier one.",
      before: ["Transcript", "Memory", "Interpretation", "Slack/WhatsApp", "Unclear ownership", "Execution"],
    },
    {
      kind: "insight",
      eyebrow: "03 — Product insight",
      title: "The system shouldn't just say what it thinks happened. It should show why.",
      quote: "The system shouldn't just tell the user what it thinks happened. It should show why.",
      body: "Every extracted item carries a source quote and a transcript reference the user can inspect — evidence before automation.",
      screenshot: {
        src: "/screenshots/noto/review-workspace.png",
        alt: "Noto review workspace showing a flagged item with an unclear-owner conflict alongside the source transcript with verified quotes",
        caption: "Noto — Review Workspace, evidence panel (live prototype)",
      },
    },
    {
      kind: "how-it-works",
      eyebrow: "04 — How it works",
      title: "AI proposes. The system validates. The human approves.",
      steps: [
        "Transcript in",
        "AI extraction (candidate decisions, actions, owners, deadlines)",
        "Deterministic validation (evidence, ambiguity, conflicts, deferral language)",
        "Human review and approval",
        "Copy-ready output (Jira / Notion)",
      ],
      note: "Nothing becomes authoritative until a human approves it, edits it, rejects it, or resolves the ambiguity.",
      screenshot: {
        src: "/screenshots/noto/export.png",
        alt: "Noto export execution plan screen showing deterministic, evidence-grounded, copy-ready Jira tickets",
        caption: "Noto — Export Execution Plan (live prototype)",
      },
    },
    {
      kind: "failure",
      eyebrow: "05 — The failure",
      title: "The failure",
      quote: "A preference looked like a decision.",
      body: "Sara preferred a 15-minute slot. Devraj preferred 5 minutes. Marcus said, “Let's test both options before deciding.” Noto initially read that exchange as a finalized decision. It wasn't one — it was a deferral. The system had silently converted uncertainty into certainty.",
    },
    {
      kind: "change",
      eyebrow: "06 — What changed",
      title: "A preference-vs-decision guardrail",
      body: "Noto gained explicit handling for deferral language — “decide later,” “test both before deciding,” “wait for approval,” “revisit.” Flagged items stay open for human review instead of resolving to a finalized decision.",
      note: "The targeted scenario was retested and no longer resolves to a false decision, and the 41 regression tests pass (41/41) — pass/fail checks on known cases. The full benchmark was not rerun after this guardrail shipped, so no F1/precision/recall improvement is claimed for it.",
    },
    {
      kind: "evaluation",
      eyebrow: "07 — Evaluation",
      title: "Frozen Gold Set v1.1",
      body: "One frozen gold set: 18 transcripts, 54 hand-verified ground-truth items. Stage 1 tested three prompt-only versions of the raw model. Best (C3 — evidence + guardrail instructions): 71.9% precision, 85.2% recall, 78.0 F1. C3 is still a prompt, which is why validation became code.",
      stats: [
        { value: "67.8", label: "F1 — C1 baseline prompt" },
        { value: "70.1", label: "F1 — C2 + evidence" },
        { value: "78.0", label: "F1 — C3 + guardrail prompt" },
      ],
      note: "Stage 2 scored the deployed pipeline (extraction, deterministic validation, evidence verification) on the same gold set: 77.8% precision, 90.7% recall, 83.8% F1, 100% evidence grounding. Same gold set, different system; it predates the preference guardrail. The 41 regression tests are a separate check, not a benchmark configuration.",
    },
    {
      kind: "testing",
      eyebrow: "08 — Real-world testing",
      title: "Real-user testing",
      body: "The benchmark didn't catch this. Real users did.",
      stats: [
        { value: "8", label: "Real users" },
        { value: "Directional", label: "Not statistically significant" },
      ],
      note: "Tested with 3 college club coordinators, 2 students, 1 software developer, and 2 startup-team members. Findings: an owner was wrong in one test; the preference-vs-decision failure appeared directly in a test meeting (2/8 saw Noto treat something as a decision they didn't consider one); 5/8 said they'd review AI output before relying on it; 6/8 said they'd use Noto again.",
    },
    {
      kind: "takeaway",
      eyebrow: "09 — Product takeaway",
      title: "Reviewability over maximum automation",
      decision: "Nothing becomes an authoritative record without evidence and affirmative human approval.",
      tradeoff: "Trading automation speed for reviewability — Noto asks for more human attention up front, in exchange for output a team can actually trust.",
      limitation: "The full benchmark hasn't been rerun since the guardrail shipped; ambiguity handling over-flags and supersession detection is brittle (0 of 4 in the production-style run).",
    },
  ],
};
