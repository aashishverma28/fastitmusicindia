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

    // Set status to TAKEN_DOWN to remove from public list
    await prisma.release.update({
      where: { id },
      data: { status: "TAKEN_DOWN" }
    });

    return NextResponse.json({ message: "Release taken down" });
  } catch (error: any) {
    console.error("Release management error:", error);
    return NextResponse.json({ error: "Failed to manage release" }, { status: 500 });
  }
}
