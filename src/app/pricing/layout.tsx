import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans | Fastit Music India",
  description: "Simple, transparent distribution pricing. Distribute unlimited songs and keep 100% of your earnings with no hidden fees.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
