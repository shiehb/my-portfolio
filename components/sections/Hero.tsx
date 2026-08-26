"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageTransition } from "../ui/PageTransition";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSplitText } from "../ui/AnimatedSplitText";

const ROLES = ["DEVELOPER", "DESIGNER"];

export function Hero() {
    const rootRef = useRef<HTMLElement>(null);
    const line1Ref = useRef<HTMLHeadingElement>(null);
    const line2Ref = useRef<HTMLDivElement>(null);
    const line3Ref = useRef<HTMLParagraphElement>(null);
    const bottomRowRef = useRef<HTMLDivElement>(null);
    const word0Ref = useRef<HTMLSpanElement>(null);
    const word1Ref = useRef<HTMLSpanElement>(null);

    const [isHoveredCv, setIsHoveredCv] = useState(false);
    const [isHoveredTalk, setIsHoveredTalk] = useState(false);

    const { navigateTo } = usePageTransition();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Initial entrance animations for text and bottom row
            tl.from(line1Ref.current, { opacity: 0, y: 24, duration: 0.8, ease: "power3.out" })
                .from(line2Ref.current, { opacity: 0, y: 24, duration: 0.8, ease: "power3.out" }, "-=0.5")
                .from(line3Ref.current, { opacity: 0, y: 24, duration: 0.8, ease: "power3.out" }, "-=0.5")
                .from(bottomRowRef.current, { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.4");

            // Horizontal movement on scroll down (increased for dynamic parallax impact):
            if (line1Ref.current) {
                gsap.to(line1Ref.current, {
                    x: -120,
                    ease: "none",
                    scrollTrigger: {
                        trigger: rootRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }

            if (line2Ref.current) {
                gsap.to(line2Ref.current, {
                    x: 120,
                    ease: "none",
                    scrollTrigger: {
                        trigger: rootRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }

            if (line3Ref.current) {
                gsap.to(line3Ref.current, {
                    x: -120,
                    ease: "none",
                    scrollTrigger: {
                        trigger: rootRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
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

                // Initial entrance for word 0 characters
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
                    // Word 0 (DEVELOPER) characters slide up and out in sequence
                    .to(w0Chars, {
                        yPercent: -100,
                        opacity: 0,
                        duration: 0.5,
                        stagger: 0.035,
                        ease: "power2.in",
                    })
                    // Word 1 (DESIGNER) characters slide in from below in sequence
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
            className="relative isolate min-h-screen grid grid-rows-[1fr_auto_1fr] items-stretch text-center overflow-x-clip"
        >
            {/* 1st Row: Image at the bottom center of Row 1 */}
            <div className="relative z-10 flex items-end justify-center pb-1 sm:pb-2">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-black overflow-hidden shrink-0 bg-[#c9c9c9]">
                    <Image
                        src="/hero-portrait.webp"
                        alt="Jericho Urbano"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                </div>
            </div>

            {/* 2nd Row: Text dead center on the screen */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-1 sm:gap-2 md:gap-3 w-full py-0">
                {/* Line 1: I'M JERICHO URBANO, */}
                <h1
                    ref={line1Ref}
                    className="hero-line font-pixel-circle text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-ink-300 tracking-wider uppercase select-none will-change-transform whitespace-nowrap leading-[1.15] text-center"
                >
                    I&apos;M JERICHO URBANO,
                </h1>

                {/* Line 2: A WEBFLOW DEVELOPER / DESIGNER */}
                <div
                    ref={line2Ref}
                    className="hero-line flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 md:gap-x-4 font-pixel-circle text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-ink-300 tracking-wider uppercase select-none will-change-transform leading-[1.15] text-center"
                >
                    <span className="whitespace-nowrap">A WEBFLOW</span>
                    <span
                        aria-label="Developer and Designer"
                        className="relative inline-flex items-center overflow-hidden h-[1.15em] min-w-[11ch] pr-2 text-primary-500 leading-none text-left"
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
                    className="hero-line font-pixel-circle text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-ink-300 tracking-wider uppercase select-none will-change-transform whitespace-nowrap leading-[1.15] text-center"
                >
                    BASED IN PHILIPPINES.
                </p>
            </div>

            {/* 3rd Row: Left bottom description and Right bottom actions */}
            <div
                ref={bottomRowRef}
                className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between items-center text-center md:text-left gap-6 md:gap-10  pb-10 sm:pb-12 md:pb-14 will-change-transform"
            >
                {/* Left Bottom */}
                <p className="text-sm sm:text-base md:text-lg text-ink-500 max-w-xl leading-relaxed">
                    Designing and Developing visuall stunning and technicall proficient website for clients.</p>

                {/* Right Bottom Actions */}
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-8 shrink-0 text-sm sm:text-base font-mono tracking-wider uppercase">
                    <a
                        href="/resume.pdf"
                        download
                        onMouseEnter={() => setIsHoveredCv(true)}
                        onMouseLeave={() => setIsHoveredCv(false)}
                        className="group inline-flex items-center text-ink-300 hover:text-primary-500 transition-colors uppercase cursor-pointer select-none py-1"
                    >
                        <AnimatedSplitText
                            text="DOWNLOAD CV"
                            isHovered={isHoveredCv}
                            className="font-mono text-sm sm:text-base tracking-wider"
                            colorTop="text-ink-300"
                            colorBottom="text-primary-500"
                        />
                    </a>
                    <Link
                        href="/contact"
                        onClick={(e) => {
                            e.preventDefault();
                            navigateTo("/contact");
                        }}
                        onMouseEnter={() => setIsHoveredTalk(true)}
                        onMouseLeave={() => setIsHoveredTalk(false)}
                        className="group inline-flex items-center gap-1.5 text-ink-300 hover:text-primary-500 transition-colors uppercase cursor-pointer select-none py-1"
                    >
                        <AnimatedSplitText
                            text="LETS TALK"
                            isHovered={isHoveredTalk}
                            className="font-mono text-sm sm:text-base tracking-wider"
                            colorTop="text-ink-300"
                            colorBottom="text-primary-500"
                        />
                        <ArrowUpRight
                            className={`w-4 h-4 transition-transform duration-300 ease-out ${
                                isHoveredTalk ? "text-primary-500 translate-x-0.5 -translate-y-0.5" : "text-ink-300"
                            }`}
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}


