import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AlbumIcon, Search, Filter, Building2, MoreVertical } from "lucide-react";

export default async function EmployeeLabelsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "EMPLOYEE") {
    redirect("/staff/login");
  }

  const labels = await prisma.user.findMany({
    where: { role: "LABEL" },
    include: { labelProfile: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#ffd709" }}>Partners</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight" style={{ fontFamily: "Epilogue" }}>
            Record Labels
          </h2>
          <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Manage and view all approved record labels on the platform.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full"
               style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <Search className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />
            <input type="text" placeholder="Search labels..." className="bg-transparent border-none outline-none text-sm w-32" />
          </div>
        </div>
      </div>

      {/* Labels List */}
      <div className="space-y-4">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-bold uppercase tracking-wider"
             style={{ color: "rgba(255,255,255,0.3)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="col-span-5">Label Node</div>
          <div className="col-span-3">Focus Genre</div>
          <div className="col-span-3">Contact</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {labels.length > 0 ? labels.map((label) => (
          <div key={label.id} className="rounded-2xl px-6 py-4 grid grid-cols-12 items-center gap-4 transition-colors group"
               style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="col-span-12 md:col-span-5 flex items-center gap-4">
               <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0"
                    style={{ background: "rgba(255,215,9,0.15)", color: "#ffd709" }}>
                  {(label.labelProfile?.labelName || label.username || label.email)[0].toUpperCase()}
               </div>
               <div>
                  <p className="font-bold text-white text-sm" style={{ fontFamily: "Epilogue" }}>
                     {label.labelProfile?.labelName || label.username}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{label.email}</p>
               </div>
            </div>

            <div className="col-span-6 md:col-span-3">
               <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                     style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
                  {label.labelProfile?.genreFocus || "Multi-Genre"}
               </span>
            </div>

            <div className="col-span-6 md:col-span-3 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
               {label.labelProfile?.contactPersonName || "Unknown Contact"} 
            </div>

            <div className="col-span-12 md:col-span-1 flex justify-end">
               <button className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                     style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>
                  <MoreVertical className="w-4 h-4" />
               </button>
            </div>
          </div>
        )) : (
          <div className="rounded-2xl p-16 text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.08)" }}>
            <Building2 className="w-12 h-12 mx-auto mb-3" style={{ color: "rgba(255,255,255,0.15)" }} />
            <p className="text-white/40 font-bold">No labels registered yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
