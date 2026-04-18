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
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { supabase, uploadFile } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

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
    idType: "Aadhar",
    idNumber: "",
    idFileUrl: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
  });

  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [applicationId, setApplicationId] = useState("");

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateSocialLink = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "idFileUrl" | "demoTrackUrl") => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Size Validation
    const maxSize = field === "demoTrackUrl" ? 100 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(`File is too large. Max size for ${field === "demoTrackUrl" ? "Songs" : "Documents"} is ${field === "demoTrackUrl" ? "100MB" : "50MB"}.`);
      return;
    }

    setUploadingField(field);
    setError("");
    try {
      const bucket = field === "demoTrackUrl" ? "releases" : "kyc-documents";
      const url = await uploadFile(file, bucket, "artist-applications");
      updateFormData(field, url);
    } catch (err: any) {
      setError(`Upload failed: ${err.message}. Please ensure the "${field === "demoTrackUrl" ? "releases" : "kyc-documents"}" bucket exists in Supabase.`);
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
          type: "ARTIST",
          applicantData: formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setApplicationId(data.applicationId);
      } else {
        setError(data.error || "Database connection failed. Please ensure your database server is running.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Your local database service might be offline.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto glass p-12 rounded-[2.5rem] border border-primary/20 text-center space-y-8"
      >
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto border border-primary/30">
           <Check className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black font-display text-white">Application <span className="gradient-text">Submitted!</span></h2>
          <p className="text-white/60 text-lg font-sans">
            Your profile has been received. Our A&R team will review your application within 3-5 business days.
          </p>
        </div>
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
           <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">Tracking ID</p>
           <p className="text-3xl font-mono text-primary font-black tracking-wider">{applicationId}</p>
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
                    ? "bg-primary text-black" 
                    : "bg-surface-container-high text-white/40 border border-white/5"
                }`}
              >
                {currentStep > step.id ? <Check className="w-6 h-6" /> : step.icon}
              </div>
              <span className={`mt-3 text-xs font-bold uppercase tracking-widest ${
                currentStep >= step.id ? "text-primary" : "text-white/30"
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
            {/* Step 1: Profile */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black font-display text-white mb-2">Basic Information</h2>
                  <p className="text-white/60 font-sans">Tell us who you are and how we can reach you.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">Full Name (Legal)</label>
                    <input 
                      type="text" 
                      placeholder="As per Government ID"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/20 focus:border-primary/50 outline-none"
                      onChange={(e) => updateFormData("fullName", e.target.value)}
                      value={formData.fullName}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">Stage Name</label>
                    <input 
                      type="text" 
                      placeholder="Your Public Brand"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/20 focus:border-primary/50 outline-none"
                      onChange={(e) => updateFormData("stageName", e.target.value)}
                      value={formData.stageName}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="Contact Email"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/20 focus:border-primary/50 outline-none"
                      onChange={(e) => updateFormData("email", e.target.value)}
                      value={formData.email}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/20 focus:border-primary/50 outline-none"
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      value={formData.phone}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Creativity */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black font-display text-white mb-2">Your Sound</h2>
                  <p className="text-white/60 font-sans">Help us categorize your music and profiles.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">Primary Genre</label>
                    <select 
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-primary/50 outline-none appearance-none"
                      onChange={(e) => updateFormData("primaryGenre", e.target.value)}
                      value={formData.primaryGenre}
                      required
                    >
                      <option value="">Select Genre</option>
                      <option value="Pop">Pop</option>
                      <option value="Rock">Rock</option>
                      <option value="Hip Hop">Hip Hop / Rap</option>
                      <option value="Lo-Fi">Lo-Fi</option>
                      <option value="Electronic">Electronic / EDM</option>
                      <option value="Folk">Folk / Traditional</option>
                      <option value="Regional">Regional</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">Primary Language</label>
                    <input 
                      type="text" 
                      placeholder="Assamese, Hindi, English, etc."
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-primary/50 outline-none"
                      onChange={(e) => updateFormData("primaryLanguage", e.target.value)}
                      value={formData.primaryLanguage}
                      required
                    />
                  </div>
                </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Music & Social Links</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                      <div className="bg-white/5 p-4 rounded-xl flex items-center justify-center w-14">
                        <Globe className="w-6 h-6 text-primary" />
                      </div>
                      <input 
                        type="url" 
                        placeholder="Spotify Artist URL"
                        className="flex-grow bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-primary/50 outline-none"
                        onChange={(e) => updateSocialLink("spotify", e.target.value)}
                        value={formData.socialLinks.spotify}
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-white/5 p-4 rounded-xl flex items-center justify-center w-14">
                        <Instagram className="w-6 h-6 text-primary" />
                      </div>
                      <input 
                        type="url" 
                        placeholder="Instagram Profile URL"
                        className="flex-grow bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-primary/50 outline-none"
                        onChange={(e) => updateSocialLink("instagram", e.target.value)}
                        value={formData.socialLinks.instagram}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Verification */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black font-display text-white mb-2">KYC Verification</h2>
                  <p className="text-white/60 font-sans">Required for legal distribution and royalty payments.</p>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">ID Type</label>
                    <div className="grid grid-cols-2 gap-4">
                      {["Aadhar Card", "PAN Card", "Voter ID", "Passport"].map((type) => (
                        <button 
                          key={type}
                          type="button"
                          onClick={() => updateFormData("idType", type)}
                          className={`p-4 rounded-xl border font-bold transition-all ${
                            formData.idType === type 
                              ? "bg-primary text-black border-primary shadow-[0_0_15px_rgba(255,136,182,0.3)]" 
                              : "bg-surface-container border-white/5 text-white/60 hover:border-white/20"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">ID Document Number</label>
                    <input 
                      type="text" 
                      placeholder="Enter ID Number"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-primary/50 outline-none"
                      onChange={(e) => updateFormData("idNumber", e.target.value)}
                      value={formData.idNumber}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
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
                      className={`border-2 border-dashed rounded-2xl p-10 text-center transition-colors cursor-pointer group block ${
                        formData.idFileUrl ? "border-green-500/50 bg-green-500/5" : "border-white/10 hover:border-primary/50"
                      }`}
                    >
                      {uploadingField === "idFileUrl" ? (
                        <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
                      ) : formData.idFileUrl ? (
                        <Check className="w-10 h-10 text-green-500 mx-auto mb-4" />
                      ) : (
                        <Upload className="w-10 h-10 text-white/30 mx-auto mb-4 group-hover:text-primary transition-colors" />
                      )}
                      <p className={`font-bold mb-1 ${formData.idFileUrl ? "text-green-500" : "text-white"}`}>
                        {uploadingField === "idFileUrl" ? "Uploading Document..." : formData.idFileUrl ? "Document Uploaded" : "Upload ID Document"}
                      </p>
                      <p className="text-xs text-white/40">PNG, JPG or PDF (Max 50MB)</p>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payout */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black font-display text-white mb-2">Payment Details</h2>
                  <p className="text-white/60 font-sans">Where should we send your royalties?</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">Bank Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-primary/50 outline-none"
                      onChange={(e) => updateFormData("bankName", e.target.value)}
                      value={formData.bankName}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/80">IFSC Code</label>
                    <input 
                      type="text" 
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-primary/50 outline-none"
                      onChange={(e) => updateFormData("ifscCode", e.target.value)}
                      value={formData.ifscCode}
                      required
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-white/80">Account Number</label>
                    <input 
                      type="text" 
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-primary/50 outline-none"
                      onChange={(e) => updateFormData("accountNumber", e.target.value)}
                      value={formData.accountNumber}
                      required
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-white/80">UPI ID (For Quick Payments)</label>
                    <input 
                      type="text" 
                      placeholder="username@bank"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-primary/50 outline-none"
                      onChange={(e) => updateFormData("upiId", e.target.value)}
                      value={formData.upiId}
                    />
                  </div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3">
                  <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <p className="text-sm text-secondary/80 font-sans">
                    Ensure the bank account name matches your legal name provided in step 1.
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
              className="btn-gradient px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button 
              type="button" 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-gradient px-10 py-4 rounded-xl font-bold hover:glow-primary hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
