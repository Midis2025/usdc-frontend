"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

/* ═══════════════════════ Footer Component ═══════════════════════ */

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitting(true);
    setError(false);
    try {
      const response = await fetch("https://peaceful-power-64c420fe0a.strapiapp.com/api/subcribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          data: {
            fullName: name,
            email: email,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      setSubmitting(false);
      setSuccess(true);
      setEmail("");
      setName("");
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Error subscribing:", err);
      setSubmitting(false);
      setError(true);
      setTimeout(() => setError(false), 5000);
    }
  };

  const socialLinks = [
    {
      href: "https://www.linkedin.com/company/us-data-center/?viewAsMember=true",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      href: "https://x.com/USDataCenters",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      href: "https://www.facebook.com/profile.php?id=61574593116858",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
        </svg>
      ),
    },
    {
      href: "https://www.instagram.com/usdatacenter/?hl=en",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
  ];

  const contactItems = [
    {
      label: "EMAIL US",
      value: "HELLO@USDC.COM",
      icon: <Mail className="w-3.5 h-3.5 text-[#3daeff]" strokeWidth={2.5} />,
    },
    {
      label: "USDC HEADQUARTERS",
      value: "218 NW 24TH ST 2ND FL, MIAMI, FL 33127",
      icon: <MapPin className="w-3.5 h-3.5 text-[#3daeff]" strokeWidth={2.5} />,
    },
  ];

  return (
    <footer className="w-full relative overflow-hidden bg-[#04070f] border-t border-white/[0.05] pt-16 pb-10">
      {/* ── Ambient Glows ── */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-500/[0.03] rounded-full blur-[110px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-12">

        {/* ── Top Grid (Columns) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Logo & Description Column (Left) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
              <Image
                src="/USDC 2.avif"
                alt="USDC Logo"
                width={180}
                height={60}
                className="h-[52px] w-auto"
                priority
              />
            </Link>
            <p className="text-[13.5px] text-white/45 max-w-[420px] leading-[1.8] mt-6 font-normal">
              Powering the future of data with state-of-the-art infrastructure and solutions designed for the demands of the digital economy.
            </p>
            {/* Horizontal Blue Gradient Rule */}
            <div className="w-full h-px bg-gradient-to-r from-blue-500/35 via-blue-500/10 to-transparent my-6" />
            {/* Social Media Link Squares */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-9 h-9 border border-white/12 bg-white/[0.03] hover:bg-[#3daeff]/10 hover:border-[#3daeff]/35 hover:text-[#3daeff] rounded-lg flex items-center justify-center text-white/50 hover:text-[#3daeff] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(61,174,255,0.15)] transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col items-start md:pl-10">
            <h4 className="text-[13.5px] font-black text-white/90 uppercase tracking-widest mb-6">
              Company
            </h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { label: "Home", href: "/" },
                { label: "Our Team", href: "/management-team" },
                { label: "Latest News", href: "/news-insights" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/45 hover:text-[#3daeff] transition-colors duration-200 font-bold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column (Right) */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <h4 className="text-[13.5px] font-black text-white/90 uppercase tracking-widest mb-6">
              Contact Us
            </h4>
            <div className="flex flex-col gap-5">
              {contactItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 group/footeritem">
                  {/* White Circular Icon Holder */}
                  <div className="w-8 h-8 rounded-full bg-blue-500/[0.08] border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover/footeritem:bg-[#3daeff]/20 group-hover/footeritem:border-[#3daeff]/40 transition-all duration-300">
                    {item.icon}
                  </div>
                  {/* Contact Text labels */}
                  <div className="flex flex-col">
                    <span className="text-[9.5px] font-black text-white/35 tracking-wider uppercase leading-none mb-1 group-hover/footeritem:text-white/55 transition-colors">
                      {item.label}
                    </span>
                    <span className="text-[14px] font-black text-white/80 tracking-wide uppercase leading-tight group-hover/footeritem:text-[#3daeff] transition-colors">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Middle Row (Stay Updated & Newsletter) ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 py-8 border-t border-white/[0.05] border-b border-white/[0.05]">
          {/* Subscribe Description */}
          <div className="flex flex-col items-start gap-1.5">
            <h4 className="text-[13.5px] font-black text-white/95 uppercase tracking-widest">
              Stay Updated
            </h4>
            <p className="text-[13px] text-white/45 max-w-[340px] leading-relaxed font-normal">
              Subscribe to our newsletter for the latest insights and data center news.
            </p>
          </div>
          {/* Newsletter Form */}
          {success ? (
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 w-full max-w-[620px] transition-all duration-300">
              <svg className="w-5 h-5 flex-shrink-0 stroke-current text-emerald-400" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="text-[13.5px] font-bold tracking-wide">Thank you! You have successfully subscribed to our newsletter.</span>
            </div>
          ) : error ? (
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-400 w-full max-w-[620px] transition-all duration-300">
              <svg className="w-5 h-5 flex-shrink-0 stroke-current text-rose-400" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="text-[13.5px] font-bold tracking-wide">Subscription failed. Please try again.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-[620px]"
            >
              <input
                type="text"
                placeholder="Enter Your Name"
                required
                disabled={submitting}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full sm:w-auto sm:flex-grow px-5 py-3 rounded-xl bg-[#080d1a]/60 border border-white/[0.08] text-[13.5px] text-white placeholder-white/30 outline-none focus:border-[#3daeff] focus:shadow-[0_0_12px_rgba(61,174,255,0.15)] transition-all duration-300 disabled:opacity-50 mb-2 sm:mb-0"
              />
              <input
                type="email"
                placeholder="Enter Your Email"
                required
                disabled={submitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-auto sm:flex-grow px-5 py-3 rounded-xl bg-[#080d1a]/60 border border-white/[0.08] text-[13.5px] text-white placeholder-white/30 outline-none focus:border-[#3daeff] focus:shadow-[0_0_12px_rgba(61,174,255,0.15)] transition-all duration-300 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#3daeff] to-[#0082f3] hover:from-[#58c4ff] hover:to-[#0091ff] text-white font-black text-[13px] tracking-wider transition-all duration-300 shadow-[0_4px_15px_rgba(61,174,255,0.15)] hover:shadow-[0_4px_20px_rgba(61,174,255,0.35)] cursor-pointer text-center whitespace-nowrap disabled:opacity-50"
              >
                {submitting ? "SUBSCRIBING..." : "SUBSCRIBE"}
              </button>
            </form>
          )}
        </div>

        {/* ── Bottom Row (Copyright & Policy) ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/30 font-bold font-sans text-center sm:text-left">
          <span>© 2026 USDC. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
