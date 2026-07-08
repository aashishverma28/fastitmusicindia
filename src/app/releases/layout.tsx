import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Releases & Music Catalog | Fastit Music India",
  description: "Listen to the newest music releases, trending songs, and official music videos from India's independent music scene.",
};

export default function ReleasesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
