"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDownRight, FileText } from "lucide-react";
import { Button, TextLink } from "@/components/ui/Button";

export function Hero() {
    const rootRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            if (headingRef.current) {
                gsap.fromTo(
                    headingRef.current,
                    { scale: 0.96, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 1.1, delay: 0.1, ease: "power3.out" }
                );
            }

            tl.from(".hero-eyebrow", { opacity: 0, y: 12, duration: 0.5 })
                .from(".hero-subtext", { opacity: 0, y: 16, duration: 0.6 }, "-=0.2")
                .from(".hero-actions", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4");
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="hero"
            ref={rootRef}
            aria-label="Introduction"
            className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-20 pb-12"
        >
            <p className="hero-eyebrow text-sm leading-sm text-primary-500 font-mono font-medium tracking-widest uppercase mb-4">
                Software &amp; Systems Engineer
            </p>

            <h1
                ref={headingRef}
                className="hero-heading font-pixel-circle text-7xl text-ink-300 tracking-wider uppercase select-none"
            >
                JERICHO URBANO
            </h1>

            <p className="hero-subtext text-md md:text-lg leading-md text-ink-500 max-w-2xl mt-6">
                Building resilient web applications, custom integrations, and cloud infrastructure engineered to scale with your product roadmap.
            </p>

            <div className="hero-actions flex flex-wrap items-center gap-4 sm:gap-6 mt-10">
                <Button
                    variant="primary"
                    size="md"
                    icon={<FileText className="w-4 h-4" />}
                    onClick={() => {
                        window.open("/resume.pdf", "_blank", "noopener,noreferrer");
                    }}
                >
                    Download CV
                </Button>
                <TextLink
                    variant="secondary"
                    href="/contact"
                    icon={<ArrowDownRight className="w-4 h-4" />}
                >
                    Get in touch
                </TextLink>
            </div>
        </section>
    );
}

