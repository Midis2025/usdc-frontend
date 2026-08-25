import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service — USDC | US Data Center",
  description:
    "Read the terms and conditions governing your use of the USDC website and services.",
};

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      <TermsClient />
      <Footer />
    </div>
  );
}
