import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendJobApplicationStatusUpdate, sendOfferLetterEmail } from "@/lib/mail";

// PATCH - update application status
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    // Get current application to check previous status (optional)
    const currentApp = await prisma.jobApplication.findUnique({
      where: { id },
    });

    if (!currentApp) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    const application = await prisma.jobApplication.update({
      where: { id },
      data: { status },
    });

    // Only send email if status has changed
    if (currentApp.status !== status) {
      try {
        if (status === "VERIFIED") {
          await sendOfferLetterEmail(application.email, application.name, application.roleTitle);
        } else {
          await sendJobApplicationStatusUpdate(application.email, application.name, application.roleTitle, status);
        }
      } catch (mailErr) {
        console.error("Failed to send status update/offer email:", mailErr);
      }
    }

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}

// DELETE - delete a candidate application
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    await prisma.jobApplication.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
  }
}
