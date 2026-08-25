import React from "react";

export default function UsdcLogo() {
  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* 3D Isometric USDC Logo with gaps */}
      <svg
        width="34"
        height="38"
        viewBox="0 0 34 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[34px] h-[38px]"
      >
        {/* Left Pillar (Tallest) */}
        {/* Left Face */}
        <path
          d="M 2 9 L 6 12 L 6 29 L 2 26 Z"
          fill="#FFFFFF"
        />
        {/* Right Face */}
        <path
          d="M 6 12 L 10 9 L 10 26 L 6 29 Z"
          fill="#A3A3A3"
          opacity="0.85"
        />
        {/* Top Face */}
        <path
          d="M 2 9 L 6 6 L 10 9 L 6 12 Z"
          fill="#E5E5E5"
        />

        {/* Middle Pillar (Shortest) */}
        {/* Left Face */}
        <path
          d="M 13 18 L 17 21 L 17 33 L 13 30 Z"
          fill="#FFFFFF"
        />
        {/* Right Face */}
        <path
          d="M 17 21 L 21 18 L 21 30 L 17 33 Z"
          fill="#A3A3A3"
          opacity="0.85"
        />
        {/* Top Face */}
        <path
          d="M 13 18 L 17 15 L 21 18 L 17 21 Z"
          fill="#E5E5E5"
        />

        {/* Right Pillar (Medium) */}
        {/* Left Face */}
        <path
          d="M 24 12 L 28 15 L 28 29 L 24 26 Z"
          fill="#FFFFFF"
        />
        {/* Right Face */}
        <path
          d="M 28 15 L 32 12 L 32 26 L 28 29 Z"
          fill="#A3A3A3"
          opacity="0.85"
        />
        {/* Top Face */}
        <path
          d="M 24 12 L 28 9 L 32 12 L 28 15 Z"
          fill="#E5E5E5"
        />
      </svg>

      {/* Typography */}
      <span className="text-[25px] font-bold tracking-[0.01em] text-white leading-none font-sans">
        USDC
      </span>
    </div>
  );
}
