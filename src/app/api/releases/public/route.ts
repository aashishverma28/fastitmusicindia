import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const releases = await prisma.release.findMany({
      where: {
        status: {
          in: ["APPROVED", "LIVE"]
        }
      },
      include: {
        artist: {
          select: {
            stageName: true
          }
        },
        tracks: {
          take: 1,
          select: {
            audioFileUrl: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 20
    });

    // Format for the frontend
    const formattedReleases = releases.map((rel) => ({
      id: rel.id,
      title: rel.title,
      artist: rel.artist.stageName,
      img: rel.coverArtUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
      cover: rel.coverArtUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
      genre: rel.genre,
      releaseDate: rel.releaseDate,
      audioUrl: rel.tracks[0]?.audioFileUrl || "",
      slug: rel.id // Use ID as slug for now since we don't have a slug field
    }));

    return NextResponse.json({ releases: formattedReleases });
  } catch (error: any) {
    console.error("Public releases fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch releases" }, { status: 500 });
  }
}
