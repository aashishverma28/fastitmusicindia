"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Settings, Shield, User, Bell, Sparkles } from "lucide-react";

export default function EmployeeSettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"profile" | "preferences">("profile");

  const employeeName = (session?.user as any)?.name || "Staff Member";
  const employeeEmail = session?.user?.email || "staff@fastitmusic.in";
  const employeeRole = (session?.user as any)?.role || "EMPLOYEE";

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase mb-1 text-primary">System</p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight font-display">
          Portal Settings
        </h2>
        <p className="mt-1 text-sm text-white/40">
          Manage your employee account details and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: "profile", label: "Staff Profile", icon: User },
            { id: "preferences", label: "Preferences", icon: Sparkles },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-primary border-transparent text-black"
                  : "bg-black/5 dark:bg-white/5 border-transparent text-white/60 hover:text-white hover:bg-black/10 dark:hover:bg-white/10"
              }`}
            >
              <tab.icon className="w-4 h-4 shrink-0" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === "profile" && (
            <div className="rounded-2xl p-6 md:p-8 border space-y-6" style={{ background: "var(--card-bg)", borderColor: "var(--glass-border)" }}>
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-black bg-gradient-to-r from-primary to-secondary">
                  {employeeName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">{employeeName}</h3>
                  <p className="text-xs text-white/40">{employeeEmail}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/45">Department</span>
                  <div className="p-3.5 rounded-xl text-sm text-white/70 border" style={{ background: "var(--background)", borderColor: "var(--glass-border)" }}>
                    Engineering & Operations
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/45">Job Role</span>
                  <div className="p-3.5 rounded-xl text-sm text-white/70 border" style={{ background: "var(--background)", borderColor: "var(--glass-border)" }}>
                    Portal Officer
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/45">Access Permissions</span>
                  <div className="p-3.5 rounded-xl text-sm text-white/70 border flex items-center gap-2" style={{ background: "var(--background)", borderColor: "var(--glass-border)" }}>
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Level 3 (Read & Write)</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/45">Account Status</span>
                  <div className="p-3.5 rounded-xl text-sm text-white/70 border" style={{ background: "var(--background)", borderColor: "var(--glass-border)" }}>
                    Active & Operational
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="rounded-2xl p-6 md:p-8 border space-y-6" style={{ background: "var(--card-bg)", borderColor: "var(--glass-border)" }}>
              <h3 className="text-lg font-bold text-white font-display border-b border-white/5 pb-4">Interface Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <div>
                    <p className="text-sm font-bold text-white">System Theme</p>
                    <p className="text-xs text-white/40">Toggle portal background color theme</p>
                  </div>
                  <span className="text-xs font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1 rounded-md text-white/70">
                    Dark Only (Restricted)
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <div>
                    <p className="text-sm font-bold text-white">Email Notifications</p>
                    <p className="text-xs text-white/40">Get notified when new application forms are submitted</p>
                  </div>
                  <span className="text-xs font-mono bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-md text-emerald-400">
                    Enabled
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-bold text-white">Telemetry Logs</p>
                    <p className="text-xs text-white/40">Record authentication transactions locally</p>
                  </div>
                  <span className="text-xs font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1 rounded-md text-white/70">
                    Auto-Purge
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
