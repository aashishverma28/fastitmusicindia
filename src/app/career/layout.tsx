import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers & Job Openings | Fastit Music India",
  description: "Join India's fastest-growing music distribution platform. Work with a dynamic team of engineers, creatives, and industry experts.",
};

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
