"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Eye, Database, Lock, Globe, Users, Bell, Cookie, Scale } from "lucide-react";

const LAST_UPDATED = "July 1, 2026";

interface Section {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

export default function PrivacyPolicyClient() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (d: number): React.CSSProperties => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
  });

  const cardStyle: React.CSSProperties = {
    background: "rgba(8,13,26,0.8)",
    border: "1px solid rgba(255,255,255,0.06)",
  };

  const sections: Section[] = [
    {
      icon: <Eye className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "1. Information We Collect",
      content: (
        <div className="space-y-4">
          <p><strong className="text-white">Personal Information:</strong> When you contact us, apply for a position, subscribe to our newsletter, or request information about our services, we may collect your name, email address, phone number, company name, job title and mailing address.</p>
          <p><strong className="text-white">Technical Information:</strong> We automatically collect certain technical data when you visit our website, including IP address, browser type, device information, operating system, referring URLs and pages visited.</p>
          <p><strong className="text-white">Cookies &amp; Tracking:</strong> We use cookies, web beacons and similar technologies to enhance your experience, analyze site traffic and understand usage patterns. See our Cookie Policy section below for more details.</p>
          <p><strong className="text-white">Business Information:</strong> For enterprise clients and partners, we may collect company-related data necessary for service provisioning, including facility requirements, power capacity needs and infrastructure specifications.</p>
        </div>
      ),
    },
    {
      icon: <Database className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "2. How We Use Your Information",
      content: (
        <div className="space-y-3">
          <p>We use the information we collect for the following purposes:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> To provide, operate and maintain our data center services and infrastructure solutions.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> To process and respond to your inquiries, service requests and partnership opportunities.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> To send you relevant updates about our services, new facilities, investor relations and industry news (with your consent).</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> To process job applications and communicate with candidates about career opportunities.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> To improve our website, services and user experience through analytics and research.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> To comply with legal obligations, enforce our agreements and protect our rights.</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <Lock className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "3. Data Security",
      content: (
        <div className="space-y-4">
          <p>USDC takes the security of your personal information seriously. As a data center operator managing mission-critical infrastructure, we apply the same rigorous security standards to our website and customer data. We implement industry-standard technical and organizational measures including:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> TLS/SSL encryption for all data transmissions.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Access controls and authentication protocols to limit data access to authorized personnel.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Regular security audits and vulnerability assessments.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Physical security at our data center facilities including 24/7 surveillance and biometric access.</li>
          </ul>
          <p>While we strive to protect your personal information, no method of transmission over the internet or electronic storage is 100% secure.</p>
        </div>
      ),
    },
    {
      icon: <Users className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "4. Information Sharing & Third Parties",
      content: (
        <div className="space-y-4">
          <p>We do not sell, rent, or trade your personal information. We may share your data only in the following circumstances:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> <strong className="text-white">Service Providers:</strong> Trusted third-party vendors who assist us in operating our website, conducting business, or servicing you (e.g., analytics, email services, CRM platforms).</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> <strong className="text-white">Legal Requirements:</strong> When required by law, regulation, legal process, or governmental request.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> <strong className="text-white">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> <strong className="text-white">With Consent:</strong> When you have given explicit consent for specific sharing purposes.</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <Cookie className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "5. Cookies & Tracking Technologies",
      content: (
        <div className="space-y-4">
          <p>Our website uses cookies and similar tracking technologies to personalize content, analyze traffic and improve functionality. Types of cookies we use:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> <strong className="text-white">Essential Cookies:</strong> Required for the website to function properly, including session management and security features.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> <strong className="text-white">Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting information anonymously.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> <strong className="text-white">Preference Cookies:</strong> Remember your settings and preferences for a personalized experience.</li>
          </ul>
          <p>You can manage cookie preferences through your browser settings. Disabling certain cookies may affect website functionality.</p>
        </div>
      ),
    },
    {
      icon: <Scale className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "6. Your Rights",
      content: (
        <div className="space-y-4">
          <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> <strong className="text-white">Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> <strong className="text-white">Correction:</strong> Request correction of inaccurate or incomplete data.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> <strong className="text-white">Deletion:</strong> Request deletion of your personal data, subject to legal retention requirements.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> <strong className="text-white">Opt-Out:</strong> Unsubscribe from marketing communications at any time.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> <strong className="text-white">Portability:</strong> Request a machine-readable copy of your data.</li>
          </ul>
          <p>To exercise any of these rights, contact us at <a href="mailto:privacy@usdc.com" className="font-bold no-underline" style={{ color: "#3daeff" }}>privacy@usdc.com</a>.</p>
        </div>
      ),
    },
    {
      icon: <Globe className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "7. Data Retention & International Transfers",
      content: (
        <div className="space-y-4">
          <p>We retain your personal information only for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required by law. When data is no longer needed, we securely delete or anonymize it.</p>
          <p>USDC operates primarily in the United States. If you access our services from outside the US, your information may be transferred to and processed in the US, where data protection laws may differ from your jurisdiction.</p>
        </div>
      ),
    },
    {
      icon: <Bell className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "8. Updates to This Policy",
      content: (
        <div className="space-y-4">
          <p>We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will notify you by updating the &quot;Last Updated&quot; date at the top of this page. We encourage you to review this policy regularly.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#04070f" }}>
      {/* Back link */}
      <div className="mx-auto max-w-5xl px-6 pt-28 md:pt-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase no-underline transition-colors"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Home
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-16 md:py-20">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(61,174,255,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="flex items-center gap-4 mb-8" style={fadeUp(0)}>
            <div className="h-[1px] w-12" style={{ background: "#3daeff" }} />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: "#3daeff" }}>
              Legal
            </span>
          </div>

          <div className="flex items-center gap-5 mb-6" style={fadeUp(60)}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(61,174,255,0.08)", border: "1px solid rgba(61,174,255,0.15)" }}>
              <Shield className="w-7 h-7" style={{ color: "#3daeff" }} />
            </div>
            <h1 className="text-[36px] md:text-[56px] font-black text-white leading-[1.0] tracking-tight uppercase">
              Privacy Policy
            </h1>
          </div>

          <p className="text-[14px] font-bold" style={{ color: "rgba(255,255,255,0.3)", ...fadeUp(120) }}>
            Last Updated: {LAST_UPDATED}
          </p>

          <p className="text-[16px] md:text-[18px] leading-relaxed font-medium max-w-3xl mt-6"
            style={{ color: "rgba(255,255,255,0.5)", ...fadeUp(160) }}>
            US Data Center (&quot;USDC,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose and safeguard your information when you visit our website or use our services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 pb-20 space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="rounded-2xl p-8 md:p-10" style={{ ...cardStyle, ...fadeUp(200 + idx * 60) }}>
            <h2 className="flex items-center gap-3 text-[18px] md:text-[20px] font-black text-white uppercase tracking-tight mb-6">
              {section.icon}
              {section.title}
            </h2>
            <div className="text-[14px] md:text-[15px] leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
              {section.content}
            </div>
          </div>
        ))}

        {/* Contact section */}
        <div className="rounded-2xl p-8 md:p-10" style={{
          background: "linear-gradient(135deg, rgba(61,174,255,0.05), rgba(8,13,26,0.9))",
          border: "1px solid rgba(61,174,255,0.12)",
          ...fadeUp(700),
        }}>
          <h2 className="text-[18px] md:text-[20px] font-black text-white uppercase tracking-tight mb-4">
            Contact Us
          </h2>
          <p className="text-[14px] md:text-[15px] leading-relaxed font-medium mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
            If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="space-y-2 text-[14px] font-bold" style={{ color: "rgba(255,255,255,0.6)" }}>
            <p>US Data Center (USDC)</p>
            <p>218 NW 24th St, 2nd FL, Miami, FL 33127</p>
            <p>Email: <a href="mailto:privacy@usdc.com" className="no-underline" style={{ color: "#3daeff" }}>privacy@usdc.com</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}
