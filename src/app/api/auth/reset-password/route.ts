import { NextResponse } from "next/server";
import { prisma as db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Find the user
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Return success anyway to prevent email enumeration
      return NextResponse.json({
        success: true,
        message: "If an account exists, a password reset email has been sent.",
      });
    }

    // Generate a new random password (16 chars)
    const newPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update the user
    await db.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    // Send the email
    const emailResult = await sendPasswordResetEmail(user.email, newPassword, user.username || undefined);

    if (!emailResult.success) {
       console.error("Failed to send reset email", emailResult.error);
       return NextResponse.json(
        { success: false, message: "Failed to send reset email." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "If an account exists, a password reset email has been sent.",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
