import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
type ReleaseStatus = "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "LIVE" | "REJECTED" | "TAKEN_DOWN";

// In Prisma 7, enums are strings. We use a constant array for build-time safety
// and validation since the generated $Enums object is failing to export on Render.
const VALID_STATUSES: ReleaseStatus[] = [
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "APPROVED",
  "LIVE",
  "REJECTED",
  "TAKEN_DOWN"
];

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || ((session.user as any).role !== "ADMIN" && (session.user as any).role !== "EMPLOYEE")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    
    // Parse form data because the buttons are simple HTML forms
    const formData = await request.formData();
    const status = formData.get("status") as string;

    if (!status || !VALID_STATUSES.includes(status as ReleaseStatus)) {
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
