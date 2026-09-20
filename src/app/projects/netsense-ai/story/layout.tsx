import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NetSense AI — Story | Vishnu Yash Pandey",
  description: "The fast, visual product story behind NetSense AI — problem, insight, failure, and what changed.",
};

export default function NetSenseStoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
