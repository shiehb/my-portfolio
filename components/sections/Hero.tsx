"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageTransition } from "../ui/PageTransition";
import { ArrowUpRight } from "lucide-react";

const ROLES = ["DEVELOPER", "DESIGNER"];

export function Hero() {
    const rootRef = useRef<HTMLElement>(null);
    const line1Ref = useRef<HTMLHeadingElement>(null);
    const line2Ref = useRef<HTMLDivElement>(null);
    const line3Ref = useRef<HTMLParagraphElement>(null);
    const bottomRowRef = useRef<HTMLDivElement>(null);
    const word0Ref = useRef<HTMLSpanElement>(null);
    const word1Ref = useRef<HTMLSpanElement>(null);

    const { navigateTo } = usePageTransition();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Initial entrance animations
            tl.from(line1Ref.current, { opacity: 0, y: 24, duration: 0.8, ease: "power3.out" })
                .from(line2Ref.current, { opacity: 0, y: 24, duration: 0.8, ease: "power3.out" }, "-=0.5")
                .from(line3Ref.current, { opacity: 0, y: 24, duration: 0.8, ease: "power3.out" }, "-=0.5")
                .from(bottomRowRef.current, { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.4");

            // Horizontal movement on scroll down (horizontal trigger scroll):
            // Line 1 moves LEFT by 50px
            if (line1Ref.current) {
                gsap.to(line1Ref.current, {
                    x: -50,
                    ease: "none",
                    scrollTrigger: {
                        trigger: rootRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }

            // Line 2 moves RIGHT by 50px
            if (line2Ref.current) {
                gsap.to(line2Ref.current, {
                    x: 50,
                    ease: "none",
                    scrollTrigger: {
                        trigger: rootRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }

            // Line 3 moves LEFT by 50px
            if (line3Ref.current) {
                gsap.to(line3Ref.current, {
                    x: -50,
                    ease: "none",
                    scrollTrigger: {
                        trigger: rootRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }

            // Staggered character slide-up replacement loop for Developer / Designer
            const w0Chars = word0Ref.current?.querySelectorAll(".char");
            const w1Chars = word1Ref.current?.querySelectorAll(".char");

            if (w0Chars && w1Chars) {
                // Initialize word 0 visible in position, word 1 prepared below
                gsap.set(w0Chars, { yPercent: 0, opacity: 1 });
                gsap.set(w1Chars, { yPercent: 100, opacity: 0 });

                // Initial entrance for word 0 characters (first char first, following chars delayed)
                gsap.fromTo(
                    w0Chars,
                    { yPercent: 100, opacity: 0 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.65,
                        stagger: 0.04,
                        ease: "power3.out",
                        delay: 0.2,
                    }
                );

                const loopTl = gsap.timeline({
                    repeat: -1,
                    delay: 3.0, // Stays in view for 3 seconds initially
                });

                loopTl
                    // Word 0 (DEVELOPER) characters slide up and out in sequence (first char first, last char delayed)
                    .to(w0Chars, {
                        yPercent: -100,
                        opacity: 0,
                        duration: 0.5,
                        stagger: 0.035,
                        ease: "power2.in",
                    })
                    // Word 1 (DESIGNER) characters slide in from below in sequence (first char first, last char delayed)
                    .fromTo(
                        w1Chars,
                        { yPercent: 100, opacity: 0 },
                        {
                            yPercent: 0,
                            opacity: 1,
                            duration: 0.6,
                            stagger: 0.04,
                            ease: "power3.out",
                        },
                        "-=0.3"
                    )
                    // Hold in view on DESIGNER for exactly 3 seconds
                    .to({}, { duration: 3.0 })
                    // Word 1 (DESIGNER) characters slide up and out in sequence
                    .to(w1Chars, {
                        yPercent: -100,
                        opacity: 0,
                        duration: 0.5,
                        stagger: 0.035,
                        ease: "power2.in",
                    })
                    // Word 0 (DEVELOPER) characters slide back in from below in sequence
                    .fromTo(
                        w0Chars,
                        { yPercent: 100, opacity: 0 },
                        {
                            yPercent: 0,
                            opacity: 1,
                            duration: 0.6,
                            stagger: 0.04,
                            ease: "power3.out",
                        },
                        "-=0.3"
                    )
                    // Hold in view on DEVELOPER for exactly 3 seconds before repeating
                    .to({}, { duration: 3.0 });
            }
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="hero"
            ref={rootRef}
            aria-label="Introduction"
            className="min-h-screen flex flex-col justify-end items-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-28 pb-12 sm:pb-16 md:pb-20 text-left overflow-x-clip gap-2 sm:gap-3 md:gap-4"
        >
            {/* Line 1: I'M JERICHO URBANO, */}
            <h1
                ref={line1Ref}
                className="hero-line font-pixel-circle text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-ink-300 tracking-wider uppercase select-none will-change-transform whitespace-nowrap leading-[1.15] md:leading-[1.1]"
            >
                I&apos;M JERICHO URBANO,
            </h1>

            {/* Line 2: A WEBFLOW DEVELOPER / DESIGNER */}
            <div
                ref={line2Ref}
                className="hero-line flex flex-wrap items-center gap-x-2 sm:gap-x-3 md:gap-x-4 font-pixel-circle text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-ink-300 tracking-wider uppercase select-none will-change-transform leading-[1.15] md:leading-[1.1]"
            >
                <span className="whitespace-nowrap">A WEBFLOW</span>
                <span
                    aria-label="Developer and Designer"
                    className="relative inline-flex items-center overflow-hidden h-[1.15em] min-w-[11ch] pr-2 text-primary-500 leading-none"
                >
                    {/* Word 0: DEVELOPER */}
                    <span
                        ref={word0Ref}
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center whitespace-nowrap leading-none"
                    >
                        {ROLES[0].split("").map((char, i) => (
                            <span
                                key={`w0-${i}`}
                                className="char inline-block will-change-transform leading-none"
                            >
                                {char}
                            </span>
                        ))}
                    </span>

                    {/* Word 1: DESIGNER */}
                    <span
                        ref={word1Ref}
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center whitespace-nowrap leading-none"
                    >
                        {ROLES[1].split("").map((char, i) => (
                            <span
                                key={`w1-${i}`}
                                className="char inline-block will-change-transform leading-none"
                            >
                                {char}
                            </span>
                        ))}
                    </span>
                </span>
            </div>

            {/* Line 3: BASED IN PHILIPPINES. */}
            <p
                ref={line3Ref}
                className="hero-line font-pixel-circle text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl pl-25 text-ink-300 tracking-wider uppercase select-none will-change-transform whitespace-nowrap leading-[1.15] md:leading-[1.1]"
            >
                BASED IN PHILIPPINES.
            </p>

            {/* Bottom Row: Left Paragraph & Right Text Actions */}
            <div
                ref={bottomRowRef}
                className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 will-change-transform"
            >
                {/* Paragraph in bottom of the left text */}
                <p className="text-sm sm:text-base md:text-lg text-ink-500 max-w-xl leading-relaxed">
                    Crafting bespoke Webflow websites
                </p>

                {/* Right Bottom Actions: Pure text, no design, uppercase */}
                <div className="flex flex-wrap items-center gap-6 sm:gap-8 shrink-0 text-sm sm:text-base font-mono tracking-wider uppercase">
                    <a
                        href="/resume.pdf"
                        download
                        className="text-ink-300 hover:text-primary-500 transition-colors uppercase cursor-pointer select-none"
                    >
                        DOWNLOAD CV
                    </a>
                    <Link
                        href="/contact"
                        onClick={(e) => {
                            e.preventDefault();
                            navigateTo("/contact");
                        }}
                        className="text-ink-300 hover:text-primary-500 transition-colors uppercase flex items-center gap-1.5 cursor-pointer select-none"
                    >
                        <span>LETS TALK</span>
                        <ArrowUpRight className={`w-4 h-4`} />
                    </Link>
                </div>
            </div>
        </section>
    );
}


