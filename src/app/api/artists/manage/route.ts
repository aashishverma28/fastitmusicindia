import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
// Public artist management API
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import { calculateRealFans } from "@/lib/social-fans";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN" && (session.user as any).role !== "EMPLOYEE") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, genre, avatar, slug, bio, email, instagramUrl, spotifyUrl, youtubeUrl, twitterUrl, selectedReleaseIds } = body;

    // Calculate real fans from Instagram and Spotify accounts
    const fansInfo = await calculateRealFans(instagramUrl, spotifyUrl);

    // @ts-ignore
    const artist = await (prisma as any)['publicArtist'].create({
      data: {
        name,
        genre: genre || "Indie",
        avatar,
        followers: fansInfo.formatted,
        slug: slug || name.toLowerCase().replace(/ /g, '-'),
        bio: bio || null,
        email: email || null,
        instagramUrl,
        spotifyUrl,
        youtubeUrl,
        twitterUrl,
        isVerified: true
      }
    });

    if (selectedReleaseIds && selectedReleaseIds.length > 0) {
      // @ts-ignore
      await (prisma as any)['publicRelease'].updateMany({
        where: {
          id: { in: selectedReleaseIds }
        },
        data: {
          artistName: name
        }
      });
    }

    return NextResponse.json({ artist });
  } catch (error: any) {
    console.error("Artist creation error:", error);
    return NextResponse.json({ error: "Failed to create artist" }, { status: 500 });
  }
}
