import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "LABEL") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.labelProfile.findUnique({
      where: { userId: session.user.id }
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "LABEL") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    // Only allow specific fields to be updated by the user
    const { 
      labelName, logo, website, description, 
      contactPersonName, contactPersonRole, email, phone, whatsapp,
      instagramUrl, youtubeUrl, twitterUrl, facebookUrl, spotifyUrl, appleMusicUrl,
      bankName, accountHolder, accountNumber, ifscCode, upiId,
      panNumber, gstNumber
    } = body;

    const updatedProfile = await prisma.labelProfile.update({
      where: { userId: session.user.id },
      data: {
        labelName,
        logo,
        website,
        description,
        contactPersonName,
        contactPersonRole,
        email,
        phone,
        whatsapp,
        instagramUrl,
        youtubeUrl,
        twitterUrl,
        facebookUrl,
        spotifyUrl,
        appleMusicUrl,
        bankName,
        accountHolder,
        accountNumber,
        ifscCode,
        upiId,
        panNumber,
        gstNumber,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error: any) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile: " + error.message }, { status: 500 });
  }
}
