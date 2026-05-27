import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "EMPLOYEE" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payments = await prisma.payment.findMany({
      orderBy: { requestedAt: "desc" }
    });

    // Fetch payee emails
    const userIds = Array.from(new Set(payments.map(p => p.userId)));
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, email: true, role: true }
    });

    const userMap = users.reduce((acc, u) => {
      acc[u.id] = { email: u.email, role: u.role };
      return acc;
    }, {} as Record<string, { email: string; role: string }>);

    const paymentsWithUsers = payments.map(p => ({
      ...p,
      email: userMap[p.userId]?.email || "Unknown User",
      role: userMap[p.userId]?.role || "ARTIST"
    }));

    return NextResponse.json({ payments: paymentsWithUsers });
  } catch (error) {
    console.error("Failed to fetch payments:", error);
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
  }
}
