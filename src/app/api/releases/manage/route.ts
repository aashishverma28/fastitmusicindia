import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN" && (session.user as any).role !== "EMPLOYEE") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, artistName, youtubeUrl, genre, releaseDate, slug } = body;

    // Helper to get YouTube ID
    const getYouTubeId = (url: string) => {
      if (!url) return "";
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : "";
    };

    const ytId = getYouTubeId(youtubeUrl);
    const coverArtUrl = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;

    const release = await prisma.publicRelease.create({
      data: {
        title,
        artistName,
        coverArtUrl,
        genre,
        releaseDate: releaseDate ? new Date(releaseDate) : new Date(),
        audioFileUrl: youtubeUrl || "",
        youtubeUrl,
        slug: slug || title.toLowerCase().replace(/ /g, '-'),
        isFeatured: true
      }
    });

    return NextResponse.json({ release });
  } catch (error: any) {
    console.error("Release creation error:", error);
    return NextResponse.json({ error: "Failed to create release" }, { status: 500 });
  }
}
