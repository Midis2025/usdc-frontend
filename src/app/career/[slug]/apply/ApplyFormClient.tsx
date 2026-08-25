"use client";
 
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  Upload,
  CheckCircle,
  User,
  Mail,
  Phone,
  Globe,
  FileText,
  Link2,
} from "lucide-react";
 
interface ApplyFormClientProps {
  jobTitle: string;
  jobSlug: string;
  jobDepartment: string;
  jobLocation: string;
}
 
export default function ApplyFormClient({
  jobTitle,
  jobSlug,
  jobDepartment,
  jobLocation,
}: ApplyFormClientProps) {
  const [loaded, setLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
 
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
 
  const fileRef = useRef<HTMLInputElement>(null);
 
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);
 
  const fadeUp = (d: number): React.CSSProperties => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
  });
 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setFileName(file.name);
    }
  };
 
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setResumeFile(file);
      setFileName(file.name);
    }
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
 
    try {
      // Strapi v4 field names — only include fields with values
      const fields: Record<string, unknown> = {
        fullName,
        email,
        coverLetter,
      };
 
      // phoneNumber confirmed working
      if (phone) fields.phoneNumber = phone;
 
      // Exact Strapi API field IDs confirmed from API response
      if (linkedin) fields.linkedInURL = linkedin;
      if (portfolio) fields.portfolioURL = portfolio;
 
 
 
      console.log("Submitting application for:", jobTitle, fields);
 
      let resumeMediaId: number | null = null;
      if (jobTitle) {
        fields.job_positions = jobTitle;
      }
 
      // Step 1: If a resume file exists, upload it first via /api/upload
      if (resumeFile) {
        const uploadForm = new FormData();
        uploadForm.append("files", resumeFile, resumeFile.name);
 
        const uploadRes = await fetch(
          "https://peaceful-power-64c420fe0a.strapiapp.com/api/upload",
          {
            method: "POST",
            mode: "cors",
            headers: { Accept: "application/json" },
            body: uploadForm,
          }
        );
 
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          resumeMediaId = uploadData?.[0]?.id ?? null;
          console.log("Resume uploaded, media ID:", resumeMediaId);
        } else {
          const uploadErr = await uploadRes.text();
          console.warn("Resume upload failed (continuing without it):", uploadErr);
        }
      }
 
      // Step 2: Create the job application entry via JSON
      if (resumeMediaId) {
        fields.Resume = [resumeMediaId];
      }
 
      const response = await fetch(
        "https://peaceful-power-64c420fe0a.strapiapp.com/api/job-applications",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ data: fields }),
        }
      );
 
      const responseText = await response.text();
 
      if (!response.ok) {
        console.error("Submission failed:", response.status, responseText);
        throw new Error(`Server returned ${response.status}: ${responseText}`);
      }
 
      console.log("Application submitted successfully:", responseText);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting application:", err);
      alert(
        "Failed to submit your application. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };
 
 
  const backLink = jobSlug === "general" ? "/career" : `/career/${jobSlug}`;
 
  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#fff",
    outline: "none",
  };
 
  const labelStyle: React.CSSProperties = {
    color: "rgba(255,255,255,0.35)",
  };
 
  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "#04070f" }}
      >
        <div className="text-center max-w-md" style={fadeUp(0)}>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{
              background: "rgba(61,174,255,0.1)",
              border: "1px solid rgba(61,174,255,0.2)",
            }}
          >
            <CheckCircle className="w-10 h-10" style={{ color: "#3daeff" }} />
          </div>
          <h2 className="text-[32px] md:text-[42px] font-black text-white uppercase tracking-tight mb-4">
            Application <span style={{ color: "#3daeff" }}>Received</span>
          </h2>
          <p
            className="text-[15px] font-medium mb-10"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Thank you for your interest in{" "}
            <span className="text-white font-bold">{jobTitle}</span>.
            Our team will review your application and reach out soon.
          </p>
          <Link
            href="/career"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[12px] font-black tracking-[0.15em] uppercase no-underline transition-all"
            style={{
              background: "#3daeff",
              color: "#04070f",
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen" style={{ background: "#04070f" }}>
      {/* Back link */}
      <div className="mx-auto max-w-4xl px-6 pt-28 md:pt-32">
        <Link
          href={backLink}
          className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase no-underline transition-colors"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {jobSlug === "general" ? "Back to Careers" : "Back to Position"}
        </Link>
      </div>
 
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="mb-12" style={fadeUp(0)}>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12" style={{ background: "#3daeff" }} />
            <span
              className="text-[10px] font-black tracking-[0.4em] uppercase"
              style={{ color: "#3daeff" }}
            >
              Application
            </span>
          </div>
          <h1 className="text-[32px] md:text-[48px] font-black text-white leading-[1.0] tracking-tight uppercase mb-4">
            Apply for
            <br />
            <span style={{ color: "#3daeff" }}>{jobTitle}</span>
          </h1>
          <div
            className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-[0.15em]"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            <span>{jobDepartment}</span>
            <span>•</span>
            <span>{jobLocation}</span>
          </div>
        </div>
 
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6" style={fadeUp(120)}>
          <div
            className="rounded-2xl p-8 md:p-12 space-y-8"
            style={{
              background: "rgba(8,13,26,0.8)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Name & Email row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
                  style={labelStyle}
                >
                  <User className="w-3 h-3" style={{ color: "#3daeff" }} />
                  Full Name *
                </label>
                <input
                  required
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl text-[15px] font-bold placeholder:text-white/20 focus:ring-1 focus:ring-[#3daeff]/30 transition-all"
                  style={inputStyle}
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
                  style={labelStyle}
                >
                  <Mail className="w-3 h-3" style={{ color: "#3daeff" }} />
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl text-[15px] font-bold placeholder:text-white/20 focus:ring-1 focus:ring-[#3daeff]/30 transition-all"
                  style={inputStyle}
                />
              </div>
            </div>
 
            {/* Phone & LinkedIn row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
                  style={labelStyle}
                >
                  <Phone className="w-3 h-3" style={{ color: "#3daeff" }} />
                  Phone Number
                </label>
                <input
                  placeholder="(555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl text-[15px] font-bold placeholder:text-white/20 focus:ring-1 focus:ring-[#3daeff]/30 transition-all"
                  style={inputStyle}
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
                  style={labelStyle}
                >
                  <Globe className="w-3 h-3" style={{ color: "#3daeff" }} />
                  LinkedIn Profile
                </label>
                <input
                  placeholder="linkedin.com/in/yourname"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl text-[15px] font-bold placeholder:text-white/20 focus:ring-1 focus:ring-[#3daeff]/30 transition-all"
                  style={inputStyle}
                />
              </div>
            </div>
 
            {/* Portfolio URL */}
            <div className="space-y-2">
              <label
                className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
                style={labelStyle}
              >
                <Link2 className="w-3 h-3" style={{ color: "#3daeff" }} />
                Portfolio URL
              </label>
              <input
                type="url"
                placeholder="https://yourportfolio.com"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="w-full px-5 py-4 rounded-xl text-[15px] font-bold placeholder:text-white/20 focus:ring-1 focus:ring-[#3daeff]/30 transition-all"
                style={inputStyle}
              />
            </div>
 
            {/* Resume upload */}
            <div className="space-y-2">
              <label
                className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
                style={labelStyle}
              >
                <FileText className="w-3 h-3" style={{ color: "#3daeff" }} />
                Resume / CV *
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className="flex flex-col items-center justify-center gap-3 p-8 rounded-xl cursor-pointer transition-all duration-300"
                style={{
                  background: dragOver
                    ? "rgba(61,174,255,0.06)"
                    : "rgba(255,255,255,0.02)",
                  border: dragOver
                    ? "2px dashed rgba(61,174,255,0.4)"
                    : "2px dashed rgba(255,255,255,0.08)",
                }}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {fileName ? (
                  <>
                    <CheckCircle
                      className="w-8 h-8"
                      style={{ color: "#3daeff" }}
                    />
                    <p className="text-[13px] font-bold text-white">
                      {fileName}
                    </p>
                    <p
                      className="text-[10px]"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Click to change file
                    </p>
                  </>
                ) : (
                  <>
                    <Upload
                      className="w-8 h-8"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    />
                    <p
                      className="text-[13px] font-bold"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      Drop your resume here or{" "}
                      <span style={{ color: "#3daeff" }}>browse</span>
                    </p>
                    <p
                      className="text-[10px]"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      PDF, DOC, DOCX — Max 10 MB
                    </p>
                  </>
                )}
              </div>
            </div>
 
            {/* Cover Letter */}
            <div className="space-y-2">
              <label
                className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
                style={labelStyle}
              >
                Cover Letter
              </label>
              <textarea
                rows={5}
                placeholder="Tell us why you're interested in this role and what you'd bring to the team..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full px-5 py-4 rounded-xl text-[15px] font-bold placeholder:text-white/20 resize-none focus:ring-1 focus:ring-[#3daeff]/30 transition-all"
                style={inputStyle}
              />
            </div>
          </div>
 
          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-5 rounded-xl font-black uppercase tracking-[0.15em] text-[13px] flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: "#3daeff",
              color: "#04070f",
              boxShadow: "0 8px 32px rgba(61,174,255,0.25)",
            }}
          >
            <span>{submitting ? "Submitting…" : "Submit Application"}</span>
            {!submitting && <Send className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}