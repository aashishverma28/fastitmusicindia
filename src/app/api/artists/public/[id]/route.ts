import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const artist = await prisma.artistProfile.findUnique({
      where: { id },
      include: {
        releases: {
          where: {
            OR: [
              { status: "APPROVED" },
              { status: "LIVE" }
            ]
          },
          orderBy: {
            releaseDate: "desc"
          }
        }
      }
    });

    if (!artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    const formattedArtist = {
      id: artist.id,
      name: artist.stageName,
      genre: artist.primaryGenre,
      avatar: artist.profilePhoto || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
      bio: artist.bio || "Independent artist making waves from the heart of India.",
      followers: "10K+",
      links: {
        instagram: artist.instagramUrl,
        youtube: artist.youtubeUrl,
        spotify: artist.spotifyUrl,
        twitter: artist.twitterUrl
      },
      releases: artist.releases.map(rel => ({
        id: rel.id,
        title: rel.title,
        cover: rel.coverArtUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
        releaseDate: rel.releaseDate,
        slug: rel.id
      }))
    };

    return NextResponse.json({ artist: formattedArtist });
  } catch (error: any) {
    console.error("Public artist detail fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch artist detail" }, { status: 500 });
  }
}
