import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
// Public artist management API
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN" && (session.user as any).role !== "EMPLOYEE") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, genre, avatar, followers, slug, instagramUrl, spotifyUrl, youtubeUrl, twitterUrl } = body;

    // @ts-ignore
    const artist = await (prisma as any)['publicArtist'].create({
      data: {
        name,
        genre,
        avatar,
        followers: followers || "10K+",
        slug: slug || name.toLowerCase().replace(/ /g, '-'),
        instagramUrl,
        spotifyUrl,
        youtubeUrl,
        twitterUrl,
        isVerified: true
      }
    });

    return NextResponse.json({ artist });
  } catch (error: any) {
    console.error("Artist creation error:", error);
    return NextResponse.json({ error: "Failed to create artist" }, { status: 500 });
  }
}
