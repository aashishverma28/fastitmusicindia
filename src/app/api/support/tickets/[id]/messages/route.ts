import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const messages = await prisma.ticketMessage.findMany({
      where: { ticketId: id },
      include: {
        sender: {
          select: {
            username: true,
            role: true
          }
        }
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, attachments } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message content required" }, { status: 400 });
    }

    const newMessage = await prisma.ticketMessage.create({
      data: {
        ticketId: id,
        senderId: session.user.id,
        message,
        attachments: attachments || null,
      }
    });

    // Create a notification for the recipient
    const ticket = await prisma.supportTicket.findUnique({
       where: { id }
    });

    if (ticket && session.user.role === "ADMIN") {
      await prisma.notification.create({
        data: {
          userId: ticket.userId,
          type: "SUPPORT",
          title: "New Support Reply",
          message: `A staff member has replied to your ticket: ${ticket.subject}`
        }
      });
    } else if (ticket && session.user.role !== "ADMIN") {
       // Optional: Notify Admin on user reply? 
       // For now, only notify User on Admin reply as per plan.
    }
    
    return NextResponse.json({ success: true, message: newMessage });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
