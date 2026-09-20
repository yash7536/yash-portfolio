import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SquadPay — Story | Vishnu Yash Pandey",
  description: "The fast, visual product story behind SquadPay — problem, insight, failure, and what changed.",
};

export default function SquadPayStoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
