import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status, referenceNumber } = await req.json();

    const payment = await prisma.payment.update({
      where: { id },
      data: {
        status,
        referenceNumber,
        processedAt: status === "COMPLETED" ? new Date() : null,
      }
    });

    if (status === "COMPLETED") {
       await prisma.notification.create({
         data: {
           userId: payment.userId,
           type: "PAYMENT",
           title: "Payout Processed",
           message: `Your payout of ₹${payment.amount.toLocaleString()} has been processed. Ref: ${referenceNumber}`
         }
       });
    }

    return NextResponse.json({ success: true, payment });
  } catch (error: any) {
    console.error("Payment status update error:", error);
    return NextResponse.json({ error: "Failed to update payment status" }, { status: 500 });
  }
}
