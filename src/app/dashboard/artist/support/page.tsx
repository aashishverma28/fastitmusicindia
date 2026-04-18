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
  Plus,
  Search,
  ChevronRight,
  ShieldQuestion,
  Headphones,
  Bug
} from "lucide-react";
import Link from "next/link";
import SupportTicketList from "@/components/support/SupportTicketList";
import NewTicketButton from "@/components/support/NewTicketButton";

export default async function ArtistSupportPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ARTIST") {
    redirect("/login");
  }

  const tickets = await prisma.supportTicket.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const faqs = [
    { q: "How long does distribution take?", a: "Typically 2-5 business days across all platforms." },
    { q: "When are royalties paid?", a: "Monthly, after the 15th of each month for the previous period." },
    { q: "Can I edit a live release?", a: "Yes, submit a 'Metadata Edit' ticket below." },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-display text-white tracking-tighter italic"><span className="gradient-text">Help</span> Desk</h1>
          <p className="text-white/40 text-sm font-sans tracking-tight">Direct access to the Fastit technical and legal support team.</p>
        </div>
        <NewTicketButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Active Tickets Queue */}
         <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between px-2">
               <h2 className="text-xl font-bold text-white flex items-center gap-3 italic">
                  <MessageSquare className="w-5 h-5 text-primary" /> My Conversations
               </h2>
               <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40">
                  {tickets.length} Saved Requests
               </div>
            </div>

            <SupportTicketList tickets={tickets} />
         </div>

         {/* Knowledge Base & FAQs */}
         <div className="lg:col-span-4 space-y-8">
            <h2 className="text-xl font-bold text-white italic">Knowledge Base</h2>
            <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-8">
               <div className="space-y-6">
                  {faqs.map((faq, i) => (
                    <div key={i} className="group cursor-pointer">
                       <p className="text-xs font-black text-white uppercase tracking-tighter group-hover:text-primary transition-colors flex items-center justify-between">
                          {faq.q} <ChevronRight className="w-4 h-4 text-white/10" />
                       </p>
                       <p className="text-[10px] text-white/40 font-sans mt-1 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
               </div>

               <div className="h-px w-full bg-white/5"></div>

               <div className="grid grid-cols-1 gap-4">
                  {[
                    { t: "Legal Assistance", icon: ShieldQuestion, color: "text-blue-400" },
                    { t: "Platform Support", icon: Headphones, color: "text-secondary" },
                    { t: "Bug Reporting", icon: Bug, color: "text-primary" }
                  ].map((cat) => (
                    <div key={cat.t} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-white/5">
                       <cat.icon className={`w-5 h-5 ${cat.color}`} />
                       <span className="text-[10px] font-black text-white uppercase tracking-widest">{cat.t}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-transparent p-8 rounded-[2.5rem] border border-white/5 space-y-4">
               <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                  <LifeBuoy className="w-6 h-6 text-primary" />
               </div>
               <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Premier Support</h3>
               <p className="text-xs text-white/40 font-sans leading-relaxed">
                  As a verified Fastit partner, you have priority access. Our average response time is **under 12 hours**.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
