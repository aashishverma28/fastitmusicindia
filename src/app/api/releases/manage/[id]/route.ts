import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN" && (session.user as any).role !== "EMPLOYEE") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.publicRelease.findUnique({
      where: { id }
    });

    if (!existing) {
      return NextResponse.json({ error: "Release not found" }, { status: 404 });
    }

    // Physically delete the curated entry
    await prisma.publicRelease.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Release deleted from public list" });
  } catch (error: any) {
    console.error("Release management delete error:", error);
    return NextResponse.json({ error: "Failed to delete release" }, { status: 500 });
  }
}
