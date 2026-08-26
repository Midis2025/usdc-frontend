"use client";

import { useEffect, useRef } from "react";

const SVGNS = "http://www.w3.org/2000/svg";
const XLINK = "http://www.w3.org/1999/xlink";

export function useFlowPulses(containerRef?: React.RefObject<HTMLElement | null>, activeRoute?: string) {
  const uidRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const root = containerRef?.current || document;
    const svgs = root.querySelectorAll("svg");

    function spawnPulses(svg: SVGElement) {
      const paths = svg.querySelectorAll<SVGPathElement>("path[data-pulse]");
      paths.forEach((p) => {
        if (p.dataset.spawned) return;
        p.dataset.spawned = "1";
        p.setAttribute("fill", "none");
        p.setAttribute("stroke", "none");

        if (!p.id) {
          uidRef.current += 1;
          p.id = "pp" + uidRef.current;
        }

        const n = +(p.dataset.n || 2);
        const dur = +(p.dataset.dur || 3);
        const flow = p.dataset.pulse || "power";

        for (let k = 0; k < n; k++) {
          const c = document.createElementNS(SVGNS, "circle");
          c.setAttribute("r", "2.4");
          const hasCondition = p.dataset.on || p.dataset.step || p.dataset.phase || p.dataset.stepOn;
          c.setAttribute("class", "pulse " + flow + (!hasCondition ? " on" : ""));

          ["on", "step", "phase", "stepOn"].forEach((a) => {
            if (p.dataset[a]) {
              c.dataset[a] = p.dataset[a];
            }
          });

          const am = document.createElementNS(SVGNS, "animateMotion");
          am.setAttribute("dur", dur + "s");
          am.setAttribute("repeatCount", "indefinite");
          am.setAttribute("begin", (-(k / n) * dur).toFixed(2) + "s");
          am.setAttribute("calcMode", "linear");

          const mp = document.createElementNS(SVGNS, "mpath");
          mp.setAttributeNS(XLINK, "xlink:href", "#" + p.id);
          mp.setAttribute("href", "#" + p.id);

          am.appendChild(mp);
          c.appendChild(am);
          if (p.parentNode) {
            p.parentNode.insertBefore(c, p.nextSibling);
          }
        }
      });
    }

    svgs.forEach(spawnPulses);

    // Pause SMIL when an svg is off-screen
    const smilIO =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((e) => {
                const target = e.target as SVGGraphicsElement & {
                  unpauseAnimations?: () => void;
                  pauseAnimations?: () => void;
                };
                try {
                  if (e.isIntersecting) {
                    target.unpauseAnimations?.();
                  } else {
                    target.pauseAnimations?.();
                  }
                } catch (_) {}
              });
            },
            { rootMargin: "80px" }
          )
        : null;

    if (smilIO) {
      svgs.forEach((s) => smilIO.observe(s));
    }

    return () => {
      if (smilIO) {
        smilIO.disconnect();
      }
    };
  }, [containerRef, activeRoute]);
}

export default useFlowPulses;
