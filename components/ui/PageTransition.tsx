"use client";

import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

interface PageTransitionContextType {
    navigateTo: (href: string) => void;
    isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
    navigateTo: () => {},
    isTransitioning: false,
});

export const usePageTransition = () => useContext(PageTransitionContext);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);
    const enterCircleRef = useRef<SVGCircleElement>(null);
    const exitHoleCircleRef = useRef<SVGCircleElement>(null);
    const exitLayerRef = useRef<SVGSVGElement>(null);
    const loaderRef = useRef<HTMLDivElement>(null);
    const spinnerRef = useRef<SVGSVGElement>(null);

    // Initial page load / reload transition effect (Start Zoom-in -> Loading -> Exit Hole Zoom-in)
    useEffect(() => {
        const overlay = overlayRef.current;
        const enterCircle = enterCircleRef.current;
        const exitHole = exitHoleCircleRef.current;
        const exitLayer = exitLayerRef.current;
        const loader = loaderRef.current;
        const spinner = spinnerRef.current;

        if (!overlay || !enterCircle || !exitHole || !exitLayer || !loader || !spinner) return;

        // Reset visual state
        gsap.set(overlay, { display: "block", pointerEvents: "auto" });
        gsap.set(enterCircle, { opacity: 1, scale: 0, transformOrigin: "50% 50%" });
        gsap.set(exitLayer, { opacity: 0 });
        gsap.set(exitHole, { scale: 0, transformOrigin: "50% 50%" });
        gsap.set(loader, { opacity: 0 });

        const reloadTl = gsap.timeline({
            delay: 0.1,
            onComplete: () => {
                gsap.set(overlay, { display: "none", pointerEvents: "none" });
            },
        });

        // 1. START: Zoom in SVG circle from center on transparent bg
        reloadTl.to(enterCircle, {
            scale: 2.2,
            duration: 0.65,
            ease: "power3.inOut",
        });

        // 2. LOADING: Center animated SVG with --color-primary-500 bg (No zoom scale, smooth fade)
        reloadTl.to(
            loader,
            {
                opacity: 1,
                duration: 0.25,
                ease: "power2.out",
            },
            "-=0.15"
        );

        reloadTl.to(
            spinner,
            {
                rotation: "+=360",
                duration: 0.8,
                ease: "power1.inOut",
            },
            "<"
        );

        reloadTl.to(loader, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
        });

        // 3. EXIT: Zoom in transparent SVG from center (hole/aperture) revealing the page
        reloadTl.set(exitLayer, { opacity: 1 });
        reloadTl.set(enterCircle, { opacity: 0 });
        reloadTl.to(exitHole, {
            scale: 2.2,
            duration: 0.7,
            ease: "power3.inOut",
        });

        return () => {
            reloadTl.kill();
        };
    }, []);

    const navigateTo = useCallback(
        (targetHref: string) => {
            if (isTransitioning) return;
            if (pathname === targetHref) return;

            setIsTransitioning(true);

            const overlay = overlayRef.current;
            const enterCircle = enterCircleRef.current;
            const exitHole = exitHoleCircleRef.current;
            const exitLayer = exitLayerRef.current;
            const loader = loaderRef.current;
            const spinner = spinnerRef.current;

            if (!overlay || !enterCircle || !exitHole || !exitLayer || !loader || !spinner) {
                router.push(targetHref);
                setIsTransitioning(false);
                return;
            }

            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(overlay, { display: "none", pointerEvents: "none" });
                    setIsTransitioning(false);
                },
            });

            // Reset start states
            gsap.set(overlay, { display: "block", pointerEvents: "auto" });
            gsap.set(enterCircle, { opacity: 1, scale: 0, transformOrigin: "50% 50%" });
            gsap.set(exitLayer, { opacity: 0 });
            gsap.set(exitHole, { scale: 0, transformOrigin: "50% 50%" });
            gsap.set(loader, { opacity: 0 });

            // ==========================================
            // PHASE 1: START TRANSITION
            // Zoom in SVG circle from center on transparent bg
            // ==========================================
            tl.to(enterCircle, {
                scale: 2.2,
                duration: 0.65,
                ease: "power3.inOut",
            });

            // ==========================================
            // PHASE 2: LOADING STATE
            // Solid --color-primary-500 bg with center animated SVG (No scale zoom, smooth fade)
            // ==========================================
            tl.to(
                loader,
                {
                    opacity: 1,
                    duration: 0.25,
                    ease: "power2.out",
                },
                "-=0.15"
            );

            // Change page in Next.js router
            tl.add(() => {
                router.push(targetHref);
            }, "+=0.05");

            // Spin & animate loader during route load
            tl.to(
                spinner,
                {
                    rotation: "+=360",
                    duration: 0.8,
                    ease: "power1.inOut",
                },
                "<"
            );

            // Hide loader smoothly without zooming out
            tl.to(loader, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.in",
            });

            // ==========================================
            // PHASE 3: EXIT TRANSITION
            // Zoom in transparent hole from center (aperture reveal)
            // ==========================================
            tl.set(exitLayer, { opacity: 1 });
            tl.set(enterCircle, { opacity: 0 });
            tl.to(exitHole, {
                scale: 2.2,
                duration: 0.7,
                ease: "power3.inOut",
            });
        },
        [isTransitioning, pathname, router]
    );

    return (
        <PageTransitionContext.Provider value={{ navigateTo, isTransitioning }}>
            {children}

            {/* Transition Viewport Layer */}
            <div
                ref={overlayRef}
                aria-hidden="true"
                className="fixed inset-0 z-[9999] pointer-events-none hidden"
            >
                {/* SVG 1: Start Phase (Solid Center Circle Zooming In) */}
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <circle
                        ref={enterCircleRef}
                        cx="50"
                        cy="50"
                        r="75"
                        fill="var(--color-primary-500, #ff4d00)"
                    />
                </svg>

                {/* SVG 2: Exit Phase (Mask Aperture Hole Zooming In from Center) */}
                <svg
                    ref={exitLayerRef}
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <mask id="transition-exit-hole-mask">
                            {/* Solid white = visible primary orange layer */}
                            <rect width="100" height="100" fill="white" />
                            {/* Black circle = transparent cut-out hole zooming in */}
                            <circle
                                ref={exitHoleCircleRef}
                                cx="50"
                                cy="50"
                                r="75"
                                fill="black"
                            />
                        </mask>
                    </defs>
                    <rect
                        width="100"
                        height="100"
                        fill="var(--color-primary-500, #ff4d00)"
                        mask="url(#transition-exit-hole-mask)"
                    />
                </svg>

                {/* Center Animated SVG Loader */}
                <div
                    ref={loaderRef}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
                >
                    <div className="relative flex items-center justify-center">
                        <svg
                            ref={spinnerRef}
                            className="w-20 h-20 text-white drop-shadow-md"
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Outer Segmented Ring */}
                            <circle
                                cx="50"
                                cy="50"
                                r="42"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeDasharray="14 10"
                                opacity="0.85"
                            />

                            {/* Inner Geometric Star / Crosshair */}
                            <circle
                                cx="50"
                                cy="50"
                                r="28"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeDasharray="4 6"
                                opacity="0.6"
                            />

                            {/* Center Pixel Core */}
                            <rect
                                x="46"
                                y="46"
                                width="8"
                                height="8"
                                fill="currentColor"
                                className="animate-pulse"
                            />

                            {/* Radial Tick Markers */}
                            <line x1="50" y1="2" x2="50" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                            <line x1="50" y1="90" x2="50" y2="98" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                            <line x1="2" y1="50" x2="10" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                            <line x1="90" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                    </div>

                    <span className="mt-4 font-mono text-xs tracking-widest text-white/90 uppercase font-semibold">
                        LOADING
                    </span>

                    {/* Bottom center handle */}
                    <div className="absolute bottom-8 sm:bottom-10 inset-x-0 flex items-center justify-center text-center pointer-events-none">
                        <span className=" text-white/90 text-sm sm:text-sm md:text-base tracking-widest  select-none">
                            @echong
                        </span>
                    </div>
                </div>
            </div>
        </PageTransitionContext.Provider>
    );
}
