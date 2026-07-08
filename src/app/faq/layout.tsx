import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Find answers to the most common questions about Fastit Music India — music distribution, royalty payouts, UPC/ISRC codes, Spotify pitching, and platform onboarding.",
  keywords: [
    "fastit music faq",
    "music distribution faq india",
    "how to distribute music india",
    "music royalty questions india",
    "spotify distribution questions india",
  ],
  alternates: { canonical: "https://fastitmusic.in/faq" },
  openGraph: {
    title: "FAQ | Fastit Music India",
    description:
      "Answers to common questions about music distribution, royalty payouts, and platform onboarding.",
    url: "https://fastitmusic.in/faq",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
