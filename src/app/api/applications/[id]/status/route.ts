import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import * as bcrypt from "bcryptjs";
import { sendApprovalEmail } from "@/lib/mail";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "EMPLOYEE")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status, adminNotes, rejectionReason } = await req.json();

    const application = await prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // Start a transaction for the entire approval process
    const result = await prisma.$transaction(async (tx) => {
      // 1. Update Application Status
      const updatedApp = await tx.application.update({
        where: { id },
        data: {
          status,
          adminNotes,
          rejectionReason,
          reviewedBy: session.user.email,
          reviewedAt: new Date(),
        },
      });

      let credentials = null;

      // 2. If APPROVED, check/create User and Profile
      if (status === "APPROVED") {
        const data = application.applicantData as any;
        const email = data.email || data.contactEmail;
        
        let user = await tx.user.findUnique({ where: { email } });
        let isNewUser = false;
        let tempPassword = "";
        let username = "";

        if (!user) {
          isNewUser = true;
          // Generate temporary password
          tempPassword = Math.random().toString(36).slice(-10);
          const hashedPassword = await bcrypt.hash(tempPassword, 10);
          const baseName = (data.stageName || data.labelName || email.split("@")[0]).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
          username = `${baseName}@fastitmusic.in`;

          user = await tx.user.create({
            data: {
              email,
              username,
              passwordHash: hashedPassword,
              role: application.type === "ARTIST" ? "ARTIST" : "LABEL",
              isFirstLogin: true,
            },
          });

          // Create Profile based on type
          if (application.type === "ARTIST") {
            await tx.artistProfile.create({
              data: {
                userId: user.id,
                fullName: data.fullName || "TBD",
                stageName: data.stageName || data.fullName || "TBD",
                primaryGenre: data.primaryGenre || "Pop",
                primaryLanguage: data.primaryLanguage || "Hindi",
                phone: data.phone || "TBD",
                city: data.city || "TBD",
                state: data.state || "TBD",
                pincode: data.pincode || "TBD",
              },
            });
          } else {
            await tx.labelProfile.create({
              data: {
                userId: user.id,
                labelName: data.labelName || "Unknown Label",
                contactPersonName: data.contactName || data.fullName || "TBD",
                contactPersonRole: "Owner/Manager",
                email: email,
                phone: data.contactPhone || data.phone || "TBD",
                city: data.city || "TBD",
                state: data.state || "TBD",
                country: "India",
                pincode: data.pincode || "TBD",
                description: data.description || "",
                genreFocus: data.genreFocus || "All",
              },
            });
          }

          // Create Notification
          await tx.notification.create({
            data: {
              userId: user.id,
              type: "APPROVAL",
              title: "Application Approved",
              message: `Your application ${application.applicationId} has been APPROVED. Welcome to Fastit Music!`
            }
          });
        } else {
          // If user exists but credentials haven't been sent successfully before, 
          // we might want to regenerate or just use a known password. 
          // For now, we skip password reset but still queue the email block if needed.
          username = user.username || "";
        }

        // 3. Mark credentials as sent (this will be finalized if transaction completes)
        // We only set this to true if we are about to attempt the email send
        if (!application.credentialsSent || isNewUser) {
          await tx.application.update({
            where: { id },
            data: { credentialsSent: true },
          });

          // Store credentials to send email AFTER transaction
          if (isNewUser) {
            credentials = { email, tempPassword, username };
          }
        }
      }

      return { application: updatedApp, credentials };
    });

    // 4. Send Email AFTER Transaction is committed successfully
    if (result.credentials) {
      const { email, tempPassword, username } = result.credentials;
      console.log(`[AUTH] User created: ${email} | Temporary Password: ${tempPassword}`);
      
      // Fire and forget or await? Safer to await but non-blocking for the user response if desired.
      // Here we await to ensure we catch any errors in logs.
      await sendApprovalEmail(email, tempPassword, username);
    }

    return NextResponse.json({ success: true, application: result.application });
  } catch (error: any) {
    console.error("Status update error:", error);
    return NextResponse.json({ 
      error: "Failed to update status", 
      details: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
}
