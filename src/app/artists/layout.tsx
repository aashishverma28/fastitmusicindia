import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Independent Artists & Musicians | Fastit Music India",
  description: "Browse the roster of verified independent artists, singers, composers, and bands distributing their music globally with Fastit Music India.",
};

export default function ArtistsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
