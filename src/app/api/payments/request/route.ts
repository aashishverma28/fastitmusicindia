import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getUserBalance } from "@/lib/finances";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== "ARTIST" && session.user.role !== "LABEL")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, method, notes } = await req.json();

    if (!amount || amount < 1000) {
      return NextResponse.json({ error: "Minimum payout amount is ₹1,000" }, { status: 400 });
    }

    // Check Balance
    const balanceInfo = await getUserBalance(session.user.id, session.user.role);

    if (amount > balanceInfo.currentBalance) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
    }

    // Check for existing pending payments
    const existingPayment = await prisma.payment.findFirst({
      where: {
        userId: session.user.id,
        status: { in: ["PENDING", "PROCESSING"] }
      }
    });

    if (existingPayment) {
      return NextResponse.json({ error: "You already have a payout request in progress." }, { status: 400 });
    }

    // Create Payout Request
    const payment = await prisma.payment.create({
      data: {
        userId: session.user.id,
        amount,
        method, // bank/upi
        status: "PENDING",
      }
    });

    return NextResponse.json({ success: true, payment });

  } catch (error: any) {
    console.error("Payout request error:", error);
    return NextResponse.json({ error: "Failed to submit payout request" }, { status: 500 });
  }
}
