"use client";

import { useState, useEffect } from "react";
import { 
  Plus, Trash2, Edit, Check, X, Eye, ExternalLink, 
  Briefcase, Mail, User, Clock, AlertTriangle, 
  FolderGit2, CheckCircle2, RefreshCw, ChevronRight,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string;
  accentColor: string;
  isActive: boolean;
  createdAt: string;
};

type JobApplication = {
  id: string;
  name: string;
  email: string;
  roleId: string | null;
  roleTitle: string;
  portfolioUrl: string;
  pitch: string;
  status: string;
  createdAt: string;
};

const COLOR_PRESETS = [
  { hex: "#f00a88", name: "Pink" },
  { hex: "#ffc301", name: "Yellow" },
  { hex: "#00b0fc", name: "Blue" },
  { hex: "#a855f7", name: "Purple" },
  { hex: "#22c55e", name: "Green" }
];

const DEPARTMENTS = ["Engineering", "Operations", "Marketing", "A&R", "Finance", "Support", "Legal", "Creative"];
const JOB_TYPES = ["Full-Time", "Part-Time", "Contract", "Internship"];

export default function AdminJobsDashboard() {
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");
  
  // Jobs State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null);
  
  // Applications State
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [appsLoading, setAppsLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [deletingAppId, setDeletingAppId] = useState<string | null>(null);
  const [appFilter, setAppFilter] = useState<string>("ALL"); // ALL, PENDING, REVIEWED, REJECTED
  
  // Form State
  const [form, setForm] = useState({
    title: "",
    department: DEPARTMENTS[0],
    location: "Assam / Remote",
    type: JOB_TYPES[0],
    experience: "1+ Years",
    description: "",
    requirements: "",
    accentColor: COLOR_PRESETS[0].hex
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchJobs = async () => {
    setJobsLoading(true);
    try {
      const res = await fetch("/api/admin/jobs");
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
      }
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setJobsLoading(false);
    }
  };

  const fetchApplications = async () => {
    setAppsLoading(true);
    try {
      const res = await fetch("/api/admin/jobs/applications");
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setAppsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  // Job Handlers
  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create job posting");
        return;
      }
      setSuccess("Job posting created successfully!");
      setShowCreateModal(false);
      resetForm();
      fetchJobs();
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/jobs/${selectedJob.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to update job posting");
        return;
      }
      setSuccess("Job posting updated successfully!");
      setShowEditModal(false);
      setSelectedJob(null);
      resetForm();
      fetchJobs();
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleJobActive = async (job: Job) => {
    try {
      const res = await fetch(`/api/admin/jobs/${job.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !job.isActive }),
      });
      if (res.ok) {
        fetchJobs();
      }
    } catch (err) {
      console.error("Failed to toggle job state:", err);
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDeletingJobId(null);
        fetchJobs();
      }
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  // Application Handlers
  const handleUpdateAppStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/jobs/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchApplications();
        // Update selected app status view if open
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp({ ...selectedApp, status });
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/jobs/applications/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDeletingAppId(null);
        setSelectedApp(null);
        fetchApplications();
      }
    } catch (err) {
      console.error("Failed to delete application:", err);
    }
  };

  const openEditModal = (job: Job) => {
    setSelectedJob(job);
    setForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      description: job.description,
      requirements: job.requirements,
      accentColor: job.accentColor
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setForm({
      title: "",
      department: DEPARTMENTS[0],
      location: "Assam / Remote",
      type: JOB_TYPES[0],
      experience: "1+ Years",
      description: "",
      requirements: "",
      accentColor: COLOR_PRESETS[0].hex
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return { bg: "rgba(255,195,1,0.1)", text: "#ffc301", border: "rgba(255,195,1,0.3)" };
      case "REVIEWED": return { bg: "rgba(0,176,252,0.1)", text: "#00b0fc", border: "rgba(0,176,252,0.3)" };
      case "REJECTED": return { bg: "rgba(239,68,68,0.1)", text: "#ef4444", border: "rgba(239,68,68,0.3)" };
      default: return { bg: "rgba(255,255,255,0.05)", text: "#fff", border: "rgba(255,255,255,0.1)" };
    }
  };

  const filteredApps = applications.filter(app => {
    if (appFilter === "ALL") return true;
    return app.status === appFilter;
  });

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight font-display">Hiring & Job Management</h1>
          <p className="text-white/40 text-sm mt-1">Configure open career positions and review incoming job applications</p>
        </div>
        
        {activeTab === "jobs" && (
          <button
            onClick={() => { resetForm(); setError(""); setSuccess(""); setShowCreateModal(true); }}
            className="flex items-center gap-2 px-5 py-3 rounded-none border-2 border-black font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-[4px_4px_0px_0px_#f00a88] bg-[#f00a88] text-white hover:shadow-[2px_2px_0px_0px_#f00a88]"
          >
            <Plus className="w-4.5 h-4.5" /> Create Job Posting
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b-2 border-foreground/10 pb-1">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-6 py-3 font-display font-black text-sm tracking-widest uppercase border-2 transition-all relative ${
            activeTab === "jobs" 
              ? "bg-[#ffc301] text-black border-black shadow-[4px_4px_0px_0px_#000]" 
              : "border-transparent text-white/50 hover:text-white"
          }`}
        >
          Job Openings ({jobs.length})
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-6 py-3 font-display font-black text-sm tracking-widest uppercase border-2 transition-all relative ${
            activeTab === "applications" 
              ? "bg-[#00b0fc] text-black border-black shadow-[4px_4px_0px_0px_#000]" 
              : "border-transparent text-white/50 hover:text-white"
          }`}
        >
          Candidate Applications ({applications.length})
        </button>
      </div>

      {/* Notification Banner */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="p-4 border-2 border-green-500 bg-green-500/10 text-green-400 text-sm font-semibold flex items-center justify-between"
            style={{ boxShadow: "4px 4px 0px 0px rgba(34,197,94,0.3)" }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>{success}</span>
            </div>
            <button onClick={() => setSuccess("")} className="hover:text-white"><X className="w-4 h-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* JOBS TAB */}
      {activeTab === "jobs" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Total Postings", value: jobs.length, color: "#a855f7" },
              { label: "Active Openings", value: jobs.filter(j => j.isActive).length, color: "#f00a88" },
              { label: "Inactive / Hidden", value: jobs.filter(j => !j.isActive).length, color: "#ffc301" }
            ].map(s => (
              <div 
                key={s.label} 
                className="bg-[#111113] p-6 border-2 border-foreground/10"
                style={{ borderLeft: `6px solid ${s.color}` }}
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{s.label}</p>
                <p className="text-3xl font-black mt-2 text-white">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Job List */}
          {jobsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-28 bg-white/5 border-2 border-foreground/5 animate-pulse" />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="border-2 border-dashed border-foreground/15 p-16 text-center bg-[#111113]">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-white/10" />
              <h3 className="text-lg font-black text-white">No job openings created yet</h3>
              <p className="text-white/40 text-sm mt-1 mb-6">Create dynamic job postings to display them live on career.fastitmusic.in</p>
              <button
                onClick={() => { resetForm(); setError(""); setSuccess(""); setShowCreateModal(true); }}
                className="px-5 py-2.5 bg-white text-black font-black text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_0px_#ffc301] hover:scale-105 transition-all"
              >
                Add Your First Job
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {jobs.map(job => (
                <div 
                  key={job.id}
                  className="bg-[#111113] border-2 border-foreground/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/20 transition-all"
                  style={{ borderLeft: `6px solid ${job.accentColor}` }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-black text-white">{job.title}</h3>
                      <span 
                        className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 border border-black bg-black text-white"
                        style={{ boxShadow: `1.5px 1.5px 0px 0px ${job.accentColor}` }}
                      >
                        {job.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/40 font-semibold font-sans">
                      <span className="flex items-center gap-1"><FolderGit2 className="w-3.5 h-3.5" /> {job.department}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.experience}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                    {/* Active Toggle */}
                    <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-none font-bold text-xs">
                      <span className="text-white/40">Status:</span>
                      <button 
                        onClick={() => handleToggleJobActive(job)}
                        className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider border border-black ${
                          job.isActive ? "bg-green-500 text-black" : "bg-red-500/20 text-red-400 border-red-500/40"
                        }`}
                      >
                        {job.isActive ? "Active" : "Draft"}
                      </button>
                    </div>

                    {/* Edit */}
                    <button
                      onClick={() => openEditModal(job)}
                      className="p-2 border-2 border-black bg-white text-black hover:bg-neutral-100 transition-all shadow-[2px_2px_0px_0px_#000]"
                      title="Edit job details"
                    >
                      <Edit className="w-4.5 h-4.5" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setDeletingJobId(job.id)}
                      className="p-2 border-2 border-black bg-red-600 text-white hover:bg-red-700 transition-all shadow-[2px_2px_0px_0px_#000]"
                      title="Delete job posting"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* APPLICATIONS TAB */}
      {activeTab === "applications" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {[
              { label: "Total Applications", value: applications.length, color: "#00b0fc" },
              { label: "Pending Review", value: applications.filter(a => a.status === "PENDING").length, color: "#ffc301" },
              { label: "Reviewed Profiles", value: applications.filter(a => a.status === "REVIEWED").length, color: "#22c55e" },
              { label: "Rejected Profiles", value: applications.filter(a => a.status === "REJECTED").length, color: "#ef4444" }
            ].map(s => (
              <div 
                key={s.label} 
                className="bg-[#111113] p-5 border-2 border-foreground/10"
                style={{ borderLeft: `6px solid ${s.color}` }}
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{s.label}</p>
                <p className="text-2xl font-black mt-2 text-white">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Filters & Actions */}
          <div className="flex gap-2 flex-wrap items-center bg-[#111113] p-4 border-2 border-foreground/10">
            <span className="text-xs font-black uppercase tracking-wider text-white/40 mr-2">Filter Status:</span>
            {["ALL", "PENDING", "REVIEWED", "REJECTED"].map(status => (
              <button
                key={status}
                onClick={() => setAppFilter(status)}
                className={`px-4 py-1.5 text-xs font-black uppercase tracking-widest border border-black transition-all ${
                  appFilter === status 
                    ? "bg-[#00b0fc] text-black shadow-[2.5px_2.5px_0px_0px_#000]" 
                    : "bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* App List */}
          {appsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-white/5 border-2 border-foreground/5 animate-pulse" />
              ))}
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="border-2 border-dashed border-foreground/15 p-16 text-center bg-[#111113]">
              <User className="w-12 h-12 mx-auto mb-4 text-white/10" />
              <h3 className="text-lg font-black text-white">No applications match the filter</h3>
              <p className="text-white/40 text-sm mt-1">Incoming applications submitted on career.fastitmusic.in will be listed here.</p>
            </div>
          ) : (
            <div className="border-2 border-black overflow-x-auto bg-[#111113] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-black bg-white/5 text-xs font-black uppercase tracking-wider text-white/40">
                    <th className="p-4">Applicant Name</th>
                    <th className="p-4">Desired Role</th>
                    <th className="p-4">Applied Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-black font-semibold font-sans text-white/80">
                  {filteredApps.map(app => {
                    const statusStyle = getStatusColor(app.status);
                    return (
                      <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-white text-base">{app.name}</p>
                          <p className="text-xs text-white/40 font-mono mt-0.5">{app.email}</p>
                        </td>
                        <td className="p-4 font-bold text-white">{app.roleTitle}</td>
                        <td className="p-4 text-xs text-white/40">
                          {new Date(app.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric"
                          })}
                        </td>
                        <td className="p-4">
                          <span 
                            className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider border font-sans"
                            style={{ backgroundColor: statusStyle.bg, color: statusStyle.text, borderColor: statusStyle.border }}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => setSelectedApp(app)}
                              className="p-2 border border-black bg-white text-black hover:bg-neutral-100 transition-all shadow-[1.5px_1.5px_0px_0px_#000]"
                              title="View full pitch details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeletingAppId(app.id)}
                              className="p-2 border border-black bg-red-600 text-white hover:bg-red-700 transition-all shadow-[1.5px_1.5px_0px_0px_#000]"
                              title="Delete application"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* CREATE JOB MODAL */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-[#141414] border-3 border-black p-8 shadow-[8px_8px_0px_0px_#f00a88] max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-white font-display uppercase tracking-tight">New Job Opening</h2>
                <button onClick={() => setShowCreateModal(false)} className="p-1 text-white/40 hover:text-white"><X className="w-6 h-6" /></button>
              </div>

              {error && (
                <div className="mb-6 p-4 border border-red-500 bg-red-500/10 text-red-400 text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" /> {error}
                </div>
              )}

              <form onSubmit={handleCreateJob} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-white/40 ml-1">Job Title *</label>
                    <input 
                      type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                      placeholder="e.g. Lead Frontend React Engineer"
                      className="w-full bg-black border-2 border-foreground/10 p-3 text-white text-sm focus:border-primary outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-white/40 ml-1">Department *</label>
                    <select 
                      value={form.department} onChange={e => setForm({...form, department: e.target.value})}
                      className="w-full bg-black border-2 border-foreground/10 p-3 text-white text-sm focus:border-primary outline-none appearance-none cursor-pointer"
                    >
                      {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-[#141414]">{d}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-white/40 ml-1">Job Type *</label>
                    <select 
                      value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                      className="w-full bg-black border-2 border-foreground/10 p-3 text-white text-sm focus:border-primary outline-none appearance-none cursor-pointer"
                    >
                      {JOB_TYPES.map(t => <option key={t} value={t} className="bg-[#141414]">{t}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-white/40 ml-1">Location *</label>
                    <input 
                      type="text" required value={form.location} onChange={e => setForm({...form, location: e.target.value})}
                      placeholder="e.g. Assam / Hybrid"
                      className="w-full bg-black border-2 border-foreground/10 p-3 text-white text-sm focus:border-primary outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-white/40 ml-1">Required Experience *</label>
                    <input 
                      type="text" required value={form.experience} onChange={e => setForm({...form, experience: e.target.value})}
                      placeholder="e.g. 2+ Years or Strong Portfolio"
                      className="w-full bg-black border-2 border-foreground/10 p-3 text-white text-sm focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-white/40 ml-1">Job Description *</label>
                  <textarea 
                    required rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                    placeholder="Provide a general overview of the role, team environment, and daily goals..."
                    className="w-full bg-black border-2 border-foreground/10 p-3 text-white text-sm focus:border-primary outline-none resize-none font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-white/40 ml-1">Job Requirements * (One per line)</label>
                  <textarea 
                    required rows={4} value={form.requirements} onChange={e => setForm({...form, requirements: e.target.value})}
                    placeholder="Enter requirements newline-separated, for example:&#10;Proficiency in React and Next.js&#10;Experience with Tailwind CSS&#10;A sharp eye for premium web aesthetics"
                    className="w-full bg-black border-2 border-foreground/10 p-3 text-white text-sm focus:border-primary outline-none resize-none font-sans"
                  />
                </div>

                {/* Accent Color Preset Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-white/40 ml-1 block">Branding Theme Color (Accent)</label>
                  <div className="flex gap-3 flex-wrap">
                    {COLOR_PRESETS.map((preset) => (
                      <button
                        type="button"
                        key={preset.hex}
                        onClick={() => setForm({ ...form, accentColor: preset.hex })}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase border-2 border-black transition-all ${
                          form.accentColor === preset.hex ? "shadow-[2px_2px_0px_0px_#000]" : "opacity-60 scale-95"
                        }`}
                        style={{ backgroundColor: preset.hex, color: preset.hex === "#ffc301" ? "#000" : "#fff" }}
                      >
                        {form.accentColor === preset.hex && <Check className="w-3.5 h-3.5" />}
                        {preset.name}
                      </button>
                    ))}
                    
                    {/* Custom input */}
                    <input 
                      type="text"
                      value={form.accentColor}
                      onChange={e => setForm({...form, accentColor: e.target.value})}
                      placeholder="#hex"
                      className="bg-black border-2 border-foreground/10 text-white font-semibold font-sans text-xs px-3 py-1 w-24 text-center focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <button 
                    type="button" onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-3 border-2 border-black bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-neutral-100 transition-all shadow-[4px_4px_0px_0px_#000]"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" disabled={submitting}
                    className="flex-1 py-3 border-2 border-black bg-[#f00a88] text-white font-black uppercase text-xs tracking-widest disabled:opacity-50 hover:bg-[#d80577] transition-all shadow-[4px_4px_0px_0px_#000]"
                  >
                    {submitting ? "Posting..." : "Post Job Opening"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT JOB MODAL */}
      <AnimatePresence>
        {showEditModal && selectedJob && (
          <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-[#141414] border-3 border-black p-8 shadow-[8px_8px_0px_0px_#ffc301] max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-white font-display uppercase tracking-tight">Edit Job Opening</h2>
                <button onClick={() => { setShowEditModal(false); setSelectedJob(null); }} className="p-1 text-white/40 hover:text-white"><X className="w-6 h-6" /></button>
              </div>

              {error && (
                <div className="mb-6 p-4 border border-red-500 bg-red-500/10 text-red-400 text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" /> {error}
                </div>
              )}

              <form onSubmit={handleEditJob} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-white/40 ml-1">Job Title *</label>
                    <input 
                      type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                      placeholder="e.g. Lead Frontend React Engineer"
                      className="w-full bg-black border-2 border-foreground/10 p-3 text-white text-sm focus:border-secondary outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-white/40 ml-1">Department *</label>
                    <select 
                      value={form.department} onChange={e => setForm({...form, department: e.target.value})}
                      className="w-full bg-black border-2 border-foreground/10 p-3 text-white text-sm focus:border-secondary outline-none appearance-none cursor-pointer"
                    >
                      {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-[#141414]">{d}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-white/40 ml-1">Job Type *</label>
                    <select 
                      value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                      className="w-full bg-black border-2 border-foreground/10 p-3 text-white text-sm focus:border-secondary outline-none appearance-none cursor-pointer"
                    >
                      {JOB_TYPES.map(t => <option key={t} value={t} className="bg-[#141414]">{t}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-white/40 ml-1">Location *</label>
                    <input 
                      type="text" required value={form.location} onChange={e => setForm({...form, location: e.target.value})}
                      placeholder="e.g. Assam / Hybrid"
                      className="w-full bg-black border-2 border-foreground/10 p-3 text-white text-sm focus:border-secondary outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-white/40 ml-1">Required Experience *</label>
                    <input 
                      type="text" required value={form.experience} onChange={e => setForm({...form, experience: e.target.value})}
                      placeholder="e.g. 2+ Years or Strong Portfolio"
                      className="w-full bg-black border-2 border-foreground/10 p-3 text-white text-sm focus:border-secondary outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-white/40 ml-1">Job Description *</label>
                  <textarea 
                    required rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                    placeholder="Provide a general overview of the role, team environment, and daily goals..."
                    className="w-full bg-black border-2 border-foreground/10 p-3 text-white text-sm focus:border-secondary outline-none resize-none font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-white/40 ml-1">Job Requirements * (One per line)</label>
                  <textarea 
                    required rows={4} value={form.requirements} onChange={e => setForm({...form, requirements: e.target.value})}
                    placeholder="Enter requirements newline-separated"
                    className="w-full bg-black border-2 border-foreground/10 p-3 text-white text-sm focus:border-secondary outline-none resize-none font-sans"
                  />
                </div>

                {/* Accent Color Preset Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-white/40 ml-1 block">Branding Theme Color (Accent)</label>
                  <div className="flex gap-3 flex-wrap">
                    {COLOR_PRESETS.map((preset) => (
                      <button
                        type="button"
                        key={preset.hex}
                        onClick={() => setForm({ ...form, accentColor: preset.hex })}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase border-2 border-black transition-all ${
                          form.accentColor === preset.hex ? "shadow-[2px_2px_0px_0px_#000]" : "opacity-60 scale-95"
                        }`}
                        style={{ backgroundColor: preset.hex, color: preset.hex === "#ffc301" ? "#000" : "#fff" }}
                      >
                        {form.accentColor === preset.hex && <Check className="w-3.5 h-3.5" />}
                        {preset.name}
                      </button>
                    ))}
                    
                    {/* Custom input */}
                    <input 
                      type="text"
                      value={form.accentColor}
                      onChange={e => setForm({...form, accentColor: e.target.value})}
                      placeholder="#hex"
                      className="bg-black border-2 border-foreground/10 text-white font-semibold font-sans text-xs px-3 py-1 w-24 text-center focus:border-secondary outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <button 
                    type="button" onClick={() => { setShowEditModal(false); setSelectedJob(null); }}
                    className="flex-1 py-3 border-2 border-black bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-neutral-100 transition-all shadow-[4px_4px_0px_0px_#000]"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" disabled={submitting}
                    className="flex-1 py-3 border-2 border-black bg-[#ffc301] text-black font-black uppercase text-xs tracking-widest disabled:opacity-50 hover:bg-[#e0ab00] transition-all shadow-[4px_4px_0px_0px_#000]"
                  >
                    {submitting ? "Saving..." : "Save Job Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE JOB CONFIRM MODAL */}
      <AnimatePresence>
        {deletingJobId && (
          <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95 }} animate={{ scale: 1 }}
              className="w-full max-w-sm bg-[#141414] border-3 border-red-500 p-6 text-center shadow-[6px_6px_0px_0px_#ef4444]"
            >
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500 animate-bounce" />
              <h3 className="text-lg font-black text-white font-display uppercase tracking-tight">Delete Job Posting?</h3>
              <p className="text-sm text-white/50 mt-1 mb-6 leading-relaxed">
                This will permanently remove this job posting from the career page. Candidates who have already applied will retain their applications, but the post will be lost.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeletingJobId(null)}
                  className="flex-1 py-3 border border-black bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-neutral-100 transition-all shadow-[2.5px_2.5px_0px_0px_#000]"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDeleteJob(deletingJobId)}
                  className="flex-1 py-3 border border-black bg-red-600 text-white font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-all shadow-[2.5px_2.5px_0px_0px_#000]"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CANDIDATE APPLICATION DETAIL MODAL */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-[#141414] border-3 border-black p-8 shadow-[8px_8px_0px_0px_#00b0fc] max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white font-display uppercase tracking-tight">{selectedApp.name}</h2>
                  <p className="text-xs text-white/40 font-mono mt-0.5">Applied for: {selectedApp.roleTitle}</p>
                </div>
                <button onClick={() => setSelectedApp(null)} className="p-1 text-white/40 hover:text-white"><X className="w-6 h-6" /></button>
              </div>

              <div className="space-y-6">
                {/* Contact and Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 border border-white/5 p-4 font-semibold font-sans text-xs">
                  <div className="space-y-2">
                    <p className="text-white/40 font-black uppercase text-[10px] tracking-wider">Candidate Email</p>
                    <p className="text-white flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> {selectedApp.email}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/40 font-black uppercase text-[10px] tracking-wider">Portfolio / Resume</p>
                    <a 
                      href={selectedApp.portfolioUrl} target="_blank" rel="noopener noreferrer"
                      className="text-[#00b0fc] hover:underline flex items-center gap-1.5 font-bold"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> View Portfolio / Resume
                    </a>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/40 font-black uppercase text-[10px] tracking-wider">Application Date</p>
                    <p className="text-white">
                      {new Date(selectedApp.createdAt).toLocaleDateString("en-IN", {
                        weekday: "long", year: "numeric", month: "long", day: "numeric"
                      })} at {new Date(selectedApp.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/40 font-black uppercase text-[10px] tracking-wider">Current Status</p>
                    <div>
                      <span 
                        className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider border font-sans"
                        style={{ 
                          backgroundColor: getStatusColor(selectedApp.status).bg, 
                          color: getStatusColor(selectedApp.status).text, 
                          borderColor: getStatusColor(selectedApp.status).border 
                        }}
                      >
                        {selectedApp.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cover Letter / Pitch */}
                <div className="space-y-2">
                  <p className="text-white/40 font-black uppercase text-[10px] tracking-widest font-display">Candidate Cover Letter & Pitch</p>
                  <div className="w-full bg-black border-2 border-foreground/10 p-5 text-white/80 font-sans text-sm font-medium leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                    {selectedApp.pitch}
                  </div>
                </div>

                {/* Status Update Actions */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <p className="text-xs font-black uppercase tracking-widest text-white/40 text-center">Change Application Status</p>
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => handleUpdateAppStatus(selectedApp.id, "PENDING")}
                      className={`flex-1 py-2.5 border-2 border-black font-black uppercase text-xs tracking-wider transition-all hover:bg-neutral-100 ${
                        selectedApp.status === "PENDING" ? "bg-[#ffc301] text-black shadow-[2px_2px_0px_0px_#000]" : "bg-white text-black"
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleUpdateAppStatus(selectedApp.id, "REVIEWED")}
                      className={`flex-1 py-2.5 border-2 border-black font-black uppercase text-xs tracking-wider transition-all hover:bg-neutral-100 ${
                        selectedApp.status === "REVIEWED" ? "bg-[#00b0fc] text-black shadow-[2px_2px_0px_0px_#000]" : "bg-white text-black"
                      }`}
                    >
                      Reviewed
                    </button>
                    <button
                      onClick={() => handleUpdateAppStatus(selectedApp.id, "REJECTED")}
                      className={`flex-1 py-2.5 border-2 border-black font-black uppercase text-xs tracking-wider transition-all hover:bg-neutral-100 ${
                        selectedApp.status === "REJECTED" ? "bg-red-500 text-white border-black shadow-[2px_2px_0px_0px_#000]" : "bg-white text-black"
                      }`}
                    >
                      Rejected
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <button 
                    onClick={() => setSelectedApp(null)}
                    className="flex-grow py-3 border-2 border-black bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-neutral-100 transition-all shadow-[4px_4px_0px_0px_#000]"
                  >
                    Close Detail Panel
                  </button>
                  <button 
                    onClick={() => setDeletingAppId(selectedApp.id)}
                    className="py-3 px-4 border-2 border-black bg-red-600 text-white font-black uppercase text-xs transition-all shadow-[4px_4px_0px_0px_#000] hover:bg-red-700"
                    title="Delete Application permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE APPLICATION CONFIRM MODAL */}
      <AnimatePresence>
        {deletingAppId && (
          <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95 }} animate={{ scale: 1 }}
              className="w-full max-w-sm bg-[#141414] border-3 border-red-500 p-6 text-center shadow-[6px_6px_0px_0px_#ef4444]"
            >
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h3 className="text-lg font-black text-white font-display uppercase tracking-tight">Delete Candidate Application?</h3>
              <p className="text-sm text-white/50 mt-1 mb-6 leading-relaxed">
                This will permanently delete the application of this candidate from the database. This action is irreversible.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeletingAppId(null)}
                  className="flex-1 py-3 border border-black bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-neutral-100 transition-all shadow-[2.5px_2.5px_0px_0px_#000]"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDeleteApplication(deletingAppId)}
                  className="flex-1 py-3 border border-black bg-red-600 text-white font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-all shadow-[2.5px_2.5px_0px_0px_#000]"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
