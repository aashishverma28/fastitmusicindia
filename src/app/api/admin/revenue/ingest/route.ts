import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { reports } = await req.json();

    if (!Array.isArray(reports)) {
      return NextResponse.json({ error: "Invalid reports format" }, { status: 400 });
    }

    // Example Report Format:
    // {
    //   isrc: "...",
    //   period: "2024-03",
    //   platform: "Spotify",
    //   streams: 1240,
    //   revenue: 45.20,
    //   currency: "INR"
    // }

    const results = await prisma.$transaction(async (tx: any) => {
      const addedRecords = [];

      for (const report of reports) {
        // Find Track by ISRC
        const track = await tx.track.findFirst({
          where: { isrc: report.isrc },
          include: { release: true }
        });

        if (track) {
          const revenueRecord = await tx.revenue.create({
            data: {
              artistId: track.release.artistId,
              labelId: track.release.labelId,
              releaseId: track.releaseId,
              trackId: track.id,
              platform: report.platform,
              period: report.period,
              streams: report.streams,
              revenueAmount: report.revenue,
              currency: report.currency || "INR"
            }
          });
          addedRecords.push(revenueRecord.id);
        } else {
          // Check if it's a Release level UPC match
          const release = await tx.release.findFirst({
             where: { upc: report.upc }
          });

          if (release) {
             const revenueRecord = await tx.revenue.create({
               data: {
                 artistId: release.artistId,
                 labelId: release.labelId,
                 releaseId: release.id,
                 platform: report.platform,
                 period: report.period,
                 streams: report.streams,
                 revenueAmount: report.revenue,
                 currency: report.currency || "INR"
               }
             });
             addedRecords.push(revenueRecord.id);
          }
        }
      }
      return addedRecords;
    });

    return NextResponse.json({ 
      success: true, 
      processed: results.length,
      total: reports.length 
    });

  } catch (error: any) {
    console.error("Revenue ingestion error:", error);
    return NextResponse.json({ error: "Failed to ingest revenue data" }, { status: 500 });
  }
}
