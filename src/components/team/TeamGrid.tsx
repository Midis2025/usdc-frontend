"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  X,
  ArrowUpRight,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
}

export default function TeamGrid() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const executiveCouncil: TeamMember[] = [
    {
      id: "hans-vestberg",
      name: "Hans Vestberg",
      role: "Co-Founder",
      image: "/images/97.jpg",
      bio: "Cybersecurity strategist safeguarding DigiPowerX's high-performance compute networks, physical assets and data sovereignty."
    },
    {
      id: "michel-amar",
      name: "Michel Amar",
      role: "Chief Executive Officer",
      image: "/images/96.jpg",
      bio: "Michel Amar is a French-American businessman and entrepreneur known for his success in innovative technology, such as blockchain and electronics, as well as developing branded fashion. With a Bachelor's degree in accounting and business management, Michel has worked and consulted with some of the most famous international brands, playing a vital role in their profitability and continued relevance."
    },
    {
      id: "alec-amar",
      name: "Alec Amar",
      role: "President",
      image: "/images/95.jpg",
      bio: "Mr. Amar is an entrepreneur and infrastructure executive with deep experience in energy, high-density data-center development and advanced digital infrastructure. Under Mr. Amar's leadership, DigiPowerX has expanded into multiple U.S. markets with a growing portfolio of high-power data-center properties."
    },
    {
      id: "jagan-jeyapal",
      name: "Jagan Jeyapal",
      role: "Chief Technology Officer",
      image: "/images/jagan_jeyapal_cto.avif",
      bio: "Technical visionary driving the architecture of DigiPowerX's high-performance computing platforms and sustainable infrastructure solutions."
    },
    {
      id: "paul-ciullo",
      name: "Paul Ciullo",
      role: "Chief Financial Officer",
      image: "/images/paul_ciullo_cfo.avif",
      bio: "Financial strategist overseeing the company's fiscal health and capital allocation for massive infrastructure scaling."
    },
    {
      id: "daniel-rotunno",
      name: "Daniel Rotunno",
      role: "VP of Operations",
      image: "/images/daniel_rotunno_vp.avif",
      bio: "Operations expert managing the complex logistics and site deployments for modular data centers."
    },
    {
      id: "luke-marchiori",
      name: "Luke Marchiori",
      role: "Chief Renewable Energy Officer",
      image: "/images/ChatGPT%20Image%20May%2018%2C%202026%2C%2004_04_40%20PM.avif",
      bio: "Leading the integration of clean power sources with high-density compute facilities."
    },
    {
      id: "jim-mccabe",
      name: "Jim McCabe",
      role: "Advisor",
      image: "/images/ChatGPT%20Image%20May%2018%2C%202026%2C%2004_04_42%20PM.avif",
      bio: "Real estate and infrastructure development veteran with 15+ years of experience leading hyperscale site acquisitions and construction."
    },
    {
      id: "eddie-cloud",
      name: "Eddie Cloud",
      role: "Infrastructure and Development Lead",
      image: "/images/ChatGPT%20Image%20May%2018%2C%202026%2C%2004_04_43%20PM.avif",
      bio: "Specialist in thermal dynamics and structural engineering, pioneering innovative liquid cooling architectures for high-density AI clusters."
    },
    {
      id: "venkat-rangasamy",
      name: "Venkat Rangasamy",
      role: "VP of AI Infrastructure",
      image: "/images/ChatGPT%20Image%20May%2018%2C%202026%2C%2004_04_45%20PM.avif",
      bio: "Energy sector expert specializing in grid-scale renewable integration, microgrids and high-voltage substation designs."
    },
    {
      id: "naresh-kumar",
      name: "Naresh Kumar",
      role: "Head of AI Factory Platform & Deployment Engineering",
      image: "/images/naresh.jpg",
      bio: "Head of AI Factory Platform & Deployment Engineering at DigiPower X | GPU Clouds | GPUaaS | AI Factories | HPC Platforms | Data Centers",
      linkedin: "https://www.linkedin.com/in/inareshkr/"
    }
  ];

  return (
    <div className="w-full bg-[#04070f] z-10 select-none">
      {/* CSS Keyframes for Scanline and FadeIn */}
      {styleTag}

      {/* ── SECTION 1: EXECUTIVE COUNCIL ── */}
      <section className="py-6 md:py-20 lg:py-24 bg-[#04070f] relative border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
          {/* Header */}
          <div className="flex flex-col items-start text-left border-b border-white/[0.06] pb-8 mb-6 md:mb-16">

            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
              Executive Council
            </h2>
          </div>

          {/* Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-[1140px] mx-auto">
            {executiveCouncil.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="group relative aspect-[3/4] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:shadow-[0_25px_60px_rgba(61,174,255,0.15)] transition-all duration-500 hover:scale-[1.02] cursor-pointer flex flex-col border border-white/[0.05]"
              >
                {/* Background Headshot Image */}
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 z-0" />

                {/* Circle Chevron Button on Hover */}
                <div className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-[#3daeff] flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ChevronRight className="w-5 h-5 text-black stroke-[3]" />
                </div>

                {/* Info Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-start z-10 text-left">
                  <div className="w-10 h-[2.5px] bg-[#3daeff] mb-4" />
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1.5 uppercase font-sans">
                    {member.name}
                  </h3>
                  <span className="text-[11px] sm:text-[12px] font-bold tracking-widest text-[#3daeff] uppercase">
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYSTEM DOSSIER MODAL OVERLAY (FOR EXECUTIVE COUNCIL) ── */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
          <div className="relative w-full max-w-[800px] bg-[#02050c] border border-white/[0.08] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(61,174,255,0.05)]">
            {/* Modal HUD Header */}
            <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-5 border-b border-white/[0.06] bg-white/[0.01]">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3daeff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3daeff]"></span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-[#3daeff] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold truncate">
                  FILE_{selectedMember.id.toUpperCase()}_FULL
                </span>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-1.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 text-white/60 hover:text-white transition-all cursor-pointer flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Core Contents */}
            <div className="p-5 sm:p-8 md:p-10 max-h-[80dvh] overflow-y-auto ios-scroll">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Left Column: Headshot (4 cols) */}
                <div className="md:col-span-4 flex flex-col items-center">
                  <div className="w-[180px] h-[220px] rounded-2xl border border-[#3daeff]/30 flex items-center justify-center relative overflow-hidden shadow-[0_0_20px_rgba(61,174,255,0.15)] bg-[#030810]">
                    <Image
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      fill
                      sizes="180px"
                      className="w-full h-full object-cover"
                    />
                    {/* Scanning laser line animation */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-[#3daeff]/60 shadow-[0_0_10px_#3daeff] pointer-events-none animate-[scanline_3.5s_ease-in-out_infinite]" />
                  </div>
                  <span className="text-[9px] font-mono text-[#3daeff] tracking-widest uppercase mt-4">
                    BIOMETRIC STABLE
                  </span>
                </div>

                {/* Right Column: Bio Details (8 cols) */}
                <div className="md:col-span-8 flex flex-col items-start text-left">
                  <h3 className="text-3xl font-black text-white tracking-tight mb-1 uppercase font-sans">
                    {selectedMember.name}
                  </h3>
                  <span className="text-xs font-mono font-bold text-[#3daeff] tracking-wider uppercase mb-6">
                    {selectedMember.role}
                  </span>

                  <div className="text-[14px] text-white/60 leading-relaxed font-normal mb-8 space-y-4">
                    <p>{selectedMember.bio}</p>
                  </div>

                  {/* LinkedIn & Contact Buttons */}
                  <div className="flex gap-4 pt-2">
                    <a
                      href={selectedMember.linkedin || "https://www.linkedin.com/company/digi-power-x/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-semibold text-[10px] uppercase tracking-widest hover:bg-[#3daeff] hover:text-white transition-all duration-300"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <Link
                      href="/contact"
                      className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-xl font-semibold text-[10px] uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      onClick={() => setSelectedMember(null)}
                    >
                      <Mail size={12} className="text-white/60" />
                      <span>Contact</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#3daeff] rounded-tl-[28px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#3daeff] rounded-br-[28px] pointer-events-none" />
          </div>
        </div>
      )}
    </div>
  );
}

const styleTag = (
  <style
    dangerouslySetInnerHTML={{
      __html: `
        @keyframes scanline {
          0% { transform: translateY(0); }
          50% { transform: translateY(220px); }
          100% { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `,
    }}
  />
);
