import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowUpRight, 
  User, 
  Building2, 
  CreditCard,
  Search,
  Filter,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import PaymentStatusActions from "@/components/admin/PaymentStatusActions";

export default async function AdminPaymentsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const payments = await prisma.payment.findMany({
    orderBy: { requestedAt: "desc" },
  });

  // Calculate some quick stats
  const totalPending = payments.filter((p: any) => p.status === "PENDING" || p.status === "PROCESSING").reduce((acc: number, p: any) => acc + p.amount, 0);
  const totalPaid = payments.filter((p: any) => p.status === "COMPLETED").reduce((acc: number, p: any) => acc + p.amount, 0);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-display text-white tracking-tighter italic">Treasury <span className="gradient-text">Operations</span></h1>
          <p className="text-white/40 text-sm font-sans tracking-tight">Review and fulfill payout requests from artist and labels.</p>
        </div>
        
        <div className="flex gap-4">
           <div className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                 <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Pending Total</p>
                 <p className="text-xl font-black text-white">₹{totalPending.toLocaleString()}</p>
              </div>
           </div>
           <div className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center">
                 <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Total Disbursed</p>
                 <p className="text-xl font-black text-white">₹{totalPaid.toLocaleString()}</p>
              </div>
           </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass p-2 rounded-[2rem] border border-white/5">
         <div className="flex items-center gap-2 px-6 py-2 flex-grow">
            <Search className="w-4 h-4 text-white/20" />
            <input type="text" placeholder="Search by recipient email or ID..." className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/10 font-sans" />
         </div>
         <div className="flex items-center gap-2 p-2">
            {["All", "Pending", "Completed"].map((f) => (
              <button key={f} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${f === "All" ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5"}`}>
                {f}
              </button>
            ))}
            <button className="p-2.5 rounded-xl bg-white/5 text-white/40 border border-white/5 hover:text-white transition-all">
               <Filter className="w-4 h-4" />
            </button>
         </div>
      </div>

      {/* Payments List */}
      <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Recipient</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Amount</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Method</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Status</th>
              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {payments.length > 0 ? payments.map((p: any) => (
              <tr key={p.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <User className="w-5 h-5 text-white/20" />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-white uppercase tracking-tight">{p.userId}</p>
                        <p className="text-[10px] text-white/40 font-mono italic">Requested {new Date(p.requestedAt).toLocaleDateString()}</p>
                     </div>
                  </div>
                </td>
                <td className="px-8 py-6 font-black text-white text-lg">
                   ₹{p.amount.toLocaleString()}
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-2 text-white/40">
                      {p.method === "bank" ? <Building2 className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                      <span className="text-[10px] font-black uppercase tracking-widest">{p.method}</span>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                      p.status === "COMPLETED" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                      p.status === "FAILED" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                      "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                   }`}>
                      {p.status}
                   </span>
                </td>
                <td className="px-8 py-6 text-right">
                   <PaymentStatusActions payment={p} />
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-8 py-32 text-center text-white/10 font-bold italic">No payout requests in the system.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
