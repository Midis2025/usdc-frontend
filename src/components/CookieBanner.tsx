"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "all");
    setVisible(false);
  };

  const necessaryOnly = () => {
    localStorage.setItem("cookie_consent", "necessary");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[998]"
        style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)" }}
      />

      {/* Banner */}
      <div
        className="fixed top-1/2 left-1/2 z-[999] w-[calc(100%-2rem)] max-w-[480px]"
        style={{
          animation: "cookieFadeInScale 0.4s cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        <style>{`
          @keyframes cookieFadeInScale {
            from { opacity: 0; transform: translate(-50%, -46%) scale(0.95); }
            to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          }
        `}</style>

        <div
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{
            background: "rgba(4, 7, 15, 0.55)",
            border: "1px solid rgba(61,174,255,0.12)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(61,174,255,0.06), inset 0 1px 1px rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          }}
        >
          {/* Subtle glass shine */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(61,174,255,0.06) 0%, transparent 40%, transparent 60%, rgba(61,174,255,0.03) 100%)",
            }}
          />

          {/* Header row */}
          <div className="flex items-center gap-3 mb-3 relative z-10">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(61,174,255,0.1)", border: "1px solid rgba(61,174,255,0.25)" }}
            >
              <ShieldCheck className="w-5 h-5" style={{ color: "#3daeff" }} />
            </div>
            <h3 className="text-[14px] font-black uppercase tracking-[0.18em] text-white">
              Cookie Preference
            </h3>
          </div>

          {/* Description */}
          <p
            className="text-[13px] leading-[1.65] mb-5 relative z-10"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            We use cookies and platform hosting technologies to enhance security,
            support site delivery and personalize your experience. Read our{" "}
            <Link
              href="/privacy-policy#cookies"
              className="font-bold underline-offset-2 underline"
              style={{ color: "#3daeff" }}
            >
              Cookie Policy
            </Link>{" "}
            for details.
          </p>

          {/* Buttons */}
          <div className="flex gap-3 relative z-10">
            <button
              onClick={accept}
              className="flex-1 py-3 rounded-xl text-[13px] font-black uppercase tracking-[0.1em] transition-all duration-200 cursor-pointer hover:shadow-[0_4px_20px_rgba(61,174,255,0.3)]"
              style={{
                background: "linear-gradient(135deg, #3daeff 0%, #0082f3 100%)",
                color: "#ffffff",
              }}
            >
              Accept
            </button>
            <button
              onClick={necessaryOnly}
              className="flex-1 py-3 rounded-xl text-[13px] font-black uppercase tracking-[0.1em] transition-all duration-200 cursor-pointer hover:bg-white/[0.08]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1.5px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Necessary only
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
