"use client";

import { useState } from "react";
import { Key, Activity, CheckCircle2, AlertCircle } from "lucide-react";

export default function ResetPasswordButton({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (!confirm(`Are you sure you want to reset the password for ${email}? This will email them a new temporary password immediately.`)) {
      return;
    }

    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to reset password");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleReset}
        disabled={loading || status === "success"}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
          status === "success" 
            ? "bg-green-500/10 text-green-500 border border-green-500/20 cursor-not-allowed"
            : status === "error"
            ? "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20"
            : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
        }`}
        title="Reset Password & Email to User"
      >
        {loading ? (
          <Activity className="w-3.5 h-3.5 animate-spin" />
        ) : status === "success" ? (
          <CheckCircle2 className="w-3.5 h-3.5" />
        ) : status === "error" ? (
          <AlertCircle className="w-3.5 h-3.5" />
        ) : (
          <Key className="w-3.5 h-3.5" />
        )}
        {loading ? "Resetting..." : status === "success" ? "Password Sent" : "Reset Password"}
      </button>
      {status === "error" && <span className="text-red-500 text-[10px]">{message}</span>}
    </div>
  );
}
