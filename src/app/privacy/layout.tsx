import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Fastit Music India",
  description: "Learn how we handle, process, and protect your personal details, catalog release data, and financial transaction history on Fastit Music India.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
