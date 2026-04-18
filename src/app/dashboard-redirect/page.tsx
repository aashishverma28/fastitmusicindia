"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Activity } from "lucide-react";

export default function DashboardRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    const role = session.user.role;

    if (role === "ADMIN") {
      router.push("/dashboard/admin");
    } else if (role === "LABEL") {
      router.push("/dashboard/label");
    } else if (role === "EMPLOYEE") {
      router.push("/dashboard/employee");
    } else {
      router.push("/dashboard/artist");
    }
  }, [session, status, router]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
      <Activity className="w-12 h-12 text-primary animate-sonic" />
      <p className="text-white/60 font-bold tracking-widest animate-pulse">
        REDIRECTING TO YOUR DASHBOARD...
      </p>
    </div>
  );
}
