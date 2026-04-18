"use client";

import { 
  Building2, 
  Hash, 
  CreditCard, 
  Lock,
  Smartphone,
  Info
} from "lucide-react";

export default function BankForm({ profile }: { profile: any }) {
  return (
    <div className="space-y-10">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Bank Institution</label>
                <div className="relative">
                   <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                   <input 
                    type="text" 
                    readOnly
                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white/40 text-xs font-bold font-mono outline-none"
                    value={profile?.bankName || "VERIFIED_BANK"}
                   />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Account Number</label>
                <div className="relative">
                   <Hash className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                   <input 
                    type="text" 
                    readOnly
                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-xs font-bold font-mono outline-none"
                    value={profile?.accountNumber?.replace(/.(?=.{4})/g, '*') || "************"}
                   />
                </div>
             </div>
          </div>

          <div className="space-y-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">IFSC Core Code</label>
                <input 
                  type="text" 
                  readOnly
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 px-6 text-white text-xs font-bold font-mono outline-none"
                  value={profile?.ifscCode || "IFSC000000"}
                />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">UPI Identifier</label>
                <div className="relative">
                   <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                   <input 
                    type="text" 
                    readOnly
                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white text-xs font-bold font-mono outline-none"
                    value={profile?.upiId || "user@upi"}
                   />
                </div>
             </div>
          </div>
       </div>

       <div className="bg-primary/5 border border-primary/10 p-6 rounded-3xl flex gap-4">
          <Lock className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="space-y-1">
             <p className="text-xs font-bold text-white uppercase italic tracking-tighter">Security Protocol Active</p>
             <p className="text-[10px] text-white/40 font-sans leading-relaxed">
                Financial details are locked post-onboarding for your protection. To update your banking instrument, please submit an 'Urgent Financial' ticket to the helpdesk with a copy of your cancelled cheque.
             </p>
          </div>
       </div>
    </div>
  );
}
