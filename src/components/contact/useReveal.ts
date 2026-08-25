"use client";

import { useEffect, useRef } from "react";

/* Adds the `cx-in` class to a container's `.cx-reveal` children (and itself)
   when it scrolls into view — a lightweight, dependency-free stand-in for
   GSAP ScrollTrigger reveals. Children are revealed in DOM order with a
   staggered delay for a cinematic cascade. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  stagger = 90
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      const targets = el.classList.contains("cx-reveal")
        ? [el, ...Array.from(el.querySelectorAll<HTMLElement>(".cx-reveal"))]
        : Array.from(el.querySelectorAll<HTMLElement>(".cx-reveal"));
      targets.forEach((t, i) => {
        const delay = Number(t.dataset.delay ?? i * stagger);
        window.setTimeout(() => t.classList.add("cx-in"), delay);
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal();
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stagger]);

  return ref;
}
