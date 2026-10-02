import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Exact counts directly from the live database
    const [artistProfileCount, userArtistCount, trackCount, releaseCount] = await Promise.all([
      prisma.artistProfile.count().catch(() => 0),
      prisma.user.count({ where: { role: "ARTIST" } }).catch(() => 0),
      prisma.track.count().catch(() => 0),
      prisma.release.count().catch(() => 0),
    ]);

    // Total actual creators / artists in the database
    const totalArtists = Math.max(artistProfileCount, userArtistCount);
    // Total tracks distributed / in catalog
    const totalTracks = Math.max(trackCount, releaseCount);
    // Total supported streaming portals (Spotify, Apple Music, JioSaavn, Gaana, YouTube, Amazon Music, Wynk, Hungama, Instagram, TikTok, etc.)
    const totalPortals = 150;

    return NextResponse.json({
      success: true,
      stats: {
        artists: totalArtists,
        tracks: totalTracks,
        portals: totalPortals,
      },
      raw: {
        artistProfiles: artistProfileCount,
        userArtists: userArtistCount,
        tracks: trackCount,
        releases: releaseCount,
      }
    });
  } catch (error: any) {
    console.error("Public stats fetch error:", error);
    // Fallback if database connection temporarily times out
    return NextResponse.json({
      success: false,
      stats: {
        artists: 12,
        tracks: 6,
        portals: 150,
      }
    });
  }
}
