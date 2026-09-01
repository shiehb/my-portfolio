"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePageTransition } from "../ui/PageTransition";
import { AnimatedSplitText } from "../ui/AnimatedSplitText";

export function About() {
    const { navigateTo } = usePageTransition();
    const [isHoveredMore, setIsHoveredMore] = useState(false);

    return (
        <section
            id="about"
            aria-label="About"
            className="c-section relative w-full max-w-[1920px] mx-auto"
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-start">
                {/* Column 1 spanning 8 cols on desktop: The About Content container */}
                <div className="col-span-1 md:col-span-8 flex flex-col items-start text-left">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)] animate-pulse" />
                        <span className="font-sans text-xs sm:text-sm uppercase tracking-widest text-[var(--text-secondary)] font-medium">
                            {"// ABOUT ME"}
                        </span>
                    </div>

                    <h2 className="c-heading is-secondary font-sans font-semibold text-2xl sm:text-3xl lg:text-4xl text-[var(--color-neutral-primary)] tracking-tight normal-case mb-6 leading-tight max-w-2xl">
                        Bridging design and clean engineering.
                    </h2>

                    <div className="space-y-4 font-sans text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                        <p>
                            I am Jericho Urbano, a Webflow developer and UI/UX designer based in
                            the Philippines. I specialize in building custom, high-performance web
                            experiences, interactive micro-interactions, and design systems.
                        </p>
                        <p>
                            Focused on delivering pixel-precision, seamless transitions, and
                            scalable architectures that elevate digital presence and drive
                            meaningful engagement.
                        </p>
                    </div>

                    <div className="mt-8 pt-4">
                        <Link
                            href="/about"
                            onClick={(e) => {
                                e.preventDefault();
                                navigateTo("/about");
                            }}
                            onMouseEnter={() => setIsHoveredMore(true)}
                            onMouseLeave={() => setIsHoveredMore(false)}
                            className="relative group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--bg-primary)] rounded-none text-[var(--text-primary)] hover:text-[var(--color-accent-primary)] transition-colors uppercase cursor-pointer select-none border border-[var(--border-primary)] shadow-sm hover:shadow-md"
                        >
                            {/* Extended crosshair borders forming plus corners */}
                            <span
                                aria-hidden="true"
                                className="absolute -left-2 -right-2 top-0 border-t border-[var(--color-neutral-primary)] pointer-events-none opacity-40"
                            />
                            <span
                                aria-hidden="true"
                                className="absolute -left-2 -right-2 bottom-0 border-b border-[var(--color-neutral-primary)] pointer-events-none opacity-40"
                            />
                            <span
                                aria-hidden="true"
                                className="absolute -top-2 -bottom-2 left-0 border-l border-[var(--color-neutral-primary)] pointer-events-none opacity-40"
                            />
                            <span
                                aria-hidden="true"
                                className="absolute -top-2 -bottom-2 right-0 border-r border-[var(--color-neutral-primary)] pointer-events-none opacity-40"
                            />

                            <AnimatedSplitText
                                text="READ MORE"
                                isHovered={isHoveredMore}
                                className="font-sans font-medium text-xs sm:text-sm tracking-wider"
                                colorTop="text-[var(--text-primary)]"
                                colorBottom="text-[var(--color-accent-primary)]"
                            />
                            <ArrowUpRight
                                className={`w-3.5 h-3.5 transition-transform duration-300 ease-out ${isHoveredMore
                                    ? "text-[var(--color-accent-primary)] translate-x-0.5 -translate-y-0.5"
                                    : "text-[var(--text-primary)]"
                                    }`}
                            />
                        </Link>
                    </div>
                </div>

                {/* Column 2: 4 cols on desktop for a design system feature card */}
                <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
                    <div className="c-card has-shadow p-6 rounded-card bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
                        <span className="font-sans text-xs uppercase tracking-widest text-[var(--color-accent-primary)] font-semibold mb-2 block">
                            Core Focus
                        </span>
                        <h3 className="text-lg font-bold text-[var(--color-neutral-primary)] mb-2 font-sans">
                            Systems & Architecture
                        </h3>
                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                            Crafting scalable UI components, modular design tokens, and fluid interactions with zero layout shifts.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
