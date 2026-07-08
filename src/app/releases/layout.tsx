import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Music Releases & Catalog",
  description:
    "Listen to the newest Indian music releases, trending songs, official music videos, and singles from independent artists distributed by Fastit Music India.",
  keywords: [
    "new indian music releases",
    "latest songs india",
    "new hindi songs 2025",
    "independent music india",
    "fastit music catalog",
    "new music videos india",
  ],
  alternates: { canonical: "https://fastitmusic.in/releases" },
  openGraph: {
    title: "New Music Releases & Catalog | Fastit Music India",
    description:
      "Listen to the newest Indian music releases, trending songs, and official music videos.",
    url: "https://fastitmusic.in/releases",
  },
};

export default function ReleasesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
