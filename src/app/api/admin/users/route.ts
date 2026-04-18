import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "EMPLOYEE")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role") || undefined; // ARTIST, LABEL

    const users = await prisma.user.findMany({
      where: role ? { role: role as any } : { role: { in: ["ARTIST", "LABEL"] } },
      include: {
        artistProfile: true,
        labelProfile: true,
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ users });
  } catch (error: any) {
    console.error("Fetch users error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
