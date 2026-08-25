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
} from "lucide-react";

export default function GeneralApplyClient() {
  const [loaded, setLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setFileName(file.name);
  };

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
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#04070f" }}>
        <div className="text-center max-w-md" style={fadeUp(0)}>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ background: "rgba(61,174,255,0.1)", border: "1px solid rgba(61,174,255,0.2)" }}
          >
            <CheckCircle className="w-10 h-10" style={{ color: "#3daeff" }} />
          </div>
          <h2 className="text-[32px] md:text-[42px] font-black text-white uppercase tracking-tight mb-4">
            Application <span style={{ color: "#3daeff" }}>Received</span>
          </h2>
          <p className="text-[15px] font-medium mb-10" style={{ color: "rgba(255,255,255,0.4)" }}>
            Thank you for your interest in joining USDC.
            Our team will review your application and reach out if there&apos;s a match.
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
          href="/career"
          className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase no-underline transition-colors"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Careers
        </Link>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="mb-12" style={fadeUp(0)}>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12" style={{ background: "#3daeff" }} />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: "#3daeff" }}>
              General Application
            </span>
          </div>
          <h1 className="text-[32px] md:text-[48px] font-black text-white leading-[1.0] tracking-tight uppercase mb-4">
            Join the<br />
            <span style={{ color: "#3daeff" }}>USDC Team</span>
          </h1>
          <p className="text-[15px] font-medium max-w-lg" style={{ color: "rgba(255,255,255,0.4)" }}>
            We are always looking for exceptional talent to join our network.
            Submit your general application and we&apos;ll reach out when there&apos;s a fit.
          </p>
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
                <label className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2" style={labelStyle}>
                  <User className="w-3 h-3" style={{ color: "#3daeff" }} />
                  Full Name *
                </label>
                <input
                  required
                  placeholder="John Doe"
                  className="w-full px-5 py-4 rounded-xl text-[15px] font-bold placeholder:text-white/20 focus:ring-1 focus:ring-[#3daeff]/30 transition-all"
                  style={inputStyle}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2" style={labelStyle}>
                  <Mail className="w-3 h-3" style={{ color: "#3daeff" }} />
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  className="w-full px-5 py-4 rounded-xl text-[15px] font-bold placeholder:text-white/20 focus:ring-1 focus:ring-[#3daeff]/30 transition-all"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Phone & LinkedIn row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2" style={labelStyle}>
                  <Phone className="w-3 h-3" style={{ color: "#3daeff" }} />
                  Phone Number
                </label>
                <input
                  placeholder="(555) 123-4567"
                  className="w-full px-5 py-4 rounded-xl text-[15px] font-bold placeholder:text-white/20 focus:ring-1 focus:ring-[#3daeff]/30 transition-all"
                  style={inputStyle}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2" style={labelStyle}>
                  <Globe className="w-3 h-3" style={{ color: "#3daeff" }} />
                  LinkedIn Profile
                </label>
                <input
                  placeholder="linkedin.com/in/yourname"
                  className="w-full px-5 py-4 rounded-xl text-[15px] font-bold placeholder:text-white/20 focus:ring-1 focus:ring-[#3daeff]/30 transition-all"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Resume upload */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2" style={labelStyle}>
                <FileText className="w-3 h-3" style={{ color: "#3daeff" }} />
                Resume / CV *
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className="flex flex-col items-center justify-center gap-3 p-8 rounded-xl cursor-pointer transition-all duration-300"
                style={{
                  background: dragOver ? "rgba(61,174,255,0.06)" : "rgba(255,255,255,0.02)",
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
                    <CheckCircle className="w-8 h-8" style={{ color: "#3daeff" }} />
                    <p className="text-[13px] font-bold text-white">{fileName}</p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                      Click to change file
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8" style={{ color: "rgba(255,255,255,0.2)" }} />
                    <p className="text-[13px] font-bold" style={{ color: "rgba(255,255,255,0.4)" }}>
                      Drop your resume here or <span style={{ color: "#3daeff" }}>browse</span>
                    </p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                      PDF, DOC, DOCX — Max 10 MB
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Cover Letter */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2" style={labelStyle}>
                Tell Us About Yourself
              </label>
              <textarea
                rows={5}
                placeholder="What areas interest you? What skills and experience do you bring?"
                className="w-full px-5 py-4 rounded-xl text-[15px] font-bold placeholder:text-white/20 resize-none focus:ring-1 focus:ring-[#3daeff]/30 transition-all"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-5 rounded-xl font-black uppercase tracking-[0.15em] text-[13px] flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer"
            style={{
              background: "#3daeff",
              color: "#04070f",
              boxShadow: "0 8px 32px rgba(61,174,255,0.25)",
            }}
          >
            <span>Submit Application</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
