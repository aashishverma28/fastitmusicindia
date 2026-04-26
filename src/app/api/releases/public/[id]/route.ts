import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const release = await prisma.release.findUnique({
      where: { id },
      include: {
        artist: true,
        label: true,
        tracks: {
          orderBy: { trackNumber: "asc" }
        }
      }
    });

    if (!release) {
      return NextResponse.json({ error: "Release not found" }, { status: 404 });
    }

    // Format for the frontend
    const formattedRelease = {
      id: release.id,
      title: release.title,
      artist: release.artist.stageName,
      cover: release.coverArtUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
      genre: release.genre,
      releaseDate: release.releaseDate,
      copyrightHolder: release.copyrightHolder,
      upc: release.upc,
      labelName: release.label?.labelName || "Fastit Music India",
      tracks: release.tracks.map(t => ({
        number: t.trackNumber,
        title: t.title,
        duration: "03:45", // We should ideally store or calculate this
        audioUrl: t.audioFileUrl
      }))
    };

    return NextResponse.json({ release: formattedRelease });
  } catch (error: any) {
    console.error("Public release detail fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch release detail" }, { status: 500 });
  }
}
