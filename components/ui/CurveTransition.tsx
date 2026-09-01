"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export interface CurvePathsUp {
    startDown: string;
    curveUpEnter: string;
    flat: string;
    curveUpExit: string;
    endTop: string;
}

/**
 * Calculates SVG path strings for upward curved curtain transitions (start down -> exit in up).
 * Uses two quadratic Bezier curves (bottom and top edge) for fluid organic morphing from bottom to top.
 */
export function getCurvePathsUp(
    width: number,
    height: number,
    curveHeight = 250
): CurvePathsUp {
    return {
        // 1. Initial 0-height strip sitting at bottom of screen (y = height)
        startDown: `M0 ${height} Q${width / 2} ${height} ${width} ${height} L${width} ${height} Q${width / 2} ${height} 0 ${height} Z`,
        // 2. Rising curve arching upwards: top edge rises to y=0 and arches up into screen, bottom stays at y=height
        curveUpEnter: `M0 0 Q${width / 2} ${-curveHeight} ${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} Z`,
        // 3. Flat full screen coverage (y=0 to y=height)
        flat: `M0 0 Q${width / 2} 0 ${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} Z`,
        // 4. Exiting upwards: bottom edge sweeps UP to y=0 with curve hanging down (control point at positive curveHeight)
        curveUpExit: `M0 0 Q${width / 2} 0 ${width} 0 L${width} 0 Q${width / 2} ${curveHeight} 0 0 Z`,
        // 5. Resting flat 0-height strip at top of screen (y = 0)
        endTop: `M0 0 Q${width / 2} 0 ${width} 0 L${width} 0 Q${width / 2} 0 0 0 Z`,
    };
}

export interface CurvePathsDown {
    initial: string;
    curveDown: string;
    flat: string;
    curveUp: string;
}

/**
 * Calculates SVG path strings for downward curved curtain transitions.
 */
export function getCurvePaths(
    width: number,
    height: number,
    curveHeight = 250
): CurvePathsDown {
    return {
        initial: `M0 0 L${width} 0 L${width} 0 Q${width / 2} 0 0 0 Z`,
        curveDown: `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + curveHeight} 0 ${height} Z`,
        flat: `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} Z`,
        curveUp: `M0 0 L${width} 0 L${width} 0 Q${width / 2} ${curveHeight} 0 0 Z`,
    };
}

export interface CurveTransitionProps {
    isActive: boolean;
    fillColor?: string;
    direction?: "up" | "down";
    curveHeight?: number;
    className?: string;
    children?: React.ReactNode;
    onEnterComplete?: () => void;
    onExitComplete?: () => void;
}

/**
 * Reusable Curved Morphing SVG Curtain Component.
 * Reproduces the fluid organic curve animation used in the menu overlay and page transitions.
 */
