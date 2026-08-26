"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ImageCarouselProps {
  /**
   * Height class for easy adjustment in the future.
   * Default is h-[30vh].
   */
  heightClass?: string;
  /**
   * Custom images list if needed, defaults to public showcase images.
   */
  images?: string[];
}

const DEFAULT_IMAGES = [
  "/showcase-1.png",
  "/showcase-2.png",
  "/showcase-3.jpg",
  "/showcase-4.jpg",
];

export function ImageCarousel({
  heightClass = "h-[30vh]",
  images = DEFAULT_IMAGES,
}: ImageCarouselProps) {
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

  // Normal slow auto-scroll speed (pixels per frame at ~60fps)
  const AUTO_SPEED = 0.65;

  // Measure the width of one single set of images
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

    // Continuous smooth animation loop combining infinite auto-scroll + free momentum
    const loop = () => {
      const setWidth = setWidthRef.current;

      if (setWidth > 0) {
        if (!isDraggingRef.current) {
          // Apply momentum decay towards the default auto-scroll speed
          velocityRef.current += (AUTO_SPEED - velocityRef.current) * 0.04;
          currentXRef.current += velocityRef.current;
        }

        // Modulo wrapping for infinite seamless looping
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

  // Pointer & Drag Handlers for Free Scroll
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only primary mouse button or touch
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

    // Direct movement on drag
    currentXRef.current -= deltaX;
    // Track release velocity
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

  return (
    <section
      id="image-carousel"
      aria-label="Image Carousel"
      className={`relative w-full ${heightClass} overflow-hidden select-none my-6 sm:my-10 touch-pan-y`}
    >
      {/* Feathering at the start (left) and end (right) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-[#f2f2f2] via-[#f2f2f2]/80 to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-[#f2f2f2] via-[#f2f2f2]/80 to-transparent z-10"
      />

      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`w-full h-full cursor-grab active:cursor-grabbing flex items-center ${
          isGrabbing ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div
          ref={trackRef}
          className="flex h-full items-stretch gap-[2px] will-change-transform"
          style={{ transform: "translate3d(0px, 0, 0)" }}
        >
          {/* First reference set (measured for looping offset) */}
          <div ref={singleSetRef} className="flex h-full items-stretch gap-[2px] shrink-0">
            {images.map((src, index) => (
              <div
                key={`set1-${index}`}
                className="relative h-full w-auto shrink-0 overflow-hidden rounded-lg sm:rounded-xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  onLoad={updateDimensions}
                  draggable={false}
                  referrerPolicy="no-referrer"
                  className="h-full w-auto max-w-none object-cover block select-none pointer-events-none rounded-lg sm:rounded-xl"
                />
              </div>
            ))}
          </div>

          {/* Duplicated sets to guarantee seamless, infinite wrapping */}
          <div className="flex h-full items-stretch gap-[2px] shrink-0" aria-hidden="true">
            {images.map((src, index) => (
              <div
                key={`set2-${index}`}
                className="relative h-full w-auto shrink-0 overflow-hidden rounded-lg sm:rounded-xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  onLoad={updateDimensions}
                  draggable={false}
                  referrerPolicy="no-referrer"
                  className="h-full w-auto max-w-none object-cover block select-none pointer-events-none rounded-lg sm:rounded-xl"
                />
              </div>
            ))}
          </div>

          <div className="flex h-full items-stretch gap-[2px] shrink-0" aria-hidden="true">
            {images.map((src, index) => (
              <div
                key={`set3-${index}`}
                className="relative h-full w-auto shrink-0 overflow-hidden rounded-lg sm:rounded-xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  onLoad={updateDimensions}
                  draggable={false}
                  referrerPolicy="no-referrer"
                  className="h-full w-auto max-w-none object-cover block select-none pointer-events-none rounded-lg sm:rounded-xl"
                />
              </div>
            ))}
          </div>

          <div className="flex h-full items-stretch gap-[2px] shrink-0" aria-hidden="true">
            {images.map((src, index) => (
              <div
                key={`set4-${index}`}
                className="relative h-full w-auto shrink-0 overflow-hidden rounded-lg sm:rounded-xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  onLoad={updateDimensions}
                  draggable={false}
                  referrerPolicy="no-referrer"
                  className="h-full w-auto max-w-none object-cover block select-none pointer-events-none rounded-lg sm:rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
