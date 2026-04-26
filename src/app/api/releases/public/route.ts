import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const releases = await prisma.publicRelease.findMany({
      orderBy: {
        releaseDate: "desc"
      }
    });

    const formattedReleases = releases.map((rel) => ({
      id: rel.id,
      title: rel.title,
      artist: rel.artistName,
      img: rel.coverArtUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
      cover: rel.coverArtUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
      genre: rel.genre,
      releaseDate: rel.releaseDate,
      audioUrl: rel.audioFileUrl || "",
      slug: rel.slug || rel.id
    }));

    return NextResponse.json({ releases: formattedReleases });
  } catch (error: any) {
    console.error("Public releases fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch releases" }, { status: 500 });
  }
}
