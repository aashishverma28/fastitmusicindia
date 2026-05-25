import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, roleId, roleTitle, portfolioUrl, pitch } = await req.json();

    if (!name || !email || !roleTitle || !portfolioUrl || !pitch) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const application = await prisma.jobApplication.create({
      data: {
        name,
        email,
        roleId: roleId || null,
        roleTitle,
        portfolioUrl,
        pitch,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating job application:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
