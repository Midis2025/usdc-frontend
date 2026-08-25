"use client";
 
import React, { useRef, useState } from "react";
import {
  User,
  Mail,
  Building2,
  Phone,
  Layers,
  MessageSquareText,
  Send,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { useReveal } from "@/components/contact/useReveal";
 
/* ═══════════════════════ Contact Portal ═══════════════════════
   An immersive "communication portal" instead of a plain form.
   Floating glass panel with a rotating holographic border glow,
   embedded glass input containers and real-time focus highlights.
   ═══════════════════════════════════════════════════════════════ */
 
type FieldKey = "name" | "email" | "company" | "phone" | "service" | "message";
 
const SERVICES = [
  "AI Compute Clusters",
  "Colocation",
  "Cloud Infrastructure",
  "Data Center Build",
  "Power & Cooling",
  "Managed Services",
  "Other / Not sure yet",
];
 
/* Glass input wrapper with holographic focus highlight.
   Defined at module scope (NOT inside ContactPortal) so it keeps a stable
   identity across re-renders — otherwise inputs would lose focus on each
   keystroke as React remounts the subtree. */
function Field({
  fieldKey,
  label,
  icon,
  full,
  focus,
  filled,
  onFocus,
  onBlur,
  children,
}: {
  fieldKey: FieldKey;
  label: string;
  icon: React.ReactNode;
  full?: boolean;
  focus: FieldKey | "";
  filled: boolean;
  onFocus: () => void;
  onBlur: () => void;
  children: React.ReactNode;
}) {
  const isFocused = focus === fieldKey;
  const active = isFocused || filled;
  return (
    <div className={`cx-reveal ${full ? "sm:col-span-2" : ""}`}>
      <label className="block text-[10px] font-semibold text-white/45 tracking-[0.18em] uppercase mb-2 pl-1">
        {label}
      </label>
      <div
        onFocus={onFocus}
        onBlur={onBlur}
        className={`relative rounded-xl border bg-white/[0.025] backdrop-blur-md transition-all duration-300 ${isFocused
            ? "border-[#3daeff]/60 shadow-[0_0_0_1px_rgba(61,174,255,0.35),0_8px_30px_rgba(61,174,255,0.18)]"
            : "border-white/[0.08] hover:border-white/[0.16]"
          }`}
      >
        {/* Holographic focus sheen */}
        <span
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
          style={{
            opacity: isFocused ? 1 : 0,
            background:
              "linear-gradient(120deg, transparent 30%, rgba(61,174,255,0.10) 50%, transparent 70%)",
          }}
        />
        <div className="relative flex items-center gap-3 px-3.5">
          <span
            className={`flex-shrink-0 transition-colors duration-300 ${active ? "text-[#3daeff]" : "text-white/35"
              }`}
          >
            {icon}
          </span>
          {children}
        </div>
      </div>
    </div>
  );
}
 
const inputCls =
  "w-full bg-transparent py-3.5 text-[13px] text-white font-medium placeholder:text-white/30 outline-none";
 
export default function ContactPortal() {
  const sectionRef = useReveal<HTMLDivElement>(110);
  const [focus, setFocus] = useState<FieldKey | "">("");
  const [values, setValues] = useState<Record<FieldKey, string>>({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  const set = (k: FieldKey, v: string) =>
    setValues((s) => ({ ...s, [k]: v }));
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
 
    try {
      const res = await fetch("https://peaceful-power-64c420fe0a.strapiapp.com/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            fullName: values.name,
            email: values.email,
            companyName: values.company || undefined,
            phoneNumber: values.phone || undefined,
            serviceInterested: values.service || undefined,
            message: values.message,
          },
        }),
      });
 
      if (!res.ok) {
        let errDetail = "";
        try {
          const errJson = await res.json();
          console.error("Strapi error response:", JSON.stringify(errJson, null, 2));
          errDetail = errJson?.error?.message || errJson?.error?.details?.errors?.map((e: any) => e.message).join(", ") || "";
        } catch {}
        throw new Error(`Transmission failed (${res.status})${errDetail ? ": " + errDetail : ". Please check your network or try again."}`);
      }
 
      setSent(true);
      setValues({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        message: "",
      });
      window.setTimeout(() => setSent(false), 5000);
    } catch (err: any) {
      console.error("Error submitting contact form:", err);
      setError(err.message || "Failed to transmit message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
 
  const fieldProps = (k: FieldKey) => ({
    fieldKey: k,
    focus,
    filled: values[k].length > 0,
    onFocus: () => setFocus(k),
    onBlur: () => setFocus(""),
  });
 
  return (
    <section
      id="contact-portal"
      className="relative w-full bg-[#04070f] py-20 md:py-28 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-[10%] left-[-8%] w-[460px] h-[460px] bg-blue-500/[0.05] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[0%] right-[-8%] w-[440px] h-[440px] bg-cyan-400/[0.04] rounded-full blur-[140px] pointer-events-none" />
 
      <div
        ref={sectionRef}
        className="relative z-10 w-full max-w-[1180px] mx-auto px-6 md:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
      >
        {/* ── LEFT: intro copy ── */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="cx-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#3daeff]/20 to-[#0091ff]/10 border border-[#3daeff]/30 mb-6">
            <span className="w-4 h-[1.5px] bg-[#3daeff] rounded-full" />
            <span className="text-[9.5px] font-bold tracking-[0.24em] uppercase text-[#7fc8ff]">
              Communication Portal
            </span>
          </div>
 
          <h2 className="cx-reveal text-[34px] sm:text-[42px] font-bold tracking-tight leading-[1.08] text-white mb-5">
            Transmit your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58c4ff] to-[#0091ff]">
              signal
            </span>{" "}
            to our engineers
          </h2>
 
          <p className="cx-reveal text-[14px] text-white/55 leading-[1.8] mb-8 max-w-[420px]">
            Tell us about your workload, capacity targets and timeline. <br />
            Every submission is routed directly to a solutions architect — no
            gatekeepers, no bots.
          </p>
 
          {/* Trust points */}
          <ul className="space-y-3.5">
            {[
              "NDA-ready conversations from first contact",
              "Dedicated architect within 24 hours",
              "Tier III+ design standards by default",
            ].map((t, i) => (
              <li
                key={i}
                className="cx-reveal flex items-start gap-3 text-[13px] text-white/65"
              >
                <CheckCircle2 className="w-4 h-4 text-[#3daeff] mt-0.5 flex-shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
 
        {/* ── RIGHT: glass portal panel ── */}
        <div className="lg:col-span-7 relative cx-reveal" data-delay="200">
          {/* Rotating holographic border glow */}
          <div className="absolute -inset-[1px] rounded-[26px] overflow-hidden pointer-events-none">
            <div
              className="absolute -inset-[40%] cx-spin-slow opacity-70"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, rgba(61,174,255,0.5), transparent 25%, transparent 50%, rgba(140,224,255,0.4), transparent 75%)",
              }}
            />
          </div>
 
          {/* Panel body */}
          <div className="relative rounded-[25px] bg-[#070b16]/80 backdrop-blur-2xl border border-white/[0.08] p-6 sm:p-9 shadow-[0_30px_80px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)]">
            {/* corner accents */}
            <span className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#3daeff]/40 rounded-tl-lg" />
            <span className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#3daeff]/40 rounded-tr-lg" />
            <span className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#3daeff]/40 rounded-bl-lg" />
            <span className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#3daeff]/40 rounded-br-lg" />
 
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              <Field
                {...fieldProps("name")}
                label="Full Name"
                icon={<User className="w-4 h-4" />}
              >
                <input
                  className={inputCls}
                  placeholder="Ada Lovelace"
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  required
                />
              </Field>
 
              <Field
                {...fieldProps("email")}
                label="Email Address"
                icon={<Mail className="w-4 h-4" />}
              >
                <input
                  type="email"
                  className={inputCls}
                  placeholder="you@company.com"
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  required
                />
              </Field>
 
              <Field
                {...fieldProps("company")}
                label="Company Name"
                icon={<Building2 className="w-4 h-4" />}
              >
                <input
                  className={inputCls}
                  placeholder="Acme AI Labs"
                  value={values.company}
                  onChange={(e) => set("company", e.target.value)}
                />
              </Field>
 
              <Field
                {...fieldProps("phone")}
                label="Phone Number"
                icon={<Phone className="w-4 h-4" />}
              >
                <input
                  type="tel"
                  className={inputCls}
                  placeholder="+1 (555) 123-4567"
                  value={values.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </Field>
 
              <Field
                {...fieldProps("service")}
                label="Service Interested In"
                icon={<Layers className="w-4 h-4" />}
                full
              >
                <select
                  className={`${inputCls} appearance-none cursor-pointer ${values.service ? "text-white" : "text-white/30"
                    }`}
                  value={values.service}
                  onChange={(e) => set("service", e.target.value)}
                >
                  <option value="" disabled className="bg-[#070b16]">
                    Select a service…
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="bg-[#070b16] text-white">
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-white/35 flex-shrink-0 pointer-events-none" />
              </Field>
 
              <Field
                {...fieldProps("message")}
                label="Message"
                icon={
                  <MessageSquareText className="w-4 h-4 mt-3.5 self-start" />
                }
                full
              >
                <textarea
                  rows={4}
                  className={`${inputCls} resize-none`}
                  placeholder="Tell us about your workload, target capacity (MW), region and timeline…"
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                  required
                />
              </Field>
 
              {/* Submit — magnetic + glow */}
              <div className="sm:col-span-2 mt-1 cx-reveal">
                {error && (
                  <div className="mb-4 text-center text-xs font-semibold tracking-wider text-red-400 bg-red-950/20 border border-red-500/35 rounded-xl py-3 px-4">
                    {error}
                  </div>
                )}
                <MagneticSubmit sent={sent} isSubmitting={isSubmitting} />
                <p className="text-[11px] text-white/35 text-center mt-3.5">
                  By transmitting, you agree to our privacy policy. We respond
                  within two business hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
 
/* Magnetic, glowing submit button */
function MagneticSubmit({ sent, isSubmitting }: { sent: boolean; isSubmitting: boolean }) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
 
  const onMove = (e: React.MouseEvent) => {
    if (isSubmitting) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setOffset({
      x: (e.clientX - (r.left + r.width / 2)) * 0.25,
      y: (e.clientY - (r.top + r.height / 2)) * 0.35,
    });
  };
 
  return (
    <button
      ref={ref}
      type="submit"
      disabled={isSubmitting || sent}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      className="group relative w-full py-4 rounded-xl overflow-hidden text-white text-[12.5px] font-bold tracking-[0.12em] uppercase flex items-center justify-center gap-2.5 transition-transform duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {/* Animated gradient base */}
      <span className="absolute inset-0 bg-gradient-to-r from-[#0082f3] via-[#3daeff] to-[#0082f3] cx-gradient-flow" />
      {/* Glow pulse */}
      <span className="absolute inset-0 shadow-[0_0_30px_rgba(61,174,255,0.5)] cx-pulse opacity-60" />
      {/* Light sweep on hover */}
      <span className="absolute top-0 bottom-0 w-1/3 -translate-x-[150%] group-hover:translate-x-[350%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12" />
      <span className="relative flex items-center gap-2.5">
        {sent ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Signal Transmitted
          </>
        ) : isSubmitting ? (
          <>
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            Transmitting...
          </>
        ) : (
          <>
            Transmit Message
            <Send className="w-4 h-4" />
          </>
        )}
      </span>
    </button>
  );
}