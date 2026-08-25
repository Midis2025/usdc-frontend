import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GeneralApplyClient from "./GeneralApplyClient";

export const metadata: Metadata = {
  title: "General Application | Careers | USDC",
  description:
    "Submit a general application to USDC. We are always looking for exceptional talent.",
};

export default function GeneralApplyPage() {
  return (
    <div className="relative min-h-screen bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      <GeneralApplyClient />
      <Footer />
    </div>
  );
}
