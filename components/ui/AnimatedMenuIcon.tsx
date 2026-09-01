"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedMenuIconProps {
  isOpen: boolean;
  className?: string;
  isLightBg?: boolean;
}

export function AnimatedMenuIcon({
  isOpen,
  className = "",
  isLightBg = false,
}: AnimatedMenuIconProps) {
  const topBarRef = useRef<SVGLineElement>(null);
  const bottomBarRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!topBarRef.current || !bottomBarRef.current) return;

    if (isOpen) {
      // Morph lines to "X"
      gsap.to(topBarRef.current, {
        attr: { x1: 7, y1: 7, x2: 25, y2: 25 },
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(bottomBarRef.current, {
        attr: { x1: 7, y1: 25, x2: 25, y2: 7 },
        duration: 0.35,
        ease: "power3.out",
      });
    } else {
      // Morph lines back to Hamburger
      gsap.to(topBarRef.current, {
        attr: { x1: 5, y1: 10, x2: 27, y2: 10 },
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(bottomBarRef.current, {
        attr: { x1: 5, y1: 22, x2: 27, y2: 22 },
        duration: 0.35,
        ease: "power3.out",
      });
    }
  }, [isOpen]);

  return (
    <svg
      viewBox="0 0 32 32"
      className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 transition-colors duration-200 ${
        isOpen
          ? "text-[#000000] hover:text-[#ffffff]"
          : isLightBg
          ? "text-[#000000] hover:text-[var(--color-accent-primary)]"
          : "text-[var(--color-neutral-primary)] hover:text-[var(--color-accent-primary)]"
      } ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line ref={topBarRef} x1="5" y1="10" x2="27" y2="10" stroke="currentColor" />
      <line ref={bottomBarRef} x1="5" y1="22" x2="27" y2="22" stroke="currentColor" />
    </svg>
  );
}

export default AnimatedMenuIcon;
