"use client";

import React from "react";

/* Autoplay background video whose poster is the page's LCP image.
   Client component on purpose: a <link rel="preload"> rendered here is hoisted
   into <head> during SSR but is NOT emitted as a Flight hint, so it doesn't get
   fetched by other pages that merely prefetch this route. */
export default function HeroVideo({
  src,
  poster,
  className,
  style,
}: {
  src: string;
  poster: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <>
      <link rel="preload" as="image" href={poster} fetchPriority="high" />
      <video autoPlay muted loop playsInline poster={poster} className={className} style={style}>
        <source src={src} type="video/mp4" />
      </video>
    </>
  );
}
