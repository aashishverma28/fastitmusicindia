"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/staff/login");
    } else if (status === "authenticated" && (session.user as any).role !== "EMPLOYEE") {
      router.push("/login");
    }
  }, [status, session, router]);

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0e0e0e" }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#ff88b6", borderTopColor: "transparent" }} />
      </div>
    );
  }

  return <>{children}</>;
}
