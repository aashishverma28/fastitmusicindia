import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ReleaseStatus } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "EMPLOYEE")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    
    // Parse form data because the buttons are simple HTML forms
    const formData = await request.formData();
    const status = formData.get("status") as string;

    if (!status || !Object.values(ReleaseStatus).includes(status as ReleaseStatus)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Update the release status in the database
    await prisma.release.update({
      where: { id },
      data: { status: status as ReleaseStatus }
    });

    // Redirect back to the details page as a GET request (303 See Other)
    return NextResponse.redirect(new URL(`/dashboard/admin/releases/${id}?updated=true`, request.url), 303);

  } catch (error) {
    console.error("Failed to update release status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
