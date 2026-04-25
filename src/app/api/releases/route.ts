import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== "ARTIST" && session.user.role !== "LABEL")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { 
      artistId: selectedArtistId,
      title, 
      type, 
      genre, 
      subGenre, 
      language, 
      releaseDate, 
      copyrightHolder, 
      copyrightYear, 
      isExplicit, 
      tracks, 
      artworkUrl 
    } = await req.json();

    // Find the profile ID for the current user
    let artistId: string | null = null;
    let labelId: string | null = null;

    if (session.user.role === "ARTIST") {
      const artist = await prisma.artistProfile.findUnique({
        where: { userId: session.user.id }
      });
      if (!artist) return NextResponse.json({ error: "Artist profile not found" }, { status: 404 });
      artistId = artist.id;
    } else {
      const label = await prisma.labelProfile.findUnique({
        where: { userId: session.user.id }
      });
      if (!label) return NextResponse.json({ error: "Label profile not found" }, { status: 404 });
      labelId = label.id;
      
      // For labels, we use the artistId provided in the request
      if (!selectedArtistId) {
        return NextResponse.json({ error: "Artist selection is required for label submissions" }, { status: 400 });
      }
      artistId = selectedArtistId;
    }

    // Create Release with Tracks in a single operation
    const result = await prisma.release.create({
      data: {
        artistId: artistId as string,
        title,
        type,
        genre,
        subGenre,
        language,
        releaseDate: new Date(releaseDate),
        copyrightHolder,
        copyrightYear: parseInt(copyrightYear),
        isExplicit,
        coverArtUrl: artworkUrl,
        status: "SUBMITTED",
        labelId: labelId,
        tracks: {
          create: tracks.map((track: any, i: number) => ({
            trackNumber: i + 1,
            title: track.title,
            audioFileUrl: track.audioUrl || "https://mock-audio-url.mp3",
            duration: 180, // Placeholder
            featuredArtists: track.artist,
          }))
        }
      }
    });

    return NextResponse.json({ success: true, releaseId: result.id });
  } catch (error: any) {
    console.error("Release submission error:", error);
    return NextResponse.json({ error: "Failed to submit release: " + error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const releases = await prisma.release.findMany({
      where: {
        OR: [
          { artist: { userId: session.user.id } },
          { label: { userId: session.user.id } }
        ]
      },
      include: {
        artist: {
          select: {
            stageName: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ releases });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch releases" }, { status: 500 });
  }
}
