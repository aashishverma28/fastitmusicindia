import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { 
  ArrowLeft, 
  User, 
  Music, 
  ShieldCheck, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  XCircle,
  AlertTriangle,
  FileText,
  Mail,
  Phone,
  Globe,
  Building2
} from "lucide-react";
import Link from "next/link";
import ApplicationStatusActions from "@/components/admin/ApplicationStatusActions";
import ResetPasswordButton from "@/components/admin/ResetPasswordButton";

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
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
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4">
          <Link 
            href="/dashboard/admin/applications" 
            className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Queue
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-black font-display text-white tracking-tight italic">
              Review <span className="gradient-text">Application</span>
            </h1>
            <span className={`text-[10px] font-black px-4 py-1.5 rounded-full border ${
              application.type === "ARTIST" ? "bg-primary/10 text-primary border-primary/20" : "bg-secondary/10 text-secondary border-secondary/20"
            }`}>
              {application.applicationId}
            </span>
          </div>
        </div>

        <ApplicationStatusActions application={application} />
      </div>

      {/* Account Info if Approved */}
      {application.status === "APPROVED" && linkedUser && (
        <div className="bg-primary/5 border border-primary/10 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-black text-primary">
                 {linkedUser.username ? linkedUser.username[0].toUpperCase() : linkedUser.email[0].toUpperCase()}
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Account Issued</p>
                 <h2 className="text-2xl font-black text-white italic">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card & Basic Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-10 rounded-[2.5rem] border border-white/5 space-y-10">
             {/* Section 1: Identity */}
             <section className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                   </div>
                   <h2 className="text-xl font-bold text-white">Identity Details</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Legal Full Name</p>
                      <p className="text-lg font-bold text-white">{data.fullName || data.contactName}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{application.type === "ARTIST" ? "Stage Name" : "Label Name"}</p>
                      <p className="text-lg font-bold text-white">{data.stageName || data.labelName}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Email Address</p>
                      <div className="flex items-center gap-2 text-white/60">
                         <Mail className="w-4 h-4" />
                         <span className="font-sans font-bold">{data.email || data.contactEmail}</span>
                      </div>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Phone Number</p>
                      <div className="flex items-center gap-2 text-white/60">
                         <Phone className="w-4 h-4" />
                         <span className="font-sans font-bold">{data.phone || data.contactPhone}</span>
                      </div>
                   </div>
                </div>
             </section>

             <hr className="border-white/5" />

             {/* Section 2: Creative / Business */}
             <section className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                      {application.type === "ARTIST" ? <Music className="w-5 h-5 text-secondary" /> : <Building2 className="w-5 h-5 text-secondary" />}
                   </div>
                   <h2 className="text-xl font-bold text-white">{application.type === "ARTIST" ? "Creative Pulse" : "Business Profile"}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
                   {application.type === "ARTIST" ? (
                     <>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Primary Genre</p>
                           <p className="font-bold text-white">{data.primaryGenre}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Primary Language</p>
                           <p className="font-bold text-white">{data.primaryLanguage}</p>
                        </div>
                        <div className="md:col-span-2 space-y-4">
                           <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Digital Presence</p>
                           <div className="flex flex-wrap gap-4">
                              {data.socialLinks?.spotify && (
                                <Link href={data.socialLinks.spotify} target="_blank" className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5 hover:bg-primary/20 hover:border-primary/20 transition-all group">
                                   <Globe className="w-4 h-4 text-white/40 group-hover:text-primary" />
                                   <span className="text-xs font-bold">Spotify Artist</span>
                                </Link>
                              )}
                              {data.socialLinks?.instagram && (
                                <Link href={data.socialLinks.instagram} target="_blank" className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5 hover:bg-primary/20 hover:border-primary/20 transition-all group">
                                   <Globe className="w-4 h-4 text-white/40 group-hover:text-primary" />
                                   <span className="text-xs font-bold">Instagram</span>
                                </Link>
                              )}
                           </div>
                        </div>
                     </>
                   ) : (
                     <>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Business Type</p>
                           <p className="font-bold text-white">{data.businessType}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Website</p>
                           <p className="font-bold text-white">{data.website || "N/A"}</p>
                        </div>
                        <div className="md:col-span-2 space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Label Vision</p>
                           <p className="text-sm text-white/60 leading-relaxed">{data.description}</p>
                        </div>
                     </>
                   )}
                </div>
             </section>

             <hr className="border-white/5" />

             {/* Section 3: Verification Documents */}
             <section className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-blue-400" />
                   </div>
                   <h2 className="text-xl font-bold text-white">Verification & KYC</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30">ID Type</p>
                      <p className="font-bold text-white">{data.idType || "Corporate ID"}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Document Number</p>
                      <p className="font-bold font-mono text-white tracking-widest">{data.idNumber || data.regNumber || data.panNumber}</p>
                   </div>
                    <div className="md:col-span-2 space-y-4">
                       <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Uploaded Documents</p>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {(data.idFileUrl || data.incorpCertUrl || data.panCardUrl) ? (
                            <>
                              {data.idFileUrl && (
                                <Link 
                                  href={data.idFileUrl} 
                                  target="_blank" 
                                  className="border border-white/5 bg-black/40 rounded-3xl p-6 flex items-center gap-4 hover:border-primary/40 transition-all group"
                                >
                                   <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                                      <FileText className="w-6 h-6 text-primary" />
                                   </div>
                                   <div className="text-left">
                                      <p className="text-sm font-bold text-white">ID Document</p>
                                      <p className="text-[10px] text-primary font-black uppercase tracking-widest">View File ↗</p>
                                   </div>
                                </Link>
                              )}
                              {data.incorpCertUrl && (
                                <Link 
                                  href={data.incorpCertUrl} 
                                  target="_blank" 
                                  className="border border-white/5 bg-black/40 rounded-3xl p-6 flex items-center gap-4 hover:border-secondary/40 transition-all group"
                                >
                                   <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-all">
                                      <FileText className="w-6 h-6 text-secondary" />
                                   </div>
                                   <div className="text-left">
                                      <p className="text-sm font-bold text-white">Incorp. Cert</p>
                                      <p className="text-[10px] text-secondary font-black uppercase tracking-widest">View File ↗</p>
                                   </div>
                                </Link>
                              )}
                              {data.panCardUrl && (
                                <Link 
                                  href={data.panCardUrl} 
                                  target="_blank" 
                                  className="border border-white/5 bg-black/40 rounded-3xl p-6 flex items-center gap-4 hover:border-blue-400/40 transition-all group"
                                >
                                   <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center group-hover:bg-blue-400/20 transition-all">
                                      <FileText className="w-6 h-6 text-blue-400" />
                                   </div>
                                   <div className="text-left">
                                      <p className="text-sm font-bold text-white">PAN Card</p>
                                      <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">View File ↗</p>
                                   </div>
                                </Link>
                              )}
                            </>
                          ) : (
                            <div className="col-span-2 border border-dashed border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-2">
                               <AlertTriangle className="w-8 h-8 text-white/10" />
                               <p className="text-xs font-bold text-white/40 uppercase tracking-widest">No Documents Uploaded</p>
                            </div>
                          )}
                       </div>
                    </div>
                </div>
             </section>
          </div>
        </div>

        {/* Sidebar: Status & Payout */}
        <div className="space-y-8">
           {/* Payout Card */}
           <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-green-400" />
                 </div>
                 <h2 className="text-lg font-bold text-white">Financial Details</h2>
              </div>
              <div className="space-y-4 font-sans">
                 <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Bank Account</p>
                    <p className="text-sm font-black text-white">{data.accountNumber}</p>
                    <p className="text-[10px] text-white/40 font-bold">{data.bankName} • {data.ifscCode}</p>
                 </div>
                 {data.upiId && (
                   <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30">UPI Endpoint</p>
                      <p className="text-sm font-black text-white">{data.upiId}</p>
                   </div>
                 )}
              </div>
           </div>

           {/* Review Checklist */}
           <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
              <h2 className="text-lg font-bold text-white">Review Checklist</h2>
              <div className="space-y-3">
                 {[
                   "Verify Legal Name in ID",
                   "Check Digital Footprint",
                   "Validate Bank IFSC Code",
                   "Quality Screen Metadata"
                 ].map((task) => (
                   <div key={task} className="flex items-center gap-3 group cursor-pointer">
                      <div className="w-5 h-5 rounded-md border border-white/10 group-hover:border-primary transition-all"></div>
                      <span className="text-sm font-medium text-white/60 group-hover:text-white">{task}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Warnings */}
           <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-[2rem] flex gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
              <div className="space-y-1">
                 <p className="text-xs font-black text-yellow-500 uppercase tracking-widest">A&R Warning</p>
                 <p className="text-xs text-yellow-500/80 leading-relaxed">
                    Rejecting this application will notify the user via email. Approval will trigger account credential issuance.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
