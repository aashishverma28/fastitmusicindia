import { Metadata } from "next";
import { prisma } from "@/lib/db";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const artist = await prisma.publicArtist.findFirst({
      where: { slug },
    });

    if (!artist) {
      return {
        title: "Artist Profile | Fastit Music India",
        description: "Explore independent artist profiles and catalogs on Fastit Music India.",
      };
    }

    return {
      title: `${artist.name} - Official Artist Profile | Fastit Music India`,
      description: `Listen to track releases, stream catalog discs, and view platform plays breakdown for ${artist.name} on Fastit Music India.`,
      openGraph: {
        title: `${artist.name} | Fastit Music India`,
        description: `Stream releases, discography, and check stats for ${artist.name}.`,
        images: [
          {
            url: artist.avatar || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
            width: 800,
            height: 800,
            alt: artist.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${artist.name} | Fastit Music India`,
        description: `Stream releases, discography, and check stats for ${artist.name}.`,
        images: [artist.avatar || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80"],
      }
    };
  } catch (err) {
    console.error("Error generating dynamic artist metadata:", err);
    return {
      title: "Artist Profile | Fastit Music India",
    };
  }
}

export default function ArtistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
