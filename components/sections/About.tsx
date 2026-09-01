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
            className="relative w-full max-w-[1920px] mx-auto px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-20 sm:py-28 md:py-36"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 w-full items-start">
                {/* Column 1 spanning into 2: The About Content container */}
                <div className="col-span-1 md:col-span-2 flex flex-col items-start text-left px-2 sm:px-4">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                        <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-muted">
                            {"// ABOUT ME"}
                        </span>
                    </div>

                    <h2 className="font-pixel-circle text-2xl sm:text-3xl lg:text-4xl text-ink-300 tracking-wider normal-case mb-6 leading-tight max-w-2xl">
                        Bridging design and clean engineering.
                    </h2>

                    <div className="space-y-4 font-mono text-sm sm:text-base text-muted leading-relaxed max-w-2xl">
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
                            className="relative group inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-canvas rounded-none text-ink-300 hover:text-primary-500 transition-colors uppercase cursor-pointer select-none"
                        >
                            {/* Extended crosshair borders forming plus corners */}
                            <span
                                aria-hidden="true"
                                className="absolute -left-2 -right-2 top-0 border-t border-black pointer-events-none"
                            />
                            <span
                                aria-hidden="true"
                                className="absolute -left-2 -right-2 bottom-0 border-b border-black pointer-events-none"
                            />
                            <span
                                aria-hidden="true"
                                className="absolute -top-2 -bottom-2 left-0 border-l border-black pointer-events-none"
                            />
                            <span
                                aria-hidden="true"
                                className="absolute -top-2 -bottom-2 right-0 border-r border-black pointer-events-none"
                            />

                            <AnimatedSplitText
                                text="READ MORE"
                                isHovered={isHoveredMore}
                                className="font-mono text-xs sm:text-sm tracking-wider"
                                colorTop="text-ink-300"
                                colorBottom="text-primary-500"
                            />
                            <ArrowUpRight
                                className={`w-3.5 h-3.5 transition-transform duration-300 ease-out ${isHoveredMore
                                        ? "text-primary-500 translate-x-0.5 -translate-y-0.5"
                                        : "text-ink-300"
                                    }`}
                            />
                        </Link>
                    </div>
                </div>

                {/* Empty Column 3 on Desktop */}
                <div className="hidden md:block col-span-1" aria-hidden="true" />
            </div>
        </section>
    );
}
