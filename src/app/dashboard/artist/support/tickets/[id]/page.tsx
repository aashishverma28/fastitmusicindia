import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { 
  ArrowLeft, 
  Clock, 
  MessageSquare, 
  Info,
  User,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import TicketMessageThread from "@/components/support/TicketMessageThread";

export default async function ArtistTicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const ticket = await prisma.supportTicket.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
          email: true,
          role: true
        }
      }
    }
  });

  if (!ticket) return notFound();

  // Security: Check if user owns ticket (unless Admin)
  if (session.user.role !== "ADMIN" && ticket.userId !== session.user.id) {
    return redirect("/dashboard/artist/support");
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link 
            href={session.user.role === "ADMIN" ? "/dashboard/admin/support" : "/dashboard/artist/support"} 
            className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-primary transition-all mb-2 inline-flex items-center gap-2"
          >
             <ArrowLeft className="w-3 h-3" /> Back to Support Desk
          </Link>
          <div className="flex items-center gap-4 mb-2">
             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                ticket.status === "OPEN" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                ticket.status === "RESOLVED" ? "bg-primary/10 text-primary border-primary/20" :
                "bg-white/5 text-white/40 border-white/10"
             }`}>
                {ticket.status}
             </span>
             <p className="text-[10px] font-black text-white/20 uppercase tracking-widest italic">{ticket.category} • Ref: {ticket.id.slice(-8).toUpperCase()}</p>
          </div>
          <h1 className="text-4xl font-black font-display text-white tracking-tighter italic">{ticket.subject}</h1>
        </div>

        <div className="flex items-center gap-4">
           {session.user.role === "ADMIN" && (
             <button className="bg-primary text-black px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all">
                Mark Resolved
             </button>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Message Thread */}
         <div className="lg:col-span-2">
            <TicketMessageThread ticketId={ticket.id} />
         </div>

         {/* Ticket Context/Metadata */}
         <div className="space-y-8">
            <h2 className="text-xl font-bold text-white italic">Ticket Context</h2>
            
            <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-8">
               <div className="space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Initial Brief</p>
                     <p className="text-sm text-white/60 font-sans leading-relaxed italic bg-white/5 p-5 rounded-2xl border border-white/5">
                        "{ticket.description}"
                     </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Created On</p>
                        <p className="text-xs font-bold text-white italic">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Urgency</p>
                        <p className={`text-xs font-bold italic ${ticket.priority === 'Urgent' ? 'text-red-500' : 'text-primary'}`}>{ticket.priority}</p>
                     </div>
                  </div>
               </div>

               <div className="h-px w-full bg-white/5"></div>

               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <User className="w-5 h-5 text-white/20" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Respondent</p>
                        <p className="text-sm font-bold text-white">{ticket.user.username}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Assigned Dept</p>
                        <p className="text-sm font-bold text-white italic">Fastit Support Core</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 p-8 rounded-[2.5rem] space-y-4">
               <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-sm font-bold text-white">Guidelines</h3>
               </div>
               <p className="text-xs text-white/40 font-sans leading-relaxed">
                  Do not share passwords or sensitive bank details in the chat. Use the official 'Profile' section for sensitive updates.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
