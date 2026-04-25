import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { 
  DollarSign, 
  TrendingUp, 
  Files, 
  Download, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  History,
  Building2,
  Users
} from "lucide-react";
import Link from "next/link";
import { getUserBalance } from "@/lib/finances";
import PayoutRequestButton from "@/components/artist/PayoutRequestButton"; // Reusable for labels too

export default async function LabelRoyaltiesPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "LABEL") {
    redirect("/login");
  }

  const balanceInfo = await getUserBalance(session.user.id, session.user.role);

  const payments = await prisma.payment.findMany({
    where: { userId: session.user.id },
    orderBy: { requestedAt: "desc" }
  });

  const stats = [
    { name: "Current Balance", value: `₹${balanceInfo.currentBalance.toLocaleString()}`, icon: DollarSign, color: "text-secondary", bg: "bg-secondary/20" },
    { name: "Total Generated", value: `₹${balanceInfo.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-primary", bg: "bg-primary/20" },
    { name: "Commission Payouts", value: `₹${balanceInfo.completedPayouts.toLocaleString()}`, icon: Building2, color: "text-blue-400", bg: "bg-blue-400/20" },
    { name: "Pending Settlement", value: `₹${balanceInfo.pendingPayouts.toLocaleString()}`, icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/20" },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-display text-white tracking-tighter italic">Royalties & <span className="text-secondary">Settle</span></h1>
          <p className="text-white/40 text-sm font-sans tracking-tight">Consolidated financial statements and payout management for your entire roster.</p>
        </div>
        <PayoutRequestButton balance={balanceInfo.currentBalance} />
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-4 shadow-2xl shadow-black">
             <div className="flex items-center justify-between">
                <div className={`p-4 rounded-2xl ${stat.bg}`}>
                   <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/5"></div>
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{stat.name}</p>
                <h3 className="text-3xl font-black text-white italic tracking-tighter">{stat.value}</h3>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Monthly Statements */}
          <div className="lg:col-span-12 xl:col-span-8 space-y-6">
             <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                   <Files className="w-5 h-5 text-secondary" /> Financial Statements
                </h2>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40">
                   <Calendar className="w-4 h-4" /> Statements Archive
                </div>
             </div>
 
             <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
                {payments.length > 0 ? (
                  <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/5">
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Period</th>
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Status</th>
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Amount</th>
                          <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-white/20">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-sans">
                        {payments.map((item, i) => (
                          <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                              <td className="px-8 py-6">
                                <p className="text-sm font-bold text-white uppercase tracking-tight">{new Date(item.requestedAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
                                <p className="text-[10px] font-black text-secondary tracking-widest uppercase">Verified</p>
                              </td>
                              <td className="px-8 py-6">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                                  item.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                                }`}>
                                  {item.status}
                                </span>
                              </td>
                              <td className="px-8 py-6 font-black text-white italic">
                                ₹{item.amount.toLocaleString()}
                              </td>
                              <td className="px-8 py-6 text-right">
                                <button className="inline-flex items-center gap-2 bg-white/5 px-5 py-2.5 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 hover:bg-secondary/20 hover:text-white hover:border-secondary transition-all">
                                    <Download className="w-4 h-4" /> PDF
                                </button>
                              </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-20 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                      <Files className="w-8 h-8 text-white/20" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-white font-bold italic tracking-tight">No Statements Yet</p>
                      <p className="text-white/20 text-xs font-sans">Your monthly revenue breakdowns will appear here.</p>
                    </div>
                  </div>
                )}
             </div>
          </div>

         {/* Payout Summary / Quick Actions */}
         <div className="xl:col-span-4 space-y-8">
            <h2 className="text-xl font-bold text-white italic">Fulfillment Center</h2>
            <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-8">
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/20 italic">Last Settlement</p>
                     <p className="text-xs font-bold text-green-400">Successfully Paid</p>
                  </div>
                  <div className="bg-black/40 p-6 rounded-3xl border border-white/5 space-y-1">
                     <p className="text-2xl font-black text-white italic tracking-tighter">₹8,500</p>
                     <p className="text-[10px] text-white/20 font-mono tracking-widest uppercase">TXN-77382928372</p>
                  </div>
               </div>

               <div className="h-px w-full bg-white/5"></div>

               <div className="space-y-6">
                  <div className="flex gap-4 group">
                     <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-secondary/20 transition-all">
                        <History className="w-5 h-5 text-white/40 group-hover:text-secondary" />
                     </div>
                     <div className="space-y-1 cursor-pointer">
                        <p className="text-xs font-black text-white uppercase tracking-tighter">Payment Archive</p>
                        <p className="text-[10px] text-white/40 font-sans tracking-tight">View all historical bank transfers and receipts.</p>
                     </div>
                  </div>
                  <div className="flex gap-4 group">
                     <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                        <Files className="w-5 h-5 text-white/40 group-hover:text-primary" />
                     </div>
                     <div className="space-y-1 cursor-pointer">
                        <p className="text-xs font-black text-white uppercase tracking-tighter">Tax Invoices</p>
                        <p className="text-[10px] text-white/40 font-sans tracking-tight">Generate GST compliant invoices for label commissions.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

// Fixed missing import
import { Calendar } from "lucide-react";
