import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const trackingId = req.nextUrl.searchParams.get("id");

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
