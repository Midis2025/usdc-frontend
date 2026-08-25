import { slugify } from "@/utils/slugify";
import { Metadata } from "next";
import React from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getArticleBySlug(slug: string) {
  try {
    const res = await fetch("https://peaceful-power-64c420fe0a.strapiapp.com/api/news-articles?populate=*", {
      next: { revalidate: 60 }, // Cache response for 1 minute
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.statusText}`);
    }

    const json = await res.json();
    if (json && Array.isArray(json.data)) {
      return json.data.find((item: any) => slugify(item.title) === slug) || null;
    }
  } catch (error) {
    console.error("Error fetching article in [slug] route:", error);
  }
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (article) {
    return {
      title: `${article.title} — Press Release`,
      description: article.shortDescription || `Read the official press release: ${article.title}`,
    };
  }

  return {
    title: "Press Release PDF | USDC",
    description: "View official press release documents and announcements from USDC.",
  };
}

export default async function PressReleasePDFPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#04070f] text-white font-sans p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Press Release Not Found</h1>
        <p className="text-white/60 max-w-md">
          We couldn't find the press release you're looking for. It may have been moved or deleted.
        </p>
      </div>
    );
  }

  const pdfUrl = article.pdfFile?.url || "/brochure.pdf";

  return (
    <iframe
      src={pdfUrl}
      className="w-screen h-screen border-none m-0 p-0 block bg-[#04070f]"
      title={article.title}
    />
  );
}
