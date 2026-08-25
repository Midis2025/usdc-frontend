import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getJobBySlug, getAllSlugs } from "@/data/careersData";
import ApplyFormClient from "./ApplyFormClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return { title: "Apply | USDC" };
  return {
    title: `Apply — ${job.title} | USDC`,
    description: `Apply for the ${job.title} position at USDC.`,
  };
}

export default async function ApplyPage({ params }: Props) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  return (
    <div className="relative min-h-screen bg-[#04070f] text-white flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      <ApplyFormClient
        jobTitle={job.title}
        jobSlug={job.slug}
        jobDepartment={job.department}
        jobLocation={job.location}
      />
      <Footer />
    </div>
  );
}
