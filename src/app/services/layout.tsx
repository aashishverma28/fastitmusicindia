import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Fastit Music India",
  description: "Explore our music distribution services: upload music to Spotify, Apple Music, and YouTube, pitch to playlist curators, track analytics, and manage royalties.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
