// The four things every case study answers up front: the problem, why AI is
// (or is not) the right tool, the solution, and the tradeoffs. Every line here
// restates facts already documented in the case study pages and repos — no new
// claims. Keep it that way when editing.
export type Tradeoff = {
  decision: string;
  cost: string;
  why: string;
};

export type CaseBriefData = {
  problem: string;
  whyAi: string;
  whyAiShort: string;
  solution: string;
  tradeoffs: Tradeoff[];
};

export const briefs: Record<"noto" | "squadpay" | "netsense-ai", CaseBriefData> = {
  noto: {
    problem:
      "A transcript records what people said, not what was decided. Teams leave a meeting unsure who owns which action, by when, and whether a statement was a decision or only a preference, so follow-up drifts into memory and chat threads.",
    whyAi:
      "Decisions, owners and deadlines are phrased many different ways by different speakers, and their meaning depends on context: “let’s test both before deciding” is not a decision. Keyword rules can’t read that. A language model can propose candidates from free-form conversation. It can’t be the authority, so in Noto the model only proposes.",
    whyAiShort:
      "Meaning in conversation can’t be captured with keyword rules. The model proposes; code and a person decide.",
    solution:
      "The model extracts candidate decisions, actions, owners and deadlines, each tied to a source quote. Deterministic code checks evidence, ambiguity, conflicts and deferral language. A person approves, edits or rejects every item before it becomes the record. The deployed pipeline scored 83.8 F1 with 100% evidence grounding on the frozen gold set.",
    tradeoffs: [
      {
        decision: "Human approval on every item instead of full automation",
        cost: "Slower for the user: nothing is final until someone signs off.",
        why: "A wrong decision or owner written into the record costs more than one review step.",
      },
      {
        decision: "Validation in code instead of better prompts",
        cost: "More engineering, and fixed rules such as the deferral-phrase list need upkeep.",
        why: "The best prompt-only version reached 78.0 F1, but a prompt asks the model to behave. Code checks it.",
      },
      {
        decision: "Flag uncertainty instead of guessing",
        cost: "Over-flags: ambiguity handling ran at 61.5% precision in the production-style run.",
        why: "An unclear owner shown as a review state is safer than a confident wrong owner.",
      },
      {
        decision: "Copy-ready Jira and Notion text instead of live integrations",
        cost: "Users paste the output themselves.",
        why: "Tests whether extraction and review are useful before adding integration surface.",
      },
    ],
  },
  squadpay: {
    problem:
      "Splitting the bill is easy. Asking friends to pay you back is awkward. People forget who owes what, do the maths by hand and hesitate to follow up: 9 of 12 testers found repayment requests an issue.",
    whyAi:
      "Receipts are messy photos with different layouts, abbreviations, currencies and tax lines, and typing every item by hand is the step people skip. A vision model can read a receipt into items, quantities, prices and tax, so the split starts from data instead of manual entry. The money itself doesn’t need AI: totals and splits are arithmetic, so they stay in code.",
    whyAiShort:
      "Reading messy receipt photos into line items. The money maths stays in deterministic code.",
    solution:
      "Gemini reads the receipt and the user reviews or edits it. Deterministic code validates the schema, reconciles totals, flags anomalies such as a 1,000× scale error, and computes the split. Repayment requests go out as WhatsApp links.",
    tradeoffs: [
      {
        decision: "Deterministic money maths instead of letting the model compute",
        cost: "Less automation in the flow.",
        why: "The model never becomes the authority on amounts people owe each other.",
      },
      {
        decision: "Rule-based anomaly checks instead of an ML confidence model",
        cost: "Doesn’t catch every wrong receipt.",
        why: "Explainable and testable; it caught the known scale-error case that reconciliation passed.",
      },
      {
        decision: "WhatsApp links instead of in-app UPI",
        cost: "All 12 testers expected integrated payment.",
        why: "Payments were deferred until they can be made safe; the repayment nudge was the core problem.",
      },
      {
        decision: "A review step before the split",
        cost: "One extra step for the user.",
        why: "10 of 12 testers said they would check the AI extraction first anyway.",
      },
    ],
  },
  "netsense-ai": {
    problem:
      "When a network link misbehaves, the evidence sits in different places: telemetry dashboards, incident records and ownership. Engineers correlate them by hand before the real investigation starts. This framing came from fault-management pain points documented during my Tata Teleservices internship.",
    whyAi:
      "Detection doesn’t need AI yet, so it doesn’t use it. A weighted rule score over latency, packet loss, jitter and bandwidth is explainable and held to 900 parity test cases. AI becomes necessary for what rules can’t do well: telling which fault a pattern of signals points to, and summarising context across many records. Those fields are authored demo data today, labelled as such, until there is real labelled data to train and test against.",
    whyAiShort:
      "Not for detection yet: rules are explainable and testable. AI is reserved for fault classification once real labelled data exists.",
    solution:
      "A Python engine scores telemetry for 6 links every 30 minutes and shows the score beside the link’s evidence and its linked incident, so the engineer sees signal and context in one place. Every field is labelled computed or authored.",
    tradeoffs: [
      {
        decision: "Rule-based scoring instead of a trained model",
        cost: "A single snapshot misses instability over time (the INC-395 blind spot).",
        why: "Explainable, reproducible and testable without production data.",
      },
      {
        decision: "Synthetic telemetry in the public case study",
        cost: "Not production evidence; real-world testing stays under NDA.",
        why: "Anyone can reproduce the detection behaviour and the evaluation from the repo.",
      },
      {
        decision: "Keep the failure visible instead of tuning it away",
        cost: "The prototype can still show “healthy” beside an active incident.",
        why: "Lowering the threshold would hide the real issue: scoring needs a time window.",
      },
      {
        decision: "Point-in-time score first, rolling window later",
        cost: "Oscillating links aren’t scored correctly yet.",
        why: "A simpler first version made the blind spot measurable; variance-aware scoring is the planned fix.",
      },
    ],
  },
};
