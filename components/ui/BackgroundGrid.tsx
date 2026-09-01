"use client";

import React from "react";

interface BackgroundGridProps {
  className?: string;
}

export function BackgroundGrid({ className = "" }: BackgroundGridProps) {
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-20 overflow-hidden ${className}`}
    >
      <div className="w-full h-full max-w-[1920px] mx-auto px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 h-full w-full">
          {/* Column 1 (Active on mobile & desktop) */}
          <div className="h-full border-l border-r border-[var(--border-primary)] opacity-70" />

          {/* Column 2 (Active on mobile & desktop) */}
          <div className="h-full border-r border-[var(--border-primary)] opacity-70" />

          {/* Column 3 (Active on desktop) */}
          <div className="hidden md:block h-full border-r border-[var(--border-primary)] opacity-70" />

          {/* Column 4 (Active on desktop) */}
          <div className="hidden md:block h-full border-r border-[var(--border-primary)] opacity-70" />
        </div>
      </div>
    </div>
  );
}

export default BackgroundGrid;