export function CurveTransition({
    isActive,
    fillColor = "var(--bg-curve-transition, #efefef)",
    direction = "up",
    curveHeight = 250,
    className = "",
    children,
    onEnterComplete,
    onExitComplete,
}: CurveTransitionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!containerRef.current || !pathRef.current) return;

        const width = window.innerWidth;
        const height = window.innerHeight;

        if (direction === "up") {
            const paths = getCurvePathsUp(width, height, curveHeight);

            if (isActive) {
                if (timelineRef.current) timelineRef.current.kill();

                gsap.set(containerRef.current, { display: "flex", pointerEvents: "auto" });
                gsap.set(pathRef.current, { attr: { d: paths.startDown } });
                if (contentRef.current) {
                    gsap.set(contentRef.current, { opacity: 0, y: 20 });
                }

                const tl = gsap.timeline({
                    onComplete: () => {
                        onEnterComplete?.();
                    },
                });

                // 1. Morph path UP from bottom with dynamic Bezier curve
                tl.to(pathRef.current, {
                    duration: 0.5,
                    ease: "power3.in",
                    attr: { d: paths.curveUpEnter },
                })
                    // 2. Settle into flat full-screen coverage
                    .to(pathRef.current, {
                        duration: 0.35,
                        ease: "power2.out",
                        attr: { d: paths.flat },
                    });

                // 3. Fade in content
                if (contentRef.current) {
                    tl.to(
                        contentRef.current,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.35,
                            ease: "power2.out",
                        },
                        "-=0.25"
                    );
                }

                timelineRef.current = tl;
            } else {
                if (timelineRef.current) timelineRef.current.kill();

                const tl = gsap.timeline({
                    onComplete: () => {
                        if (containerRef.current) {
                            gsap.set(containerRef.current, { display: "none", pointerEvents: "none" });
                        }
                        onExitComplete?.();
                    },
                });

                // 1. Fade out content
                if (contentRef.current) {
                    tl.to(contentRef.current, {
                        opacity: 0,
                        y: -10,
                        duration: 0.2,
                        ease: "power2.in",
                    });
                }

                // 2. Morph bottom curve upwards to exit through top
                tl.to(
                    pathRef.current,
                    {
                        duration: 0.38,
                        ease: "power3.in",
                        attr: { d: paths.curveUpExit },
                    },
                    "-=0.08"
                )
                    // 3. Reset to zero height at top
                    .to(pathRef.current, {
                        duration: 0.22,
                        ease: "power2.out",
                        attr: { d: paths.endTop },
                    });

                timelineRef.current = tl;
            }
        } else {
            const paths = getCurvePaths(width, height, curveHeight);

            if (isActive) {
                if (timelineRef.current) timelineRef.current.kill();

                gsap.set(containerRef.current, { display: "flex", pointerEvents: "auto" });
                gsap.set(pathRef.current, { attr: { d: paths.initial } });
                if (contentRef.current) {
                    gsap.set(contentRef.current, { opacity: 0, y: -16 });
                }

                const tl = gsap.timeline({
                    onComplete: () => {
                        onEnterComplete?.();
                    },
                });

                tl.to(pathRef.current, {
                    duration: 0.5,
                    ease: "power3.in",
                    attr: { d: paths.curveDown },
                })
                    .to(pathRef.current, {
                        duration: 0.35,
                        ease: "power2.out",
                        attr: { d: paths.flat },
                    });

                if (contentRef.current) {
                    tl.to(
                        contentRef.current,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.35,
                            ease: "power2.out",
                        },
                        "-=0.25"
                    );
                }

                timelineRef.current = tl;
            } else {
                if (timelineRef.current) timelineRef.current.kill();

                const tl = gsap.timeline({
                    onComplete: () => {
                        if (containerRef.current) {
                            gsap.set(containerRef.current, { display: "none", pointerEvents: "none" });
                        }
                        onExitComplete?.();
                    },
                });

                if (contentRef.current) {
                    tl.to(contentRef.current, {
                        opacity: 0,
                        y: -10,
                        duration: 0.2,
                        ease: "power2.in",
                    });
                }

                tl.to(
                    pathRef.current,
                    {
                        duration: 0.38,
                        ease: "power3.in",
                        attr: { d: paths.curveUp },
                    },
                    "-=0.08"
                )
                    .to(pathRef.current, {
                        duration: 0.22,
                        ease: "power2.out",
                        attr: { d: paths.initial },
                    });

                timelineRef.current = tl;
            }
        }

        return () => {
            if (timelineRef.current) timelineRef.current.kill();
        };
    }, [isActive, direction, curveHeight, onEnterComplete, onExitComplete]);

    return (
        <div
            ref={containerRef}
            aria-hidden={!isActive}
            className={`fixed inset-0 z-[9999] hidden flex-col items-center justify-center pointer-events-none ${className}`}
        >
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path ref={pathRef} fill={fillColor} d="M0 0 L1000 0 L1000 0 Q500 0 0 0 Z" />
            </svg>

            {children && (
                <div ref={contentRef} className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                    {children}
                </div>
            )}
        </div>
    );
}

export default CurveTransition;
