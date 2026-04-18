import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notifications = await prisma.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 20
    });

    return NextResponse.json({ success: true, notifications });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
   try {
     const session = await getServerSession(authOptions);
 
     if (!session) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }
 
     const { id } = await req.json();
 
     const notification = await prisma.notification.update({
       where: { id },
       data: { isRead: true }
     });
 
     return NextResponse.json({ success: true, notification });
   } catch (error: any) {
     return NextResponse.json({ error: "Failed to mark as read" }, { status: 500 });
   }
}
