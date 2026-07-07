import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

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
      youtubeUrl,
      artworkUrl,
      spotifyUrl,
      appleMusicUrl,
      ytMusicUrl,
      jioSaavnUrl
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

    // Helper to get YouTube ID
    const getYouTubeId = (url: string) => {
      if (!url) return "";
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : "";
    };

    const ytId = getYouTubeId(youtubeUrl);
    const finalCoverArtUrl = artworkUrl || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);

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
        coverArtUrl: finalCoverArtUrl,
        youtubeUrl,
        spotifyUrl,
        appleMusicUrl,
        ytMusicUrl,
        jioSaavnUrl,
        status: "SUBMITTED",
        labelId: labelId,
        tracks: {
          create: [
            {
              trackNumber: 1,
              title: title,
              audioFileUrl: youtubeUrl || "https://mock-audio-url.mp3",
              duration: 180, // Placeholder
            }
          ]
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

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { 
      id,
      title, 
      type, 
      genre, 
      subGenre, 
      language, 
      releaseDate, 
      copyrightHolder, 
      copyrightYear, 
      isExplicit, 
      youtubeUrl,
      artworkUrl,
      spotifyUrl,
      appleMusicUrl,
      ytMusicUrl,
      jioSaavnUrl
    } = body;

    if (!id) {
      return NextResponse.json({ error: "Release ID is required" }, { status: 400 });
    }

    // Find if release belongs to user
    const existing = await prisma.release.findFirst({
      where: {
        id,
        OR: [
          { artist: { userId: session.user.id } },
          { label: { userId: session.user.id } }
        ]
      }
    });

    if (!existing) {
      return NextResponse.json({ error: "Release not found or access denied" }, { status: 404 });
    }

    // Helper to get YouTube ID
    const getYouTubeId = (url: string) => {
      if (!url) return "";
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : "";
    };

    const ytId = getYouTubeId(youtubeUrl);
    const finalCoverArtUrl = artworkUrl || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);

    // Update release
    const updated = await prisma.release.update({
      where: { id },
      data: {
        title,
        type,
        genre,
        subGenre,
        language,
        releaseDate: new Date(releaseDate),
        copyrightHolder,
        copyrightYear: parseInt(copyrightYear),
        isExplicit,
        coverArtUrl: finalCoverArtUrl,
        youtubeUrl,
        spotifyUrl,
        appleMusicUrl,
        ytMusicUrl,
        jioSaavnUrl,
        status: existing.status === "REJECTED" ? "SUBMITTED" : existing.status,
      }
    });

    // Update the track related to this release
    const firstTrack = await prisma.track.findFirst({
      where: { releaseId: id }
    });

    if (firstTrack) {
      await prisma.track.update({
        where: { id: firstTrack.id },
        data: {
          title: title,
          audioFileUrl: youtubeUrl || firstTrack.audioFileUrl
        }
      });
    }

    return NextResponse.json({ success: true, release: updated });
  } catch (error: any) {
    console.error("Release update error:", error);
    return NextResponse.json({ error: "Failed to update release: " + error.message }, { status: 500 });
  }
}
