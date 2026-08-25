"use client";

import React, { useState, useEffect } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [statusText, setStatusText] = useState("INITIALIZING AI SYSTEMS...");

  useEffect(() => {
    // Prevent scrolling during loading
    document.body.style.overflow = "hidden";

    // Cycle through themed technical status logs
    const logs = [
      "ESTABLISHING SECURE CONNECTION...",
      "SYNCHRONIZING GLOBAL NETWORK...",
      "TUNING GPU CLUSTER INTERCONNECTS...",
      "SYSTEM READY."
    ];

    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < logs.length) {
        setStatusText(logs[logIndex]);
        logIndex++;
      }
    }, 400);

    // Fade out timing
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 1800);

    // Unmount/remove loader timing
    const removeTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "unset";
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#04070f] z-[9999] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        fade ? "opacity-0 scale-[1.03] pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Custom Keyframes & Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes loaderSpin {
            to { transform: rotate(360deg); }
          }
          @keyframes loaderSpinReverse {
            to { transform: rotate(-360deg); }
          }
          .animate-loader-spin {
            animation: loaderSpin 12s linear infinite;
          }
          .animate-loader-spin-fast {
            animation: loaderSpin 1.2s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite;
          }
          .animate-loader-spin-reverse {
            animation: loaderSpinReverse 0.8s linear infinite;
          }
        `
      }} />

      {/* Ambient background glow behind spinner */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#3daeff]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      {/* Main loading container */}
      <div className="flex flex-col items-center gap-8 relative z-10">
        
        {/* Outer and Inner spinner ring container */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Outer glowing technical HUD ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#3daeff]/20 animate-loader-spin" />
          
          {/* Outer active spinner ring */}
          <div className="absolute inset-0 rounded-full border-t border-r border-transparent border-t-[#3daeff] border-r-[#3daeff] animate-loader-spin-fast" />
          
          {/* Inner reverse spinner ring */}
          <div className="absolute w-20 h-20 rounded-full border-b border-l border-transparent border-b-[#0082f3] border-l-[#0082f3] animate-loader-spin-reverse opacity-80" />

          {/* USDC logo SVG in the center (pulsing) */}
          <div className="absolute z-10 w-9 h-11 opacity-90 animate-pulse flex items-center justify-center">
            <svg viewBox="0 0 62 77" fill="none" className="w-full h-full drop-shadow-[0_0_12px_rgba(61,174,255,0.7)]" xmlns="http://www.w3.org/2000/svg">
              <path d="M38.6689 5.26562V71.8086L35.9668 73.375L30.7109 76.4209L11.3174 65.1826L0.5 58.9102V18.3027L10.5664 12.2891V53.2373L10.8154 53.3818L30.333 64.6934L31.084 65.1289V0.867188L38.6689 5.26562Z" fill="#3daeff" stroke="#3daeff"/>
              <path d="M49.3467 11.4551V65.6172L42.5 69.5859V7.48633L49.3467 11.4551Z" fill="#3daeff" stroke="#3daeff"/>
              <path d="M60.6973 18.0343V59.0402L53.1797 63.3956V13.6779L60.6973 18.0343Z" fill="#3daeff" stroke="#3daeff"/>
            </svg>
          </div>
        </div>

        {/* Tech stats and text logs */}
        <div className="flex flex-col items-center gap-2 text-center px-4">
          <div className="text-[11px] font-bold text-white tracking-[0.25em] font-sans uppercase animate-pulse select-none">
            LOADING USDC
          </div>
          <div className="text-[9px] font-semibold text-[#3daeff] tracking-[0.2em] font-mono select-none h-4 uppercase opacity-85">
            {statusText}
          </div>
        </div>
      </div>
    </div>
  );
}
