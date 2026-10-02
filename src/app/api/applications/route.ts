import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

function generateAppId(type: "ARTIST" | "LABEL") {
  const prefix = type === "ARTIST" ? "FMI-ART" : "FMI-LAB";
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  return `${prefix}-${randomChars}${timestamp}`;
}

export async function POST(req: Request) {
  await headers();
  try {
    const body = await req.json();
    const { type, applicantData } = body;

    if (!type || !applicantData) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (type === "ARTIST") {
      const {
        fullName,
        stageName,
        email,
        phone,
        primaryGenre,
        primaryLanguage,
        socialLinks,
        idType,
        idNumber,
        idFileUrl,
        bankName,
        accountNumber,
        ifscCode,
        upiId,
      } = applicantData;

      const missingFields: string[] = [];
      if (!fullName || typeof fullName !== "string" || !fullName.trim()) missingFields.push("Full Name");
      if (!stageName || typeof stageName !== "string" || !stageName.trim()) missingFields.push("Stage Name");
      if (!email || typeof email !== "string" || !email.trim()) missingFields.push("Email");
      if (!phone || typeof phone !== "string" || !phone.trim()) missingFields.push("Phone");
      if (!primaryGenre || typeof primaryGenre !== "string" || !primaryGenre.trim()) missingFields.push("Primary Genre");
      if (!primaryLanguage || typeof primaryLanguage !== "string" || !primaryLanguage.trim()) missingFields.push("Primary Language");
      // Note: Spotify URL is optional for artists who are not yet on Spotify
      if (!socialLinks?.instagram || typeof socialLinks.instagram !== "string" || !socialLinks.instagram.trim()) missingFields.push("Instagram URL");
      if (!socialLinks?.youtube || typeof socialLinks.youtube !== "string" || !socialLinks.youtube.trim()) missingFields.push("YouTube URL");
      if (!idType || typeof idType !== "string" || !idType.trim()) missingFields.push("ID Type");
      if (!idNumber || typeof idNumber !== "string" || !idNumber.trim()) missingFields.push("ID Document Number");
      if (!idFileUrl || typeof idFileUrl !== "string" || !idFileUrl.trim()) missingFields.push("ID Document File");
      if (!bankName || typeof bankName !== "string" || !bankName.trim()) missingFields.push("Bank Name");
      if (!accountNumber || typeof accountNumber !== "string" || !accountNumber.trim()) missingFields.push("Account Number");
      if (!ifscCode || typeof ifscCode !== "string" || !ifscCode.trim()) missingFields.push("IFSC Code");
      if (!upiId || typeof upiId !== "string" || !upiId.trim()) missingFields.push("UPI ID");

      if (missingFields.length > 0) {
        return NextResponse.json(
          { error: `Every detail in the artist application is mandatory. Missing: ${missingFields.join(", ")}` },
          { status: 400 }
        );
      }
    }

    if (type === "LABEL") {
      const {
        labelName,
        genreFocus,
        description,
        contactName,
        contactEmail,
        contactPhone,
        businessType,
        panNumber,
        panCardUrl,
        accountHolder,
        bankName,
        ifscCode,
        accountNumber,
      } = applicantData;

      const missingFields: string[] = [];
      if (!labelName || typeof labelName !== "string" || !labelName.trim()) missingFields.push("Label Name");
      if (!genreFocus || typeof genreFocus !== "string" || !genreFocus.trim()) missingFields.push("Genre Focus");
      if (!description || typeof description !== "string" || !description.trim()) missingFields.push("Label Description");
      if (!contactName || typeof contactName !== "string" || !contactName.trim()) missingFields.push("Contact Person Name");
      if (!contactEmail || typeof contactEmail !== "string" || !contactEmail.trim()) missingFields.push("Official Email");
      if (!contactPhone || typeof contactPhone !== "string" || !contactPhone.trim()) missingFields.push("Phone Number");
      if (!businessType || typeof businessType !== "string" || !businessType.trim()) missingFields.push("Business Type");
      if (!panNumber || typeof panNumber !== "string" || !panNumber.trim()) missingFields.push("Business PAN Number");
      if (!panCardUrl || typeof panCardUrl !== "string" || !panCardUrl.trim()) missingFields.push("PAN Card Document Upload");
      if (!accountHolder || typeof accountHolder !== "string" || !accountHolder.trim()) missingFields.push("Account Holder Name");
      if (!bankName || typeof bankName !== "string" || !bankName.trim()) missingFields.push("Bank Name");
      if (!ifscCode || typeof ifscCode !== "string" || !ifscCode.trim()) missingFields.push("IFSC Code");
      if (!accountNumber || typeof accountNumber !== "string" || !accountNumber.trim()) missingFields.push("Account Number");
      // Note: website, regNumber (CIN), and incorpCertUrl are explicitly optional

      if (missingFields.length > 0) {
        return NextResponse.json(
          { 
            error: `Every detail in the label application is mandatory (except Incorporation Cert, CIN/Reg Number, and Website URL). Missing: ${missingFields.join(", ")}` 
          },
          { status: 400 }
        );
      }
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
