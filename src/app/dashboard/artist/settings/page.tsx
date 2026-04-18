import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { 
  User, 
  Settings, 
  ShieldCheck, 
  CreditCard, 
  Bell, 
  Lock,
  Instagram,
  Music,
  Youtube,
  Globe,
  Mail,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Download,
  FileText,
  AlertTriangle
} from "lucide-react";
import ProfileForm from "@/components/settings/ProfileForm";
import BankForm from "@/components/settings/BankForm";

export default async function ArtistSettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ARTIST") {
    redirect("/login");
  }

  const profile = await prisma.artistProfile.findUnique({
    where: { userId: session.user.id }
  });

  const menuItems = [
    { name: "Public Profile", id: "profile", icon: User },
    { name: "Bank & Financials", id: "bank", icon: CreditCard },
    { name: "Security", id: "security", icon: Lock },
    { name: "Notifications", id: "notifications", icon: Bell },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-display text-white tracking-tighter italic"><span className="gradient-text">Studio</span> Settings</h1>
          <p className="text-white/40 text-sm font-sans tracking-tight">Manage your professional identity and financial configurations.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
           <ShieldCheck className="w-4 h-4 text-green-400" />
           <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Identity Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Settings Sidebar Nav */}
         <div className="lg:col-span-3 space-y-4">
            <div className="glass p-4 rounded-3xl border border-white/5 space-y-2">
               {menuItems.map((item) => (
                 <button 
                  key={item.id}
                  className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all group ${item.id === "profile" ? "bg-primary text-black" : "hover:bg-white/5 text-white/40 hover:text-white"}`}
                 >
                    <item.icon className={`w-5 h-5 ${item.id === "profile" ? "text-black" : "group-hover:text-primary transition-colors"}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.name}</span>
                 </button>
               ))}
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-transparent p-8 rounded-[2rem] border border-white/5 space-y-4">
               <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
               </div>
               <h3 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">Global Roster</h3>
               <p className="text-[10px] text-white/40 font-sans leading-relaxed">
                  Your profile is indexed across all Fastit Music global territories. Ensure your stage name is consistent.
               </p>
            </div>
         </div>

         {/* Settings Form Area */}
         <div className="lg:col-span-9 space-y-10">
            {/* Profile Section */}
            <div className="glass p-10 md:p-16 rounded-[3rem] border border-white/5 space-y-12">
               <div className="space-y-2 pb-6 border-b border-white/5">
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Public <span className="text-primary">DNA</span></h2>
                  <p className="text-xs text-white/40 font-sans">This information is shared with streaming platforms (DSP) as part of your metadata.</p>
               </div>

               <ProfileForm profile={profile} />
            </div>

            {/* Media Kit Section */}
            <div className="glass p-10 md:p-16 rounded-[3rem] border border-white/5 space-y-8 bg-gradient-to-br from-secondary/5 to-transparent">
               <div className="flex items-center justify-between">
                  <div className="space-y-2">
                     <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Media <span className="text-secondary">Kit</span></h2>
                     <p className="text-xs text-white/40 font-sans">Automated professional press kit based on your distribution data.</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center border border-secondary/20">
                     <Sparkles className="w-6 h-6 text-secondary" />
                  </div>
               </div>
               
               <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                     <div className="w-20 h-24 bg-black/40 rounded-xl border border-white/10 flex flex-col items-center justify-center p-4">
                        <p className="text-[8px] font-black text-white/20 uppercase">PDF</p>
                        <FileText className="w-8 h-8 text-secondary mt-2" />
                     </div>
                     <div className="space-y-1">
                        <p className="font-bold text-white uppercase italic text-sm tracking-tight">{profile?.stageName || "Artist"}_EPK_2026.pdf</p>
                        <p className="text-[10px] text-white/20 font-sans">Includes: Bio, Top Tracks, Stream stats, and Social handles.</p>
                     </div>
                  </div>
                  <button className="btn-gradient px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3">
                     <Download className="w-4 h-4" /> Download Kit
                  </button>
               </div>
            </div>

            {/* Security Section (Placeholder) */}
            <div className="glass p-10 md:p-16 rounded-[3rem] border border-white/5 space-y-10">
               <div className="space-y-2 pb-6 border-b border-white/5">
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Security <span className="text-red-500">Core</span></h2>
                  <p className="text-xs text-white/40 font-sans">Credential management and session security protocols.</p>
               </div>

               <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5">
                     <div className="flex items-center gap-4">
                        <Lock className="w-5 h-5 text-white/20" />
                        <div>
                           <p className="text-xs font-bold text-white uppercase tracking-tighter italic">Password Protocol</p>
                           <p className="text-[10px] text-white/20 font-sans">Last changed 45 days ago</p>
                        </div>
                     </div>
                     <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Rotate Key</button>
                  </div>

                  <div className="flex items-center justify-between p-6 rounded-3xl bg-red-500/5 border border-red-500/10">
                     <div className="flex items-center gap-4">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <div>
                           <p className="text-xs font-bold text-red-500 uppercase tracking-tighter italic">Termination</p>
                           <p className="text-[10px] text-white/20 font-sans">Permanently delete your partner account and catalog</p>
                        </div>
                     </div>
                     <button className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">Close Account</button>
                  </div>
               </div>
            </div>

            {/* Bank Section Placeholder (Locked for Demo) */}
            <div className="glass p-10 md:p-16 rounded-[3rem] border border-white/5 space-y-8 opacity-50 grayscale pointer-events-none">
               <div className="flex items-center justify-between overflow-hidden">
                  <div className="space-y-2">
                     <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Treasury <span className="text-primary">Vault</span></h2>
                     <p className="text-xs text-white/40 font-sans">Payout channels and verified banking instruments.</p>
                  </div>
                  <div className="flex items-center gap-2 bg-yellow-500/10 px-4 py-2 rounded-xl border border-yellow-500/20 scale-75">
                     <Lock className="w-4 h-4 text-yellow-500" />
                     <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest italic">Encrypted</span>
                  </div>
               </div>
               
               <BankForm profile={profile} />
            </div>
         </div>
      </div>
    </div>
  );
}
