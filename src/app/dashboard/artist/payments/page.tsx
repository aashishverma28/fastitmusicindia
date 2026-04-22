import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getUserBalance } from "@/lib/finances";
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  XCircle,
  CreditCard,
  Building2,
  AlertCircle,
  ArrowDownCircle,
  History,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import PayoutRequestButton from "@/components/artist/PayoutRequestButton";
import EmptyState from "@/components/shared/EmptyState";

export default async function ArtistPaymentsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ARTIST") {
    redirect("/login");
  }

  const balanceInfo = await getUserBalance(session.user.id, session.user.role);

  const payments = await prisma.payment.findMany({
    where: { userId: session.user.id },
    orderBy: { requestedAt: "desc" }
  });

  const cards = [
    { name: "Available Balance", value: `₹${balanceInfo.currentBalance.toLocaleString()}`, icon: DollarSign, color: "text-primary", bg: "bg-primary/20 shadow-[0_0_30px_rgba(255,136,182,0.1)]" },
    { name: "Lifetime Earnings", value: `₹${balanceInfo.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-400/20" },
    { name: "Withdrawn Total", value: `₹${balanceInfo.completedPayouts.toLocaleString()}`, icon: ArrowDownCircle, color: "text-green-400", bg: "bg-green-400/20" },
    { name: "Pending Process", value: `₹${balanceInfo.pendingPayouts.toLocaleString()}`, icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/20" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-display text-white tracking-tighter italic">Ledger & <span className="gradient-text">Earnings</span></h1>
          <p className="text-white/40 text-sm font-sans tracking-tight">Track your royalties and request secure payouts directly to your bank account.</p>
        </div>
        <PayoutRequestButton balance={balanceInfo.currentBalance} />
      </div>

      {/* Financial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.name} className={`glass p-8 rounded-[2rem] border border-white/5 space-y-4 hover:border-white/10 transition-all group`}>
             <div className="flex items-center justify-between">
                <div className={`p-4 rounded-2xl ${card.bg}`}>
                   <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-primary transition-colors"></div>
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">{card.name}</p>
                <h3 className="text-3xl font-black text-white">{card.value}</h3>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment History */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-3 italic">
                 <History className="w-5 h-5 text-primary" /> Transaction History
              </h2>
           </div>

           {payments.length === 0 ? (
             <EmptyState 
                icon={History}
                title="No Transactions"
                description="Your financial ledger is clear. Transactions will appear here once you initiate a payout protocol."
             />
           ) : (
             <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-white/5">
                         <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Date</th>
                         <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Method</th>
                         <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Status</th>
                         <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-white/20">Amount</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5 font-sans">
                      {payments.map((p: any) => (
                         <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-8 py-5">
                               <p className="text-sm font-bold text-white">{new Date(p.requestedAt).toLocaleDateString()}</p>
                               <p className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">ID: {p.id.slice(-8)}</p>
                            </td>
                            <td className="px-8 py-5">
                               <div className="flex items-center gap-2 text-white/60">
                                  {p.method === "bank" ? <Building2 className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                                  <span className="text-xs font-bold uppercase tracking-widest">{p.method}</span>
                                </div>
                            </td>
                            <td className="px-8 py-5">
                               <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                                  p.status === "COMPLETED" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                  p.status === "FAILED" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                  "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                               }`}>
                                  {p.status}
                               </span>
                            </td>
                            <td className="px-8 py-5 text-right font-black text-white">
                               ₹{p.amount.toLocaleString()}
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
           )}
        </div>

        {/* Financial Rules */}
        <div className="space-y-6">
           <h2 className="text-xl font-bold text-white italic">Payment Guardrails</h2>
           <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <div className="space-y-6">
                 {[
                    { t: "Minimum Threshold", d: "You must reach ₹1,000 to initiate a payout request.", icon: CheckCircle2 },
                    { t: "Processing Time", d: "Standard bank transfers take 3-5 business days to clear.", icon: Clock },
                    { t: "Account Verification", d: "Payouts are only sent to verified bank accounts in your profile.", icon: ShieldCheck }
                 ].map((rule) => (
                    <div key={rule.t} className="flex gap-4">
                       <rule.icon className="w-5 h-5 text-primary flex-shrink-0" />
                       <div className="space-y-1">
                          <p className="text-xs font-black text-white uppercase tracking-tighter">{rule.t}</p>
                          <p className="text-xs text-white/40 font-sans leading-relaxed">{rule.d}</p>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-3xl border border-white/5 space-y-3">
                 <p className="text-[10px] font-black text-white/40 uppercase tracking-widest text-center">Last Report Cycle</p>
                 <p className="text-2xl font-black text-white text-center italic tracking-tighter">{new Date().toLocaleString(undefined, {month: 'long', year: 'numeric'})}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
