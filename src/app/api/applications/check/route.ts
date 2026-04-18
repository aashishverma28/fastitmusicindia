import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const trackingId = searchParams.get("id");

    if (!trackingId) {
      return NextResponse.json({ error: "Tracking ID is required" }, { status: 400 });
    }

    const application = await prisma.application.findUnique({
      where: { applicationId: trackingId },
      select: {
        id: true,
        applicationId: true,
        type: true,
        status: true,
        rejectionReason: true,
        createdAt: true,
      }
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ application });
  } catch (error: any) {
    console.error("Status check error:", error);
    return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
  }
}
