"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ExternalLink, Volume2, VolumeX } from "lucide-react";

export default function VideoShowcase() {
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const disableCaptions = useCallback(() => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    try {
      const cw = iframeRef.current.contentWindow;
      // Disable & unload any YouTube caption/subtitle modules
      cw.postMessage(JSON.stringify({ event: "command", func: "unloadModule", args: ["captions"] }), "*");
      cw.postMessage(JSON.stringify({ event: "command", func: "unloadModule", args: ["cc"] }), "*");
      cw.postMessage(JSON.stringify({ event: "command", func: "setOption", args: ["captions", "track", {}] }), "*");
      cw.postMessage(JSON.stringify({ event: "command", func: "setOption", args: ["cc", "track", {}] }), "*");
    } catch {
      // Ignore cross-origin issues
    }
  }, []);

  useEffect(() => {
    // Run multiple attempts to ensure captions are unloaded once the player boots up
    const timers = [
      setTimeout(disableCaptions, 300),
      setTimeout(disableCaptions, 800),
      setTimeout(disableCaptions, 1500),
      setTimeout(disableCaptions, 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [disableCaptions]);

  const toggleSound = () => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    const nextMuted = !isMuted;
    const cw = iframeRef.current.contentWindow;

    // Send postMessage command to YouTube iframe player API
    cw.postMessage(
      JSON.stringify({
        event: "command",
        func: nextMuted ? "mute" : "unMute",
        args: [],
      }),
      "*"
    );

    // Ensure volume is set to 100 when unmuting
    if (!nextMuted) {
      cw.postMessage(
        JSON.stringify({
          event: "command",
          func: "setVolume",
          args: [100],
        }),
        "*"
      );
    }

    // Re-enforce subtitle suppression
    disableCaptions();
    setIsMuted(nextMuted);
  };

  return (
    <section className="relative w-full pt-0 md:pt-0 pb-10 md:pb-16 bg-[#04070f] overflow-hidden select-none">
      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-blue-600/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        {/* ── Main Outer Card Container ── */}
        <div className="w-full rounded-[24px] sm:rounded-[32px] border border-white/[0.08] bg-gradient-to-br from-[#070c1a]/90 via-[#050914]/95 to-[#02050c]/90 backdrop-blur-2xl p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.05)] grid grid-cols-1 lg:grid-cols-[0.85fr_1.35fr] gap-8 md:gap-10 lg:gap-12 xl:gap-14 items-center">

          {/* ── Left Column: Text + Badges + Info ── */}
          <div className="flex flex-col items-start text-left">
            {/* Category / Sub-badge */}
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.25em] text-[#3daeff] uppercase mb-3">
              COLUMBIANA, ALABAMA CAMPUS
            </span>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl md:text-[25px] lg:text-[28px] font-extrabold text-white leading-[1.25] tracking-tight uppercase mb-4">
              Inside the Company’s AI Infrastructure Campus in <span className="text-[#3daeff]">Columbiana, Alabama</span>
            </h2>

            {/* Blue Accent Underline Line */}
            <div className="w-16 h-[3px] bg-[#3daeff] rounded-full mb-5 shadow-[0_0_10px_rgba(61,174,255,0.6)]" />

            {/* Subheading + Body Copy */}
            <p className="text-white/90 text-[13.5px] sm:text-[14.5px] font-semibold leading-relaxed mb-3">
              Purpose-built for the next generation of high-performance computing and artificial intelligence.
            </p>
            <p className="text-[#a0aec0] text-[13px] sm:text-[13.5px] leading-[1.75] font-normal max-w-xl mb-6">
              The deployment features DigiPower X’s modular ARMS 200 infrastructure, engineered to support NVIDIA B300 GPUs with advanced direct-to-chip liquid cooling, high-density power delivery, resilient infrastructure and modular scalability.
            </p>

            {/* Video Meta Info / Attribution */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/[0.06] w-full">
              <span className="text-[11px] font-mono text-white/40 tracking-wider">
                A video from DigiPower X on YouTube
              </span>
              <a
                href="https://youtu.be/HmpA-Fc94BU"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#3daeff] hover:text-[#74c4ff] transition-colors uppercase tracking-wider font-mono"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* ── Right Column: Clean YouTube Video Embed Container with Sound Control ── */}
          <div className="relative w-full">
            <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-[20px] sm:rounded-[24px] overflow-hidden border-2 border-[#3daeff] shadow-[0_0_45px_rgba(61,174,255,0.28),0_15px_40px_rgba(0,0,0,0.85)] group bg-black">
              {/* Scaled & Cropped YouTube Iframe with full CC suppression and origin lock */}
              <iframe
                ref={iframeRef}
                onLoad={disableCaptions}
                src="https://www.youtube-nocookie.com/embed/HmpA-Fc94BU?autoplay=1&mute=1&loop=1&playlist=HmpA-Fc94BU&playsinline=1&rel=0&controls=0&modestbranding=1&enablejsapi=1&cc_load_policy=0&cc_lang_pref=none&iv_load_policy=3"
                title="Inside DigiPower X’s Alabama AI Infrastructure Campus"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[138%] h-[138%] border-0 pointer-events-none"
              />

              {/* Sound ON/OFF Toggle Button */}
              <button
                onClick={toggleSound}
                className="absolute bottom-4 right-4 z-30 px-3 py-2 rounded-full bg-black/75 hover:bg-[#3daeff] backdrop-blur-md border border-white/20 hover:border-[#3daeff] text-white transition-all duration-300 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.6)] flex items-center gap-2 group/btn"
                aria-label={isMuted ? "Turn Sound ON" : "Turn Sound OFF"}
                title={isMuted ? "Turn Sound ON" : "Turn Sound OFF"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-white/80 group-hover/btn:text-white" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono pr-0.5 text-white/90 group-hover/btn:text-white">Sound Off</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#3daeff] group-hover/btn:text-white animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono pr-0.5 text-[#3daeff] group-hover/btn:text-white">Sound On</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
