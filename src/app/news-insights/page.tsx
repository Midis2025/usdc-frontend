"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnerSection from "@/components/PartnerSection";
import {
  Search,
  Calendar,
  Clock,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
  User,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Send,
  Cpu,
  Layers,
  Activity
} from "lucide-react";
import Link from "next/link";

import { sortedArticles, type Article } from "@/data/articlesData";

const categories = [
  "All",
  "Infrastructure",
  "Technology",
  "Data Centers"
];

export default function NewsInsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Newsletter Form State
  const [newsName, setNewsName] = useState("");
  const [newsEmail, setNewsEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Carousel scroll state
  const trendingArticles = sortedArticles.filter((a) => a.trending);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Parallax stars/elements on mouse move
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) * 0.015,
        y: (e.clientY - window.innerHeight / 2) * 0.015,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail || !newsName) return;
    setSubmitting(true);
    try {
      const response = await fetch("https://peaceful-power-64c420fe0a.strapiapp.com/api/subcribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          data: {
            fullName: newsName,
            email: newsEmail,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      setSubmitting(false);
      setSuccess(true);
      setNewsEmail("");
      setNewsName("");
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error subscribing:", error);
      setSubmitting(false);
    }
  };

  const handlePrevSlide = () => {
    setCarouselIndex((prev) => (prev === 0 ? trendingArticles.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCarouselIndex((prev) => (prev === trendingArticles.length - 1 ? 0 : prev + 1));
  };

  // Filter logic
  const filteredArticles = sortedArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" ||
      article.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredStory = sortedArticles[0];

  return (
    <div className="relative min-h-dvh bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden max-w-full w-full select-none">
      {/* Navbar Integration */}
      <Navbar />

      {styleTag}

      {/* ── BACKGROUND EFFECT GRID & LIGHTING ── */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        {/* Futuristic star grid */}
        <div
          className="absolute inset-0 bg-[radial-gradient(#ffffff03_1.2px,transparent_1.2px)] bg-[size:32px_32px] opacity-75"
          style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
        />

        {/* Multi-layered radial glow (Auroras) */}
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/[0.04] blur-[130px] animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute top-[40%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#3daeff]/[0.03] blur-[150px] animate-[pulse_12s_ease-in-out_infinite]" />
        <div className="absolute bottom-[10%] left-[20%] w-[800px] h-[800px] rounded-full bg-indigo-600/[0.02] blur-[160px]" />

      </div>

      {/* ── HERO SECTION ── */}
      <section className="relative w-full min-h-[60vh] md:min-h-screen flex flex-col items-center justify-center pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden border-b border-white/5 animate-fade-in select-none">
        {/* Ambient Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/USDC%20website/Group%20335.webp')" }}
          />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">
          {/* Animated telemetric badge */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-blue-500/20 bg-white/[0.02] mb-6 shadow-[0_0_15px_rgba(61,174,255,0.06)] animate-[fadeIn_1s_ease-out]">
            <div className="w-6 h-0.5 rounded-full bg-[#3daeff]" />
            <span className="text-[10px] font-bold text-white/70 tracking-[0.25em] uppercase font-mono">
              USDC Intelligence Hub
            </span>
          </div>

          {/* Large Cinematic Header */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] lg:leading-[66px] font-bold tracking-tight max-w-5xl leading-[1.1] text-white mb-6 relative z-10 text-center uppercase">
            <span className="animate-slide-up-mask">
              <span className="animate-slide-up-inner [animation-delay:0ms]">News&nbsp;</span>
            </span>
            <span className="animate-slide-up-mask">
              <span className="animate-slide-up-inner [animation-delay:80ms]">&amp;&nbsp;</span>
            </span>
            <span className="animate-slide-up-mask">
              <span className="animate-slide-up-inner [animation-delay:160ms] text-[#3daeff] select-none">Insights</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[14px] md:text-[16px] text-white/50 text-center max-w-[640px] leading-relaxed mb-12">
            Discover high-performance computing blueprints, next-generation cooling architectures, clean power grids and sustainable computing infrastructure innovations.
          </p>

          {/* Glassmorphism Search & Filters Block */}
          <div className="w-full max-w-full p-1.5 rounded-[22px] bg-white/[0.02] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0px_rgba(255,255,255,0.05)] flex flex-col gap-4">

            {/* Futuristic Search bar input */}
            <div className="relative flex items-center w-full min-w-0 px-5 py-3.5 rounded-[16px] bg-black/40 border border-white/5 focus-within:border-[#3daeff]/40 transition-colors duration-300 group">
              <Search className="w-5 h-5 text-white/40 group-focus-within:text-[#3daeff] transition-colors" />
              <input
                type="text"
                placeholder="Search databases, innovations, whitepapers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-w-0 w-full bg-transparent border-none outline-none text-white text-[15px] pl-4 placeholder-white/20 font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="absolute right-4 font-mono text-[9px] text-white/20 tracking-wider hidden sm:block">
                SYS_REQ: ENGAGE
              </div>
            </div>

            {/* Scrolling category filters */}
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1.5 px-2 scrollbar-none">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex-shrink-0 px-5 py-2 rounded-xl text-[12px] font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${isActive
                        ? "bg-[#3daeff] text-black border-[#3daeff] shadow-[0_0_15px_rgba(61,174,255,0.3)] scale-[1.03]"
                        : "bg-white/[0.01] text-white/60 border-white/5 hover:border-white/20 hover:text-white"
                      }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED STORY SECTION ── */}
      {!searchQuery && selectedCategory === "All" && (
        <section className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 pt-12 pb-10 md:pt-10 md:pb-24">
          {/* Section telemetry title */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4 mb-8">
            <span className="text-[11px] font-sans font-extrabold tracking-[0.22em] text-[#3daeff] uppercase">
              01 FEATURED BLUEPRINT
            </span>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-white/[0.08] to-transparent" />
          </div>

          {/* Glassmorphism Featured Card */}
          <div
            onClick={() => featuredStory.url && window.open(featuredStory.url, "_blank")}
            className="group relative w-full rounded-[32px] overflow-hidden border border-white/[0.06] bg-white/[0.01] hover:border-[#3daeff]/30 transition-all duration-500 shadow-[0_30px_60px_rgba(0,0,0,0.65)] hover:shadow-[0_30px_70px_rgba(61,174,255,0.08)] cursor-pointer grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
          >
            {/* Left Content column (7 cols) */}
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-between items-start text-left relative z-10">
              <div className="space-y-6">
                {/* Meta details badge */}
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest bg-[#3daeff]/10 text-[#3daeff] border border-[#3daeff]/20">
                    {featuredStory.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-white/40 text-[11px] font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredStory.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.05] uppercase text-white group-hover:text-[#3daeff] transition-colors duration-300">
                  {featuredStory.title}
                </h2>

                {/* Excerpt */}
                <p className="text-[14px] md:text-[16px] text-white/50 leading-relaxed font-normal max-w-xl whitespace-pre-line">
                  {featuredStory.excerpt.replace(/\s+(\S+)$/, '\u00a0$1')}
                </p>
              </div>

              {/* Action and date */}
              <div className="flex items-center justify-between w-full mt-10 pt-8 border-t border-white/5">
                <div className="flex items-center gap-2 text-white/40 text-[11px] font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{featuredStory.date}</span>
                </div>

                <div className="flex items-center gap-2 bg-[#3daeff] text-black px-6 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-md hover:bg-white hover:text-black transition-all duration-300">
                  <span>View</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Right Image column (5 cols) */}
            <div className="lg:col-span-5 relative aspect-video lg:aspect-auto w-full h-full min-h-[300px] overflow-hidden">
              <Image
                src={featuredStory.image}
                alt={featuredStory.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-[1.04] group-hover:opacity-100 transition-all duration-750"
              />
              {/* Dark left/bottom masks */}
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#04070f] via-transparent to-transparent opacity-90 z-5" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04070f] via-transparent to-transparent lg:hidden opacity-95 z-5" />
            </div>

            {/* Technical HUD corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#3daeff]/20 rounded-tl-[32px] pointer-events-none group-hover:border-[#3daeff]" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#3daeff]/20 rounded-br-[32px] pointer-events-none group-hover:border-[#3daeff]" />
          </div>
        </section>
      )}

      {/* ── LATEST NEWS GRID SECTION ── */}
      <section className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 pt-12 pb-10 md:pt-0 md:pb-24">
        {/* Section title */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-sans font-extrabold tracking-[0.22em] text-[#3daeff] uppercase">
              02 LATEST NEWS ARCHIVES
            </span>
          </div>
          <span className="text-[11px] font-mono text-white/30 uppercase tracking-widest hidden sm:block">
            Found: {filteredArticles.length} files matching queries
          </span>
        </div>

        {/* Empty state */}
        {filteredArticles.length === 0 && (
          <div className="w-full py-20 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
            <Layers className="w-10 h-10 text-white/20 mb-4 animate-[bounce_2s_infinite]" />
            <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-2">No Databases Found</h3>
            <p className="text-sm text-white/40 max-w-sm text-center">
              No articles match your search parameters. Try choosing another category or clearing search filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-6 px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#3daeff] hover:text-black hover:border-[#3daeff] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Grid cards layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => article.url && window.open(article.url, "_blank")}
              className="group relative flex flex-col justify-between rounded-[24px] overflow-hidden border border-white/[0.06] bg-white/[0.01] hover:border-[#3daeff]/30 hover:bg-white/[0.02] transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.55)] hover:shadow-[0_25px_50px_rgba(61,174,255,0.06)] hover:scale-[1.02] cursor-pointer"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#03060c] border-b border-white/5">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                  />
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2.5 py-1 rounded bg-[#04070f]/80 text-[#3daeff] border border-[#3daeff]/20 text-[9px] font-bold uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 md:p-8 space-y-4 text-left">
                  {/* Read time and Date */}
                  <div className="flex items-center gap-4 text-white/40 text-[10px] font-mono">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white line-clamp-2 group-hover:text-[#3daeff] transition-colors duration-300">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom footer bar */}
              <div className="px-6 md:px-8 pb-8 pt-4 flex justify-between items-center border-t border-white/5">
                <span className="text-[10px] font-mono tracking-widest text-[#3daeff]/60 font-semibold group-hover:text-[#3daeff] transition-colors">
                  VIEW
                </span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.01] group-hover:bg-[#3daeff] group-hover:text-black group-hover:border-[#3daeff] transition-all duration-300">
                  <ArrowUpRight className="w-4.5 h-4.5 stroke-[2]" />
                </div>
              </div>

              {/* Tech corner highlights */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 rounded-tl-[24px] pointer-events-none group-hover:border-[#3daeff]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 rounded-br-[24px] pointer-events-none group-hover:border-[#3daeff]" />
            </div>
          ))}
        </div>
      </section>

      {/* ── TRENDING INSIGHTS CAROUSEL ── */}
      <section className="relative z-10 w-full bg-[#050811] border-t border-b border-white/5 pt-14 pb-10 md:py-24 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 relative">

          {/* Header & slide controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.06] pb-6 mb-12 text-left">
            <div>
              <span className="text-[10px] font-sans font-extrabold tracking-[0.22em] text-[#3daeff] uppercase block mb-1">
                03 TRENDING SYSTEMS
              </span>
              <h2 className="text-3xl md:text-[56px] font-black uppercase text-white tracking-tight">
                Trending Insights
              </h2>
            </div>

            {/* Carousel Buttons */}
            <div className="flex gap-3 mt-4 sm:mt-0">
              <button
                onClick={handlePrevSlide}
                className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.02] hover:bg-[#3daeff] hover:text-black hover:border-[#3daeff] text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button
                onClick={handleNextSlide}
                className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.02] hover:bg-[#3daeff] hover:text-black hover:border-[#3daeff] text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Carousel Slider */}
          <div className="relative overflow-hidden w-full py-4">
            <div
              className="flex gap-8 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${carouselIndex * (100 / Math.min(trendingArticles.length, 3)) + (carouselIndex * 2)}%)`
              }}
            >
              {trendingArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => article.url && window.open(article.url, "_blank")}
                  className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.33%-22px)] flex-shrink-0 group relative p-[1px] rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.08] to-transparent hover:from-[#3daeff]/30 cursor-pointer transition-all duration-500 shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
                >
                  <div className="w-full h-full bg-[#03060c] rounded-[23px] p-6 md:p-8 flex flex-col justify-between items-start text-left border border-white/[0.02] space-y-6">
                    <div className="space-y-4 w-full">
                      {/* Meta badge */}
                      <div className="flex justify-between items-center">
                        <span className="px-2.5 py-0.5 rounded text-[8px] font-mono tracking-widest bg-white/5 border border-white/10 uppercase text-white/50">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-mono text-white/40">
                          <Clock size={12} />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#3daeff] transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs text-white/40 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex justify-between items-center w-full pt-4 border-t border-white/5">
                      <span className="text-[10px] font-mono text-white/40">{article.date}</span>
                      <div className="text-[10px] font-mono text-[#3daeff] tracking-widest font-black flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-300">
                        <span>OPEN</span>
                        <ChevronRight size={12} className="stroke-[3]" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FUTURISTIC NEWSLETTER SECTION ── */}
      <section className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 pt-14 pb-10 md:py-24">
        {/* Holographic Container */}
        <div className="relative p-8 md:p-14 lg:p-16 rounded-[40px] border border-white/[0.08] bg-white/[0.01] overflow-hidden text-center max-w-[960px] mx-auto shadow-[0_30px_60px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.05)]">
          {/* Neon side bars */}
          <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#3daeff] to-indigo-500 shadow-[0_0_15px_#3daeff]" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-blue-500/[0.02] blur-[100px] pointer-events-none" />

          {/* Form Content */}
          <div className="relative z-10 max-w-[580px] mx-auto flex flex-col items-center gap-6 text-center">
            
            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center bg-white/[0.02] flex-shrink-0">
              <Mail className="w-6 h-6 text-[#3daeff] animate-[pulse_2s_infinite]" />
            </div>

            {/* Category Subheading */}
            <span className="text-[10px] font-sans font-extrabold tracking-[0.22em] text-[#3daeff] uppercase">
              04 FEATURED NEWSLETTER SYNC
            </span>

            {/* Big Heading */}
            <h2 className="text-3xl md:text-[52px] font-black uppercase text-white tracking-tight leading-none">
              Subscribe to USDC insights
            </h2>

            {/* Description Paragraph */}
            <p className="text-sm text-white/50 max-w-3xl mx-auto leading-relaxed">
              Receive modular server updates, clean energy grid analytics and computing infrastructure breakthroughs directly to your terminal.
            </p>

            {/* Form or Success State */}
            {success ? (
              <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 text-emerald-400 flex flex-col items-center gap-3 w-full max-w-md mx-auto animate-[fadeIn_0.5s_ease-out]">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-[bounce_1.5s_infinite]" />
                <div className="text-center">
                  <h4 className="font-bold text-sm uppercase tracking-wider">Sync Successful</h4>
                  <p className="text-[11px] opacity-70 mt-1">Terminal subscribed. Encryption link dispatched to email.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4 w-full max-w-md mx-auto">
                <div className="grid grid-cols-1 gap-3">

                  {/* Name field */}
                  <div className="relative flex items-center w-full px-5 py-3 rounded-xl bg-black/40 border border-white/5 focus-within:border-[#3daeff]/35 transition-colors duration-300">
                    <User className="w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      placeholder="YOUR NAME"
                      required
                      value={newsName}
                      onChange={(e) => setNewsName(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-white text-[13px] pl-4 placeholder-white/20 font-sans tracking-wide"
                    />
                  </div>

                  {/* Email field */}
                  <div className="relative flex items-center w-full px-5 py-3 rounded-xl bg-black/40 border border-white/5 focus-within:border-[#3daeff]/35 transition-colors duration-300">
                    <Mail className="w-4 h-4 text-white/40" />
                    <input
                      type="email"
                      placeholder="SECURE_EMAIL_ADDRESS"
                      required
                      value={newsEmail}
                      onChange={(e) => setNewsEmail(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-white text-[13px] pl-4 placeholder-white/20 font-sans tracking-wide"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#3daeff] text-black h-12 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] shadow-[0_4px_15px_rgba(61,174,255,0.25)] hover:shadow-[0_4px_25px_rgba(61,174,255,0.4)] hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>ESTABLISHING CONNECTION...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 stroke-[2.5]" />
                      <span>ESTABLISH LINK</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* HUD Tech Corner accents */}
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#3daeff]/20 rounded-tr-[40px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#3daeff]/20 rounded-bl-[40px] pointer-events-none" />
        </div>
      </section>

      {/* ── DETAIL DOSSIER POPUP OVERLAY ── */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
          <div className="relative w-full max-w-[850px] bg-[#02050c] border border-white/[0.08] rounded-[28px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.85),0_0_50px_rgba(61,174,255,0.05)]">

            {/* HUD Title bar */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.06] bg-white/[0.01]">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3daeff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3daeff]"></span>
                </span>
                <span className="text-[10px] font-mono text-[#3daeff] tracking-[0.2em] uppercase font-bold">
                  DATABASE FILE: {selectedArticle.id.toUpperCase()}_READOUT
                </span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 text-white/60 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Readout contents */}
            <div className="p-8 md:p-12 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                {/* Visual block */}
                <div className="md:col-span-5 flex flex-col gap-4">
                  <div className="aspect-[4/5] rounded-2xl border border-white/10 relative overflow-hidden bg-[#03060c] shadow-lg">
                    <Image
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover"
                    />
                    {/* Telemetry line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-[#3daeff]/60 shadow-[0_0_10px_#3daeff] pointer-events-none animate-[scanline_3.5s_ease-in-out_infinite]" />
                  </div>

                  {/* HUD Info block */}
                  <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-2.5 text-left font-mono">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-white/40">METADATA_DECRYPT</span>
                      <span className="text-[#3daeff]">TRUE</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-white/40">TAGS</span>
                      <span className="text-white/70">{selectedArticle.category.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-white/40">READ_TIME</span>
                      <span className="text-white/70">{selectedArticle.readTime.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                {/* Article texts */}
                <div className="md:col-span-7 flex flex-col items-start text-left space-y-6">
                  {/* Category */}
                  <span className="px-3 py-1 rounded bg-[#3daeff]/10 text-[#3daeff] border border-[#3daeff]/20 text-[9px] font-bold uppercase tracking-wider">
                    {selectedArticle.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase leading-tight">
                    {selectedArticle.title}
                  </h3>

                  {/* Timestamp */}
                  <div className="flex items-center gap-1.5 text-white/40 text-xs font-mono">
                    <Calendar size={14} />
                    <span>Published on {selectedArticle.date}</span>
                  </div>

                  <div className="h-[1px] w-full bg-white/5" />

                  {/* Main Paragraph content */}
                  <div className="text-[14px] text-white/60 leading-relaxed space-y-4 font-normal">
                    <p>{selectedArticle.content}</p>
                    <p className="italic text-[12px] text-white/40">
                      Telemetry reports show zero loss of physical hardware efficiency during the deployment sequence. Future system revisions will be cataloged directly under the same node catalog ID.
                    </p>
                  </div>

                  <div className="pt-4 flex gap-4 w-full">
                    {/* CTA Contact */}
                    <Link
                      href="/contact"
                      onClick={() => setSelectedArticle(null)}
                      className="flex items-center justify-center gap-2 bg-[#3daeff] text-black px-6 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                    >
                      <Activity size={14} />
                      <span>Consult Infrastructure</span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>

            {/* Corner frames */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#3daeff] rounded-tl-[28px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#3daeff] rounded-br-[28px] pointer-events-none" />
          </div>
        </div>
      )}

      {/* Partner Section */}
      <PartnerSection />

      {/* Footer Integration */}
      <Footer />
    </div>
  );
}

const styleTag = (
  <style
    dangerouslySetInnerHTML={{
      __html: `
        @keyframes scanline {
          0% { transform: translateY(0); }
          50% { transform: translateY(350px); }
          100% { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
    }}
  />
);
