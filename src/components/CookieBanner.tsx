"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie_consent");
      if (!consent) {
        const t = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(t);
      }
    } catch {
      // In case localStorage is blocked by private browsing mode
      setVisible(false);
    }
  }, []);

  const accept = useCallback(() => {
    try {
      localStorage.setItem("cookie_consent", "all");
    } catch {}
    setVisible(false);
  }, []);

  const necessaryOnly = useCallback(() => {
    try {
      localStorage.setItem("cookie_consent", "necessary");
    } catch {}
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie Preferences"
      className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-[999] w-[calc(100%-1.25rem)] sm:w-[calc(100%-2rem)] max-w-[460px] pointer-events-auto select-none"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        animation: "cookieSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
      }}
    >
      <style>{`
        /* Only animate transform Y/scale — the aside is centered via the CSS
           translate property (-translate-x-1/2), which composes with transform;
           putting translate(-50%) here too would shift it left twice. */
        @keyframes cookieSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div
        className="rounded-[20px] p-4 sm:p-5 relative overflow-hidden"
        style={{
          background: "rgba(4, 7, 15, 0.92)",
          border: "1px solid rgba(61, 174, 255, 0.2)",
          boxShadow: "0 16px 48px rgba(0, 0, 0, 0.75), 0 0 30px rgba(61, 174, 255, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        }}
      >
        {/* Subtle glass shine */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[20px]"
          style={{
            background: "linear-gradient(135deg, rgba(61,174,255,0.08) 0%, transparent 45%, transparent 60%, rgba(61,174,255,0.04) 100%)",
          }}
        />

        {/* Header row with Close Icon */}
        <div className="flex items-center justify-between gap-3 mb-2.5 relative z-10">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(61,174,255,0.12)", border: "1px solid rgba(61,174,255,0.3)" }}
            >
              <ShieldCheck className="w-4 h-4" style={{ color: "#3daeff" }} />
            </div>
            <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-white">
              Cookie Preferences
            </h3>
          </div>

          <button
            type="button"
            onClick={necessaryOnly}
            className="p-1 rounded-md text-white/40 hover:text-white/80 active:text-white transition-colors cursor-pointer"
            aria-label="Dismiss cookie banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p
          className="text-[12px] sm:text-[12.5px] leading-[1.55] mb-4 relative z-10"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          We use cookies to enhance security, analyze traffic, and support platform delivery. Read our{" "}
          <Link
            href="/privacy-policy#cookies"
            className="font-bold underline underline-offset-2 hover:text-[#58c4ff] transition-colors"
            style={{ color: "#3daeff" }}
          >
            Cookie Policy
          </Link>{" "}
          for details.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 relative z-10">
          <button
            type="button"
            onClick={accept}
            className="flex-1 py-2.5 sm:py-3 rounded-xl text-[12px] sm:text-[12.5px] font-black uppercase tracking-[0.08em] transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-[0_4px_16px_rgba(61,174,255,0.25)]"
            style={{
              background: "linear-gradient(135deg, #3daeff 0%, #0082f3 100%)",
              color: "#ffffff",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={necessaryOnly}
            className="flex-1 py-2.5 sm:py-3 rounded-xl text-[12px] sm:text-[12.5px] font-black uppercase tracking-[0.08em] transition-all duration-200 cursor-pointer hover:bg-white/[0.08] active:scale-[0.98]"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.85)",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Necessary Only
          </button>
        </div>
      </div>
    </aside>
  );
}
