import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { 
  LifeBuoy, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search,
  Filter,
  User,
  ShieldAlert,
  Archive,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default async function AdminSupportPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const tickets = await prisma.supportTicket.findMany({
    include: {
      user: {
        select: {
          username: true,
          email: true,
          role: true
        }
      }
    },
    orderBy: { createdAt: "desc" },
  });

  const stats = [
    { name: "Total Open", count: tickets.filter(t => t.status === "OPEN").length, color: "text-green-400", bg: "bg-green-400/10" },
    { name: "In Progress", count: tickets.filter(t => t.status === "IN_PROGRESS").length, color: "text-blue-400", bg: "bg-blue-400/10" },
    { name: "Urgent Queue", count: tickets.filter(t => t.priority === "Urgent" && t.status !== "CLOSED").length, color: "text-red-500", bg: "bg-red-500/10" },
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-display text-white tracking-tighter italic"><span className="gradient-text">Master</span> Helpdesk</h1>
          <p className="text-white/40 text-sm font-sans tracking-tight">Global queue management for all partner inquiries and technical escalations.</p>
        </div>
        
        <div className="flex gap-4">
           {stats.map((s) => (
             <div key={s.name} className="glass p-4 px-6 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                   <div className={`w-2 h-2 rounded-full ${s.color.includes('green') ? 'bg-green-400' : s.color.includes('blue') ? 'bg-blue-400' : 'bg-red-500'} animate-pulse`}></div>
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/20">{s.name}</p>
                   <p className={`text-xl font-black text-white`}>{s.count}</p>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass p-2 rounded-[2rem] border border-white/5">
         <div className="flex items-center gap-2 px-6 py-2 flex-grow">
            <Search className="w-4 h-4 text-white/20" />
            <input type="text" placeholder="Search by ticket ID, subject or partner..." className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/10 font-sans" />
         </div>
         <div className="flex items-center gap-2 p-2">
            {["All", "Open", "Assigned", "Resolved"].map((f) => (
              <button key={f} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${f === "All" ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5"}`}>
                {f}
              </button>
            ))}
            <button className="p-2.5 rounded-xl bg-white/5 text-white/40 border border-white/5 hover:text-white transition-all">
               <Filter className="w-4 h-4" />
            </button>
         </div>
      </div>

      {/* Admin Ticket List */}
      <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Ticket / Subject</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Partner</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Priority</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Status</th>
              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-white/20">Engagement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-sans">
            {tickets.length > 0 ? tickets.map((t) => (
              <tr key={t.id} className="group hover:bg-white/[0.02] transition-colors relative">
                <td className="px-8 py-6">
                   <Link href={`/dashboard/admin/support/tickets/${t.id}`} className="absolute inset-0 z-10" />
                   <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                         {t.priority === "Urgent" && <ShieldAlert className="w-4 h-4 text-red-500" />}
                         <p className="font-bold text-white group-hover:text-primary transition-colors">{t.subject}</p>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/20">{t.category} • Ref: {t.id.slice(-6).toUpperCase()}</p>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-black text-[10px] text-white/20">
                         {t.user.username?.[0].toUpperCase() || "U"}
                      </div>
                      <div className="flex flex-col">
                         <p className="text-xs font-bold text-white uppercase tracking-tight">{t.user.username}</p>
                         <p className="text-[10px] text-white/20 font-mono italic">{t.user.role}</p>
                      </div>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <span className={`text-[10px] font-black uppercase tracking-widest ${
                      t.priority === "Urgent" ? "text-red-500" :
                      t.priority === "High" ? "text-orange-500" :
                      "text-white/40"
                   }`}>
                      {t.priority}
                   </span>
                </td>
                <td className="px-8 py-6">
                   <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                      t.status === "OPEN" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                      t.status === "RESOLVED" ? "bg-primary/10 text-primary border-primary/20" :
                      "bg-white/5 text-white/40 border-white/10"
                   }`}>
                      {t.status}
                   </span>
                </td>
                <td className="px-8 py-6 text-right">
                   <div className="flex items-center justify-end gap-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/20">{new Date(t.createdAt).toLocaleDateString()}</p>
                      <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-primary transition-colors translate-x-0 group-hover:translate-x-1" />
                   </div>
                </td>
              </tr>
            )) : (
              <tr>
                 <td colSpan={5} className="px-8 py-32 text-center text-white/10 font-bold italic">The helpdesk queue is currently empty.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
