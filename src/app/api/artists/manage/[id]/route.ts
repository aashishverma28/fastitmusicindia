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
