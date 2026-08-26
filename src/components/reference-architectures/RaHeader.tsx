"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface RaHeaderProps {
  onCtaClick?: () => void;
}

export function RaHeader({ onCtaClick }: RaHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCta = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onCtaClick) {
      onCtaClick();
    } else {
      const ctaEl = document.querySelector(".cta") || document.getElementById("cta") || document.querySelector(".cta-box");
      if (ctaEl) {
        ctaEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-open" : ""}`} id="top">
      <div className="container nav">
        <Link className="brand" href="/" aria-label="USDC home">
          <span className="brand-mark" aria-hidden="true">
            <span></span>
          </span>
          USDC
        </Link>
        <nav aria-label="Primary">
          <ul className="nav-links" id="nav-links">
            <li>
              <Link href="/data-center">Infrastructure</Link>
            </li>
            <li>
              <Link href="/arms">Facilities</Link>
            </li>
            <li>
              <Link href="/global-network">Global Network</Link>
            </li>
            <li>
              <Link href="/use-cases" aria-current="page">
                Use Cases
              </Link>
            </li>
          </ul>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-primary" href="#cta" onClick={handleCta} data-cta>
            Discuss a Deployment
          </a>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default RaHeader;
