import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

export const metadata: Metadata = {
  title: "Privacy Policy — USDC | US Data Center",
  description:
    "Learn how USDC collects, uses and protects your personal information. Read our full privacy policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      <PrivacyPolicyClient />
      <Footer />
    </div>
  );
}
