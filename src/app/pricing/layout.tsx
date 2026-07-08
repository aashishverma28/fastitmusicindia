import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans",
  description:
    "Simple, transparent music distribution pricing. Get unlimited song releases, keep 100% of your royalties, and reach Spotify, Apple Music, YouTube Music & more — all at the best rates in India.",
  keywords: [
    "music distribution pricing india",
    "cheap music distribution india",
    "free music distribution india",
    "keep 100 royalties india",
    "fastit music pricing",
  ],
  alternates: { canonical: "https://fastitmusic.in/pricing" },
  openGraph: {
    title: "Pricing Plans | Fastit Music India",
    description:
      "Keep 100% of your royalties. Simple, transparent music distribution pricing for Indian artists.",
    url: "https://fastitmusic.in/pricing",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
