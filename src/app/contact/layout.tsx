import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Support",
  description:
    "Contact the Fastit Music India team for music distribution support, royalty queries, or catalog questions. We're here to help independent artists succeed.",
  keywords: [
    "contact fastit music india",
    "music distribution support india",
    "fastit music help",
  ],
  alternates: { canonical: "https://fastitmusic.in/contact" },
  openGraph: {
    title: "Contact Support | Fastit Music India",
    description: "Contact us for music distribution support and catalog questions.",
    url: "https://fastitmusic.in/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
