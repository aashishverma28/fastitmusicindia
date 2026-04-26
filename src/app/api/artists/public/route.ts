import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const artists = await prisma.artistProfile.findMany({
      where: {
        isVerified: true // Only show verified artists on public page by default
      },
      orderBy: {
        stageName: "asc"
      }
    });

    const formattedArtists = artists.map(artist => ({
      id: artist.id,
      name: artist.stageName,
      genre: artist.primaryGenre,
      avatar: artist.profilePhoto || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
      followers: "10K+", // Placeholder since we don't have follower count in schema
      slug: artist.id,
      isVerified: artist.isVerified
    }));

    return NextResponse.json({ artists: formattedArtists });
  } catch (error: any) {
    console.error("Public artists fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch artists" }, { status: 500 });
  }
}
