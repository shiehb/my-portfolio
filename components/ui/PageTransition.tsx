"use client";

import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { getCurvePathsUp } from "./CurveTransition";

interface PageTransitionContextType {
    navigateTo: (href: string, label?: string) => void;
    isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
    navigateTo: () => { },
    isTransitioning: false,
});

export const usePageTransition = () => useContext(PageTransitionContext);

const TRANSITION_BG_COLOR = "var(--bg-transition, #ff4d00)"; // Signature Accent (#ff4d00) transition background

const ROUTE_LABELS: Record<string, string> = {
    "/": "HOME",
    "/about": "ABOUT",
    "/work": "WORK",
    "/contact": "CONTACT",
};

export function getRouteLabel(href: string): string {
    const clean = href.split("?")[0].split("#")[0];
    if (ROUTE_LABELS[clean]) return ROUTE_LABELS[clean];
    const stripped = clean.replace(/^\//, "").toUpperCase();
    return stripped || "HOME";
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionText, setTransitionText] = useState(() => (!pathname || pathname === "/" ? "Hey There" : getRouteLabel(pathname)));

    const overlayRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    // Initial page load / reload transition effect
    useEffect(() => {
        const overlay = overlayRef.current;
        const path = pathRef.current;
        const textEl = textRef.current;

        if (!overlay || !path || !textEl) return;

        const width = window.innerWidth;
        const height = window.innerHeight;
        const paths = getCurvePathsUp(width, height, 250);

        const initialLabel = !pathname || pathname === "/" ? "Hey There" : getRouteLabel(pathname);
        setTransitionText(initialLabel);

        // Reset visual state: start covered flat
        gsap.set(overlay, { display: "flex", pointerEvents: "auto" });
        gsap.set(path, { attr: { d: paths.flat } });
        gsap.set(textEl, { opacity: 1, y: 0, scale: 1 });

        const reloadTl = gsap.timeline({
            delay: 0.3,
            onComplete: () => {
                gsap.set(overlay, { display: "none", pointerEvents: "none" });
            },
        });

        // 1. Hold text display briefly then fade up
        reloadTl.to(textEl, {
            opacity: 0,
            y: -18,
            duration: 0.25,
            delay: 0.4,
            ease: "power2.in",
        });

        // 2. CURVE EXIT: Morph bottom curve upwards with downward arch to reveal page
        reloadTl.to(path, {
            duration: 0.45,
            ease: "power3.in",
            attr: { d: paths.curveUpExit },
        })
            .to(path, {
                duration: 0.25,
                ease: "power2.out",
                attr: { d: paths.endTop },
            });

        return () => {
            reloadTl.kill();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const navigateTo = useCallback(
        (targetHref: string, customLabel?: string) => {
            if (isTransitioning) return;

            let label = customLabel || getRouteLabel(targetHref);
            if (targetHref === "/" && pathname === "/") {
                label = "Hey There";
            } else if (targetHref === "/") {
                label = "HOME";
            }

            setTransitionText(label);
            setIsTransitioning(true);

            const overlay = overlayRef.current;
            const path = pathRef.current;
            const textEl = textRef.current;

            if (!overlay || !path || !textEl) {
                if (pathname === targetHref) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                    router.push(targetHref);
                }
                setIsTransitioning(false);
                return;
            }

            const width = window.innerWidth;
            const height = window.innerHeight;
            const paths = getCurvePathsUp(width, height, 250);

            // Reset start states: start down at bottom of screen
            gsap.set(overlay, { display: "flex", pointerEvents: "auto" });
            gsap.set(path, { attr: { d: paths.startDown } });
            gsap.set(textEl, { opacity: 0, y: 24, scale: 0.96 });

            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(overlay, { display: "none", pointerEvents: "none" });
                    setIsTransitioning(false);
                },
            });

            // ==========================================
            // PHASE 1: CURVE ENTRANCE (Curtain sweeps UP from bottom)
            // ==========================================
            tl.to(path, {
                duration: 0.45,
                ease: "power3.in",
                attr: { d: paths.curveUpEnter },
            })
                .to(path, {
                    duration: 0.3,
                    ease: "power2.out",
                    attr: { d: paths.flat },
                });

            // ==========================================
            // PHASE 2: SHOW DESTINATION NAVIGATION TEXT
            // ==========================================
            tl.to(
                textEl,
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                },
                "-=0.2"
            );

            // Change page in Next.js router or reset scroll for same-page navigation
            tl.add(() => {
                if (pathname === targetHref) {
                    window.scrollTo({ top: 0, behavior: "instant" });
                } else {
                    router.push(targetHref);
                }
            }, "+=0.05");

            // Hold text briefly while new page renders
            tl.to({}, { duration: 0.35 });

            // Hide text smoothly before exit
            tl.to(textEl, {
                opacity: 0,
                y: -18,
                duration: 0.22,
                ease: "power2.in",
            });

            // ==========================================
            // PHASE 3: CURVE EXIT (Curtain sweeps UP out of screen)
            // ==========================================
            tl.to(path, {
                duration: 0.4,
                ease: "power3.in",
                attr: { d: paths.curveUpExit },
            })
                .to(path, {
                    duration: 0.25,
                    ease: "power2.out",
                    attr: { d: paths.endTop },
                });
        },
        [isTransitioning, pathname, router]
    );

    return (
        <PageTransitionContext.Provider value={{ navigateTo, isTransitioning }}>
            {children}

            {/* Transition Viewport Layer with Curved SVG Morphing Curtain */}
            <div
                ref={overlayRef}
                aria-hidden={!isTransitioning}
                className="fixed inset-0 z-[9999] pointer-events-none hidden flex-col items-center justify-center"
            >
                {/* SVG Morphing Canvas */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        ref={pathRef}
                        fill={TRANSITION_BG_COLOR}
                        d="M0 0 L1000 0 L1000 0 Q500 0 0 0 Z"
                    />
                </svg>

                {/* Center Transition Text in Geist Typography */}
                <div
                    ref={textRef}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4 text-center"
                >
                    <h2 className="font-sans font-medium text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-center text-[#000000] select-none">
                        {transitionText}
                    </h2>
                </div>
            </div>
        </PageTransitionContext.Provider>
    );
}

