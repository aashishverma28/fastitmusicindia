import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Fastit Music India",
  description: "Read our distribution agreements, anti-fraud stream policies, financial payout terms, and intellectual property conditions on Fastit Music India.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
