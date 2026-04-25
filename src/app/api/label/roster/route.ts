import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "LABEL") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const label = await prisma.labelProfile.findUnique({
      where: { userId: session.user.id }
    });

    if (!label) {
      return NextResponse.json({ error: "Label not found" }, { status: 404 });
    }

    // Get artists: 
    // 1. Directly signed to the label
    // 2. Or have releases under this label
    const artists = await prisma.artistProfile.findMany({
      where: {
        OR: [
          { labelId: label.id },
          { releases: { some: { labelId: label.id } } }
        ]
      },
      select: {
        id: true,
        stageName: true,
        fullName: true,
        isVerified: true,
        createdAt: true,
        user: {
          select: {
            username: true,
            email: true
          }
        },
        _count: {
          select: {
            releases: {
              where: { labelId: label.id }
            }
          }
        },
        revenues: {
          where: { labelId: label.id },
          select: {
            streams: true,
            revenueAmount: true
          }
        }
      }
    });

    // Format data for the frontend
    const formattedArtists = artists.map(artist => {
      const totalStreams = artist.revenues.reduce((acc, rev) => acc + rev.streams, 0);
      const totalRevenue = artist.revenues.reduce((acc, rev) => acc + rev.revenueAmount, 0);
      
      return {
        id: artist.id,
        stageName: artist.stageName,
        fullName: artist.fullName,
        username: artist.user.username || artist.user.email.split('@')[0],
        email: artist.user.email,
        isVerified: artist.isVerified,
        releaseCount: artist._count.releases,
        streams: totalStreams,
        revenue: totalRevenue,
        joinedAt: artist.createdAt
      };
    });

    return NextResponse.json({ artists: formattedArtists });
  } catch (error) {
    console.error("Roster fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "LABEL") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { stageName, email, fullName, password } = await req.json();

    if (!stageName || !email || !fullName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const label = await prisma.labelProfile.findUnique({
      where: { userId: session.user.id }
    });

    if (!label) return NextResponse.json({ error: "Label not found" }, { status: 404 });

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      // If user exists, check if they have an artist profile
      let artistProfile = await prisma.artistProfile.findUnique({ where: { userId: existingUser.id } });
      
      if (artistProfile) {
        // Link existing artist to this label if not already linked
        if (artistProfile.labelId && artistProfile.labelId !== label.id) {
          return NextResponse.json({ error: "Artist is already signed to another label" }, { status: 400 });
        }
        
        await prisma.artistProfile.update({
          where: { id: artistProfile.id },
          data: { labelId: label.id }
        });
        
        return NextResponse.json({ success: true, message: "Existing artist added to roster" });
      } else {
        return NextResponse.json({ error: "User exists but is not an artist" }, { status: 400 });
      }
    }

    // Create new user and artist profile
    const hashedPassword = await bcrypt.hash(password || "Fastit123!", 12);
    const username = `${stageName.toLowerCase().replace(/\s+/g, '')}@fastitmusic.in`;

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        passwordHash: hashedPassword,
        role: "ARTIST",
        artistProfile: {
          create: {
            stageName,
            fullName,
            primaryGenre: "Pop", // Default
            primaryLanguage: "Hindi", // Default
            city: "Unknown",
            state: "Unknown",
            pincode: "000000",
            phone: "0000000000",
            labelId: label.id,
            isVerified: true // Auto-verify if added by a label?
          }
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "New artist created and added to roster",
      credentials: {
        username,
        password: password || "Fastit123!"
      }
    });
  } catch (error: any) {
    console.error("Artist creation error:", error);
    return NextResponse.json({ error: "Failed to add artist: " + error.message }, { status: 500 });
  }
}
