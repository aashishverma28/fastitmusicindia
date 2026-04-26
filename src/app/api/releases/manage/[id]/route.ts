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
    await prisma.publicRelease.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Release deleted from public list" });
  } catch (error: any) {
    console.error("Release management delete error:", error);
    return NextResponse.json({ error: "Failed to delete release" }, { status: 500 });
  }
}
