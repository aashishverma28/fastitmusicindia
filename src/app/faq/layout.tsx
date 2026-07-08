import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Fastit Music India",
  description: "Find quick answers to common questions about music distribution, pricing plans, verified badges, sitemaps, dynamic metadata, and payouts.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
