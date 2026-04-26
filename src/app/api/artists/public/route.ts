import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const artists = await prisma.publicArtist.findMany({
      where: {
        isVerified: true
      },
      orderBy: {
        name: "asc"
      }
    });

    const formattedArtists = artists.map(artist => ({
      id: artist.id,
      name: artist.name,
      genre: artist.genre,
      avatar: artist.avatar || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
      followers: artist.followers,
      slug: artist.slug || artist.id,
      isVerified: artist.isVerified
    }));

    return NextResponse.json({ artists: formattedArtists });
  } catch (error: any) {
    console.error("Public artists fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch artists" }, { status: 500 });
  }
}
