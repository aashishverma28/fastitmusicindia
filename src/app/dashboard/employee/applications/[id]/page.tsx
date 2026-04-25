import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { 
  ArrowLeft, User, Music, ShieldCheck, CreditCard, 
  FileText, Mail, Phone, Globe, Building2, AlertTriangle
} from "lucide-react";
import Link from "next/link";
import ApplicationStatusActions from "@/components/admin/ApplicationStatusActions";
import ResetPasswordButton from "@/components/admin/ResetPasswordButton";

export default async function EmployeeApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "EMPLOYEE") {
    redirect("/staff/login");
  }

  const application = await prisma.application.findUnique({
    where: { id }
  });

  if (!application) {
    notFound();
  }

  // Fetch user if approved
  let linkedUser = null;
  const data = application.applicantData as any;
  if (application.status === "APPROVED") {
    linkedUser = await prisma.user.findUnique({
      where: { email: data.email || data.contactEmail }
    });
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4">
          <Link 
            href="/dashboard/employee/applications" 
            className="flex items-center gap-2 text-sm font-bold transition-colors"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Registry
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ fontFamily: "Epilogue" }}>
              Application Review
            </h1>
            <span className="text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider"
                  style={application.type === "ARTIST" 
                    ? { background: "rgba(255,136,182,0.1)", color: "#ff88b6", border: "1px solid rgba(255,136,182,0.2)" } 
                    : { background: "rgba(255,215,9,0.1)", color: "#ffd709", border: "1px solid rgba(255,215,9,0.2)" }}>
              {application.applicationId}
            </span>
          </div>
        </div>

        <ApplicationStatusActions application={application} />
      </div>

      {/* Account Info if Approved */}
      {application.status === "APPROVED" && linkedUser && (
        <div className="rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-500"
             style={{ background: "rgba(255,136,182,0.05)", border: "1px solid rgba(255,136,182,0.1)" }}>
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black"
                   style={{ background: "rgba(255,136,182,0.15)", color: "#ff88b6" }}>
                 {linkedUser.username ? linkedUser.username[0].toUpperCase() : linkedUser.email[0].toUpperCase()}
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "rgba(255,136,182,0.6)" }}>Account Issued</p>
                 <h2 className="text-2xl font-black text-white italic" style={{ fontFamily: "Epilogue" }}>
                   @{linkedUser.username || linkedUser.email.split('@')[0]}
                 </h2>
                 <p className="text-sm text-white/40">{linkedUser.email}</p>
              </div>
           </div>
           <div className="flex flex-col items-end gap-2">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Security Controls</p>
              <ResetPasswordButton email={linkedUser.email} />
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="xl:col-span-2 space-y-6">
          <div className="rounded-[2rem] p-8 md:p-10 border space-y-10" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}>
             {/* Section 1: Identity */}
             <section className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,136,182,0.15)" }}>
                      <User className="w-5 h-5 text-[#ff88b6]" />
                   </div>
                   <h2 className="text-xl font-bold" style={{ fontFamily: "Epilogue" }}>Identity Details</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Legal Full Name</p>
                      <p className="text-lg font-bold">{data.fullName || data.contactName}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>{application.type === "ARTIST" ? "Stage Name" : "Label Name"}</p>
                      <p className="text-lg font-bold">{data.stageName || data.labelName}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Email Address</p>
                      <div className="flex items-center gap-2 text-white/60">
                         <Mail className="w-4 h-4" />
                         <span className="font-bold">{data.email || data.contactEmail}</span>
                      </div>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Phone Number</p>
                      <div className="flex items-center gap-2 text-white/60">
                         <Phone className="w-4 h-4" />
                         <span className="font-bold">{data.phone || data.contactPhone}</span>
                      </div>
                   </div>
                </div>
             </section>

             <hr style={{ borderColor: "rgba(255,255,255,0.05)" }} />

             {/* Section 2: Creative / Business */}
             <section className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,215,9,0.15)" }}>
                      {application.type === "ARTIST" ? <Music className="w-5 h-5 text-[#ffd709]" /> : <Building2 className="w-5 h-5 text-[#ffd709]" />}
                   </div>
                   <h2 className="text-xl font-bold" style={{ fontFamily: "Epilogue" }}>{application.type === "ARTIST" ? "Creative Pulse" : "Business Profile"}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {application.type === "ARTIST" ? (
                     <>
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Primary Genre</p>
                           <p className="font-bold text-white">{data.primaryGenre}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Primary Language</p>
                           <p className="font-bold text-white">{data.primaryLanguage}</p>
                        </div>
                        <div className="md:col-span-2 space-y-4">
                           <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Digital Presence</p>
                           <div className="flex flex-wrap gap-4">
                              {data.socialLinks?.spotify && (
                                <Link href={data.socialLinks.spotify} target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                   <Globe className="w-4 h-4 text-white/40" />
                                   <span className="text-xs font-bold">Spotify Artist</span>
                                </Link>
                              )}
                              {data.socialLinks?.instagram && (
                                <Link href={data.socialLinks.instagram} target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                   <Globe className="w-4 h-4 text-white/40" />
                                   <span className="text-xs font-bold">Instagram</span>
                                </Link>
                              )}
                           </div>
                        </div>
                     </>
                   ) : (
                     <>
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Business Type</p>
                           <p className="font-bold text-white">{data.businessType}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Website</p>
                           <p className="font-bold text-white">{data.website || "N/A"}</p>
                        </div>
                     </>
                   )}
                </div>
             </section>

             <hr style={{ borderColor: "rgba(255,255,255,0.05)" }} />

             {/* Section 3: Documents */}
             <section className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(100,200,255,0.15)" }}>
                      <ShieldCheck className="w-5 h-5 text-[#64c8ff]" />
                   </div>
                   <h2 className="text-xl font-bold" style={{ fontFamily: "Epilogue" }}>Verification & KYC</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>ID Type</p>
                      <p className="font-bold text-white">{data.idType || "Corporate ID"}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Document Number</p>
                      <p className="font-bold text-white tracking-widest">{data.idNumber || data.regNumber || data.panNumber}</p>
                   </div>
                    <div className="md:col-span-2 space-y-4">
                       <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Uploaded Documents</p>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {(data.idFileUrl || data.incorpCertUrl || data.panCardUrl) ? (
                            <>
                              {data.idFileUrl && (
                                <Link href={data.idFileUrl} target="_blank" className="flex items-center gap-4 p-5 rounded-2xl transition-all group" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                   <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
                                      <FileText className="w-5 h-5 text-white/60 group-hover:text-[#ff88b6]" />
                                   </div>
                                   <div>
                                      <p className="text-sm font-bold">ID Document</p>
                                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#ff88b6" }}>View File ↗</p>
                                   </div>
                                </Link>
                              )}
                              {data.incorpCertUrl && (
                                <Link href={data.incorpCertUrl} target="_blank" className="flex items-center gap-4 p-5 rounded-2xl transition-all group" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                   <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
                                      <FileText className="w-5 h-5 text-white/60 group-hover:text-[#ffd709]" />
                                   </div>
                                   <div>
                                      <p className="text-sm font-bold">Incorp. Cert</p>
                                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#ffd709" }}>View File ↗</p>
                                   </div>
                                </Link>
                              )}
                              {data.panCardUrl && (
                                <Link href={data.panCardUrl} target="_blank" className="flex items-center gap-4 p-5 rounded-2xl transition-all group" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                   <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
                                      <FileText className="w-5 h-5 text-white/60 group-hover:text-[#64c8ff]" />
                                   </div>
                                   <div>
                                      <p className="text-sm font-bold">PAN Card</p>
                                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#64c8ff" }}>View File ↗</p>
                                   </div>
                                </Link>
                              )}
                            </>
                          ) : (
                            <div className="col-span-2 border border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-2" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                               <AlertTriangle className="w-8 h-8 text-white/10" />
                               <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>No Documents Uploaded</p>
                            </div>
                          )}
                       </div>
                    </div>
                </div>
             </section>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <div className="rounded-[2rem] p-8 border space-y-6" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(74,222,128,0.15)" }}>
                    <CreditCard className="w-4 h-4 text-[#4ade80]" />
                 </div>
                 <h2 className="text-lg font-bold">Financial Details</h2>
              </div>
              <div className="space-y-4">
                 <div className="p-4 rounded-2xl border space-y-1" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Bank Account</p>
                    <p className="text-sm font-black text-white">{data.accountNumber}</p>
                    <p className="text-[10px] font-bold" style={{ color: "rgba(255,255,255,0.4)" }}>{data.bankName} • {data.ifscCode}</p>
                 </div>
                 {data.upiId && (
                   <div className="p-4 rounded-2xl border space-y-1" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }}>
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>UPI Endpoint</p>
                      <p className="text-sm font-black text-white">{data.upiId}</p>
                   </div>
                 )}
              </div>
           </div>

           <div className="rounded-[2rem] p-8 border space-y-6" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}>
              <h2 className="text-lg font-bold">Review Checklist</h2>
              <div className="space-y-3">
                 {[
                   "Verify Legal Name in ID",
                   "Check Digital Footprint",
                   "Validate Bank IFSC Code"
                 ].map((task) => (
                   <div key={task} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded border transition-all" style={{ borderColor: "rgba(255,255,255,0.2)" }}></div>
                      <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>{task}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
