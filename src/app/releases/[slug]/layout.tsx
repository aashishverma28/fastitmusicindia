import { Metadata } from "next";
import { prisma } from "@/lib/db";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    // Attempt UPC or title slug match in public release catalog
    const release = await (prisma as any)['publicRelease'].findFirst({
      where: {
        OR: [
          { slug },
          { id: slug }
        ]
      }
    });

    if (!release) {
      return {
        title: "Release Details | Fastit Music India",
        description: "Listen to manual public song releases on Fastit Music India.",
      };
    }

    const titleText = `"${release.title}" by ${release.artistName} - Release Details | Fastit Music India`;
    const descText = `Listen to "${release.title}" by ${release.artistName} on Fastit Music India. Play the embedded YouTube video and find official links to Spotify, Apple Music, and JioSaavn.`;

    return {
      title: titleText,
      description: descText,
      openGraph: {
        title: `"${release.title}" by ${release.artistName}`,
        description: descText,
        images: [
          {
            url: release.coverArtUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
            width: 800,
            height: 800,
            alt: release.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `"${release.title}" by ${release.artistName}`,
        description: descText,
        images: [release.coverArtUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80"],
      }
    };
  } catch (err) {
    console.error("Error generating dynamic release metadata:", err);
    return {
      title: "Release Details | Fastit Music India",
    };
  }
}

export default function ReleaseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
