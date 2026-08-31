import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#04070f",
};

export const metadata: Metadata = {
  title: "USDC — Enterprise-Scale AI Infrastructure",
  description:
    "Transforming underutilized energy assets into enterprise-scale AI infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-dvh h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-dvh min-h-full flex flex-col overflow-x-hidden relative w-full max-w-full">
        {children}
      </body>
    </html>
  );
}
