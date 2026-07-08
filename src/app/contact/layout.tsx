import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Fastit Music India",
  description: "Get in touch with the Fastit Music India support team. We're here to help with your distribution issues, royalty reports, or general inquiries.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
