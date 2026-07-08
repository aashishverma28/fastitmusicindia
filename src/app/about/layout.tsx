import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Fastit Music India",
  description: "Learn about Fastit Music India, our mission to empower independent musicians, our team, and how we distribute Indian music globally.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
