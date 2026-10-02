"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Music, 
  ShieldCheck, 
  CreditCard, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Upload, 
  Globe, 
  Instagram, 
  Youtube, 
  AlertCircle,
  Loader2,
  Lock
} from "lucide-react";
import Link from "next/link";
import { uploadFile } from "@/lib/supabase";

const steps = [
  { id: 1, name: "Profile", icon: <User className="w-5 h-5" /> },
  { id: 2, name: "Creativity", icon: <Music className="w-5 h-5" /> },
  { id: 3, name: "Verification", icon: <ShieldCheck className="w-5 h-5" /> },
  { id: 4, name: "Payout", icon: <CreditCard className="w-5 h-5" /> },
];

export default function ArtistApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    stageName: "",
    email: "",
    phone: "",
    primaryGenre: "",
    primaryLanguage: "",
    socialLinks: { spotify: "", instagram: "", youtube: "" },
    idType: "Aadhar Card",
    idNumber: "",
    idFileUrl: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [applicationId, setApplicationId] = useState("");

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-level error when user updates
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const updateSocialLink = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
    if (fieldErrors[platform]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[platform];
        return next;
      });
    }
  };

  const validateStep = (stepNumber: number): boolean => {
    const errors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!formData.fullName.trim()) {
        errors.fullName = "Legal Full Name is required";
      }
      if (!formData.stageName.trim()) {
        errors.stageName = "Stage Name / Brand is required";
      }
      if (!formData.email.trim()) {
        errors.email = "Email Address is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errors.email = "Please enter a valid email address";
      }
      if (!formData.phone.trim()) {
        errors.phone = "Phone Number is required";
      } else if (formData.phone.replace(/\D/g, "").length < 10) {
        errors.phone = "Phone number must be at least 10 digits";
      }
    } else if (stepNumber === 2) {
      if (!formData.primaryGenre.trim()) {
        errors.primaryGenre = "Please select your Primary Genre";
      }
      if (!formData.primaryLanguage.trim()) {
        errors.primaryLanguage = "Primary Language is required";
      }
      // Spotify is optional for artists who may not yet have a profile on Spotify
      if (!formData.socialLinks.instagram.trim()) {
        errors.instagram = "Instagram Profile URL is required";
      }
      if (!formData.socialLinks.youtube.trim()) {
        errors.youtube = "YouTube Channel / Video URL is required";
      }
    } else if (stepNumber === 3) {
      if (!formData.idType.trim()) {
        errors.idType = "Please select an ID Document Type";
      }
      if (!formData.idNumber.trim()) {
        errors.idNumber = "ID Document Number is required";
      }
      if (!formData.idFileUrl.trim()) {
        errors.idFileUrl = "ID Document photo/PDF upload is mandatory";
      }
    } else if (stepNumber === 4) {
      if (!formData.bankName.trim()) {
        errors.bankName = "Bank Name is required";
      }
      if (!formData.ifscCode.trim()) {
        errors.ifscCode = "IFSC Code is required";
      }
      if (!formData.accountNumber.trim()) {
        errors.accountNumber = "Account Number is required";
      }
      if (!formData.upiId.trim()) {
        errors.upiId = "UPI ID is required for payout verification";
      }
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setError("Every detail is mandatory. Please fill in all required fields marked with * to proceed.");
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "idFileUrl") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File is too large. Maximum allowed size for KYC documents is 50MB.");
      return;
    }

    setUploadingField(field);
    setError("");
    try {
      const url = await uploadFile(file, "kyc-documents", "artist-applications");
      updateFormData(field, url);
    } catch (err: any) {
      setError(`Upload failed: ${err.message}. Please try again or upload a different image/PDF.`);
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = async () => {
    // Validate all 4 steps
    for (let s = 1; s <= steps.length; s++) {
      if (!validateStep(s)) {
        setCurrentStep(s);
        setError(`Step ${s} is incomplete. Every detail is mandatory.`);
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
          type: "ARTIST",
          applicantData: formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setApplicationId(data.applicationId);
      } else {
        setError(data.error || "Failed to submit application. Please verify all details.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto bg-card-bg p-8 sm:p-12 rounded-[2.5rem] border-2 border-foreground/15 dark:border-white/15 text-center space-y-8 shadow-[8px_8px_0px_0px_#ffc301]"
      >
        <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto border-2 border-secondary shadow-[3px_3px_0px_0px_#f00a88]">
           <Check className="w-10 h-10 text-foreground dark:text-secondary stroke-[3]" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black font-display text-foreground">Application <span className="text-primary">Submitted!</span></h2>
          <p className="text-foreground/70 text-base sm:text-lg font-sans">
            Every required detail has been successfully recorded. Our A&R team will review your application within 3-5 business days.
          </p>
        </div>
        <div className="bg-foreground/5 dark:bg-white/5 p-6 rounded-2xl border-2 border-foreground/10 dark:border-white/10">
           <p className="text-xs font-black uppercase tracking-widest text-foreground/50 dark:text-white/40 mb-2">Tracking ID</p>
           <p className="text-2xl sm:text-3xl font-mono text-primary font-black tracking-wider">{applicationId}</p>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
           <Link href="/apply/status" className="btn-neubrutalist py-4 px-8 rounded-none font-bold text-center">
              Track Status
           </Link>
           <Link href="/" className="btn-neubrutalist-secondary py-4 px-8 rounded-none font-bold text-center">
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
          <span className="text-primary font-black">Note:</span> Every detail in this application is mandatory (<span className="text-primary font-black">*</span>). All steps must be completed to submit for review.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-foreground/10 dark:bg-white/10 -translate-y-1/2 z-0"></div>
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                  currentStep > step.id 
                    ? "bg-secondary text-black border-secondary shadow-[3px_3px_0px_0px_#f00a88]"
                    : currentStep === step.id
                    ? "bg-primary text-white border-primary shadow-[3px_3px_0px_0px_#ffc301]"
                    : "bg-card-bg text-foreground/40 border-foreground/15 dark:border-white/10"
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5 stroke-[3]" />
                ) : (
                  <span className="scale-90 sm:scale-100">{step.icon}</span>
                )}
              </div>
              <span className={`mt-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest ${
                currentStep >= step.id ? "text-foreground font-black" : "text-foreground/40 dark:text-white/30"
              } hidden sm:block`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Card Container */}
      <div className="bg-card-bg p-6 sm:p-10 md:p-12 rounded-3xl border-2 sm:border-3 border-foreground/15 dark:border-white/15 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.06)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)] min-h-[520px] flex flex-col">
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border-2 border-red-500/30 rounded-xl flex gap-3 text-red-600 dark:text-red-400">
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
            {/* Step 1: Profile */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-foreground mb-2">
                    Step 1: Basic Information
                  </h2>
                  <p className="text-foreground/60 dark:text-zinc-400 font-sans text-sm sm:text-base">
                    All legal and contact details are mandatory for official agreement execution.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Full Legal Name <span className="text-primary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="As per Government ID"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-primary outline-none transition-colors ${
                        fieldErrors.fullName ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("fullName", e.target.value)}
                      value={formData.fullName}
                      required
                    />
                    {fieldErrors.fullName && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Stage / Artist Name <span className="text-primary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Your Public Brand"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-primary outline-none transition-colors ${
                        fieldErrors.stageName ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("stageName", e.target.value)}
                      value={formData.stageName}
                      required
                    />
                    {fieldErrors.stageName && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.stageName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Email Address <span className="text-primary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="email" 
                      placeholder="Contact & Login Email"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-primary outline-none transition-colors ${
                        fieldErrors.email ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      value={formData.email}
                      required
                    />
                    {fieldErrors.email && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Phone Number <span className="text-primary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-primary outline-none transition-colors ${
                        fieldErrors.phone ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      value={formData.phone}
                      required
                    />
                    {fieldErrors.phone && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Creativity */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-foreground mb-2">
                    Step 2: Your Sound & Online Presence
                  </h2>
                  <p className="text-foreground/60 dark:text-zinc-400 font-sans text-sm sm:text-base">
                    All genre, language, and social/music links are mandatory for catalog verification.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Primary Genre <span className="text-primary font-black ml-1">*</span>
                    </label>
                    <select 
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground focus:border-primary outline-none transition-colors appearance-none ${
                        fieldErrors.primaryGenre ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("primaryGenre", e.target.value)}
                      value={formData.primaryGenre}
                      required
                    >
                      <option value="">-- Select Genre --</option>
                      <option value="Pop">Pop</option>
                      <option value="Rock">Rock</option>
                      <option value="Hip Hop">Hip Hop / Rap</option>
                      <option value="Lo-Fi">Lo-Fi</option>
                      <option value="Electronic">Electronic / EDM</option>
                      <option value="Folk">Folk / Traditional</option>
                      <option value="Classical">Classical</option>
                      <option value="Jazz">Jazz</option>
                      <option value="Devotional">Devotional</option>
                      <option value="Regional">Regional</option>
                    </select>
                    {fieldErrors.primaryGenre && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.primaryGenre}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Primary Language <span className="text-primary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Hindi, English, Assamese, Punjabi"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-primary outline-none transition-colors ${
                        fieldErrors.primaryLanguage ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("primaryLanguage", e.target.value)}
                      value={formData.primaryLanguage}
                      required
                    />
                    {fieldErrors.primaryLanguage && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.primaryLanguage}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-foreground flex items-center gap-2">
                    Social & Music Profiles
                  </h3>

                  <div className="space-y-4">
                    {/* Spotify URL (Optional) */}
                    <div className="space-y-1">
                      <div className="flex gap-3">
                        <div className="bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 p-3.5 rounded-xl flex items-center justify-center w-12 sm:w-14 flex-shrink-0">
                          <Globe className="w-5 h-5 text-foreground/50" />
                        </div>
                        <input 
                          type="url" 
                          placeholder="Spotify Artist URL (Optional — leave blank if not yet on Spotify)"
                          className="flex-grow bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-primary outline-none transition-colors border-foreground/15 dark:border-white/10"
                          onChange={(e) => updateSocialLink("spotify", e.target.value)}
                          value={formData.socialLinks.spotify}
                        />
                      </div>
                    </div>

                    {/* Instagram URL */}
                    <div className="space-y-1">
                      <div className="flex gap-3">
                        <div className="bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 p-3.5 rounded-xl flex items-center justify-center w-12 sm:w-14 flex-shrink-0">
                          <Instagram className="w-5 h-5 text-primary" />
                        </div>
                        <input 
                          type="url" 
                          placeholder="Instagram Profile URL (e.g. https://instagram.com/...)"
                          className={`flex-grow bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-primary outline-none transition-colors ${
                            fieldErrors.instagram ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                          }`}
                          onChange={(e) => updateSocialLink("instagram", e.target.value)}
                          value={formData.socialLinks.instagram}
                          required
                        />
                      </div>
                      {fieldErrors.instagram && (
                        <p className="text-xs text-red-500 font-bold ml-16">{fieldErrors.instagram}</p>
                      )}
                    </div>

                    {/* YouTube URL */}
                    <div className="space-y-1">
                      <div className="flex gap-3">
                        <div className="bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 p-3.5 rounded-xl flex items-center justify-center w-12 sm:w-14 flex-shrink-0">
                          <Youtube className="w-5 h-5 text-primary" />
                        </div>
                        <input 
                          type="url" 
                          placeholder="YouTube Channel / Music Video URL (e.g. https://youtube.com/...)"
                          className={`flex-grow bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-primary outline-none transition-colors ${
                            fieldErrors.youtube ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                          }`}
                          onChange={(e) => updateSocialLink("youtube", e.target.value)}
                          value={formData.socialLinks.youtube}
                          required
                        />
                      </div>
                      {fieldErrors.youtube && (
                        <p className="text-xs text-red-500 font-bold ml-16">{fieldErrors.youtube}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Verification */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-foreground mb-2">
                    Step 3: KYC Verification
                  </h2>
                  <p className="text-foreground/60 dark:text-zinc-400 font-sans text-sm sm:text-base">
                    Government ID details and document upload are mandatory for legal music copyright licensing.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      ID Document Type <span className="text-primary font-black ml-1">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {["Aadhar Card", "PAN Card", "Voter ID", "Passport"].map((type) => (
                        <button 
                          key={type}
                          type="button"
                          onClick={() => updateFormData("idType", type)}
                          className={`p-3.5 rounded-xl border-2 font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                            formData.idType === type 
                              ? "bg-secondary text-black border-secondary shadow-[3px_3px_0px_0px_#f00a88]" 
                              : "bg-background dark:bg-black/40 border-foreground/15 dark:border-white/10 text-foreground/75 hover:border-foreground/40"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      ID Document Number <span className="text-primary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Enter corresponding document number"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-primary outline-none transition-colors ${
                        fieldErrors.idNumber ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("idNumber", e.target.value)}
                      value={formData.idNumber}
                      required
                    />
                    {fieldErrors.idNumber && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.idNumber}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Upload Document Copy <span className="text-primary font-black ml-1">* (Mandatory)</span>
                    </label>
                    <input 
                      type="file" 
                      id="id-upload"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, "idFileUrl")}
                      disabled={!!uploadingField}
                    />
                    <label 
                      htmlFor="id-upload"
                      className={`border-3 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all cursor-pointer group block ${
                        formData.idFileUrl 
                          ? "border-green-500 bg-green-500/10 shadow-[4px_4px_0px_0px_#22c55e]" 
                          : fieldErrors.idFileUrl
                          ? "border-red-500 bg-red-500/5 ring-1 ring-red-500"
                          : "border-foreground/20 dark:border-white/15 hover:border-primary bg-background dark:bg-black/20"
                      }`}
                    >
                      {uploadingField === "idFileUrl" ? (
                        <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-3" />
                      ) : formData.idFileUrl ? (
                        <Check className="w-10 h-10 text-green-500 mx-auto mb-3 stroke-[3]" />
                      ) : (
                        <Upload className="w-10 h-10 text-foreground/40 dark:text-white/30 mx-auto mb-3 group-hover:text-primary transition-colors" />
                      )}
                      <p className={`font-bold mb-1 text-sm sm:text-base ${formData.idFileUrl ? "text-green-600 dark:text-green-400 font-black" : "text-foreground"}`}>
                        {uploadingField === "idFileUrl" 
                          ? "Uploading Document to Secure Storage..." 
                          : formData.idFileUrl 
                          ? "Document Successfully Uploaded" 
                          : "Click to Upload Official ID Document"}
                      </p>
                      <p className="text-xs text-foreground/50 dark:text-white/40">
                        {formData.idFileUrl ? "Click to change or re-upload" : "PNG, JPG or PDF format (Max size 50MB)"}
                      </p>
                    </label>
                    {fieldErrors.idFileUrl && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.idFileUrl}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payout */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-foreground mb-2">
                    Step 4: Royalty Payout Details
                  </h2>
                  <p className="text-foreground/60 dark:text-zinc-400 font-sans text-sm sm:text-base">
                    All bank details and UPI ID are mandatory so you receive your monthly royalty distributions without delays.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Bank Name <span className="text-primary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. State Bank of India, HDFC Bank"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-primary outline-none transition-colors ${
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

                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      IFSC Code <span className="text-primary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. SBIN0001234"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-primary outline-none transition-colors uppercase ${
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

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      Bank Account Number <span className="text-primary font-black ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Enter your bank account number"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-primary outline-none transition-colors ${
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

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground flex items-center">
                      UPI ID <span className="text-primary font-black ml-1">* (Mandatory for Fast Payouts)</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. yourname@okhdfcbank / yourphone@upi"
                      className={`w-full bg-background dark:bg-black/40 border-2 rounded-xl py-3.5 px-4 text-foreground placeholder:text-foreground/30 focus:border-primary outline-none transition-colors ${
                        fieldErrors.upiId ? "border-red-500 ring-1 ring-red-500" : "border-foreground/15 dark:border-white/10"
                      }`}
                      onChange={(e) => updateFormData("upiId", e.target.value)}
                      value={formData.upiId}
                      required
                    />
                    {fieldErrors.upiId && (
                      <p className="text-xs text-red-500 font-bold">{fieldErrors.upiId}</p>
                    )}
                  </div>
                </div>

                <div className="bg-secondary/10 border-2 border-secondary/30 p-4 rounded-xl flex gap-3 items-center">
                  <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-foreground/80 font-sans">
                    <b>Verification Rule:</b> The bank account holder name must match the Legal Full Name provided in Step 1.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Form Footer Navigation */}
        <div className="mt-12 pt-8 border-t-2 border-foreground/10 dark:border-white/10 flex justify-between items-center gap-4">
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
              className="btn-neubrutalist px-8 sm:px-10 py-3.5 rounded-none font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-md"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              type="button" 
              onClick={handleSubmit}
              disabled={isSubmitting || !!uploadingField}
              className="btn-neubrutalist px-8 sm:px-10 py-3.5 rounded-none font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer shadow-md"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> SUBMITTING...
                </span>
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
