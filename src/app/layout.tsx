import type { Metadata } from "next";
import { Newsreader, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jbmono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Vishnu Yash Pandey — AI Product Management",
  description:
    "I build AI products from messy problems to working, tested workflows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${geist.variable} ${jbmono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-ink font-sans selection:bg-accent/20 selection:text-accent-deep">
        {children}
      </body>
    </html>
  );
}
