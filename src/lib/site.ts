// Canonical, single-source contact/identity info.
// Previous Stitch exports had two different footer emails and an
// inconsistent LinkedIn URL across pages — this file is the fix: every
// header/footer in the app imports from here instead of hardcoding values.
export const site = {
  name: "Vishnu Yash Pandey",
  email: "yashpandey3300@gmail.com",
  github: "https://github.com/yash7536",
  linkedin: "https://linkedin.com/in/vishnuyashpandey",
  footerTagline: "AI Product Management · Systems · Evaluation.",
} as const;

export const nav = [
  { label: "Work", href: "/#selected-work" },
  { label: "About", href: "/#about" },
  { label: "Resume", href: "/#resume" },
  { label: "Let's talk", href: "/#contact" },
] as const;
