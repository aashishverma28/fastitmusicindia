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

    // We don't actually delete the artist user, we just remove them from being "Featured" (verified)
    // or we could deactivate them. Let's toggle isVerified to false.
    await prisma.artistProfile.update({
      where: { id },
      data: { isVerified: false }
    });

    return NextResponse.json({ message: "Artist removed from public list" });
  } catch (error: any) {
    console.error("Artist management error:", error);
    return NextResponse.json({ error: "Failed to manage artist" }, { status: 500 });
  }
}
