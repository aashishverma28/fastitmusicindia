import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { category, subject, description, priority } = await req.json();

    if (!category || !subject || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ticket = await prisma.supportTicket.create({
      data: {
        userId: session.user.id,
        category,
        subject,
        description,
        priority: priority || "Low",
        status: "OPEN",
      }
    });

    return NextResponse.json({ success: true, ticket });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create support ticket" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Admins see all, others see own
    const tickets = await prisma.supportTicket.findMany({
      where: session.user.role === "ADMIN" ? {} : { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, tickets });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 });
  }
}
