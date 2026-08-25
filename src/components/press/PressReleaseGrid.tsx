"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slugify } from "@/utils/slugify";
import {
  Calendar,
  ArrowUpRight,
  Search,
  ChevronDown,
  Sparkles,
  Building2,
  Server,
  Cpu,
  Globe2,
  Zap,
  Award,
  TrendingUp,
  Clock,
  MoveRight,
} from "lucide-react";

/* ═══════════════════════════ Press Release Grid ═══════════════════════════
   Bento-grid editorial layout with varied card sizes, gradient mesh
   backgrounds, clean modern typography and cinematic hover effects.
   All press releases flow in a single clean grid.
   ═══════════════════════════════════════════════════════════════════════ */

interface PressRelease {
  id: number;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  tag: string;
  icon: React.ElementType;
  featured?: boolean;
  publishedDate?: string;
  readTime?: string;
  content?: string;
  author?: string;
  pdfUrl?: string;
}

const pressReleases: PressRelease[] = [
  {
    id: 1,
    category: "PARTNERSHIP",
    date: "June 12, 2025",
    title: "USDC Partners with NVIDIA to Deploy Next-Gen Blackwell GPU Clusters Across Global Data Centers",
    excerpt: "Strategic partnership accelerates AI infrastructure deployment with NVIDIA's latest Blackwell architecture, enabling unprecedented compute density and energy efficiency across USDC's global network.",
    tag: "AI Infrastructure",
    icon: Cpu,
    featured: true,
    readTime: "5 min read",
  },
  {
    id: 2,
    category: "EXPANSION",
    date: "May 28, 2025",
    title: "USDC Announces $2.5 Billion Investment in Sovereign AI Data Centers Across Southeast Asia",
    excerpt: "Massive expansion initiative targets key markets in Singapore, Indonesia and Malaysia to meet surging demand for localized AI compute infrastructure.",
    tag: "Global Expansion",
    icon: Globe2,
    featured: true,
    readTime: "4 min read",
  },
  {
    id: 3,
    category: "TECHNOLOGY",
    date: "May 15, 2025",
    title: "Revolutionary Liquid Cooling System Achieves 40% Energy Reduction in AI Workload Operations",
    excerpt: "USDC's proprietary advanced cooling technology sets new industry benchmarks for sustainability in high-density compute environments, optimizing energy usage across all global facilities.",
    tag: "Innovation",
    icon: Zap,
    readTime: "3 min read",
  },
  {
    id: 4,
    category: "CORPORATE",
    date: "April 30, 2025",
    title: "USDC Achieves Tier IV Certification for All North American Data Center Facilities",
    excerpt: "Industry-leading uptime guarantees and fault-tolerant infrastructure design receive highest certification from the Uptime Institute, setting a new standard for reliability.",
    tag: "Certification",
    icon: Award,
    readTime: "3 min read",
  },
  {
    id: 5,
    category: "PARTNERSHIP",
    date: "April 18, 2025",
    title: "Oracle Cloud Infrastructure Selects USDC as Preferred Colocation Partner for Enterprise AI",
    excerpt: "Multi-year agreement positions USDC as a key enabler of Oracle's distributed cloud strategy for enterprise AI workloads, accelerating deployment speeds.",
    tag: "Cloud",
    icon: Server,
    readTime: "4 min read",
  },
  {
    id: 6,
    category: "EXPANSION",
    date: "March 25, 2025",
    title: "Groundbreaking Ceremony for USDC's 500MW Hyperscale Campus in Northern Virginia",
    excerpt: "The largest single-phase data center development in the region will serve hyperscale cloud providers and AI-native enterprises, expanding digital capacity.",
    tag: "Construction",
    icon: Building2,
    readTime: "3 min read",
  },
  {
    id: 7,
    category: "TECHNOLOGY",
    date: "March 10, 2025",
    title: "USDC Launches AI-Powered Predictive Maintenance Platform for Data Center Operations",
    excerpt: "Machine learning algorithms analyze thousands of sensor data points in real-time to predict and prevent hardware failures before they impact service, maximizing uptime.",
    tag: "AI Operations",
    icon: Sparkles,
    readTime: "4 min read",
  },
  {
    id: 8,
    category: "CORPORATE",
    date: "February 22, 2025",
    title: "USDC Reports Record Q4 2024 Revenue, Driven by 300% Growth in AI Compute Demand",
    excerpt: "Strong financial performance reflects surging enterprise demand for GPU-dense infrastructure and colocation services across all regions, driving profitability.",
    tag: "Financial",
    icon: TrendingUp,
    readTime: "5 min read",
  },
];


