import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers & Job Openings",
  description:
    "Join India's fastest-growing music distribution company. Explore open roles in engineering, music marketing, label relations, and operations at Fastit Music India.",
  keywords: [
    "music industry jobs india",
    "fastit music careers",
    "music technology jobs india",
    "music distribution company jobs india",
  ],
  alternates: { canonical: "https://fastitmusic.in/career" },
  openGraph: {
    title: "Careers & Job Openings | Fastit Music India",
    description:
      "Explore open roles in engineering, music marketing, label relations and more.",
    url: "https://fastitmusic.in/career",
  },
};

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
