"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Music, 
  TrendingUp, 
  Users, 
  DollarSign, 
  PlusCircle,
  Settings, 
  LogOut,
  Menu,
  Search,
  ChevronRight,
  Headphones,
  Calendar
} from "lucide-react";
import { useState } from "react";
import NotificationBell from "@/components/layout/NotificationBell";

export default function ArtistDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (status === "loading") return null;

  // Basic role check
  if (!session || session.user.role !== "ARTIST") {
    redirect("/login");
  }

  const menuItems = [
    { name: "Overview", href: "/dashboard/artist", icon: LayoutDashboard },
    { name: "My Releases", href: "/dashboard/artist/releases", icon: Music },
    { name: "Global Analytics", href: "/dashboard/artist/analytics", icon: TrendingUp },
    { name: "Payments", href: "/dashboard/artist/payments", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-[#070707] flex text-white font-sans">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-18"
        } border-r border-white/5 bg-black/40 backdrop-blur-xl transition-all duration-300 flex flex-col z-50`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black italic">f</div>
          {isSidebarOpen && <span className="font-display font-black text-xl tracking-tighter">FASTIT <span className="text-primary">ARTIST</span></span>}
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
            >
              <item.icon className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
              {isSidebarOpen && <span className="font-bold text-sm text-white/60 group-hover:text-white">{item.name}</span>}
            </Link>
          ))}
          
          <Link 
            href="/dashboard/artist/releases/new"
            className={`flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all group ${!isSidebarOpen && "justify-center"}`}
          >
             <PlusCircle className="w-5 h-5 text-primary" />
             {isSidebarOpen && <span className="font-bold text-sm text-primary">New Release</span>}
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <Link href="/dashboard/artist/settings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group">
             <Settings className="w-5 h-5 text-white/40 group-hover:text-white" />
             {isSidebarOpen && <span className="font-bold text-sm text-white/60 group-hover:text-white">Settings</span>}
          </Link>
          <button className="flex items-center gap-3 p-3 w-full rounded-xl hover:bg-red-500/10 group transition-all">
            <LogOut className="w-5 h-5 text-white/40 group-hover:text-red-500" />
            {isSidebarOpen && <span className="font-bold text-sm text-white/60 group-hover:text-white">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md">
          <div className="flex items-center gap-4">
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg text-white/40">
                <Menu className="w-5 h-5" />
             </button>
             <div className="hidden md:flex items-center gap-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">Artist Account</p>
                <div className="h-4 w-px bg-white/10"></div>
                <div className="flex items-center gap-2 text-white/40 text-xs font-bold">
                   <Calendar className="w-3.5 h-3.5" />
                   {new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
                </div>
             </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden lg:flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Live Analytics</span>
             </div>
             <NotificationBell />
             <div className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                   <p className="text-xs font-bold text-white group-hover:text-primary transition-colors">{session.user.username || "Artist Profile"}</p>
                   <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Verified Artist</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-container-high border border-white/10 overflow-hidden flex items-center justify-center font-black text-xs text-primary group-hover:border-primary/50 transition-all">
                   {session.user.username?.[0].toUpperCase() || "A"}
                </div>
             </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar bg-black/5">
          {children}
        </div>
      </main>
    </div>
  );
}
