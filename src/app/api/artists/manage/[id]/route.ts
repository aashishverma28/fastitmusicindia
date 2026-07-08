import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN" && (session.user as any).role !== "EMPLOYEE") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Physically delete the curated entry
    await prisma.publicArtist.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Artist deleted from public list" });
  } catch (error: any) {
    console.error("Artist management delete error:", error);
    return NextResponse.json({ error: "Failed to delete artist" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN" && (session.user as any).role !== "EMPLOYEE") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const { name, avatar, slug, instagramUrl, spotifyUrl, youtubeUrl, twitterUrl, selectedReleaseIds } = body;

    const oldArtist = await prisma.publicArtist.findUnique({
      where: { id }
    });

    if (!oldArtist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    const updatedArtist = await prisma.publicArtist.update({
      where: { id },
      data: {
        name,
        avatar,
        slug: slug || name.toLowerCase().replace(/ /g, '-'),
        instagramUrl,
        spotifyUrl,
        youtubeUrl,
        twitterUrl
      }
    });

    // 1. Reset all releases previously associated with this artist's old name
    // @ts-ignore
    await (prisma as any)['publicRelease'].updateMany({
      where: {
        artistName: oldArtist.name
      },
      data: {
        artistName: ""
      }
    });

    // 2. Set the artistName for the newly selected releases to the updated artist name
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

    return NextResponse.json({ artist: updatedArtist });
  } catch (error: any) {
    console.error("Artist management update error:", error);
    return NextResponse.json({ error: "Failed to update artist" }, { status: 500 });
  }
}
