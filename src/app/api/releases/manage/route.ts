import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN" && (session.user as any).role !== "EMPLOYEE") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, artistName, coverArtUrl, genre, releaseDate, audioFileUrl, slug } = body;

    const release = await prisma.publicRelease.create({
      data: {
        title,
        artistName,
        coverArtUrl,
        genre,
        releaseDate: releaseDate ? new Date(releaseDate) : new Date(),
        audioFileUrl,
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
