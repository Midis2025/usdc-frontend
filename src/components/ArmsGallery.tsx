"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function ArmsGallery() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `all 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  const galleryItems = [
    {
      src: "/arms200_exterior.jpg",
      alt: "ARMS 200 Modular Data Center Exterior Enclosure",
      badge: "EXTERIOR ENCLOSURE",
      title: "All-Weather Deployment Pod",
      desc: "Our structural all-weather containerized pod featuring integrated high-voltage substations, direct utility connections and industrial heat rejection equipment commissioned in weeks instead of years.",
    },
    {
      src: "/arms200_interior.jpg",
      alt: "ARMS 200 Modular Data Center Interior Server Racks",
      badge: "INTERIOR ARCHITECTURE",
      title: "High-Density GPU Clusters",
      desc: "Direct liquid-to-chip manifold distribution, optimized cable management and high-throughput networking fabric engineered specifically to sustain Blackwell cluster workloads.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden bg-[#04070f] py-6 md:pt-8 md:pb-20 border-t border-white/[0.03] select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[550px] h-[550px] bg-cyan-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-10">
          {/* Pill Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#02050c]/70 mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
            style={fadeUp(0)}
          >
            <span className="w-3.5 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[10px] font-bold text-white/80 tracking-[0.2em] uppercase font-sans">
              ARMS 200 IN ACTION
            </span>
          </div>

          <h2
            className="text-[38px] sm:text-[46px] md:text-[56px] lg:text-[56px] font-bold tracking-tight text-white mb-6 font-sans leading-[1.1] uppercase lg:whitespace-nowrap"
            style={fadeUp(100)}
          >
            Physical <span className="text-[#3daeff]">Infrastructure</span> Reality
          </h2>

          <p
            className="text-sm text-white/45 max-w-[720px] leading-relaxed font-sans"
            style={fadeUp(180)}
          >
            See the actual execution of our modular technology. From the containerized outdoor shell{" "}
            <br className="hidden sm:inline" />
            to the dense, liquid-cooled interior layout, every component is optimized for speed, reliability and scaling.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col group"
              style={fadeUp(280 + idx * 100)}
            >
              {/* Image Container with Custom Glow Border & Hover Effects */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#02050c]/40 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-[#3daeff]/35 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.65),0_0_20px_rgba(61,174,255,0.05)]">
                {/* Image */}
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Ambient dark gradient overlay to ensure text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

                {/* Floating Glassmorphic Badge */}
                <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full border border-white/10 bg-black/60">
                  <span className="text-[9px] font-extrabold tracking-widest text-[#3daeff] uppercase font-sans">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Text Description */}
              <div className="mt-6 flex flex-col items-start text-left px-2">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#3daeff] transition-colors duration-300 font-sans">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-white/50 leading-relaxed font-sans font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
