"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Building2, 
  Music, 
  Users, 
  DollarSign, 
  PlusCircle,
  Settings, 
  LogOut,
  Menu,
  ChevronRight,
  TrendingUp,
  Files,
  Search
} from "lucide-react";
import NotificationBell from "@/components/layout/NotificationBell";
import { useState, useEffect } from "react";

export default function LabelDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [artistCount, setArtistCount] = useState<number | null>(null);

  useEffect(() => {
    if (session) {
      fetch("/api/label/stats")
        .then(res => res.json())
        .then(data => setArtistCount(data.artistCount))
        .catch(() => setArtistCount(0));
    }
  }, [session]);

  if (status === "loading") return null;

  // Basic role check
  if (!session || session.user.role !== "LABEL") {
    redirect("/login");
  }

  const menuItems = [
    { name: "Executive Summary", href: "/dashboard/label", icon: LayoutDashboard },
    { name: "Artist Roster", href: "/dashboard/label/roster", icon: Users },
    { name: "Catalog", href: "/dashboard/label/catalog", icon: Music },
    { name: "Statements", href: "/dashboard/label/statements", icon: Files },
    { name: "Royalties", href: "/dashboard/label/royalties", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-background flex text-foreground font-sans transition-colors duration-200">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-18"
        } border-r border-foreground/5 bg-foreground/[0.01] backdrop-blur-xl transition-all duration-300 flex flex-col z-50`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center font-black italic text-black">l</div>
          {isSidebarOpen && <span className="font-display font-black text-xl tracking-tighter">FASTIT <span className="text-secondary">LABEL</span></span>}
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-foreground/5 transition-all group"
            >
              <item.icon className="w-5 h-5 text-foreground/40 group-hover:text-secondary transition-colors" />
              {isSidebarOpen && <span className="font-bold text-sm text-foreground/60 group-hover:text-white">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-foreground/5 space-y-2">
           <Link href="/dashboard/label/settings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-foreground/5 transition-all group">
             <Settings className="w-5 h-5 text-foreground/40 group-hover:text-foreground" />
             {isSidebarOpen && <span className="font-bold text-sm text-foreground/60 group-hover:text-foreground">Settings</span>}
          </Link>
          <button className="flex items-center gap-3 p-3 w-full rounded-xl hover:bg-red-500/10 group transition-all">
            <LogOut className="w-5 h-5 text-foreground/40 group-hover:text-red-500" />
            {isSidebarOpen && <span className="font-bold text-sm text-foreground/60 group-hover:text-foreground">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-foreground/5 flex items-center justify-between px-8 bg-background/50 backdrop-blur-md">
           <div className="flex items-center gap-4">
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-foreground/5 rounded-lg text-foreground/40">
                <Menu className="w-5 h-5" />
             </button>
             <div className="hidden md:flex items-center gap-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">Label Suite</p>
                <div className="h-4 w-px bg-foreground/10"></div>
                <div className="flex items-center gap-3">
                   <p className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">
                     {artistCount !== null ? `${artistCount} Active ${artistCount === 1 ? 'Artist' : 'Artists'}` : 'Loading Roster...'}
                   </p>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-6">
             <NotificationBell />
             <div className="flex items-center gap-3 group cursor-pointer">
                <div className="text-right hidden sm:block">
                   <p className="text-xs font-bold text-foreground group-hover:text-secondary transition-colors">{session.user.username || "Label Account"}</p>
                   <p className="text-[10px] text-foreground/30 font-black uppercase tracking-widest">Verified Distribution</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-background border border-foreground/10 flex items-center justify-center font-black text-xs text-secondary group-hover:border-secondary/50 transition-all">
                   {session.user.username?.[0].toUpperCase() || "L"}
                </div>
             </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
