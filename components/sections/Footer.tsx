"use client";

import React from "react";
import { usePathname } from "next/navigation";

// Only display the footer on these allowed routes
const ALLOWED_ROUTES = ["/", "/work", "/about"];

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (!ALLOWED_ROUTES.includes(pathname)) {
    return null;
  }

  return (
    <footer
      id="site-footer"
      className="w-full min-h-dvh bg-transparent px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 text-center flex flex-col items-center justify-center relative"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-3">
        <p className="font-pixel-circle text-ink-300 text-sm sm:text-base md:text-lg tracking-widest uppercase">
          © {currentYear} Jericho Urbano
        </p>
        <p className="text-sm sm:text-base font-mono text-primary-500 tracking-wider font-medium">
          Webflow Developer / Designer
        </p>
      </div>
    </footer>
  );
}
