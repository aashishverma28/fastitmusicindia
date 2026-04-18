import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const start = Date.now();
  try {
    // Ping the database with a lightweight query
    await prisma.$queryRaw`SELECT 1`;
    
    const duration = Date.now() - start;
    
    return NextResponse.json({
      status: "online",
      message: "Backend and Database are warm.",
      latency: `${duration}ms`,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error: any) {
    console.error("Keep-alive failure:", error);
    return NextResponse.json({
      status: "error",
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
