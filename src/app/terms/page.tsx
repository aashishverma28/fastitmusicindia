"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Scale, 
  ArrowLeft, 
  Shield, 
  Check, 
  Info, 
  AlertTriangle, 
  AlertCircle, 
  HelpCircle, 
  Mail, 
  MapPin, 
  Globe, 
  Clock, 
  FileText, 
  Calendar,
  Lock,
  DollarSign,
  UserCheck,
  AlertOctagon,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

const Callout: React.FC<{
  type: "warning" | "info" | "success" | "danger";
  title?: string;
  children: React.ReactNode;
}> = ({ type, title, children }) => {
  const getStyles = () => {
    switch (type) {
      case "warning":
        return {
          card: "neubrutalist-card-yellow p-6 border-2 border-black bg-black/40 shadow-[4px_4px_0px_0px_#ffc301]",
          icon: <AlertTriangle className="w-6 h-6 text-secondary shrink-0 mt-0.5" />,
        };
      case "danger":
        return {
          card: "neubrutalist-card-pink p-6 border-2 border-black bg-black/40 shadow-[4px_4px_0px_0px_#f00a88]",
          icon: <AlertOctagon className="w-6 h-6 text-primary shrink-0 mt-0.5" />,
        };
      case "success":
        return {
          card: "neubrutalist-card-blue p-6 border-2 border-black bg-black/40 shadow-[4px_4px_0px_0px_#00b0fc]",
          icon: <Check className="w-6 h-6 text-[#00b0fc] shrink-0 mt-0.5" />,
        };
      case "info":
      default:
        return {
          card: "neubrutalist-card-blue p-6 border-2 border-black bg-black/40 shadow-[4px_4px_0px_0px_#00b0fc]",
          icon: <Info className="w-6 h-6 text-[#00b0fc] shrink-0 mt-0.5" />,
        };
    }
  };

  const { card, icon } = getStyles();

  return (
    <div className={`${card} flex gap-4 items-start rounded-none my-6`}>
      {icon}
      <div className="text-white/80 text-sm leading-relaxed font-sans font-semibold space-y-1">
        {title && <p className="font-display font-black text-white text-base tracking-tight uppercase">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("welcome");

  const sections = [
    { id: "welcome", label: "Welcome" },
    { id: "definitions", label: "1. Definitions" },
    { id: "eligibility", label: "2. Eligibility & Registration" },
    { id: "condition-1", label: "3. Onboarding (First Song)" },
    { id: "condition-2", label: "4. Individual Song Distribution" },
    { id: "condition-3", label: "5. Content & Copyright Compliance" },
    { id: "condition-4", label: "6. Exclusivity & Restrictions" },
    { id: "condition-5", label: "7. Revenue, Payouts & Fraud" },
    { id: "condition-6", label: "8. Termination & Takedown" },
    { id: "guidelines", label: "9. Guidelines & Quality" },
    { id: "promotion", label: "10. Promotion & Marketing" },
    { id: "liability", label: "11. Limitation of Liability" },
    { id: "governing-law", label: "12. Governing Law & Disputes" },
    { id: "amendments", label: "13. Amendments" },
    { id: "summary", label: "Quick Reference Summary" },
    { id: "contact", label: "14. Contact Information" },
    { id: "acknowledgment", label: "Acknowledgment" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      // Find which section is currently visible
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.offsetTop - 100;
      window.scrollTo({
        top: offset,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-visible">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-primary transition-colors font-bold text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Title Header */}
        <div className="space-y-4 mb-16">
          <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-display text-white tracking-tighter leading-none">
            Terms & <span className="text-secondary">Conditions</span>
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-widest text-white/50 font-sans">
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-primary" /> www.fastitmusic.in</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-secondary" /> Effective: July 2025</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#00b0fc]" /> Last Updated: July 2025</span>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sticky Navigation Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 self-start hidden lg:block bg-black/30 border-2 border-white/10 p-6 shadow-[5px_5px_0px_0px_rgba(255,255,255,0.05)]">
            <h3 className="font-display font-black text-white text-lg tracking-tight uppercase mb-6 pb-2 border-b border-white/10">
              Table of Contents
            </h3>
            <nav className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left py-2 px-3 text-sm font-sans font-bold transition-all flex items-center justify-between border-2 ${
                    activeSection === section.id
                      ? "bg-secondary text-black border-black shadow-[2px_2px_0px_0px_#f00a88]"
                      : "text-white/50 border-transparent hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="truncate">{section.label}</span>
                  {activeSection === section.id && <ChevronRight className="w-4 h-4 shrink-0" />}
                </button>
              ))}
            </nav>
          </aside>

          {/* Document Content */}
          <main className="lg:col-span-8 space-y-16">
            
            {/* Welcome */}
            <section id="welcome" className="space-y-6 scroll-mt-28">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight border-b-2 border-white/10 pb-4">
                Welcome to Fastit Music India
              </h2>
              <div className="text-white/70 text-base leading-relaxed font-sans font-semibold space-y-4">
                <p>
                  These Terms & Conditions (&quot;Agreement&quot;) constitute a legally binding contract between you (&quot;Artist,&quot; &quot;Record Label,&quot; or &quot;You&quot;) and <strong className="text-primary">Fastit Music India</strong> (&quot;Company,&quot; &quot;We,&quot; &quot;Us,&quot; or &quot;Our&quot;), operated through the website <strong className="text-secondary">www.fastitmusic.in</strong>.
                </p>
                <p>
                  By registering on our platform, submitting any content, or using any of our distribution services, you acknowledge that you have carefully read, fully understood, and unconditionally agree to be bound by all the Terms & Conditions outlined in this Agreement.
                </p>
                <p className="text-white font-bold p-4 bg-red-600/10 border-2 border-red-600/50 shadow-[3px_3px_0px_0px_rgba(220,38,38,0.5)]">
                  If you do not agree with any part of these terms, you must immediately discontinue use of our platform and services.
                </p>
              </div>
            </section>

            {/* Section 1: Definitions */}
            <section id="definitions" className="space-y-6 scroll-mt-28">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight border-b-2 border-white/10 pb-4">
                1. Definitions
              </h2>
              <p className="text-white/70 text-sm font-sans font-semibold">
                For clarity and the purpose of this Agreement, the following terms shall carry the specific meanings defined below:
              </p>
              <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#00b0fc]">
                <table className="w-full text-left border-collapse bg-black/40">
                  <thead>
                    <tr className="bg-[#1a1a1c] border-b-2 border-black">
                      <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/4">Term</th>
                      <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-3/4">Definition</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Artist</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">Any individual musician, singer, songwriter, composer, rapper, band, or music group who registers with Fastit Music India for distribution services.</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Record Label</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">Any third-party label entity that partners with Fastit Music India for distribution, aggregation, or related music services.</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Content</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">All musical compositions, sound recordings, master recordings, cover artwork, music videos, lyrics, metadata, and any associated materials submitted by the Artist or Record Label.</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Platform</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">The Fastit Music India website (www.fastitmusic.in), its associated dashboards, artist portals, tools, and affiliated services.</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">DSPs</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">Digital Service Providers — digital music streaming and download platforms including but not limited to YouTube Music, Spotify, Apple Music, Amazon Music, JioSaavn, Gaana, Wynk, Hungama, Instagram/Facebook, TikTok, Resso, and others.</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Onboarding Song</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">The mandatory first song distributed under the Company&apos;s onboarding process as described in Condition 1 (Section 3).</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Individual Songs</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">Subsequent songs (up to 3) distributed after successful completion of the onboarding process, as described in Condition 2 (Section 4).</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Revenue</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">All income generated from streaming, downloads, sync licensing, content ID claims, and any other monetization of distributed content across all platforms.</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Net Revenue</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">Gross revenue received by the Company from DSPs minus applicable taxes, platform fees, transaction charges, and statutory deductions.</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Minimum & Final Payout</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">The one-time, fixed, non-negotiable payment made to the Artist for the Onboarding Song.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 2: Eligibility & Registration */}
            <section id="eligibility" className="space-y-6 scroll-mt-28">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight border-b-2 border-white/10 pb-4">
                2. Eligibility & Registration
              </h2>
              <div className="text-white/70 text-sm font-sans font-semibold space-y-6">
                
                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">2.1 Age Requirement</h4>
                  <ul className="list-none space-y-2 pl-4">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                      <span>You must be at least <strong className="text-white">18 years of age</strong> to register with Fastit Music India.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                      <span>If you are between <strong className="text-white">13 and 18 years of age</strong>, you must provide verifiable written consent from a parent or legal guardian. The parent/guardian agrees to be bound by these terms on your behalf and assumes full responsibility.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                      <span className="text-red-500">Individuals below 13 years of age are <strong className="text-red-500">not permitted</strong> to use our services.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">2.2 Registration Information</h4>
                  <p>You must provide accurate, current, and complete information during registration, including but not limited to:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-4 pt-2">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> Full legal name (as per ID)</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> Valid and active email</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> Phone number (with WhatsApp)</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> Gov ID (Aadhaar/PAN/Voter/Passport)</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> Bank account details</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> UPI ID (optional)</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-secondary" /> Artist/Label & social media profiles</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">2.3 Account Responsibility</h4>
                  <ul className="list-none space-y-2 pl-4">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                      <span>Each Artist or Record Label may maintain only <strong className="text-white">one (1) account</strong> on the platform.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                      <span>You are solely responsible for maintaining the confidentiality of your account credentials.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                      <span className="text-red-500 font-bold">Duplicate, fake, or fraudulent accounts will be immediately terminated, and all pending payouts will be permanently forfeited.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">2.4 Record Label Registration</h4>
                  <p>Record Labels seeking partnership must provide additional documentation:</p>
                  <ul className="list-none space-y-2 pl-4 pt-2">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00b0fc]" /> Business/Company registration certificate</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00b0fc]" /> GST registration (if applicable)</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00b0fc]" /> Catalog ownership proof</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00b0fc]" /> Authorized signatory details and branding assets</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">2.5 Right to Reject</h4>
                  <p>
                    The Company reserves the absolute right to <strong className="text-white">reject any registration or application</strong> at its sole discretion, without providing any reason, and without any obligation or liability to the applicant.
                  </p>
                </div>

              </div>
            </section>

            {/* Section 3: Condition 1 — Onboarding Process */}
            <section id="condition-1" className="space-y-6 scroll-mt-28">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight border-b-2 border-white/10 pb-4">
                3. Condition 1 — Onboarding Process & First Song Distribution
              </h2>
              
              <Callout type="danger" title="MANDATORY REQUIREMENT FOR ALL NEW ARTISTS & RECORD LABELS">
                This condition must be fulfilled before accessing any other services or plans offered by Fastit Music India.
              </Callout>

              <div className="text-white/70 text-sm font-sans font-semibold space-y-6">
                
                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">3.1 Mandatory First Song (Onboarding Song)</h4>
                  <p>
                    To join <strong className="text-white">any plan, service, or distribution program</strong> offered by Fastit Music India, every new Artist or Record Label is <strong className="text-white">mandatorily required</strong> to distribute their first song (&quot;Onboarding Song&quot;) through the Company as part of the onboarding process.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">3.2 Distribution Scope of Onboarding Song</h4>
                  <p>The Onboarding Song shall be distributed by the Company across:</p>
                  <ul className="list-none space-y-2 pl-4">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4.5 h-4.5 text-secondary shrink-0" />
                      <span><strong className="text-white">The Company&apos;s Official YouTube Channel</strong> (Fastit Music India or designated channel)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4.5 h-4.5 text-secondary shrink-0 font-bold" />
                      <span><strong className="text-white">All major DSPs and streaming platforms</strong> (YouTube Music, Spotify, Apple Music, Amazon Music, JioSaavn, Gaana, Wynk, Instagram, Facebook, TikTok, and 50+ other global & regional platforms).</span>
                    </li>
                  </ul>
                  <p className="italic pt-2">
                    Note: The Onboarding Song will be published on the Company&apos;s official YouTube Channel as well as on all DSPs under the Company&apos;s label name and/or the Artist&apos;s name as determined by the Company.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display font-black text-white text-lg">3.3 Complete Transfer of Rights for Onboarding Song</h4>
                  <p>By submitting the Onboarding Song, the Artist or Record Label <strong className="text-white">irrevocably agrees</strong> to the following:</p>

                  <p className="font-bold text-white uppercase tracking-tight text-xs">a) 100% Rights Transfer Table:</p>
                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#f00a88]">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-2/3">Right</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/3">Transferred to Company?</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          "Master Recording Rights",
                          "Publishing Rights",
                          "Distribution Rights (Digital & Physical)",
                          "Synchronization (Sync) Rights",
                          "Mechanical Rights",
                          "Performance Rights",
                          "Digital Rights",
                          "Content ID Rights",
                          "Licensing & Sublicensing Rights",
                          "Reproduction & Display Rights"
                        ].map((right, idx) => (
                          <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4 text-white/80 font-sans font-semibold text-sm">{right}</td>
                            <td className="p-4 text-green-500 font-display font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                              <Check className="w-4 h-4 text-green-500" /> Yes — 100%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h5 className="font-display font-black text-white text-sm">b) Company Ownership:</h5>
                    <p>
                      The Company shall have <strong className="text-white">complete, exclusive, and perpetual ownership</strong> over the Onboarding Song. The Company may monetize, license, sublicense, distribute, reproduce, display, remix, sample, and exploit the Onboarding Song across all platforms, territories, formats, and media — both existing and future — <strong className="text-white">worldwide, in perpetuity</strong>.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-display font-black text-white text-sm">c) No Future Claims:</h5>
                    <p>
                      The Artist or Record Label <strong className="text-white">shall not</strong> claim any future royalties, residual income, backend payments, or additional compensation of any kind beyond the Minimum & Final Payout. The Artist waives all moral rights.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display font-black text-white text-lg">3.4 Minimum & Final Payout for Onboarding Song</h4>
                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#ffc301]">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/3">Aspect</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-2/3">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Payment Type</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">One-time, fixed, final payout</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Negotiability</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Non-negotiable after mutual agreement</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Amount</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Communicated and mutually agreed upon before submission</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Additional Royalties</td>
                          <td className="p-4 text-red-500 font-display font-black text-xs uppercase tracking-wider flex items-center gap-1">
                            ❌ None — No future royalties or revenue sharing
                          </td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Processing Time</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Within <strong className="text-white">30-45 business days</strong> after successful publication & verification</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Payment Method</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Bank transfer (NEFT/IMPS) or UPI</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="italic text-xs">
                    Clarity: The Minimum & Final Payout is a one-time payment. Once paid, the Artist has no further financial claim on the Onboarding Song, regardless of how much revenue the song generates in the future.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">3.5 Purpose of the Onboarding Process</h4>
                  <p>The onboarding process serves content verification, relationship building, evaluation of market viability, official label portfolio growth, and copyright protection.</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">3.6 Rejection & Timeline</h4>
                  <p>The Company reserves the right to reject onboarding submissions that violate content policies or standards. In case of rejection, another song can be submitted.</p>
                  
                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#00b0fc] mt-4">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider">Step</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider">Estimated Timeline</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-white/80 font-sans font-semibold text-sm">Song submission & review</td>
                          <td className="p-4 text-secondary text-sm font-sans font-medium">3-7 business days</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-white/80 font-sans font-semibold text-sm">Approval or rejection notification</td>
                          <td className="p-4 text-secondary text-sm font-sans font-medium">2-3 business days after review</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-white/80 font-sans font-semibold text-sm">Distribution to YouTube & DSPs</td>
                          <td className="p-4 text-secondary text-sm font-sans font-medium">7-21 business days after approval</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-white/80 font-sans font-semibold text-sm">Payout processing</td>
                          <td className="p-4 text-secondary text-sm font-sans font-medium">30-45 business days after publication</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </section>

            {/* Section 4: Condition 2 — Individual Song Distribution */}
            <section id="condition-2" className="space-y-6 scroll-mt-28">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight border-b-2 border-white/10 pb-4">
                4. Condition 2 — Individual Song Distribution, Rights & Revenue Split
              </h2>
              
              <Callout type="success" title="Applicable ONLY after successful completion of the Onboarding Process (Condition 1)">
                Once your onboarding process is completed, you gain access to our premium distribution features.
              </Callout>

              <div className="text-white/70 text-sm font-sans font-semibold space-y-6">
                
                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">4.1 Unlocking Individual Song Distribution</h4>
                  <p>
                    Upon successful completion of the onboarding process, the Artist or Record Label becomes eligible to distribute individual songs under significantly more favorable terms.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">4.2 Individual Song Quota</h4>
                  <p>
                    The Artist or Record Label shall initially be entitled to distribute up to <strong className="text-white">three (3) individual songs</strong>. Each individual song will be distributed across all major DSPs under the <strong className="text-white">Artist&apos;s own name/label name</strong>.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display font-black text-white text-lg">4.3 Rights Distribution for Individual Songs</h4>
                  
                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#00b0fc]">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/4">Party</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/4">Rights Ownership</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-2/4">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Artist / Record Label</td>
                          <td className="p-4 text-white font-display font-black text-base">60%</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">The Artist retains 60% of all rights including master recording rights, publishing rights, and creative control.</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Fastit Music India</td>
                          <td className="p-4 text-white font-display font-black text-base">40%</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">The Company retains 40% of all rights, granting the Company authority to distribute, monetize, manage, and protect the song.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="p-4 bg-white/5 border border-white/10">
                      <p className="font-display font-black text-primary uppercase text-xs tracking-wider mb-2">Artist co-ownership benefits (60%):</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Creative control over the song</li>
                        <li>• Right to perform the song live</li>
                        <li>• Right to use in personal, non-monetized media</li>
                        <li>• Primary artist credit recognition</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10">
                      <p className="font-display font-black text-[#00b0fc] uppercase text-xs tracking-wider mb-2">Company rights scope (40%):</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Distribution rights across all DSPs</li>
                        <li>• Monetization & revenue collection</li>
                        <li>• Content ID registration and management</li>
                        <li>• Anti-piracy protection & takedown authority</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display font-black text-white text-lg">4.4 Revenue Split for Individual Songs</h4>
                  
                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#f00a88]">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/4">Party</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/4">Revenue Share</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-2/4">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Artist / Record Label</td>
                          <td className="p-4 text-white font-display font-black text-base">90%</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">90% of Net Revenue from all platforms</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Fastit Music India</td>
                          <td className="p-4 text-white font-display font-black text-base">10%</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">10% retained as distribution & service fee</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 text-xs italic space-y-1">
                    <p className="font-bold text-white">Net Revenue Calculation:</p>
                    <p className="text-secondary font-mono text-sm">Net Revenue = Gross Revenue from DSPs — (Applicable Taxes + Platform Fees + Transaction Charges + Statutory Deductions)</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display font-black text-white text-lg">4.5 Distribution Platforms for Individual Songs</h4>
                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#ffc301]">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/3">Platform Category</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-2/3">Platforms</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Streaming</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Spotify, Apple Music, YouTube Music, Amazon Music, JioSaavn, Gaana, Wynk, Hungama, Resso, Tidal, Deezer, Pandora</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Download/Purchase</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">iTunes, Amazon Music, Google Play Music</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Social Media</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Instagram/Facebook Audio Library, TikTok, Moj, Josh, Snapchat</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Recognition & Content ID</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Shazam, SoundHound, YouTube Content ID</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">4.6 Beyond the Initial Three Songs</h4>
                  <p>
                    After the initial three individual songs, terms (rights split, revenue share) may be renegotiated based on streaming performance, growth, market demand, and mutual agreement.
                  </p>
                </div>

              </div>
            </section>

            {/* Section 5: Condition 3 — Content Originality */}
            <section id="condition-3" className="space-y-6 scroll-mt-28">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight border-b-2 border-white/10 pb-4">
                5. Condition 3 — Content Originality, Copyright Compliance & Infringement Policy
              </h2>
              
              <Callout type="danger" title="Zero Tolerance for Copyright Infringement">
                We respect intellectual property. Submitting content you do not own will lead to severe penalties.
              </Callout>

              <div className="text-white/70 text-sm font-sans font-semibold space-y-6">
                
                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">5.1 Originality Warranty</h4>
                  <p>By submitting any content to Fastit Music India, the Artist or Record Label represents, warrants, and guarantees that:</p>
                  <ul className="list-none space-y-2 pl-4">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4.5 h-4.5 text-[#00b0fc] shrink-0 mt-0.5" />
                      <span>The content is <strong className="text-white">100% original</strong> and solely created by the Artist, or you have obtained all necessary licenses.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4.5 h-4.5 text-[#00b0fc] shrink-0 mt-0.5" />
                      <span>The content does not violate intellectual property, copyrights, trademarks, or trade secrets of third parties.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4.5 h-4.5 text-[#00b0fc] shrink-0 mt-0.5" />
                      <span>The content does not contain unauthorized samples, beats, loops, instrumentals, or vocals without written clearances.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4.5 h-4.5 text-[#00b0fc] shrink-0 mt-0.5" />
                      <span>For covers or remixes, all mechanical licenses, synchronization licenses, and permissions have been obtained.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display font-black text-white text-lg">5.2 Copyright Infringement — Consequences</h4>
                  
                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#f00a88]">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/4">Strike</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-3/4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">1st Copyright Strike</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">⚠️ Content removed from all platforms. Written warning issued. Artist must provide proof of ownership or licensing within 15 days.</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">2nd Copyright Strike</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">⚠️ Content removed. Account suspended for 30 days. Pending payouts frozen during investigation.</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-red-500 font-display font-black text-sm">3rd Copyright Strike</td>
                          <td className="p-4 text-red-500/80 text-sm font-sans font-bold">🚫 Permanent account termination. All pending payouts forfeited. Company reserves the right to pursue legal action for damages.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">5.3 Indemnification</h4>
                  <p>
                    The Artist or Record Label agrees to <strong className="text-white">fully indemnify, defend, and hold harmless</strong> Fastit Music India and its affiliates from and against any and all claims, damages, losses, liabilities, costs, and expenses (including legal fees) arising out of copyright infringements or breach of warranties.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">5.4 Content Verification & DMCA Counter-Notice</h4>
                  <p>
                    Verification checks do not absolve the Artist of sole responsibility. If a DMCA notice is received, the content is temporarily removed and the Artist has 15 days to submit a counter-notice with supporting evidence.
                  </p>
                </div>

              </div>
            </section>

            {/* Section 6: Condition 4 — Exclusivity */}
            <section id="condition-4" className="space-y-6 scroll-mt-28">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight border-b-2 border-white/10 pb-4">
                6. Condition 4 — Exclusivity, Non-Compete & Distribution Restrictions
              </h2>
              
              <Callout type="warning" title="Protecting the Integrity of Distribution">
                Exclusivity prevents database/ISRC conflicts and metadata errors on DSPs.
              </Callout>

              <div className="text-white/70 text-sm font-sans font-semibold space-y-6">
                
                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">6.1 Exclusive Distribution Through Fastit Music India</h4>
                  <p>
                    Once a song is submitted to and accepted by Fastit Music India for distribution, the Artist or Record Label <strong className="text-white">shall not distribute the same song</strong> (or alternate version thereof) through any other distributor, aggregator, or platform during the term of this Agreement.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display font-black text-white text-lg">6.2 Non-Compete Clause</h4>
                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#ffc301]">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/3">Period</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-2/3">Restriction</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">During Agreement</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">The Artist shall not distribute any song submitted through Fastit Music India via any competing distributor or aggregator.</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">6 months after termination</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">The Artist shall not re-distribute any previously submitted song through any competing service without prior written consent from the Company.</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">After 6-month period</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">The Artist is free to distribute previously submitted individual songs (not the Onboarding Song) through any service, subject to rights obligations.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">6.3 Exceptions to Exclusivity</h4>
                  <p>Exclusivity does not apply to: Live performances, personal non-monetized social media posts, physical sales (CDs/vinyl) arranged independently, and entirely new original content never submitted to Fastit Music India.</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">6.4 Consequences of Exclusivity Violation</h4>
                  <p>Violations will result in a warning to remove the content from competing platforms within 7 days, failing which the Company will issue takedowns, terminate the account, and forfeit pending payouts.</p>
                </div>

              </div>
            </section>

            {/* Section 7: Condition 5 — Revenue, Payouts & Fraud */}
            <section id="condition-5" className="space-y-6 scroll-mt-28">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight border-b-2 border-white/10 pb-4">
                7. Condition 5 — Revenue, Payouts, Payment Schedule & Fraud Policy
              </h2>
              
              <Callout type="info" title="Transparent & Fair Payment Practices">
                Find details about how and when royalties are reported, calculated, and paid.
              </Callout>

              <div className="text-white/70 text-sm font-sans font-semibold space-y-6">
                
                <div className="space-y-4">
                  <h4 className="font-display font-black text-white text-lg">7.1 Payout Schedule</h4>
                  <p>Revenue payouts shall be processed on a quarterly basis:</p>
                  
                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#00b0fc]">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider">Quarter</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider">Revenue Period</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider">Payout Processed By</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Q1</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">January — March</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">End of May</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Q2</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">April — June</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">End of August</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Q3</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">July — September</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">End of November</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Q4</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">October — December</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">End of February (next year)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-display font-black text-white text-lg">7.2 Minimum Payout Threshold</h4>
                    <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#f00a88]">
                      <table className="w-full text-left border-collapse bg-black/40">
                        <thead>
                          <tr className="bg-[#1a1a1c] border-b-2 border-black">
                            <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider">Threshold</th>
                            <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4 text-secondary font-display font-black text-sm">Minimum Payout</td>
                            <td className="p-4 text-white font-display font-black text-sm">₹500 (INR Five Hundred)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs italic">Amounts below ₹500 roll over to the next quarter.</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-display font-black text-white text-lg">7.3 Payment Methods</h4>
                    <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#ffc301]">
                      <table className="w-full text-left border-collapse bg-black/40">
                        <thead>
                          <tr className="bg-[#1a1a1c] border-b-2 border-black">
                            <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider">Method</th>
                            <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider">Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4 text-secondary font-display font-black text-sm">Bank Transfer</td>
                            <td className="p-4 text-white/70 text-xs font-sans font-medium">Primary method (NEFT/IMPS/RTGS)</td>
                          </tr>
                          <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4 text-secondary font-display font-black text-sm">UPI</td>
                            <td className="p-4 text-white/70 text-xs font-sans font-medium">Available for payouts under ₹1,00,000</td>
                          </tr>
                          <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4 text-secondary font-display font-black text-sm">International Wire</td>
                            <td className="p-4 text-white/70 text-xs font-sans font-medium">For foreign Artists (charges apply)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display font-black text-white text-lg">7.5 Taxes & Statutory Deductions</h4>
                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#00b0fc]">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/3">Tax/Deduction</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-2/3">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">TDS (Tax Deducted at Source)</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Deducted from payouts as mandated by the Indian Income Tax Act.</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">GST</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">If applicable, GST shall be borne by the Artist/Record Label.</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Income Tax</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Artists are solely responsible for filing their own income tax returns and reporting income received.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display font-black text-white text-lg">7.7 Fraudulent Streaming Activity — Zero Tolerance Policy</h4>
                  
                  <Callout type="danger" title="STRICT ACTION AGAINST FAKE STREAMS">
                    Prohibited activities include using bots, click farms, automated tools, or paying for stream manipulation schemes.
                  </Callout>

                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#f00a88] mt-4">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/4">Severity</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-3/4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Detected — Minor</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Revenue from fraudulent streams deducted. Written warning issued.</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Detected — Moderate</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">All payouts frozen pending investigation. Content may be temporarily removed.</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-red-500 font-display font-black text-sm">Confirmed — Severe</td>
                          <td className="p-4 text-red-500/80 text-sm font-sans font-bold">🚫 Immediate account termination. All pending payouts permanently forfeited. Permanent ban from the platform. Company may pursue legal action and seek damages.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </section>

            {/* Section 8: Condition 6 — Termination */}
            <section id="condition-6" className="space-y-6 scroll-mt-28">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight border-b-2 border-white/10 pb-4">
                8. Condition 6 — Termination, Takedown & Post-Termination Obligations
              </h2>
              
              <Callout type="warning" title="Clear Exit Process & Obligations">
                Understand the cancellation policy, timescales, and what happens to your content after exit.
              </Callout>

              <div className="text-white/70 text-sm font-sans font-semibold space-y-6">
                
                <div className="space-y-4">
                  <h4 className="font-display font-black text-white text-lg">8.1 Contract Duration</h4>
                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#ffc301]">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/3">Aspect</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-2/3">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Minimum Term</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">1 (one) year from the date of registration</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Auto-Renewal</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Yes — automatically renews for successive 1-year periods</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Non-Renewal Notice</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Either party must provide 30 days&apos; written notice before term end to prevent auto-renewal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display font-black text-white text-lg">8.2 Termination by Artist or Record Label</h4>
                  <p>Upon termination by the Artist, the following rules apply:</p>
                  
                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#00b0fc]">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/3">Aspect</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-2/3">Post-Termination Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Onboarding Song</td>
                          <td className="p-4 text-red-500 font-display font-black text-xs uppercase tracking-wider">❌ Remains permanent property of Fastit Music India. Cannot be taken down.</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Individual Songs — Takedown</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">✅ May be requested. Processed within 15-30 business days.</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Individual Songs — 40% Rights</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Retained by the Company unless a separate buyout agreement is executed.</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Pending Revenue</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Paid within 60 business days if above ₹500; forfeited if below ₹500 (unless requested).</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Non-Compete Period</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">6 months post-termination for previously distributed individual songs.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display font-black text-white text-lg">8.3 Termination by Company</h4>
                  <p>The Company may terminate this Agreement immediately if there is a breach, fraud, copyright strikes, or reputational harm:</p>

                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#f00a88]">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/3">Aspect</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-2/3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Onboarding Song</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Remains Company property</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Individual Songs</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">May be taken down at Company&apos;s discretion</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Pending Payouts</td>
                          <td className="p-4 text-red-500 font-display font-black text-xs uppercase tracking-wider">❌ Forfeited if terminated due to fraud, infringement, or material breach</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display font-black text-white text-lg">8.4 Artist-Initiated Takedown of Individual Songs</h4>
                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#ffc301]">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/4">Step</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-3/4">Process</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">1</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Submit formal takedown request via email or platform dashboard.</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">2</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Company acknowledges the request within 5 business days.</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">3</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Processing & removal from all DSPs: takes 15-30 business days.</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">4</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Confirmation of removal sent to the Artist.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-red-500 font-bold">Reminder: The Onboarding Song cannot be taken down under any circumstances.</p>
                </div>

              </div>
            </section>

            {/* Section 9: Content Guidelines */}
            <section id="guidelines" className="space-y-6 scroll-mt-28">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight border-b-2 border-white/10 pb-4">
                9. Content Guidelines & Quality Standards
              </h2>
              <div className="text-white/70 text-sm font-sans font-semibold space-y-6">
                
                <div className="space-y-4">
                  <h4 className="font-display font-black text-white text-lg">9.1 Audio Requirements</h4>
                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#00b0fc]">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/3">Specification</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-2/3">Requirement</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Preferred Format</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">WAV or FLAC</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Minimum Quality</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">16-bit, 44.1 kHz (CD Quality)</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Acceptable Alternative</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">MP3 at minimum 320 kbps</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Audio Clarity</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Free from excessive distortion, clipping, background noise, or artifacts.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display font-black text-white text-lg">9.2 Artwork Requirements</h4>
                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#f00a88]">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/3">Specification</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-2/3">Requirement</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Format</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">JPEG or PNG</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Minimum Resolution</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">3000 × 3000 pixels (1:1 square aspect ratio)</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Prohibited Elements</td>
                          <td className="p-4 text-red-500 font-display font-black text-xs uppercase tracking-wider">
                            ❌ No third-party logos, watermarks, DSP logos, URLs, social handles, pricing info, or blurry/pixelated art.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">9.3 Metadata & Prohibited Content</h4>
                  <p>All metadata must be accurate and complete. We prohibit content promoting hate speech, violence, terrorism, child abuse, obscene materials, copyright violations, or undisclosed AI-generated works presented as human-created.</p>
                </div>

              </div>
            </section>

            {/* Section 10: Promotion */}
            <section id="promotion" className="space-y-6 scroll-mt-28">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight border-b-2 border-white/10 pb-4">
                10. Promotional Rights & Marketing
              </h2>
              <div className="text-white/70 text-sm font-sans font-semibold space-y-4">
                <p>
                  By entering this Agreement, you grant Fastit Music India the right to use the Artist&apos;s name, likeness, image, bio, and photographs for promotional purposes across playlists, compilations, reels, and press releases.
                </p>
                <p>
                  The Artist also agrees to credit Fastit Music India as the distributor where appropriate and share promotional content when requested.
                </p>
              </div>
            </section>

            {/* Section 11: Liability */}
            <section id="liability" className="space-y-6 scroll-mt-28">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight border-b-2 border-white/10 pb-4">
                11. Limitation of Liability & Disclaimer
              </h2>
              
              <Callout type="warning" title="No Revenue Guarantee">
                Fastit Music India does NOT guarantee any specific amount of revenue, streams, downloads, playlist placements, or commercial success.
              </Callout>

              <div className="text-white/70 text-sm font-sans font-semibold space-y-4">
                <p>
                  The Company is not responsible for platform outages, DSP policy changes, mechanical royalty rate shifts, or automatic takedowns by DSPs.
                </p>
                <p className="border-l-4 border-primary pl-4 font-display font-black text-white text-base">
                  &quot;In no event shall Fastit Music India&apos;s total aggregate liability to the Artist exceed the total payouts actually made to the Artist in the 12 months preceding the claim.&quot;
                </p>
                <p>
                  Under no circumstances shall We be liable for indirect, incidental, punitive, or consequential damages.
                </p>
              </div>
            </section>

            {/* Section 12: Governing Law */}
            <section id="governing-law" className="space-y-6 scroll-mt-28">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight border-b-2 border-white/10 pb-4">
                12. Governing Law & Dispute Resolution
              </h2>
              <div className="text-white/70 text-sm font-sans font-semibold space-y-6">
                <p>
                  This Agreement shall be governed by and construed in accordance with the <strong className="text-white">laws of the Republic of India</strong>, subject to the exclusive jurisdiction of the competent courts in Assam, India.
                </p>

                <div className="space-y-4">
                  <h4 className="font-display font-black text-white text-lg">12.3 Dispute Resolution Process</h4>
                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#00b0fc]">
                    <table className="w-full text-left border-collapse bg-black/40">
                      <thead>
                        <tr className="bg-[#1a1a1c] border-b-2 border-black">
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/4">Stage</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-2/4">Process</th>
                          <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/4">Timeline</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Stage 1</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Informal Resolution — Written notice and good faith negotiation.</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">30 days</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Stage 2</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Mediation through a mutually agreed mediator.</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">30 days</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Stage 3</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Binding Arbitration under the Arbitration and Conciliation Act, 1996.</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">As scheduled</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-secondary font-display font-black text-sm">Stage 4</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">Litigation in courts specified in Section 12.2.</td>
                          <td className="p-4 text-white/70 text-sm font-sans font-medium">As scheduled</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-black text-white text-lg">12.4 Class Action Waiver</h4>
                  <p>The Artist agrees that any dispute resolution proceedings will be conducted on an individual basis only, and not as part of any class, consolidated, or representative action.</p>
                </div>
              </div>
            </section>

            {/* Section 13: Amendments */}
            <section id="amendments" className="space-y-6 scroll-mt-28">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight border-b-2 border-white/10 pb-4">
                13. Amendments & Modifications
              </h2>
              <div className="text-white/70 text-sm font-sans font-semibold space-y-4">
                <p>
                  Fastit Music India reserves the right to amend or replace these Terms & Conditions at any time. Material changes will be communicated via email, prominent notices on www.fastitmusic.in, or dashboard alerts.
                </p>
                <p>
                  Continued use of the services after changes constitute binding acceptance of the updated Terms & Conditions.
                </p>
              </div>
            </section>

            {/* Quick Reference Summary */}
            <section id="summary" className="space-y-6 scroll-mt-28">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight border-b-2 border-white/10 pb-4">
                Quick Reference Summary Table
              </h2>
              <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#ffc301]">
                <table className="w-full text-left border-collapse bg-black/40">
                  <thead>
                    <tr className="bg-[#1a1a1c] border-b-2 border-black">
                      <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/3">Aspect</th>
                      <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/3">Onboarding Song (1st Song)</th>
                      <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/3">Individual Songs (Up to 3)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Distribution Platforms</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">Company&apos;s YouTube Channel + All DSPs</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">All Major DSPs (50+ Platforms)</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Published Under</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">Company&apos;s Label Name/Channel</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">Artist&apos;s Own Name</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Rights Ownership</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">100% Company</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">60% Artist / 40% Company</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Revenue Model</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">One-Time Fixed Payout</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">90% Artist / 10% Company (Quarterly)</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Future Royalties</td>
                      <td className="p-4 text-red-500 font-display font-black text-xs">❌ None</td>
                      <td className="p-4 text-green-500 font-display font-black text-xs">✅ Yes — Ongoing & Quarterly</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Takedown Allowed</td>
                      <td className="p-4 text-red-500 font-display font-black text-xs">❌ Never</td>
                      <td className="p-4 text-green-500 font-display font-black text-xs">✅ Yes (15-30 business days)</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Content ID</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">Company-controlled</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">Company-managed, Artist benefits</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Creative Control</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">Company has full control</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">Artist retains creative control</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 14: Contact Info */}
            <section id="contact" className="space-y-6 scroll-mt-28">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight border-b-2 border-white/10 pb-4">
                14. Contact Information
              </h2>
              <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0px_0px_#00b0fc]">
                <table className="w-full text-left border-collapse bg-black/40">
                  <thead>
                    <tr className="bg-[#1a1a1c] border-b-2 border-black">
                      <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-1/3">Contact Type</th>
                      <th className="p-4 text-white font-display font-black text-xs uppercase tracking-wider w-2/3">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Website</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">
                        <a href="http://www.fastitmusic.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.fastitmusic.in</a>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">General Support</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">support@fastitmusic.in</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Legal / T&C Inquiries</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">legal@fastitmusic.in</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Artist Relations</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">artists@fastitmusic.in</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Label Partnerships</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">labels@fastitmusic.in</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Registered Office</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">Rangamati, Dergaon, Golaghat, Assam, India - 785614</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-secondary font-display font-black text-sm">Business Hours</td>
                      <td className="p-4 text-white/70 text-sm font-sans font-medium">Monday – Saturday, 10:00 AM – 7:00 PM IST</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Acknowledgment */}
            <section id="acknowledgment" className="space-y-6 scroll-mt-28">
              <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight border-b-2 border-white/10 pb-4">
                Acknowledgment & Acceptance
              </h2>
              <div className="text-white/80 text-sm font-sans font-semibold space-y-4 bg-white/5 border border-white/10 p-6 md:p-8">
                <p className="font-bold text-white mb-4">
                  By registering on www.fastitmusic.in, clicking &quot;I Agree,&quot; submitting any content, or using any services provided by Fastit Music India, you hereby confirm and acknowledge that:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>You have <strong className="text-white">read and understood</strong> all Terms & Conditions outlined in this Agreement in their entirety.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>You <strong className="text-white">voluntarily and unconditionally agree</strong> to be bound by all terms, conditions, and obligations stated herein.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>You understand and accept the <strong className="text-white">Onboarding Process</strong> (Condition 1), including the complete transfer of rights for the first song and the minimum & final payout structure.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>You understand and accept the <strong className="text-white">Individual Song Distribution terms</strong> (Condition 2), including the 60/40 rights split and 90/10 revenue share.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>You understand and accept the <strong className="text-white">Copyright, Exclusivity, Payment, and Termination</strong> policies (Conditions 3-6).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>You are <strong className="text-white">legally competent</strong> to enter into this Agreement and are not restricted by any other contract or obligation.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 border-t border-white/10 text-center space-y-2">
                <p className="text-white/40 text-xs font-sans">
                  © 2025 Fastit Music India. All Rights Reserved.
                </p>
                <p className="text-white/30 text-[10px] font-sans">
                  No part of this document may be reproduced, distributed, or transmitted in any form without the prior written permission of Fastit Music India.
                </p>
              </div>
            </section>

          </main>

        </div>
      </div>
    </div>
  );
}
