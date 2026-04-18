import { prisma } from "./db";

export async function getUserBalance(userId: string, role: string) {
  try {
    let profileId: string | null = null;

    if (role === "ARTIST") {
      const artist = await prisma.artistProfile.findUnique({
        where: { userId },
        select: { id: true }
      });
      profileId = artist?.id || null;
    } else if (role === "LABEL") {
      const label = await prisma.labelProfile.findUnique({
        where: { userId },
        select: { id: true }
      });
      profileId = label?.id || null;
    }

    if (!profileId) return { totalRevenue: 0, pendingPayouts: 0, completedPayouts: 0, currentBalance: 0 };

    // 1. Calculate Total Revenue
    const revenueSum = await prisma.revenue.aggregate({
      where: role === "ARTIST" ? { artistId: profileId } : { labelId: profileId },
      _sum: {
        revenueAmount: true
      }
    });

    const totalRevenue = revenueSum._sum.revenueAmount || 0;

    // 2. Calculate Payouts
    const payments = await prisma.payment.groupBy({
      by: ['status'],
      where: { userId },
      _sum: {
        amount: true
      }
    });

    let pendingPayouts = 0;
    let completedPayouts = 0;

    payments.forEach(p => {
      if (p.status === "PENDING" || p.status === "PROCESSING") {
        pendingPayouts += p._sum.amount || 0;
      } else if (p.status === "COMPLETED") {
        completedPayouts += p._sum.amount || 0;
      }
    });

    const currentBalance = totalRevenue - completedPayouts - pendingPayouts;

    return {
      totalRevenue,
      pendingPayouts,
      completedPayouts,
      currentBalance
    };
  } catch (error) {
    console.error("Balance calculation error:", error);
    return { totalRevenue: 0, pendingPayouts: 0, completedPayouts: 0, currentBalance: 0 };
  }
}
