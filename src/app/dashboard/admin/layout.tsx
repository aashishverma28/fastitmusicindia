"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  FileCheck, 
  Music, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut,
  Menu,
  X,
  Building2,
  Search
} from "lucide-react";
import NotificationBell from "@/components/layout/NotificationBell";
import { useState } from "react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (status === "loading") return null;

  // Basic role check
  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const menuItems = [
    { name: "Overview",      href: "/dashboard/admin",             icon: LayoutDashboard },
    { name: "Applications",  href: "/dashboard/admin/applications", icon: FileCheck },
    { name: "Releases",      href: "/dashboard/admin/releases",     icon: Music },
    { name: "Artists",       href: "/dashboard/admin/artists",      icon: Users },
    { name: "Labels",        href: "/dashboard/admin/labels",       icon: Building2 },
    { name: "Payments",      href: "/dashboard/admin/payments",     icon: CreditCard },
    { name: "Staff Access",  href: "/dashboard/admin/staff",        icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#070707] flex text-white font-sans">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } border-r border-white/5 bg-black/40 backdrop-blur-xl transition-all duration-300 flex flex-col z-50`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg"></div>
          {isSidebarOpen && <span className="font-display font-black text-xl tracking-tighter">FASTIT <span className="text-primary">ADMIN</span></span>}
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
        </nav>

        <div className="p-4 border-t border-white/5">
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
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg">
                <Menu className="w-5 h-5" />
             </button>
             <div className="hidden md:flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 border-t border-white/10">
                <Search className="w-4 h-4 text-white/40" />
                <input type="text" placeholder="Search anything..." className="bg-transparent border-none outline-none text-xs w-48 placeholder:text-white/20" />
             </div>
          </div>

          <div className="flex items-center gap-6">
             <NotificationBell />
             <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                   <p className="text-xs font-bold text-white">{session.user.email}</p>
                   <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">{session.user.role}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[1px]">
                   <div className="w-full h-full rounded-full bg-surface items-center justify-center flex font-black text-xs">
                      {session.user.email?.[0].toUpperCase()}
                   </div>
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
