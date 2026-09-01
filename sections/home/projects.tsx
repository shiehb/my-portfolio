"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import StackIcon, { type IconName } from "tech-stack-icons";

interface TechItem {
  name: string;
  iconName: IconName;
}

export function Projects() {
  const row1Tech: TechItem[] = [
    { name: "MOTION", iconName: "motion" },
    { name: "GSAP", iconName: "gsap" },
    { name: "NEXT.JS", iconName: "nextjs2" },
    { name: "TAILWIND", iconName: "tailwindcss" },
    { name: "TYPESCRIPT", iconName: "typescript" },
    { name: "REACT", iconName: "react" },
    { name: "JAVASCRIPT", iconName: "js" },
  ];

  const row2Tech: TechItem[] = [
    { name: "TAILWIND", iconName: "tailwindcss" },
    { name: "TYPESCRIPT", iconName: "typescript" },
    { name: "REACT", iconName: "react" },
    { name: "JAVASCRIPT", iconName: "js" },
    { name: "MOTION", iconName: "motion" },
    { name: "GSAP", iconName: "gsap" },
    { name: "NEXT.JS", iconName: "nextjs2" },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const singleSetRef = useRef<HTMLDivElement>(null);

  // Dragging and animation state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const velocityRef = useRef(0);
  const setWidthRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);

  // Smooth auto-scroll speed (pixels per frame at ~60fps)
  const AUTO_SPEED = 0.6;

  const updateDimensions = useCallback(() => {
    if (singleSetRef.current) {
      const width = singleSetRef.current.offsetWidth;
      if (width > 0) {
        setWidthRef.current = width;
      }
    }
  }, []);

  useEffect(() => {
    updateDimensions();

    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener("resize", handleResize);

    const loop = () => {
      const setWidth = setWidthRef.current;

      if (setWidth > 0) {
        if (!isDraggingRef.current) {
          // Smoothly decay momentum towards default auto-drift speed
          velocityRef.current += (AUTO_SPEED - velocityRef.current) * 0.04;
          currentXRef.current += velocityRef.current;
        }

        // Modulo wrapping for infinite continuous looping
        currentXRef.current =
          ((currentXRef.current % setWidth) + setWidth) % setWidth;

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(-${currentXRef.current}px, 0, 0)`;
        }
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [updateDimensions]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;

    isDraggingRef.current = true;
    setIsGrabbing(true);
    startXRef.current = e.clientX;
    lastPointerXRef.current = e.clientX;
    velocityRef.current = 0;

    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;

    currentXRef.current -= deltaX;
    velocityRef.current = -deltaX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsGrabbing(false);

    if (containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const renderTwoRowsSet = (ref?: React.RefObject<HTMLDivElement | null>) => (
    <div
      ref={ref}
      className="flex flex-col shrink-0 select-none"
    >
      {/* Row 1 */}
      <div className="flex border-b border-[var(--border-primary)]">
        {row1Tech.map((item, idx) => (
          <div
            key={`r1-${idx}`}
            className="group flex items-center justify-center gap-4 w-44 sm:w-52 md:w-60 h-16 sm:h-20 md:h-24 bg-[var(--bg-canvas)] hover:bg-[var(--bg-surface)] transition-all duration-200 shrink-0 select-none cursor-grab active:cursor-grabbing border-r border-[var(--border-primary)]"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 flex items-center justify-center filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
              <StackIcon name={item.iconName} className="w-full h-full object-contain" />
            </div>
            <span className="font-sans text-sm sm:text-base tracking-wider uppercase text-[var(--text-secondary)] group-hover:text-[var(--text-surface)] font-semibold transition-colors whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex">
        {row2Tech.map((item, idx) => (
          <div
            key={`r2-${idx}`}
            className="group flex items-center justify-center gap-4 w-44 sm:w-52 md:w-60 h-16 sm:h-20 md:h-24 bg-[var(--bg-canvas)] hover:bg-[var(--bg-surface)] transition-all duration-200 shrink-0 select-none cursor-grab active:cursor-grabbing border-r border-[var(--border-primary)]"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 flex items-center justify-center filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
              <StackIcon name={item.iconName} className="w-full h-full object-contain" />
            </div>
            <span className="font-sans text-sm sm:text-base tracking-wider uppercase text-[var(--text-secondary)] group-hover:text-[var(--text-surface)] font-semibold transition-colors whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section
      id="projects"
      aria-label="Projects and Stack"
      className="relative w-full select-none overflow-hidden"
    >
      {/* Edge feathering */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-20 md:w-32 bg-gradient-to-r from-[var(--bg-canvas)] via-[var(--bg-canvas)]/80 to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-20 md:w-32 bg-gradient-to-l from-[var(--bg-canvas)] via-[var(--bg-canvas)]/80 to-transparent z-10"
      />

      {/* Infinite + Free Drag Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`w-full overflow-hidden flex items-center border-y border-[var(--border-primary)] bg-[var(--bg-primary)] shadow-sm ${
          isGrabbing ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ transform: "translate3d(0px, 0, 0)" }}
        >
          {/* Reference set for width calculation */}
          {renderTwoRowsSet(singleSetRef)}
          {/* Seamless loop sets */}
          {renderTwoRowsSet()}
          {renderTwoRowsSet()}
          {renderTwoRowsSet()}
        </div>
      </div>
    </section>
  );
}

export { Projects as TechStack };
export default Projects;
