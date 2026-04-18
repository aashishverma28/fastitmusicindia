import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { nanoid } from "nanoid"; // I should check if nanoid is installed, or use a custom generator

function generateAppId(type: "ARTIST" | "LABEL") {
  const prefix = type === "ARTIST" ? "FMI-ART" : "FMI-LAB";
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  return `${prefix}-${randomChars}${timestamp}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, applicantData } = body;

    if (!type || !applicantData) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const email = applicantData.email || applicantData.contactEmail;
    const phone = applicantData.phone || applicantData.contactPhone;

    // 1. Check if User already exists (Only if email is valid)
    if (email) {
      const existingUser = await prisma.user.findUnique({
         where: { email }
      });

      if (existingUser) {
         return NextResponse.json(
           { error: "This email is already registered and active. Please log in." },
           { status: 400 }
         );
      }
    }

    // 2. Check for duplicate pending application (Only for non-empty values)
    const orConditions: any[] = [];
    if (email && email.trim() !== "") {
      orConditions.push({ applicantData: { path: ["email"], equals: email } });
      orConditions.push({ applicantData: { path: ["contactEmail"], equals: email } });
    }
    if (phone && phone.trim() !== "") {
      orConditions.push({ applicantData: { path: ["phone"], equals: phone } });
      orConditions.push({ applicantData: { path: ["contactPhone"], equals: phone } });
    }

    if (orConditions.length > 0) {
      const existingApp = await prisma.application.findFirst({
        where: {
          status: { in: ["NEW", "UNDER_REVIEW"] }, // Only block if still pending
          OR: orConditions,
        },
      });

      if (existingApp) {
        return NextResponse.json(
          { error: "An application with this email or phone is already under review." },
          { status: 400 }
        );
      }
    }

    const applicationId = generateAppId(type);

    const application = await prisma.application.create({
      data: {
        applicationId,
        type,
        applicantData,
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      applicationId: application.applicationId,
      status: application.status,
    });
  } catch (error: any) {
    console.error("Critical: Application submission failure");
    console.error("Error Code:", error.code);
    console.error("Message:", error.message);
    
    return NextResponse.json(
      { error: `Database Error: ${error.message}` },
      { status: 500 }
    );
  }
}
