import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Distribute your music to Spotify, Apple Music, YouTube Music, JioSaavn, Amazon Music & 150+ global stores. Access playlist pitching, analytics, and royalty management.",
  keywords: [
    "music distribution services india",
    "upload music spotify india",
    "music streaming platforms india",
    "royalty management service",
    "distribute music online india",
  ],
  alternates: { canonical: "https://fastitmusic.in/services" },
  openGraph: {
    title: "Our Services | Fastit Music India",
    description:
      "Distribute your music to Spotify, Apple Music, YouTube Music & 150+ global stores.",
    url: "https://fastitmusic.in/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
