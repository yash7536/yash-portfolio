import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Noto — Story | Vishnu Yash Pandey",
  description: "The fast, visual product story behind Noto — problem, insight, failure, and what changed.",
};

export default function NotoStoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
