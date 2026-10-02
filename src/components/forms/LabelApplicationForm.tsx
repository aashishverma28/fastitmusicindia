"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Mail, 
  CreditCard, 
  ArrowLeft, 
  ArrowRight, 
  Check,
  Upload,
  Globe,
  Briefcase,
  AlertCircle,
  Loader2,
  Lock
} from "lucide-react";
import { uploadFile } from "@/lib/supabase";

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
    businessType: "Proprietorship",
    regNumber: "",
    panNumber: "",
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
    incorpCertUrl: "",
    panCardUrl: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [applicationId, setApplicationId] = useState("");

  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validateStep = (stepNumber: number): boolean => {
    const errors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!formData.labelName.trim()) {
        errors.labelName = "Label Name is required";
      }
      if (!formData.genreFocus.trim()) {
        errors.genreFocus = "Genre Focus is required";
      }
      if (!formData.description.trim()) {
        errors.description = "Label Description is required";
      }
      // Note: website is optional
    } else if (stepNumber === 2) {
      if (!formData.contactName.trim()) {
        errors.contactName = "Contact Person's Full Name is required";
      }
      if (!formData.contactEmail.trim()) {
        errors.contactEmail = "Official Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail.trim())) {
        errors.contactEmail = "Please enter a valid official email address";
      }
      if (!formData.contactPhone.trim()) {
        errors.contactPhone = "Phone Number is required";
      } else if (formData.contactPhone.replace(/\D/g, "").length < 10) {
        errors.contactPhone = "Phone number must be at least 10 digits";
      }
    } else if (stepNumber === 3) {
      if (!formData.businessType.trim()) {
        errors.businessType = "Please select your Business Type";
      }
      // Note: regNumber (Registration / CIN) is optional
      if (!formData.panNumber.trim()) {
        errors.panNumber = "Business PAN Number is required";
      }
      // Note: incorpCertUrl is optional
      if (!formData.panCardUrl.trim()) {
        errors.panCardUrl = "PAN Card document upload is mandatory";
      }
    } else if (stepNumber === 4) {
      if (!formData.accountHolder.trim()) {
        errors.accountHolder = "Account Holder Name is required";
      }
      if (!formData.bankName.trim()) {
        errors.bankName = "Bank Name is required";
      }
      if (!formData.ifscCode.trim()) {
        errors.ifscCode = "IFSC Code is required";
      }
      if (!formData.accountNumber.trim()) {
        errors.accountNumber = "Business Account Number is required";
      }
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setError("Please fill in all mandatory fields marked with * to proceed.");
      return false;
    }

    setError("");
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setError("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "incorpCertUrl" | "panCardUrl") => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Size Validation (50MB as per system rule)
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
    // Validate all 4 steps before submitting
    for (let s = 1; s <= steps.length; s++) {
      if (!validateStep(s)) {
        setCurrentStep(s);
        setError(`Step ${s} is incomplete. Every detail is mandatory except optional fields.`);
        return;
      }
    }

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
        setError(data.error || "Something went wrong. Please check your details and try again.");
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
        className="max-w-2xl mx-auto bg-card-bg p-8 sm:p-12 rounded-[2.5rem] border-2 border-foreground/15 dark:border-white/15 text-center space-y-8 shadow-[8px_8px_0px_0px_#f00a88]"
      >
        <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto border-2 border-secondary shadow-[3px_3px_0px_0px_#f00a88]">
           <Check className="w-10 h-10 text-secondary stroke-[3]" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black font-display text-foreground">Label Application <span className="text-secondary">Received!</span></h2>
          <p className="text-foreground/70 text-base sm:text-lg font-sans">
            Your label profile is under review. Our business team will review your application and contact you within 3-5 business days.
          </p>
        </div>
        <div className="bg-foreground/5 dark:bg-white/5 p-6 rounded-2xl border-2 border-foreground/10 dark:border-white/10">
           <p className="text-xs font-black uppercase tracking-widest text-foreground/50 dark:text-white/40 mb-2">Tracking ID</p>
           <p className="text-2xl sm:text-3xl font-mono text-secondary font-black tracking-wider">{applicationId}</p>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
           <Link href="/apply/status" className="btn-neubrutalist-secondary py-4 px-8 rounded-none font-bold text-center">
              Track Status
           </Link>
           <Link href="/" className="btn-neubrutalist py-4 px-8 rounded-none font-bold text-center">
              Return Home
           </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Notice Banner */}
      <div className="mb-6 p-4 rounded-xl bg-secondary/15 border-2 border-secondary/40 flex items-center gap-3 text-foreground">
        <Lock className="w-5 h-5 text-secondary flex-shrink-0" />
        <p className="text-xs sm:text-sm font-bold font-sans">
          <span className="text-secondary font-black">Note:</span> Every detail in this application is mandatory (<span className="text-secondary font-black">*</span>) except <span className="font-semibold underline">Incorporation Cert</span>, <span className="font-semibold underline">CIN / Registration</span>, and <span className="font-semibold underline">Website URL</span>.
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="mb-12">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-foreground/10 dark:bg-white/10 -translate-y-1/2 z-0"></div>
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                  currentStep >= step.id 
                    ? "bg-secondary text-black border-secondary font-black shadow-[2px_2px_0px_0px_#f00a88]" 
                    : "bg-card-bg text-foreground/40 border-foreground/20 dark:border-white/10"
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5 stroke-[3]" />
                ) : (
                  <span className="scale-90">{step.icon}</span>
                )}
              </div>
              <span className={`mt-3 text-[10px] sm:text-xs font-black uppercase tracking-widest ${
                currentStep >= step.id ? "text-secondary font-bold" : "text-foreground/40 dark:text-white/40"
              } hidden sm:block`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content Card */}
      <div className="bg-card-bg p-6 sm:p-10 md:p-12 rounded-[2.5rem] border-2 border-foreground/15 dark:border-white/10 shadow-[8px_8px_0px_0px_#f00a88] min-h-[500px] flex flex-col">
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border-2 border-red-500/30 rounded-xl flex gap-3 text-red-500 items-start">
             <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
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
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-foreground mb-2">
                    Label <span className="text-secondary">Identity</span>
                  </h2>
                  <p className="text-foreground/60 font-sans text-sm sm:text-base">Establish your official record label profile.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Label Name */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Label Name <span className="text-secondary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Northeast Records India"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-secondary outline-none transition-colors ${
                        fieldErrors.labelName ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("labelName", e.target.value)}
                      value={formData.labelName}
                      required
                    />
                    {fieldErrors.labelName && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.labelName}</p>
                    )}
                  </div>

                  {/* Website URL (Optional) */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Website URL <span className="text-xs font-bold text-foreground/50 lowercase ml-2">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                      <input 
                        type="url" 
                        placeholder="https://yourlabel.com (Optional)"
                        className="w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 pl-12 pr-4 text-foreground placeholder:text-foreground/30 focus:border-secondary outline-none transition-colors border-foreground/15 dark:border-white/10"
                        onChange={(e) => updateFormData("website", e.target.value)}
                        value={formData.website}
                      />
                    </div>
                  </div>

                  {/* Genre Focus */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Genre Focus <span className="text-secondary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Hip Hop, Folk, Multi-genre, EDM"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-secondary outline-none transition-colors ${
                        fieldErrors.genreFocus ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("genreFocus", e.target.value)}
                      value={formData.genreFocus}
                      required
                    />
                    {fieldErrors.genreFocus && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.genreFocus}</p>
                    )}
                  </div>

                  {/* Label Description */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Label Description <span className="text-secondary font-black ml-1">*</span>
                    </label>
                    <textarea 
                      placeholder="Briefly describe your label's vision, artist roster, catalogue size, and release plan..."
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-secondary outline-none transition-colors min-h-[120px] ${
                        fieldErrors.description ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("description", e.target.value)}
                      value={formData.description}
                      required
                    />
                    {fieldErrors.description && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-foreground mb-2">
                    Contact <span className="text-secondary">Person</span>
                  </h2>
                  <p className="text-foreground/60 font-sans text-sm sm:text-base">Who should our business and A&R teams communicate with?</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Full Name <span className="text-secondary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Label Manager / Managing Director"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-secondary outline-none transition-colors ${
                        fieldErrors.contactName ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("contactName", e.target.value)}
                      value={formData.contactName}
                      required
                    />
                    {fieldErrors.contactName && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.contactName}</p>
                    )}
                  </div>

                  {/* Official Email */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Official Email <span className="text-secondary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="email" 
                      placeholder="label@example.com"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-secondary outline-none transition-colors ${
                        fieldErrors.contactEmail ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("contactEmail", e.target.value)}
                      value={formData.contactEmail}
                      required
                    />
                    {fieldErrors.contactEmail && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.contactEmail}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Phone Number <span className="text-secondary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-secondary outline-none transition-colors ${
                        fieldErrors.contactPhone ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("contactPhone", e.target.value)}
                      value={formData.contactPhone}
                      required
                    />
                    {fieldErrors.contactPhone && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.contactPhone}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Business */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-foreground mb-2">
                    Business <span className="text-secondary">Verification</span>
                  </h2>
                  <p className="text-foreground/60 font-sans text-sm sm:text-base">Legal documentation for the record label entity.</p>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Business Type */}
                    <div className="space-y-2 font-sans">
                      <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                        Business Type <span className="text-secondary font-black ml-1">*</span>
                      </label>
                      <select 
                        className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground appearance-none outline-none focus:border-secondary transition-colors ${
                          fieldErrors.businessType ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                        }`}
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
                      {fieldErrors.businessType && (
                        <p className="text-xs text-red-500 font-bold">{fieldErrors.businessType}</p>
                      )}
                    </div>

                    {/* Registration / CIN (Optional) */}
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                        Registration / CIN <span className="text-xs font-bold text-foreground/50 lowercase ml-2">(If applicable / Optional)</span>
                      </label>
                      <input 
                        type="text" 
                        placeholder="CIN / Registration Number (Optional)"
                        className="w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 outline-none focus:border-secondary transition-colors border-foreground/15 dark:border-white/10"
                        onChange={(e) => updateFormData("regNumber", e.target.value)}
                        value={formData.regNumber}
                      />
                    </div>
                  </div>

                  {/* Business PAN Number */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Business PAN Number <span className="text-secondary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. ABCDE1234F"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 outline-none focus:border-secondary transition-colors uppercase ${
                        fieldErrors.panNumber ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("panNumber", e.target.value.toUpperCase())}
                      value={formData.panNumber}
                      required
                    />
                    {fieldErrors.panNumber && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.panNumber}</p>
                    )}
                  </div>

                  {/* File Uploads Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Incorporation Cert Upload (Optional) */}
                    <div>
                      <input 
                        type="file" 
                        id="incorp-upload" 
                        className="hidden" 
                        accept="image/*,application/pdf"
                        onChange={(e) => handleFileUpload(e, "incorpCertUrl")}
                        disabled={!!uploadingField}
                      />
                      <label 
                        htmlFor="incorp-upload"
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer group flex flex-col items-center justify-center min-h-[140px] ${
                          formData.incorpCertUrl 
                            ? "border-green-500/60 bg-green-500/10 text-green-500" 
                            : "border-foreground/15 dark:border-white/10 hover:border-secondary/50 text-foreground/50 hover:text-foreground"
                        }`}
                      >
                        {uploadingField === "incorpCertUrl" ? (
                          <Loader2 className="w-6 h-6 animate-spin mb-2 text-secondary" />
                        ) : formData.incorpCertUrl ? (
                          <Check className="w-6 h-6 mb-2 text-green-500 stroke-[3]" />
                        ) : (
                          <Upload className="w-6 h-6 mb-2 group-hover:text-secondary transition-colors" />
                        )}
                        <p className="text-xs font-bold">
                          {formData.incorpCertUrl ? "Incorporation Cert Uploaded" : "Upload Incorporation Cert"}
                        </p>
                        <p className="text-[11px] text-foreground/40 mt-1 font-semibold">
                          (Optional — Max 50MB)
                        </p>
                      </label>
                    </div>

                    {/* PAN Card Upload (Mandatory) */}
                    <div>
                      <input 
                        type="file" 
                        id="pan-upload" 
                        className="hidden" 
                        accept="image/*,application/pdf"
                        onChange={(e) => handleFileUpload(e, "panCardUrl")}
                        disabled={!!uploadingField}
                      />
                      <label 
                        htmlFor="pan-upload"
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer group flex flex-col items-center justify-center min-h-[140px] ${
                          formData.panCardUrl 
                            ? "border-green-500/60 bg-green-500/10 text-green-500" 
                            : fieldErrors.panCardUrl
                            ? "border-red-500 bg-red-500/5 text-red-500 ring-1 ring-red-500"
                            : "border-foreground/15 dark:border-white/10 hover:border-secondary/50 text-foreground/50 hover:text-foreground"
                        }`}
                      >
                        {uploadingField === "panCardUrl" ? (
                          <Loader2 className="w-6 h-6 animate-spin mb-2 text-secondary" />
                        ) : formData.panCardUrl ? (
                          <Check className="w-6 h-6 mb-2 text-green-500 stroke-[3]" />
                        ) : (
                          <Upload className="w-6 h-6 mb-2 group-hover:text-secondary transition-colors" />
                        )}
                        <p className="text-xs font-bold">
                          {formData.panCardUrl ? "PAN Card Uploaded" : "Upload PAN Card *"}
                        </p>
                        <p className="text-[11px] text-foreground/40 mt-1 font-semibold">
                          (Mandatory — Max 50MB)
                        </p>
                      </label>
                      {fieldErrors.panCardUrl && (
                        <p className="text-xs text-red-500 font-bold mt-1 text-center">{fieldErrors.panCardUrl}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payout */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-foreground mb-2">
                    Label Payout <span className="text-secondary">Setups</span>
                  </h2>
                  <p className="text-foreground/60 font-sans text-sm sm:text-base">Configure where label royalties and revenue shares will be settled.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Account Holder Name */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Account Holder Name <span className="text-secondary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Registered Business or Entity Name"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-secondary outline-none transition-colors ${
                        fieldErrors.accountHolder ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("accountHolder", e.target.value)}
                      value={formData.accountHolder}
                      required
                    />
                    {fieldErrors.accountHolder && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.accountHolder}</p>
                    )}
                  </div>

                  {/* Bank Name */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Bank Name <span className="text-secondary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. HDFC Bank, ICICI Bank, SBI"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-secondary outline-none transition-colors ${
                        fieldErrors.bankName ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("bankName", e.target.value)}
                      value={formData.bankName}
                      required
                    />
                    {fieldErrors.bankName && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.bankName}</p>
                    )}
                  </div>

                  {/* IFSC Code */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      IFSC Code <span className="text-secondary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. HDFC0001234"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-secondary outline-none transition-colors uppercase ${
                        fieldErrors.ifscCode ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("ifscCode", e.target.value.toUpperCase())}
                      value={formData.ifscCode}
                      required
                    />
                    {fieldErrors.ifscCode && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.ifscCode}</p>
                    )}
                  </div>

                  {/* Business Account Number */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Business Account Number <span className="text-secondary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. 50100234567890"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-secondary outline-none transition-colors ${
                        fieldErrors.accountNumber ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("accountNumber", e.target.value)}
                      value={formData.accountNumber}
                      required
                    />
                    {fieldErrors.accountNumber && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.accountNumber}</p>
                    )}
                  </div>
                </div>

                <div className="bg-secondary/10 border-2 border-secondary/20 p-4 rounded-xl flex gap-3 items-center">
                  <Briefcase className="w-5 h-5 text-secondary flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-foreground/80 font-sans">
                    Label payouts are settled every billing cycle. Please ensure bank details match the registered business entity or authorized proprietor.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Form Footer Controls */}
        <div className="mt-12 pt-8 border-t-2 border-foreground/10 dark:border-white/10 flex justify-between items-center">
          <button 
            type="button" 
            onClick={prevStep}
            disabled={currentStep === 1 || isSubmitting}
            className="flex items-center gap-2 font-bold text-foreground/60 hover:text-foreground transition-colors disabled:opacity-0 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          
          {currentStep < steps.length ? (
            <button 
              type="button" 
              onClick={nextStep}
              className="bg-secondary text-white dark:text-black px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl font-black uppercase tracking-wider border-2 border-foreground/20 shadow-[4px_4px_0px_0px_#f00a88] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#f00a88] transition-all flex items-center gap-2 cursor-pointer"
            >
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button 
              type="button" 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-secondary text-white dark:text-black px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl font-black uppercase tracking-widest border-2 border-foreground/20 shadow-[4px_4px_0px_0px_#f00a88] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#f00a88] transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  SUBMITTING...
                </>
              ) : (
                "SUBMIT APPLICATION"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
