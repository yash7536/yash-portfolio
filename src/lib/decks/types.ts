export type Screenshot = { src: string; alt: string; caption: string };
export type Stat = { value: string; label: string };

type BaseSlide = { eyebrow: string; title: string };

export type Slide = BaseSlide &
  (
    | {
        kind: "product";
        description: string;
        proofLine: string;
        liveUrl: string;
        githubUrl: string;
        screenshot: Screenshot;
      }
    | { kind: "problem"; body: string; before: string[] }
    | { kind: "insight"; quote: string; body: string; screenshot?: Screenshot }
    | {
        kind: "how-it-works";
        steps: string[];
        note?: string;
        screenshot?: Screenshot;
      }
    | { kind: "failure"; quote: string; body: string; screenshot?: Screenshot }
    | {
        kind: "change";
        body: string;
        note?: string;
        flow?: string[];
        screenshot?: Screenshot;
      }
    | { kind: "evaluation"; stats: Stat[]; body?: string; note?: string }
    | { kind: "testing"; body: string; stats?: Stat[]; note?: string }
    | { kind: "takeaway"; decision: string; tradeoff: string; limitation: string }
  );

export type Deck = {
  projectSlug: "noto" | "squadpay" | "netsense-ai";
  projectName: string;
  slides: Slide[];
};
