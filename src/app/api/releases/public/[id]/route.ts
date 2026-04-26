import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const release = await prisma.publicRelease.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id }
        ]
      }
    });

    if (!release) {
      return NextResponse.json({ error: "Release not found" }, { status: 404 });
    }

    const formattedRelease = {
      id: release.id,
      title: release.title,
      artist: release.artistName,
      cover: release.coverArtUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
      genre: release.genre,
      releaseDate: release.releaseDate,
      audioUrl: release.audioFileUrl,
      labelName: "Fastit Music India",
      tracks: [
        {
          number: 1,
          title: release.title,
          duration: "03:45",
          audioUrl: release.audioFileUrl
        }
      ]
    };

    return NextResponse.json({ release: formattedRelease });
  } catch (error: any) {
    console.error("Public release detail fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch release detail" }, { status: 500 });
  }
}
