import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "LABEL") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const label = await prisma.labelProfile.findUnique({
      where: { userId: session.user.id },
      select: { id: true }
    });

    if (!label) return NextResponse.json({ error: "Label not found" }, { status: 404 });

    const count = await prisma.artistProfile.count({
      where: {
        OR: [
          { labelId: label.id },
          { releases: { some: { labelId: label.id } } }
        ]
      }
    });

    return NextResponse.json({ artistCount: count });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