const categoryColors: Record<string, string> = {
  PARTNERSHIP: "#3daeff",
  EXPANSION: "#0091ff",
  TECHNOLOGY: "#58c4ff",
  CORPORATE: "#8ab4f8",
};

/* Mesh gradient background per category */
const categoryMeshes: Record<string, string> = {
  PARTNERSHIP: "radial-gradient(ellipse at 15% 80%, rgba(61,174,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 20%, rgba(61,174,255,0.08) 0%, transparent 45%)",
  EXPANSION: "radial-gradient(ellipse at 15% 80%, rgba(0,145,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 20%, rgba(0,145,255,0.08) 0%, transparent 45%)",
  TECHNOLOGY: "radial-gradient(ellipse at 15% 80%, rgba(88,196,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 20%, rgba(88,196,255,0.08) 0%, transparent 45%)",
  CORPORATE: "radial-gradient(ellipse at 15% 80%, rgba(138,180,248,0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 20%, rgba(138,180,248,0.08) 0%, transparent 45%)",
};

function getCategoryAndTag(title: string): { category: string; tag: string; icon: React.ElementType } {
  const t = title.toLowerCase();

  // Resolve distinct icons based on keyword matching
  let icon: React.ElementType = Cpu;
  if (t.includes("cooling") || t.includes("liquid") || t.includes("power") || t.includes("energy")) {
    icon = Zap;
  } else if (t.includes("predictive") || t.includes("ai-powered") || t.includes("launch") || t.includes("intelligence") || t.includes("smart")) {
    icon = Sparkles;
  } else if (t.includes("campus") || t.includes("construction") || t.includes("build") || t.includes("groundbreaking") || t.includes("substation")) {
    icon = Building2;
  } else if (t.includes("oracle") || t.includes("cloud") || t.includes("colocation") || t.includes("server")) {
    icon = Server;
  } else if (t.includes("nvidia") || t.includes("blackwell") || t.includes("gpu") || t.includes("compute") || t.includes("hpc")) {
    icon = Cpu;
  } else if (t.includes("tier iv") || t.includes("certification") || t.includes("award") || t.includes("standard")) {
    icon = Award;
  } else if (t.includes("revenue") || t.includes("growth") || t.includes("reports") || t.includes("q4") || t.includes("financial")) {
    icon = TrendingUp;
  } else if (t.includes("sovereign") || t.includes("global") || t.includes("network") || t.includes("expansion") || t.includes("region") || t.includes("southeast asia")) {
    icon = Globe2;
  }

  if (t.includes("financial") || t.includes("results") || t.includes("revenue") || t.includes("quarter") || t.includes("q1") || t.includes("offering") || t.includes("clarification")) {
    return {
      category: "CORPORATE",
      tag: t.includes("results") || t.includes("financial") ? "Financial" : t.includes("clarification") ? "Corporate" : "Stock Update",
      icon,
    };
  }
  if (t.includes("agreement") || t.includes("contract") || t.includes("partner") || t.includes("signs") || t.includes("secures")) {
    return {
      category: "PARTNERSHIP",
      tag: t.includes("colocation") ? "Colocation" : t.includes("sales") ? "Sales" : "Partnership",
      icon,
    };
  }
  if (t.includes("nvidia") || t.includes("rubin") || t.includes("cooling") || t.includes("platform") || t.includes("ai")) {
    return {
      category: "TECHNOLOGY",
      tag: t.includes("nvidia") ? "NVIDIA" : "HPC Tech",
      icon,
    };
  }
  return {
    category: "EXPANSION",
    tag: "Expansion",
    icon,
  };
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getExcerpt(content: string, shortDesc: string | null): string {
  if (shortDesc) return shortDesc;
  if (!content) return "";
  const stripped = content.replace(/<[^>]*>/g, ""); // strip HTML tags
  if (stripped.length <= 180) return stripped;
  return stripped.substring(0, 180).trim() + "...";
}

function getReadTime(content: string): string {
  if (!content) return "3 min read";
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}


export default function PressReleaseGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [inView, setInView] = useState(false);
  const [articles, setArticles] = useState<PressRelease[]>(() =>
    pressReleases.map((pr) => ({ ...pr, pdfUrl: "/brochure.pdf" }))
  );
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<PressRelease | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch(
          "https://peaceful-power-64c420fe0a.strapiapp.com/api/news-articles?populate=*&sort=publishedDate:desc&pagination[pageSize]=100"
        );
        const json = await res.json();
        if (json && Array.isArray(json.data)) {
          const mapped = json.data.map((item: any) => {
            const { category, tag, icon } = getCategoryAndTag(item.title);
            return {
              id: item.id,
              category,
              date: formatDate(item.publishedDate),
              publishedDate: item.publishedDate,
              title: item.title,
              excerpt: getExcerpt(item.content, item.shortDescription),
              tag,
              icon,
              featured: item.featured === true || item.trending === true,
              readTime: getReadTime(item.content),
              content: item.content,
              author: item.author || "Digi Power X Inc.",
              pdfUrl: item.pdfFile?.url || "/brochure.pdf",
            };
          });
          mapped.sort(
            (a: PressRelease, b: PressRelease) =>
              new Date(b.publishedDate ?? 0).getTime() - new Date(a.publishedDate ?? 0).getTime()
          );
          setArticles(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch news articles, using static fallback:", err);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  const filtered = articles.filter((pr) => {
    const ms = searchQuery === "" || pr.title.toLowerCase().includes(searchQuery.toLowerCase()) || pr.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return ms;
  });

  const regular = filtered.slice(0, visibleCount);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(26px)",
    transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  /* Renders a single card — featured variant is taller with more prominent layout */
  const renderCard = (pr: PressRelease, idx: number, isFeatured: boolean) => {
    const color = categoryColors[pr.category] || "#3daeff";
    const mesh = categoryMeshes[pr.category] || categoryMeshes.PARTNERSHIP;
    const Icon = pr.icon;

    return (
      <article
        key={pr.id}
        style={fadeUp(140 + idx * 70)}
        onClick={() => {
          const slug = slugify(pr.title);
          window.open(`/press-release/${slug}`, "_blank");
        }}
        className="group relative rounded-[20px] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1.5 h-full"
      >
        {/* ── Card background ── */}
        <div
          className="absolute inset-0 z-0 transition-all duration-750 group-hover:scale-[1.03] group-hover:brightness-[1.05]"
          style={{
            background: `${mesh}, linear-gradient(160deg, rgba(8,15,32,0.96) 0%, rgba(4,8,20,0.99) 100%)`,
          }}
        />

        {/* ── Border ── */}
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none z-[1] transition-all duration-500"
          style={{
            border: `1px solid rgba(255,255,255,0.04)`,
          }}
        />
        {/* Hover border glow */}
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            border: `1px solid ${color}20`,
            boxShadow: `inset 0 0 0 1px ${color}08, 0 0 40px ${color}06`,
          }}
        />

        {/* ── Glass highlight ── */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: "linear-gradient(165deg, rgba(255,255,255,0.03) 0%, transparent 40%)",
          }}
        />

        {/* ── Top accent line ── */}
        <div
          className="absolute top-0 left-[8%] right-[8%] h-[1px] z-[3] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
          }}
        />

        {/* ── Content ── */}
        <div className="relative z-[5] flex flex-col h-full p-7 sm:p-8">
          {/* Header: Category + Icon */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex flex-col gap-3">
              <span
                className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full w-fit transition-all duration-300"
                style={{
                  color,
                  background: `${color}0c`,
                  border: `1px solid ${color}15`,
                }}
              >
                <span
                  className="w-[5px] h-[5px] rounded-full animate-pulse"
                  style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                />
                {pr.category}
              </span>

              <div className="flex items-center gap-3 text-[10px] text-white/45 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 opacity-60" />
                  {pr.date}
                </span>
                {pr.readTime && (
                  <>
                    <span className="w-[3px] h-[3px] rounded-full bg-white/10" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 opacity-50" />
                      {pr.readTime}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Icon */}
            <div
              className="flex items-center justify-center w-12 h-12 rounded-2xl border flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_25px_rgba(61,174,255,0.15)]"
              style={{
                borderColor: `${color}15`,
                background: `linear-gradient(135deg, ${color}0c, ${color}04)`,
                boxShadow: `0 0 20px ${color}06`,
              }}
            >
              <Icon
                className="w-5 h-5 transition-all duration-500 group-hover:scale-110"
                style={{ color, filter: `drop-shadow(0 0 4px ${color}30)` }}
              />
            </div>
          </div>

          {/* Body: Title + Excerpt */}
          <div className="mt-2 mb-5 flex-grow">
            <h3
              className={`font-semibold text-white/90 leading-[1.35] mb-3 group-hover:text-white transition-colors duration-300 line-clamp-3 ${isFeatured
                  ? "text-[20px] sm:text-[22px] md:text-[24px]"
                  : "text-[16px] sm:text-[17px]"
                }`}
            >
              {pr.title}
            </h3>

            <p
              className={`text-white/50 leading-[1.7] group-hover:text-white/70 transition-colors duration-300 line-clamp-3 ${isFeatured
                  ? "text-[13px]"
                  : "text-[12px]"
                }`}
            >
              {pr.excerpt.length > 140 ? pr.excerpt.slice(0, 140).trim() + "..." : pr.excerpt}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/[0.04]">
            <span className="text-[9px] font-bold text-white/40 tracking-[0.18em] uppercase">
              {pr.tag}
            </span>

            <span
              className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.06em] transition-all duration-300 group-hover:gap-3"
              style={{ color: `${color}90` }}
            >
              Read article
              <MoveRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: `${color}70` }}
              />
            </span>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-6 pb-6 md:pt-12 md:pb-12 overflow-hidden"
      style={{ background: "#04070f" }}
    >
      {/* ── Ambient glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%", left: "50%", width: "1000px", height: "800px",
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse, rgba(30,100,200,0.035) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1120px] mx-auto px-6 md:px-12 lg:px-16">
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-6 md:mb-14">
          <div
            style={fadeUp(0)}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 backdrop-blur-md mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            <span className="w-5 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-semibold text-white/90 tracking-[0.2em] uppercase font-sans">
              Latest Updates
            </span>
          </div>

          <h2
            style={fadeUp(80)}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl font-sans uppercase mb-4"
          >
            DigiPowerX{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6ec8ff] via-[#3daeff] to-[#0091ff] font-extrabold">
              Press Releases
            </span>
          </h2>

          <p style={fadeUp(140)} className="text-[14px] md:text-[16px] text-white/50 leading-relaxed max-w-3xl font-sans font-normal pt-2">
            Explore announcements, partnerships and technology milestones driving the future of infrastructure.
          </p>
        </div>

        {/* ── Search ── */}
        <div style={fadeUp(100)} className="flex items-center justify-end mb-12">
          <div className="relative max-w-[260px] w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/18" />
            <input
              type="text"
              placeholder="Search releases..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(8); }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white/80 text-[11px] placeholder:text-white/18 focus:outline-none focus:border-[#3daeff]/20 focus:bg-white/[0.04] transition-all duration-300"
            />
          </div>
        </div>

        {/* ═══════════════ ARCHIVE — 3-Column Grid ═══════════════ */}
        <div className="flex items-center gap-4 mb-6">
          <span style={fadeUp(200)} className="text-[10px] font-bold text-[#3daeff]/60 tracking-[0.25em] uppercase">
            {searchQuery === "" ? "All Releases" : "Results"}
          </span>
          <div className="h-px flex-grow bg-gradient-to-r from-[#3daeff]/15 to-transparent" />
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {regular.map((pr, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                key={pr.id}
                className="h-full"
              >
                {renderCard(pr, idx + 2, false)}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Load More ── */}
        {visibleCount < filtered.length && (
          <div style={fadeUp(500)} className="flex justify-center mt-14">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="group flex items-center gap-2.5 px-8 py-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-[#3daeff]/18 hover:bg-white/[0.04] text-white/40 hover:text-white text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-300 cursor-pointer"
            >
              Load More
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-5">
              <Search className="w-7 h-7 text-white/10" />
            </div>
            <p className="text-white/30 text-[15px] font-medium mb-1.5">No press releases found</p>
            <p className="text-white/20 text-[12px]">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      {/* ── Premium Article Reader Modal ── */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-xl transition-opacity duration-300"
            onClick={() => setSelectedArticle(null)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#0a1424] to-[#04070f] shadow-[0_24px_60px_rgba(0,0,0,0.8),_0_0_80px_rgba(61,174,255,0.08)] flex flex-col z-10">
            {/* Ambient inner glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#3daeff]/40 to-transparent" />

            {/* Header */}
            <div className="p-6 md:p-8 border-b border-white/[0.06] flex items-start justify-between gap-6">
              <div>
                <span
                  className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full w-fit mb-4"
                  style={{
                    color: categoryColors[selectedArticle.category] || "#3daeff",
                    background: `${categoryColors[selectedArticle.category] || "#3daeff"}0c`,
                    border: `1px solid ${categoryColors[selectedArticle.category] || "#3daeff"}15`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: categoryColors[selectedArticle.category] || "#3daeff" }} />
                  {selectedArticle.category}
                </span>

                <h2 className="text-[20px] md:text-[24px] font-bold text-white leading-tight">
                  {selectedArticle.title}
                </h2>

                <div className="flex items-center gap-3 text-[11px] text-white/40 mt-3">
                  <span>{selectedArticle.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <span>By {selectedArticle.author || "Digi Power X Inc."}</span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-white/[0.08] bg-white/[0.02] text-white/40 hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              <div
                className="text-white/70 text-[13px] md:text-[14px] leading-[1.8] space-y-4 article-content"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content || "" }}
              />
            </div>
          </div>

          {/* Styles for article content override */}
          <style dangerouslySetInnerHTML={{
            __html: `
              .article-content * {
                color: rgba(255, 255, 255, 0.7) !important;
                background-color: transparent !important;
                font-family: inherit !important;
              }
              .article-content strong, .article-content h1, .article-content h2, .article-content h3, .article-content h4 {
                color: #ffffff !important;
              }
              .article-content a {
                color: #3daeff !important;
                text-decoration: underline !important;
              }
              .article-content ul {
                list-style-type: disc !important;
                padding-left: 1.5rem !important;
                margin-bottom: 1rem !important;
              }
              .article-content li {
                margin-bottom: 0.5rem !important;
                left: 0 !important;
                padding: 0 !important;
              }
            `
          }} />
        </div>
      )}
    </section>
  );
}
