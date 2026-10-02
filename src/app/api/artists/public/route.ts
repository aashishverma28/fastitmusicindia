import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { calculateRealFans } from "@/lib/social-fans";

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

    const formattedArtists = await Promise.all(
      artists.map(async (artist) => {
        // Calculate real fans from Instagram + Spotify followers
        const fansInfo = await calculateRealFans(artist.instagramUrl, artist.spotifyUrl);
        
        // Asynchronously sync real calculated followers to DB if it's currently the legacy "10K+" fake value
        if (artist.followers === "10K+" || (fansInfo.total > 0 && artist.followers !== fansInfo.formatted)) {
          prisma.publicArtist.update({
            where: { id: artist.id },
            data: { followers: fansInfo.formatted }
          }).catch((err) => console.warn(`[SYNC FANS] DB sync failed for ${artist.name}:`, err.message));
        }

        return {
          id: artist.id,
          name: artist.name,
          genre: artist.genre,
          avatar: artist.avatar || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
          followers: fansInfo.formatted,
          fansTotal: fansInfo.total,
          fansBreakdown: {
            instagram: fansInfo.instagramCount,
            spotify: fansInfo.spotifyCount
          },
          slug: artist.slug || artist.id,
          isVerified: artist.isVerified,
          instagramUrl: artist.instagramUrl || "",
          spotifyUrl: artist.spotifyUrl || "",
          youtubeUrl: artist.youtubeUrl || "",
          twitterUrl: artist.twitterUrl || "",
          bio: artist.bio || "",
          email: artist.email || ""
        };
      })
    );

    return NextResponse.json({ artists: formattedArtists });
  } catch (error: any) {
    console.error("Public artists fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch artists" }, { status: 500 });
  }
}
