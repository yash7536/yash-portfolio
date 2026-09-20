import type { Deck } from "./types";
import { getProject } from "@/lib/projects";

const project = getProject("squadpay");

export const squadpayDeck: Deck = {
  projectSlug: "squadpay",
  projectName: "SquadPay",
  slides: [
    {
      kind: "product",
      eyebrow: "01 — Product",
      title: "SquadPay",
      description: project.description,
      proofLine: project.proofLine,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      screenshot: {
        src: "/screenshots/squadpay/new-split.png",
        alt: "SquadPay new split screen: upload a receipt photo or enter the bill total, Gemini extracts line items automatically",
        caption: "SquadPay — Start a new split (live prototype)",
      },
    },
    {
      kind: "problem",
      eyebrow: "02 — Problem",
      title: "The painful part isn't the split. It's the follow-up.",
      body: "People forget who owes what, do arithmetic by hand, hesitate to ask friends for repayment, and send the same message twice. SquadPay is an AI-assisted shared-expense product — not primarily an AI product. AI is used only where it helps: reading a receipt.",
      before: ["Receipt", "Manual calculation", "Remember who owes what", "Message people individually", "Track repayment"],
    },
    {
      kind: "insight",
      eyebrow: "03 — Product insight",
      title: "Deterministic split core with AI ingestion",
      quote: "AI extracts the receipt. Deterministic logic handles the money.",
      body: "Gemini extracts merchant, items, quantities, prices, tax and total. Everything downstream — schema validation, reconciliation, anomaly checks, the split math — is deterministic.",
    },
    {
      kind: "how-it-works",
      eyebrow: "04 — How it works",
      title: "Receipt in, deterministic split out",
      steps: [
        "Receipt image in",
        "AI extraction (Gemini 3.6 Flash)",
        "Human review / edit",
        "Deterministic split math",
        "Outstanding amounts, WhatsApp repayment request",
      ],
      note: "AI never becomes the authority on the money — every downstream number is deterministic.",
      screenshot: {
        src: "/screenshots/squadpay/home.png",
        alt: "SquadPay home screen showing net pending amount, who owes you, active splits, and recovery rate",
        caption: "SquadPay — Home / outstanding amounts (live prototype, empty demo account)",
      },
    },
    {
      kind: "failure",
      eyebrow: "05 — The failure",
      title: "The failure",
      quote: "AI passed reconciliation and was still wrong.",
      body: "One Indonesian receipt produced extracted values roughly 1,000× too small: the model read a thousands separator as a decimal point. The numbers were internally consistent with each other, so SquadPay's own reconciliation check passed. The values were still wrong. This was an AI extraction error, not a calculation error. Reconciliation can prove numbers agree with each other — it can't prove they're the right numbers.",
    },
    {
      kind: "change",
      eyebrow: "06 — What changed",
      title: "A deterministic anomaly detector",
      body: "A new check watches for unusual decimal precision, suspiciously low totals, and non-positive totals. It's not machine learning — an explainable, rule-based safety layer that flags output for review. It does not catch every incorrect receipt.",
      note: "A later live edit exposed a second issue — the warning didn't reliably reappear after a materially different edit (a dismissal-key bug). That was fixed and retested.",
      screenshot: {
        src: "/screenshots/squadpay/anomaly-warning.png",
        alt: "SquadPay's real anomaly-detection warning: \"Some receipt values look unusual\" with a note that the total looks wrong and an option to continue anyway",
        caption: "SquadPay — Anomaly-detection guardrail (live prototype)",
      },
    },
    {
      kind: "evaluation",
      eyebrow: "07 — Evaluation",
      title: "15 real, public/licensed receipts",
      body: "11 from ExpressExpense, 1 from OCR.space, 3 from CORD. Ground truth created by hand and arithmetic-checked, not AI-generated.",
      stats: [
        { value: "12/15", label: "Parsed (second run)" },
        { value: "92%", label: "Total-field accuracy" },
        { value: "40%", label: "Fully complete receipts" },
      ],
      note: "Baseline: 11/15 parsed, 33% complete. The second run followed system changes, but its extractions matched the baseline except one receipt — a rate-limit failure that succeeded on rerun — so the gain is not evidence of better extraction. 100% reconciliation never equals 100% receipt accuracy.",
    },
    {
      kind: "testing",
      eyebrow: "08 — Real-world testing / limitations",
      title: "Field observation signals",
      body: "Real-user testing surfaced several useful signals: hesitation around asking friends for repayment, some needed a quick demo before understanding the value, and several requested UPI/GPay integration.",
      stats: [
        { value: "6", label: "Showed repayment hesitation" },
        { value: "2", label: "Needed a demonstration" },
        { value: "3", label: "Found workflow helpful" },
        { value: "3", label: "Requested GPay/UPI" },
      ],
      note: "These observations may overlap — no verified total sample size or combined percentage is reported.",
    },
    {
      kind: "takeaway",
      eyebrow: "09 — Product takeaway",
      title: "Make settling up easier without making the user distrust the numbers.",
      decision: "Financial calculations stay deterministic; AI is confined to the one place it earns its keep — reading a receipt.",
      tradeoff: "A multi-stage guardrail stack (schema validation → reconciliation → anomaly detection → human review → retry/manual fallback) over trusting any single check.",
      limitation: "Anomaly detection doesn't catch every incorrect receipt, discount/coupon handling is deferred, and UPI/GPay isn't implemented yet.",
    },
  ],
};
