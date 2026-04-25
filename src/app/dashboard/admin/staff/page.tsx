"use client";

import { useState, useEffect } from "react";
import { 
  UserPlus, Trash2, ShieldCheck, ShieldOff, Copy, 
  CheckCheck, Eye, EyeOff, RefreshCw, Users, 
  BadgeCheck, AlertTriangle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ResetPasswordButton from "@/components/admin/ResetPasswordButton";

type Employee = {
  id: string;
  email: string;
  username: string | null;
  isActive: boolean;
  createdAt: string;
  employeeProfile: {
    fullName: string;
    department: string;
    jobTitle: string;
    phone: string | null;
    permissions: string;
  } | null;
};

const DEPARTMENTS = ["Engineering", "Operations", "Marketing", "A&R", "Finance", "Support", "Legal", "Management"];
const PERMISSIONS = [
  { value: "read",  label: "Read Only",  desc: "Can view data, no edits" },
  { value: "write", label: "Editor",     desc: "Can view and edit data" },
  { value: "admin", label: "Super Staff",desc: "Full access except admin panel" },
];

function generatePassword() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function StaffAccessPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const [form, setForm] = useState({
    email: "",
    fullName: "",
    department: DEPARTMENTS[0],
    jobTitle: "",
    phone: "",
    permissions: "read",
    password: generatePassword(),
  });

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/employees");
      const data = await res.json();
      setEmployees(data.employees || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to create employee"); return; }
      setSuccess(`✓ Employee ${form.fullName} created. Credentials: ${form.email} / ${form.password}`);
      setShowCreate(false);
      setForm({ email: "", fullName: "", department: DEPARTMENTS[0], jobTitle: "", phone: "", permissions: "read", password: generatePassword() });
      fetchEmployees();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (id: string, isActive: boolean) => {
    await fetch(`/api/admin/employees/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });
    fetchEmployees();
  };

  const deleteEmployee = async (id: string) => {
    await fetch(`/api/admin/employees/${id}`, { method: "DELETE" });
    setConfirmDelete(null);
    fetchEmployees();
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight font-display">Staff Access</h1>
          <p className="text-white/40 text-sm mt-1">Create and manage internal employee portal credentials</p>
        </div>
        <button
          onClick={() => { setShowCreate(true); setError(""); setSuccess(""); }}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(90deg,#ffd709,#ff88b6)", color: "#000" }}
        >
          <UserPlus className="w-4 h-4" /> Create Employee
        </button>
      </div>

      {/* Success banner */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="p-4 rounded-xl flex items-start gap-3 text-sm font-mono"
            style={{ background: "rgba(255,215,9,0.1)", border: "1px solid rgba(255,215,9,0.3)", color: "#ffd709" }}
          >
            <BadgeCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold mb-1">Employee created! Share these credentials securely:</p>
              <p className="text-xs opacity-80 break-all">{success.replace("✓ Employee ", "").split(". Credentials: ").map((s, i) => i === 0 ? s : <><br /><span className="text-white/60">Credentials: {s}</span></>)}</p>
            </div>
            <button onClick={() => copyToClipboard(success.split("Credentials: ")[1] || "", "banner")} className="flex-shrink-0">
              {copiedId === "banner" ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={e => { if (e.target === e.currentTarget) setShowCreate(false); }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-lg rounded-2xl p-8 relative"
              style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <h2 className="text-xl font-black text-white mb-1 font-display">New Employee Account</h2>
              <p className="text-white/40 text-sm mb-6">Credentials will be valid immediately after creation</p>

              {error && (
                <div className="mb-4 p-3 rounded-xl flex items-center gap-2 text-sm"
                     style={{ background: "rgba(255,110,132,0.1)", border: "1px solid rgba(255,110,132,0.25)", color: "#ff6e84" }}>
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />{error}
                </div>
              )}

              <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/40">Full Name *</label>
                    <input value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required
                           placeholder="Riya Sharma"
                           className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                           style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/40">Email *</label>
                    <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} required type="email"
                           placeholder="riya@fastitmusic.in"
                           className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                           style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/40">Department *</label>
                    <select value={form.department} onChange={e => setForm({...form, department: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {DEPARTMENTS.map(d => <option key={d} value={d} style={{ background: "#141414" }}>{d}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/40">Job Title *</label>
                    <input value={form.jobTitle} onChange={e => setForm({...form, jobTitle: e.target.value})} required
                           placeholder="A&R Manager"
                           className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                           style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/40">Phone</label>
                    <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                           placeholder="+91 98765 43210"
                           className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                           style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/40">Permission Level</label>
                    <select value={form.permissions} onChange={e => setForm({...form, permissions: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {PERMISSIONS.map((p: any) => <option key={p.value} value={p.value} style={{ background: "#141414" }}>{p.label} — {p.desc}</option>)}
                    </select>
                  </div>
                </div>

                {/* Generated Password */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/40">Generated Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={form.password}
                      onChange={e => setForm({...form, password: e.target.value})}
                      className="w-full px-4 py-3 pr-20 rounded-xl text-sm text-white outline-none font-mono"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,215,9,0.3)" }}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                      <button type="button" onClick={() => setShowPass(!showPass)}
                              className="p-1.5 rounded-lg transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button type="button" onClick={() => setForm({...form, password: generatePassword()})}
                              className="p-1.5 rounded-lg transition-colors" style={{ color: "#ffd709" }}>
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => copyToClipboard(form.password, "modal")}
                              className="p-1.5 rounded-lg transition-colors" style={{ color: "#ffd709" }}>
                        {copiedId === "modal" ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-white/30">Copy this password before closing. It won't be shown again.</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowCreate(false)}
                          className="flex-1 py-3 rounded-xl text-sm font-bold transition-colors"
                          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting}
                          className="flex-1 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105 disabled:opacity-50 text-black"
                          style={{ background: "linear-gradient(90deg,#ffd709,#ff88b6)" }}>
                    {submitting ? "Creating..." : "Create Account"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
                        className="w-full max-w-sm rounded-2xl p-6 text-center"
                        style={{ background: "#141414", border: "1px solid rgba(255,110,132,0.3)" }}>
              <AlertTriangle className="w-10 h-10 mx-auto mb-3" style={{ color: "#ff6e84" }} />
              <h3 className="text-lg font-black text-white mb-2">Remove Employee?</h3>
              <p className="text-sm text-white/40 mb-6">This will permanently revoke their access and delete their account.</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDelete(null)}
                        className="flex-1 py-3 rounded-xl text-sm font-bold"
                        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>Cancel</button>
                <button onClick={() => deleteEmployee(confirmDelete)}
                        className="flex-1 py-3 rounded-xl text-sm font-bold text-white"
                        style={{ background: "rgba(255,110,132,0.2)", border: "1px solid rgba(255,110,132,0.4)" }}>Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Staff", value: employees.length, color: "#ff88b6" },
          { label: "Active",      value: employees.filter((e: any) => e.isActive).length, color: "#ffd709" },
          { label: "Inactive",    value: employees.filter((e: any) => !e.isActive).length, color: "#ff6e84" },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</p>
            <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Employee list */}
      {loading ? (
        <div className="space-y-3">
          {[0,1,2].map((i: any) => <div key={i} className="rounded-2xl h-20 animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />)}
        </div>
      ) : employees.length === 0 ? (
        <div className="rounded-2xl p-16 text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.08)" }}>
          <Users className="w-12 h-12 mx-auto mb-3" style={{ color: "rgba(255,255,255,0.15)" }} />
          <p className="text-white/40 font-bold">No employees yet</p>
          <p className="text-white/20 text-sm mt-1">Click "Create Employee" to add staff members</p>
        </div>
      ) : (
        <div className="space-y-3">
          {employees.map(emp => (
            <div key={emp.id} className="rounded-2xl px-6 py-4 flex flex-col md:flex-row md:items-center gap-4 transition-colors"
                 style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${emp.isActive ? "rgba(255,255,255,0.06)" : "rgba(255,110,132,0.15)"}` }}>
              {/* Avatar */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black text-black flex-shrink-0"
                   style={{ background: emp.isActive ? "linear-gradient(135deg,#ffd709,#ff88b6)" : "rgba(255,255,255,0.1)" }}>
                {(emp.employeeProfile?.fullName || emp.email).charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-bold text-white text-sm">
                    {emp.employeeProfile?.fullName || "Employee"} 
                    <span className="text-primary/60 font-mono ml-2">@{emp.username || emp.email.split('@')[0]}</span>
                  </p>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(255,215,9,0.1)", color: "#ffd709", border: "1px solid rgba(255,215,9,0.2)" }}>
                    {emp.employeeProfile?.permissions || "read"}
                  </span>
                  {!emp.isActive && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(255,110,132,0.1)", color: "#ff6e84", border: "1px solid rgba(255,110,132,0.2)" }}>
                      Suspended
                    </span>
                  )}
                </div>
                <p className="text-xs mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {emp.email} · {emp.employeeProfile?.jobTitle || "No Title"} · {emp.employeeProfile?.department || "No Dept"}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => copyToClipboard(emp.email, emp.id)}
                  title="Copy email"
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {copiedId === emp.id ? <CheckCheck className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <div className="scale-75 origin-right">
                   <ResetPasswordButton email={emp.email} />
                </div>
                <button
                  onClick={() => toggleStatus(emp.id, emp.isActive)}
                  title={emp.isActive ? "Suspend" : "Reinstate"}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: emp.isActive ? "#ffd709" : "#ff6e84" }}
                >
                  {emp.isActive ? <ShieldCheck className="w-4 h-4" /> : <ShieldOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setConfirmDelete(emp.id)}
                  title="Remove employee"
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: "rgba(255,110,132,0.5)" }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Portal URL callout */}
      <div className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
           style={{ background: "rgba(255,215,9,0.05)", border: "1px solid rgba(255,215,9,0.15)" }}>
        <div className="flex-1">
          <p className="text-sm font-bold text-white mb-0.5">Staff Login URL</p>
          <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
            {typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/staff/login
          </p>
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.25)" }}>
            Share this URL with employees. It is not linked publicly.
          </p>
        </div>
        <button
          onClick={() => copyToClipboard(`${typeof window !== "undefined" ? window.location.origin : ""}/staff/login`, "url")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold flex-shrink-0 transition-colors"
          style={{ background: "rgba(255,215,9,0.1)", color: "#ffd709", border: "1px solid rgba(255,215,9,0.2)" }}
        >
          {copiedId === "url" ? <><CheckCheck className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy URL</>}
        </button>
      </div>
    </div>
  );
}
