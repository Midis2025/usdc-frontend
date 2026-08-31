"use client";

import React from "react";

interface RaFooterProps {
  currentPathLabel?: string;
}

export function RaFooter({ currentPathLabel = "Reference architectures" }: RaFooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        <span>© USDC · AI infrastructure</span>
        <span className="micro" data-footer-path>
          {currentPathLabel}
        </span>
      </div>
    </footer>
  );
}

export default RaFooter;
