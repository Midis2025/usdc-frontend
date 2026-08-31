"use client";

import { useEffect } from "react";

export function useReveal(activeRoute?: string) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealAll = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        el.classList.add("in-view");
      });
    };

    if (reduce) {
      revealAll();
      return;
    }

    const checkViewport = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll(".reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh + 100 && rect.bottom > -100) {
          el.classList.add("in-view");
        }
      });
    };

    // Immediately show elements that are already within or near the initial viewport
    checkViewport();
    // Re-check shortly after mount/layout paint
    const t1 = setTimeout(checkViewport, 50);
    const t2 = setTimeout(checkViewport, 200);

    const revealIO =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("in-view");
                  if (revealIO) {
                    revealIO.unobserve(entry.target);
                  }
                }
              });
            },
            { rootMargin: "120px 0px 80px 0px", threshold: 0.01 }
          )
        : null;

    const armReveals = (root: Document | HTMLElement = document) => {
      const elements = root.querySelectorAll(".reveal:not(.in-view)");
      elements.forEach((el) => {
        if (revealIO) {
          revealIO.observe(el);
        } else {
          el.classList.add("in-view");
        }
      });
    };

    armReveals();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (revealIO) {
        revealIO.disconnect();
      }
    };
  }, [activeRoute]);
}

export default useReveal;
