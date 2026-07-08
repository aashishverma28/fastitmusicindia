import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Independent Artists & Musicians",
  description:
    "Browse the verified roster of independent Indian artists, singers, composers, and bands distributing their music globally on Fastit Music India.",
  keywords: [
    "independent artists india",
    "indian musicians list",
    "independent singers india",
    "music artists fastit",
    "verified music artists india",
  ],
  alternates: { canonical: "https://fastitmusic.in/artists" },
  openGraph: {
    title: "Independent Artists & Musicians | Fastit Music India",
    description:
      "Browse the verified roster of independent Indian artists distributing their music globally.",
    url: "https://fastitmusic.in/artists",
  },
};

export default function ArtistsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
