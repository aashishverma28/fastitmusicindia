"use client";

import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  ChevronRight,
  User,
  MoreVertical
} from "lucide-react";
import Link from "next/link";

export default function SupportTicketList({ tickets }: { tickets: any[] }) {
  if (tickets.length === 0) {
    return (
      <div className="glass p-20 rounded-[3rem] border border-white/5 text-center space-y-4">
         <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <MessageSquare className="w-8 h-8 text-white/10" />
         </div>
         <p className="text-white/40 font-bold italic tracking-tighter">No active support conversations.</p>
      </div>
    );
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "OPEN": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "IN_PROGRESS": return "bg-blue-400/10 text-blue-400 border-blue-400/20";
      case "RESOLVED": return "bg-primary/10 text-primary border-primary/20";
      case "CLOSED": return "bg-white/5 text-white/40 border-white/10";
      default: return "";
    }
  };

  return (
    <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-white/5">
            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Ticket info</th>
            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Status</th>
            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/20">Priority</th>
            <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-white/20">Last Update</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 font-sans">
          {tickets.map((t) => (
            <tr key={t.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer relative">
              <td className="px-8 py-6">
                <Link href={`/dashboard/support/tickets/${t.id}`} className="absolute inset-0 z-10" />
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <p className="text-[10px] font-black text-white/20">ID</p>
                   </div>
                   <div>
                      <h4 className="font-bold text-white group-hover:text-primary transition-colors">{t.subject}</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/20">{t.category}</p>
                   </div>
                </div>
              </td>
              <td className="px-8 py-6">
                 <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${getStatusStyle(t.status)}`}>
                    {t.status}
                 </span>
              </td>
              <td className="px-8 py-6">
                 <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                       t.priority === "Urgent" ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" :
                       t.priority === "High" ? "bg-orange-500" :
                       "bg-green-500"
                    }`}></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{t.priority}</span>
                 </div>
              </td>
              <td className="px-8 py-6 text-right">
                 <div className="flex items-center justify-end gap-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">{new Date(t.createdAt).toLocaleDateString()}</p>
                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-primary transition-colors" />
                 </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
