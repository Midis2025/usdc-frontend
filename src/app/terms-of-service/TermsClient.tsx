"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, AlertTriangle, Server, ShieldCheck, Ban, CreditCard, Globe, Gavel, RefreshCw, ScrollText } from "lucide-react";

const LAST_UPDATED = "July 1, 2026";

interface Section {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

export default function TermsClient() {
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
      icon: <ScrollText className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "1. Acceptance of Terms",
      content: (
        <div className="space-y-4">
          <p>By accessing or using the USDC website (the &quot;Site&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to all of these Terms, you may not access or use the Site. These Terms constitute a legally binding agreement between you and US Data Center (&quot;USDC,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).</p>
          <p>We reserve the right to modify these Terms at any time. Your continued use of the Site after any changes constitutes acceptance of the revised Terms. It is your responsibility to review these Terms periodically.</p>
        </div>
      ),
    },
    {
      icon: <Server className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "2. Description of Services",
      content: (
        <div className="space-y-4">
          <p>USDC provides data center infrastructure services including, but not limited to:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Design, construction and operation of hyperscale and AI-ready data center facilities.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> GPU compute platforms and high-performance computing (HPC) infrastructure.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Colocation, power provisioning and cooling infrastructure services.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Data Center Infrastructure Management (DCIM) software and monitoring solutions.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Sustainable energy infrastructure including renewable energy integration.</li>
          </ul>
          <p>Specific service terms, SLAs and pricing are governed by separate service agreements executed between USDC and its clients.</p>
        </div>
      ),
    },
    {
      icon: <ShieldCheck className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "3. Use of the Website",
      content: (
        <div className="space-y-4">
          <p>You agree to use the Site only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Use the Site in any way that violates any applicable federal, state, local, or international law or regulation.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Attempt to gain unauthorized access to any portion of the Site, other accounts, computer systems, or networks connected to the Site.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Engage in any conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Site.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Use any robot, spider, scraper, or other automated means to access the Site without our express written permission.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Introduce any viruses, trojan horses, worms, or other malicious or technologically harmful material.</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <FileText className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "4. Intellectual Property",
      content: (
        <div className="space-y-4">
          <p>All content on the Site, including but not limited to text, graphics, logos, images, data compilations, software, designs, ARMS platform branding and the USDC brand identity, is the property of USDC or its licensors and is protected by United States and international intellectual property laws.</p>
          <p>You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any content on our Site without our prior written consent, except for:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Temporary storage in your web browser cache for personal, non-commercial viewing.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Printing pages for personal, non-commercial use.</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <CreditCard className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "5. Service Agreements & Commercial Terms",
      content: (
        <div className="space-y-4">
          <p>The purchase or use of USDC data center services, including colocation, power, cooling, GPU compute and managed infrastructure, is subject to separate commercial agreements. These Terms of Service govern only your use of the USDC website.</p>
          <p>Commercial service agreements will contain specific terms regarding:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Service Level Agreements (SLAs) and uptime guarantees.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Pricing, payment terms and billing procedures.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Acceptable use policies for hosted infrastructure.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Liability limitations and indemnification provisions.</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <AlertTriangle className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "6. Disclaimers & Limitation of Liability",
      content: (
        <div className="space-y-4">
          <p><strong className="text-white">Website Disclaimer:</strong> The Site and its contents are provided on an &quot;as is&quot; and &quot;as available&quot; basis without any warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
          <p><strong className="text-white">No Investment Advice:</strong> Information on this Site regarding USDC&apos;s business, infrastructure projects, investor relations, or financial data is provided for informational purposes only and should not be construed as investment advice, a solicitation, or a recommendation to buy or sell any securities.</p>
          <p><strong className="text-white">Limitation of Liability:</strong> In no event shall USDC, its directors, officers, employees, affiliates, agents, or licensors be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Site, whether based on warranty, contract, tort (including negligence), or any other legal theory.</p>
        </div>
      ),
    },
    {
      icon: <Ban className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "7. Indemnification",
      content: (
        <div className="space-y-4">
          <p>You agree to defend, indemnify and hold harmless USDC and its officers, directors, employees, agents and affiliates from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Your use of and access to the Site.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Your violation of any term of these Terms.</li>
            <li className="flex gap-2"><span style={{ color: "#3daeff" }}>•</span> Your violation of any third-party right, including without limitation any intellectual property, privacy, or proprietary right.</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <Globe className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "8. Third-Party Links",
      content: (
        <div className="space-y-4">
          <p>The Site may contain links to third-party websites or services that are not owned or controlled by USDC, including partner websites, technology vendors and industry resources. We have no control over and assume no responsibility for, the content, privacy policies, or practices of any third-party websites.</p>
          <p>The inclusion of any link does not imply endorsement by USDC. You access third-party sites at your own risk and should review their terms and privacy policies.</p>
        </div>
      ),
    },
    {
      icon: <Gavel className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "9. Governing Law & Dispute Resolution",
      content: (
        <div className="space-y-4">
          <p>These Terms shall be governed by and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of law provisions.</p>
          <p>Any dispute arising out of or relating to these Terms or the Site shall be resolved through binding arbitration in Miami-Dade County, Florida, in accordance with the rules of the American Arbitration Association. The prevailing party shall be entitled to recover reasonable attorneys&apos; fees and costs.</p>
        </div>
      ),
    },
    {
      icon: <RefreshCw className="w-5 h-5" style={{ color: "#3daeff" }} />,
      title: "10. Changes to Terms",
      content: (
        <div className="space-y-4">
          <p>USDC reserves the right to revise and update these Terms of Service at any time without prior notice. All changes are effective immediately when posted and apply to all access to and use of the Site thereafter. Your continued use of the Site following the posting of revised Terms means you accept and agree to the changes.</p>
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
              <Gavel className="w-7 h-7" style={{ color: "#3daeff" }} />
            </div>
            <h1 className="text-[36px] md:text-[56px] font-black text-white leading-[1.0] tracking-tight uppercase">
              Terms of Service
            </h1>
          </div>

          <p className="text-[14px] font-bold" style={{ color: "rgba(255,255,255,0.3)", ...fadeUp(120) }}>
            Last Updated: {LAST_UPDATED}
          </p>

          <p className="text-[16px] md:text-[18px] leading-relaxed font-medium max-w-3xl mt-6"
            style={{ color: "rgba(255,255,255,0.5)", ...fadeUp(160) }}>
            Please read these Terms of Service carefully before using the USDC website. By accessing or using our Site, you agree to be bound by these terms and all applicable laws and regulations.
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
          ...fadeUp(800),
        }}>
          <h2 className="text-[18px] md:text-[20px] font-black text-white uppercase tracking-tight mb-4">
            Contact Us
          </h2>
          <p className="text-[14px] md:text-[15px] leading-relaxed font-medium mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2 text-[14px] font-bold" style={{ color: "rgba(255,255,255,0.6)" }}>
            <p>US Data Center (USDC)</p>
            <p>218 NW 24th St, 2nd FL, Miami, FL 33127</p>
            <p>Email: <a href="mailto:legal@usdc.com" className="no-underline" style={{ color: "#3daeff" }}>legal@usdc.com</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}
