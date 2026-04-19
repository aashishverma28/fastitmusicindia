import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    // Update Profile and toggle isFirstLogin
    await prisma.$transaction(async (tx: any) => {
      if (session.user.role === "ARTIST") {
        await tx.artistProfile.update({
          where: { userId: session.user.id },
          data: {
            bio: data.bio,
            instagramUrl: data.instagramUrl,
            spotifyUrl: data.spotifyUrl,
            youtubeUrl: data.youtubeUrl,
            city: data.city,
            state: data.state,
            pincode: data.pincode
          }
        });
      } else if (session.user.role === "LABEL") {
        await tx.labelProfile.update({
          where: { userId: session.user.id },
          data: {
            city: data.city,
            state: data.state,
            pincode: data.pincode,
          }
        });
      }

      await tx.user.update({
        where: { id: session.user.id },
        data: { isFirstLogin: false }
      });
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Onboarding error:", error);
    return NextResponse.json({ error: "Failed to complete onboarding" }, { status: 500 });
  }
}
