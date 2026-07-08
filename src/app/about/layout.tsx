import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Fastit Music India — our mission to empower independent musicians across India, our founding story, and the team behind India's premier music distribution platform.",
  keywords: ["about fastit music india", "indian music distribution team", "fastit music story"],
  alternates: { canonical: "https://fastitmusic.in/about" },
  openGraph: {
    title: "About Us | Fastit Music India",
    description: "Our mission to empower independent musicians across India.",
    url: "https://fastitmusic.in/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
