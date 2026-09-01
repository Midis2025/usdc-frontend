"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  Menu,
  X,
  Users,
  Newspaper,
  Server,
  Zap,
  Database,
  ChevronRight,
  Globe,
} from "lucide-react";

/* ────────────── Dropdown item config with icons & descriptions ────────────── */

interface DropdownItem {
  label: string;
  href: string;
  description: string;
  icon: React.ElementType;
}

interface NavLink {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

const navLinks: NavLink[] = [
  { label: "News & insight", href: "/news-insights" },
  {
    label: "Company",
    href: "#",
    dropdown: [
      {
        label: "Management Team",
        href: "/management-team",
        description: "Meet our leadership",
        icon: Users,
      },
      {
        label: "Press Release",
        href: "/press-release",
        description: "Latest announcements",
        icon: Newspaper,
      },
    ],
  },
  {
    label: "Infrastructure",
    href: "#",
    dropdown: [
      {
        label: "ARMS",
        href: "/arms",
        description: "Modular AI systems",
        icon: Server,
      },
      {
        label: "Energy",
        href: "/energy",
        description: "Sustainable power grid",
        icon: Zap,
      },
      {
        label: "Global Network",
        href: "/global-network",
        description: "US footprint backbone",
        icon: Globe,
      },
      {
        label: "Data Center",
        href: "/data-center",
        description: "Enterprise facilities",
        icon: Database,
      },
    ],
  },
  // { label: "Use Cases", href: "/use-cases" },
  { label: "Career", href: "/career" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((prev) => {
      if (prev) {
        setMobileAccordionOpen(null);
      }
      return !prev;
    });
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileAccordionOpen(null);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  /* Delayed close so the dropdown doesn't vanish when moving cursor to it */
  const handleMouseEnter = useCallback((label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  }, []);

  const handleLinkClick = useCallback((href: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenDropdown(null);
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 transition-all duration-300 ${isScrolled
        ? "bg-[#04070f]/85 border-b border-white/[0.06] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] h-[70px]"
        : "bg-transparent h-[85px]"
        }`}
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
    >
      {/* Left Section - USDC Logo (Visible on all screens) */}
      <div className="flex-shrink-0 relative z-50">
        <Link href="/" onClick={() => handleLinkClick("/")} className="hover:opacity-80 transition-opacity duration-200 block">
          <Image
            src="/USDC_3 1.avif"
            alt="USDC Logo"
            width={130}
            height={46}
            className="h-[32px] sm:h-[38px] md:h-[42px] w-auto transition-all duration-300"
            priority
          />
        </Link>
      </div>

      {/* ═══ Desktop Navigation ═══ */}
      <nav className="hidden lg:flex items-center gap-2.5 xl:gap-6 px-4 xl:px-8 py-2 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-[10px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300">
        <div className="flex items-center gap-3 lg:gap-3.5 xl:gap-[28px] 2xl:gap-[38px] flex-shrink-0">
          {navLinks.map((link) => {
            if (link.dropdown) {
              const isOpen = openDropdown === link.label;
              return (
                <div
                  key={link.label}
                  className="relative py-1.5"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Dropdown trigger button */}
                  <button
                    className={`flex items-center gap-1 text-[13px] xl:text-[14px] 2xl:text-[15px] font-medium transition-all duration-300 cursor-pointer font-sans whitespace-nowrap ${isOpen ? "text-[#3daeff]" : "text-white/80 hover:text-[#3daeff]"
                      }`}
                  >
                    <span>{link.label}</span>
                    <svg
                      className={`w-3 h-3 xl:w-3.5 xl:h-3.5 transition-all duration-400 ${isOpen ? "rotate-180 text-[#3daeff]" : "text-white/50"
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* ═══ Premium Dropdown Panel ═══ */}
                  <div
                    className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[260px] rounded-[16px] overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 ${isOpen
                      ? "opacity-100 visible translate-y-0 scale-100"
                      : "opacity-0 invisible translate-y-3 scale-[0.96] pointer-events-none"
                      }`}
                  >
                    {/* Outer glow border wrapper */}
                    <div
                      className={`rounded-[16px] p-[1px] transition-all duration-500 ${isOpen
                        ? "bg-gradient-to-b from-[#3daeff]/30 via-white/[0.06] to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_40px_rgba(61,174,255,0.08)]"
                        : "bg-transparent"
                        }`}
                    >
                      <div className="bg-[#070c1a]/98 backdrop-blur-2xl rounded-[15px] overflow-hidden">
                        {/* Top neon shimmer bar */}
                        <div className="relative h-[2px] w-full overflow-hidden">
                          <div
                            className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#3daeff]/60 to-transparent transition-transform duration-700 ${isOpen ? "translate-x-0" : "-translate-x-full"
                              }`}
                          />
                        </div>

                        {/* Menu items */}
                        <div className="p-2">
                          {link.dropdown.map((subLink, idx) => {
                            const IconComp = subLink.icon;
                            return (
                              <Link
                                key={subLink.label}
                                href={subLink.href}
                                onClick={() => handleLinkClick(subLink.href)}
                                className="group relative flex items-center gap-3.5 px-3.5 py-3 rounded-[10px] transition-all duration-300 hover:bg-white/[0.04] overflow-hidden"
                                style={{
                                  transitionDelay: isOpen ? `${idx * 60}ms` : "0ms",
                                  opacity: isOpen ? 1 : 0,
                                  transform: isOpen ? "translateX(0)" : "translateX(-8px)",
                                  transition: `opacity 0.4s cubic-bezier(0.16,1,0.3,1) ${isOpen ? idx * 60 : 0}ms, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${isOpen ? idx * 60 : 0}ms, background-color 0.3s`,
                                }}
                              >
                                {/* Hover glow background */}
                                <div className="absolute inset-0 rounded-[10px] bg-gradient-to-r from-[#3daeff]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                                {/* Left accent bar */}
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-0 bg-[#3daeff] rounded-r-full group-hover:h-[55%] transition-all duration-400 shadow-[0_0_10px_#3daeff,0_0_4px_#3daeff]" />

                                {/* Icon container */}
                                <div className="relative flex items-center justify-center w-9 h-9 rounded-[9px] bg-white/[0.03] border border-white/[0.06] group-hover:border-[#3daeff]/25 group-hover:bg-[#3daeff]/[0.06] transition-all duration-300 flex-shrink-0">
                                  <IconComp className="w-4 h-4 text-white/40 group-hover:text-[#3daeff] transition-colors duration-300" />
                                </div>

                                {/* Text content */}
                                <div className="relative flex-1 min-w-0">
                                  <div className="text-[13px] font-semibold text-white/80 group-hover:text-white transition-colors duration-300 leading-tight">
                                    {subLink.label}
                                  </div>
                                  <div className="text-[10.5px] text-white/30 group-hover:text-white/45 transition-colors duration-300 mt-0.5 leading-tight">
                                    {subLink.description}
                                  </div>
                                </div>

                                {/* Arrow indicator */}
                                <ChevronRight className="w-3.5 h-3.5 text-white/0 group-hover:text-[#3daeff]/70 transition-all duration-300 flex-shrink-0 -translate-x-1 group-hover:translate-x-0" />
                              </Link>
                            );
                          })}
                        </div>

                        {/* Bottom subtle gradient fade */}
                        <div className="h-[1px] mx-3 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
                        <div className="px-4 py-2.5 flex items-center justify-center">
                          <span className="text-[9px] font-semibold text-white/15 tracking-[0.2em] uppercase font-mono">
                            {link.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="relative text-white/80 text-[13px] xl:text-[14px] 2xl:text-[15px] font-medium hover:text-[#3daeff] transition-colors duration-300 py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#3daeff] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left font-sans whitespace-nowrap"
              >
                {link.label}
              </Link>
            );
          })}

          {/* DigiPowerX Logo */}
          <Link
            href="https://digipowerx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center transition-all duration-300 hover:scale-105 group flex-shrink-0"
          >
            <div className="absolute inset-0 rounded-[8px] bg-yellow-500/20 blur-md group-hover:bg-yellow-400/40 group-hover:blur-lg transition-all duration-500 opacity-80 group-hover:opacity-100" />
            <div className="relative rounded-[8px] border border-yellow-500/35 group-hover:border-yellow-400/60 overflow-hidden shadow-[0_0_12px_rgba(234,179,8,0.3)] group-hover:shadow-[0_0_20px_rgba(234,179,8,0.6)] transition-all duration-500">
              <Image
                src="/digipowerx_logo.avif"
                alt="DigiPowerX Logo"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-5 bg-white/[0.12] hidden lg:block" />

        <div className="flex items-center gap-3 lg:gap-4 xl:gap-6 flex-shrink-0">
          {/* Contact Us Button */}
          <Link
            href="/contact"
            className="hidden sm:flex items-center justify-center gap-1.5 xl:gap-2 h-[34px] xl:h-[38px] px-3.5 xl:px-6 bg-gradient-to-r from-[#3daeff] to-[#0082f3] hover:from-[#58c4ff] hover:to-[#0091ff] rounded-[10px] text-[10px] xl:text-[11px] font-bold text-white shadow-[0_4px_12px_rgba(61,174,255,0.25)] hover:shadow-[0_4px_16px_rgba(61,174,255,0.35)] transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            <MessageSquare className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
            <span>Contact Us</span>
          </Link>
        </div>
      </nav>

      {/* ═══ Mobile Menu Toggle ═══ */}
      <div className="flex lg:hidden items-center gap-4 relative z-50">
        <button
          type="button"
          onClick={handleMobileMenuToggle}
          className={`flex items-center justify-center w-11 h-11 text-white cursor-pointer border rounded-[10px] bg-white/[0.03] transition-all duration-300 select-none ${isMobileMenuOpen
            ? "border-[#3daeff]/40 bg-[#3daeff]/[0.06] text-[#3daeff] shadow-[0_0_15px_rgba(61,174,255,0.15)]"
            : "border-white/[0.08] hover:border-[#3daeff]/20 hover:bg-white/[0.06]"
            }`}
          style={{
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
          }}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 pointer-events-none" />
          ) : (
            <Menu className="w-5.5 h-5.5 pointer-events-none" />
          )}
        </button>
      </div>

      {/* ═══ Mobile Drawer Backdrop ═══ */}
      <div
        onClick={() => {
          setIsMobileMenuOpen(false);
          setMobileAccordionOpen(null);
        }}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ touchAction: "none" }}
        aria-hidden="true"
      />

      {/* ═══ Mobile Drawer ═══ */}
      <div
        className={`fixed top-[70px] sm:top-[85px] left-0 w-full bg-[#04070f]/98 border-b border-white/[0.08] backdrop-blur-2xl flex flex-col pt-4 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] px-5 sm:px-8 gap-4 lg:hidden shadow-[0_20px_50px_rgba(0,0,0,0.95)] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-h-[calc(100dvh-70px)] sm:max-h-[calc(100dvh-85px)] overflow-y-auto overscroll-contain ios-scroll z-50 ${isMobileMenuOpen
          ? "opacity-100 translate-y-0 visible pointer-events-auto"
          : "opacity-0 -translate-y-3 invisible pointer-events-none"
          }`}
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
        }}
      >
        {/* Telemetry Dashboard */}
        <div
          className="flex items-center justify-between pb-3.5 border-b border-white/[0.05]"
          style={{
            transitionDelay: isMobileMenuOpen ? "40ms" : "0ms",
            opacity: isMobileMenuOpen ? 1 : 0,
            transform: isMobileMenuOpen ? "translateY(0)" : "translateY(8px)",
            transitionProperty: "opacity, transform",
            transitionDuration: "400ms",
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Status Dot */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e878] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e878]"></span>
            </span>
            <span className="text-[10px] font-bold text-white/50 tracking-[0.15em] uppercase font-mono">
              SYS STATUS: ACTIVE
            </span>
          </div>
        </div>

        {/* Main List */}
        <div className="flex flex-col w-full">
          {navLinks.map((link, index) => {
            const delay = isMobileMenuOpen ? 80 + index * 30 : 0;
            const transitionStyles = {
              transitionDelay: `${delay}ms`,
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? "translateY(0)" : "translateY(8px)",
              transitionProperty: "opacity, transform",
              transitionDuration: "400ms",
              transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
            };

            if (link.dropdown) {
              const isAccordionOpen = mobileAccordionOpen === link.label;
              return (
                <div
                  key={link.label}
                  className="flex flex-col w-full border-b border-white/[0.05]"
                  style={transitionStyles}
                >
                  <button
                    onClick={() => setMobileAccordionOpen(isAccordionOpen ? null : link.label)}
                    className="w-full flex items-center justify-between py-3.5 text-white text-[15px] font-semibold tracking-wide text-left cursor-pointer active:text-[#3daeff] transition-colors duration-200"
                  >
                    <span>{link.label}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-white/30 transition-transform duration-300 ${isAccordionOpen ? "rotate-90 text-[#3daeff]" : ""
                        }`}
                    />
                  </button>

                  <div
                    className={`flex flex-col gap-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden pl-3 ${isAccordionOpen ? "max-h-[360px] opacity-100 pb-3.5" : "max-h-0 opacity-0 pointer-events-none"
                      }`}
                  >
                    {link.dropdown.map((subLink) => {
                      const SubIcon = subLink.icon;
                      return (
                        <Link
                          key={subLink.label}
                          href={subLink.href}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            handleLinkClick(subLink.href);
                          }}
                          className="flex items-center gap-3 py-2 px-3 rounded-lg bg-white/[0.01] active:bg-white/[0.04] transition-colors"
                        >
                          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[#3daeff]/[0.05] border border-[#3daeff]/15 text-[#3daeff] flex-shrink-0">
                            <SubIcon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[13px] font-bold text-white/95 truncate">
                              {subLink.label}
                            </span>
                            <span className="text-[9.5px] text-white/35 font-medium truncate mt-0.5">
                              {subLink.description}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            if (link.label === "Career") {
              return (
                <div
                  key={link.label}
                  className="flex items-center justify-between py-3.5 border-b border-white/[0.05]"
                  style={transitionStyles}
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLinkClick(link.href);
                    }}
                    className="text-white text-[15px] font-semibold tracking-wide active:text-[#3daeff] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                  {/* DigiPowerX Logo with Glow */}
                  <Link
                    href="https://digipowerx.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative flex items-center justify-center transition-all duration-300 hover:scale-105 group mr-1"
                  >
                    <div className="absolute inset-0 rounded-[6px] bg-yellow-500/25 blur-sm group-hover:bg-yellow-400/45 group-hover:blur-md transition-all duration-500 opacity-90" />
                    <div className="relative rounded-[6px] border border-yellow-500/40 overflow-hidden shadow-[0_0_8px_rgba(234,179,8,0.4)] transition-all duration-500">
                      <Image
                        src="/digipowerx_logo.avif"
                        alt="DigiPowerX Logo"
                        width={22}
                        height={22}
                        className="object-contain"
                      />
                    </div>
                  </Link>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLinkClick(link.href);
                }}
                className="text-white text-[15px] font-semibold tracking-wide py-3.5 border-b border-white/[0.05] block active:text-[#3daeff] transition-colors duration-200"
                style={transitionStyles}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Contact Us CTA */}
        <div
          className="flex items-center justify-center gap-4 mt-4 w-full"
          style={{
            transitionDelay: isMobileMenuOpen ? `${80 + navLinks.length * 30}ms` : "0ms",
            opacity: isMobileMenuOpen ? 1 : 0,
            transform: isMobileMenuOpen ? "translateY(0)" : "translateY(8px)",
            transitionProperty: "opacity, transform",
            transitionDuration: "400ms",
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full h-[44px] bg-gradient-to-r from-[#3daeff] to-[#0082f3] hover:from-[#58c4ff] hover:to-[#0091ff] rounded-[10px] text-[12px] font-bold text-white shadow-[0_4px_16px_rgba(61,174,255,0.25)] active:scale-[0.98] transition-all duration-200"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
