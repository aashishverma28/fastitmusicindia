"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Mail, 
  ShieldCheck, 
  CreditCard, 
  ArrowLeft, 
  ArrowRight, 
  Check,
  Upload,
  Globe,
  FileText,
  Briefcase,
  AlertCircle,
  Loader2
} from "lucide-react";
import { supabase, uploadFile } from "@/lib/supabase";

const steps = [
  { id: 1, name: "Label Profile", icon: <Building2 className="w-5 h-5" /> },
  { id: 2, name: "Contact", icon: <Mail className="w-5 h-5" /> },
  { id: 3, name: "Business", icon: <Briefcase className="w-5 h-5" /> },
  { id: 4, name: "Payout", icon: <CreditCard className="w-5 h-5" /> },
];

export default function LabelApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    labelName: "",
    website: "",
    genreFocus: "",
    description: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    businessType: "Company",
    regNumber: "",
    panNumber: "",
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
    incorpCertUrl: "",
    panCardUrl: "",
  });

  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [applicationId, setApplicationId] = useState("");

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "incorpCertUrl" | "panCardUrl") => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Size Validation (50MB as per user request)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(`File is too large. Max size for Documents is 50MB.`);
      return;
    }

    setUploadingField(field);
    setError("");
    try {
      const url = await uploadFile(file, "kyc-documents", "label-applications");
      updateFormData(field, url);
    } catch (err: any) {
      setError(`Upload failed: ${err.message}. Please ensure the "kyc-documents" bucket exists.`);
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "LABEL",
          applicantData: formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setApplicationId(data.applicationId);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto glass p-12 rounded-[2.5rem] border border-secondary/20 text-center space-y-8"
      >
        <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto border border-secondary/30">
           <Check className="w-10 h-10 text-secondary" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black font-display text-white">Label Application <span className="text-secondary">Received!</span></h2>
          <p className="text-white/60 text-lg font-sans">
            Your label profile is under review. Our business team will contact you within 3-5 business days for further verification.
          </p>
        </div>
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
           <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">Tracking ID</p>
           <p className="text-3xl font-mono text-secondary font-black tracking-wider">{applicationId}</p>
        </div>
        <div className="pt-4 flex flex-col gap-4">
           <Link href="/apply/status" className="btn-gradient py-4 rounded-xl font-bold">
              Track Status
           </Link>
           <Link href="/" className="text-white/40 hover:text-white transition-colors font-bold text-sm">
              Return to Homepage
           </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  currentStep >= step.id 
                    ? "bg-secondary text-black" 
                    : "bg-surface-container-high text-white/40 border border-white/5"
                }`}
              >
                {currentStep > step.id ? <Check className="w-6 h-6" /> : step.icon}
              </div>
              <span className={`mt-3 text-xs font-bold uppercase tracking-widest ${
                currentStep >= step.id ? "text-secondary" : "text-white/30"
              }`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl min-h-[500px] flex flex-col">
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 text-red-400">
             <AlertCircle className="w-5 h-5 flex-shrink-0" />
             <p className="text-sm font-bold">{error}</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-grow"
          >
            {/* Step 1: Label Profile */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black font-display text-white mb-2 text-secondary">Label Identity</h2>
                  <p className="text-white/60 font-sans">Establish your record label profile.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-white/80">Label Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Northeast Records India"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-secondary/50 outline-none"
                      onChange={(e) => updateFormData("labelName", e.target.value)}
                      value={formData.labelName}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">Website URL (Optional)</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input 
                        type="url" 
                        placeholder="https://..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-secondary/50 outline-none"
                        onChange={(e) => updateFormData("website", e.target.value)}
                        value={formData.website}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">Genre Focus</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Hip Hop, Folk, Multi-genre"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-secondary/50 outline-none"
                      onChange={(e) => updateFormData("genreFocus", e.target.value)}
                      value={formData.genreFocus}
                      required
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-white/80">Label Description</label>
                    <textarea 
                      placeholder="Briefly describe your label's vision and artist roster..."
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-secondary/50 outline-none min-h-[120px]"
                      onChange={(e) => updateFormData("description", e.target.value)}
                      value={formData.description}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black font-display text-white mb-2 text-secondary">Contact Person</h2>
                  <p className="text-white/60 font-sans">Who should we communicate with regarding the label?</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-white/80">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Label Manager / Owner"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-secondary/50 outline-none"
                      onChange={(e) => updateFormData("contactName", e.target.value)}
                      value={formData.contactName}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">Official Email</label>
                    <input 
                      type="email" 
                      placeholder="label@example.com"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-secondary/50 outline-none"
                      onChange={(e) => updateFormData("contactEmail", e.target.value)}
                      value={formData.contactEmail}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-secondary/50 outline-none"
                      onChange={(e) => updateFormData("contactPhone", e.target.value)}
                      value={formData.contactPhone}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Business */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black font-display text-white mb-2 text-secondary">Business Verification</h2>
                  <p className="text-white/60 font-sans">Legal documentation for the record label entity.</p>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 font-sans">
                      <label className="text-sm font-bold text-white/80">Business Type</label>
                      <select 
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white appearance-none outline-none focus:border-secondary/50"
                        onChange={(e) => updateFormData("businessType", e.target.value)}
                        value={formData.businessType}
                        required
                      >
                        <option value="Proprietorship">Proprietorship</option>
                        <option value="Partnership">Partnership</option>
                        <option value="LLP">LLP</option>
                        <option value="Private Limited">Private Limited</option>
                        <option value="Individual">Individual (Independent Label)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/80">Registration / CIN (If applicable)</label>
                      <input 
                        type="text" 
                        placeholder="Registration Number"
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white outline-none focus:border-secondary/50"
                        onChange={(e) => updateFormData("regNumber", e.target.value)}
                        value={formData.regNumber}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">Business PAN Number</label>
                    <input 
                      type="text" 
                      placeholder="Enter PAN"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white outline-none focus:border-secondary/50"
                      onChange={(e) => updateFormData("panNumber", e.target.value)}
                      value={formData.panNumber}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="file" 
                      id="incorp-upload" 
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, "incorpCertUrl")}
                      disabled={!!uploadingField}
                    />
                    <label 
                      htmlFor="incorp-upload"
                      className={`border border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer group ${
                        formData.incorpCertUrl ? "border-green-500/50 bg-green-500/5 text-green-500" : "border-white/10 hover:border-secondary/50 text-white/30"
                      }`}
                    >
                      {uploadingField === "incorpCertUrl" ? (
                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-secondary" />
                      ) : formData.incorpCertUrl ? (
                        <Check className="w-6 h-6 mx-auto mb-2 text-green-500" />
                      ) : (
                        <Upload className="w-6 h-6 mx-auto mb-2 group-hover:text-secondary transition-colors" />
                      )}
                      <p className="text-xs font-bold">{formData.incorpCertUrl ? "Cert Uploaded" : "Upload Incorporation Cert"}</p>
                    </label>

                    <input 
                      type="file" 
                      id="pan-upload" 
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, "panCardUrl")}
                      disabled={!!uploadingField}
                    />
                    <label 
                      htmlFor="pan-upload"
                      className={`border border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer group ${
                        formData.panCardUrl ? "border-green-500/50 bg-green-500/5 text-green-500" : "border-white/10 hover:border-secondary/50 text-white/30"
                      }`}
                    >
                      {uploadingField === "panCardUrl" ? (
                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-secondary" />
                      ) : formData.panCardUrl ? (
                        <Check className="w-6 h-6 mx-auto mb-2 text-green-500" />
                      ) : (
                        <Upload className="w-6 h-6 mx-auto mb-2 group-hover:text-secondary transition-colors" />
                      )}
                      <p className="text-xs font-bold">{formData.panCardUrl ? "PAN Uploaded" : "Upload PAN Card"}</p>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payout */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black font-display text-white mb-2 text-secondary">Label Payout Setups</h2>
                  <p className="text-white/60 font-sans">Configure where label royalties will be settled.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-white/80">Account Holder Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-secondary/50 outline-none"
                      onChange={(e) => updateFormData("accountHolder", e.target.value)}
                      value={formData.accountHolder}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">Bank Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-secondary/50 outline-none"
                      onChange={(e) => updateFormData("bankName", e.target.value)}
                      value={formData.bankName}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">IFSC Code</label>
                    <input 
                      type="text" 
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-secondary/50 outline-none"
                      onChange={(e) => updateFormData("ifscCode", e.target.value)}
                      value={formData.ifscCode}
                      required
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-white/80">Business Account Number</label>
                    <input 
                      type="text" 
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-secondary/50 outline-none"
                      onChange={(e) => updateFormData("accountNumber", e.target.value)}
                      value={formData.accountNumber}
                      required
                    />
                  </div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex gap-3">
                  <Briefcase className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <p className="text-sm text-blue-300 font-sans">
                    Label payouts are processed monthly. Ensure bank details match the registered business entity.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Form Footer */}
        <div className="mt-12 pt-8 border-t border-white/5 flex justify-between">
          <button 
            type="button" 
            onClick={prevStep}
            disabled={currentStep === 1 || isSubmitting}
            className="flex items-center gap-2 font-bold text-white/60 hover:text-white transition-colors disabled:opacity-0"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          
          {currentStep < steps.length ? (
            <button 
              type="button" 
              onClick={nextStep}
              className="bg-white text-black px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-neutral-200 transition-all font-sans"
            >
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button 
              type="button" 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-secondary text-black px-10 py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(255,215,9,0.4)] transition-all font-sans disabled:opacity-50"
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT LABEL APPLICATION"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
