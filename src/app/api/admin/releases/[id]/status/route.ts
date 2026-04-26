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
    const adminFeedback = formData.get("adminFeedback") as string;

    if (!status || !VALID_STATUSES.includes(status as ReleaseStatus)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Update the release status and feedback in the database
    const updatedRelease = await prisma.release.update({
      where: { id },
      data: { 
        status: status as ReleaseStatus,
        adminFeedback: adminFeedback || null
      },
      include: {
        artist: {
          include: {
            user: true
          }
        },
        label: {
          include: {
            user: true
          }
        }
      }
    });

    // Send email if rejected
    if (status === "REJECTED") {
      console.log("[ADMIN] Release rejected, preparing email...");
      const { sendReleaseRejectionEmail } = await import("@/lib/mail");
      
      let recipientEmail = "";
      let recipientName = "";

      if (updatedRelease.label) {
        recipientEmail = updatedRelease.label.email || updatedRelease.label.user.email;
        recipientName = updatedRelease.label.labelName;
      } else if (updatedRelease.artist) {
        recipientEmail = updatedRelease.artist.user.email;
        recipientName = updatedRelease.artist.stageName;
      }

      console.log("[ADMIN] Recipient:", recipientEmail, "Name:", recipientName);

      if (recipientEmail) {
        const mailResult = await sendReleaseRejectionEmail(
          recipientEmail,
          updatedRelease.title,
          recipientName,
          adminFeedback
        );
        console.log("[ADMIN] Mail result:", mailResult);
      } else {
        console.warn("[ADMIN] No recipient email found for release", id);
      }
    }

    // Redirect back to the details page as a GET request (303 See Other)
    return NextResponse.redirect(new URL(`/dashboard/admin/releases/${id}?updated=true`, request.url), 303);

  } catch (error) {
    console.error("Failed to update release status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
