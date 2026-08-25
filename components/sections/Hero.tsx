"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button, TextLink } from "@/components/ui/Button";

export function Hero() {
    const rootRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Animate scale & opacity cleanly while CSS preserves the circular pixel dot font
            if (headingRef.current) {
                gsap.fromTo(
                    headingRef.current,
                    { scale: 0.96, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 1.2, delay: 0.15, ease: "power3.out" }
                );
            }

            // Existing stagger animations
            tl.from(".hero-eyebrow", { opacity: 0, y: 12, duration: 0.5 })
                .from(".hero-subtext", { opacity: 0, y: 16, duration: 0.6 }, "-=0.2")
                .from(".hero-actions", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4");
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20"
        >
            <p className="hero-eyebrow text-[var(--text-m)] leading-[var(--leading-sm)] text-[var(--color-accent-500)] font-medium tracking-wide uppercase mb-4">
                I&apos;m
            </p>

            <p
                ref={headingRef}
                className="hero-heading font-pixel-circle text-7xl text-[var(--color-text-on-dark)] tracking-wider"
            >
                JERICHO URBANO
            </p>

            <p className="hero-subtext text-[var(--text-md)] leading-[var(--leading-md)] text-[var(--color-text-on-dark-muted)] max-w-[32rem] mt-6">
                I build custom software, integrations, and systems for clients who need reliable, scalable, and thoughtfully-designed digital products. Usually I work with Python/Django, TypeScript/Next.js, and cloud infrastructure, but I adapt to what the project needs.
            </p>

            <div className="hero-actions flex flex-wrap items-center gap-4 mt-10">
                <Button variant="primary">Download CV</Button>
                <TextLink variant="secondary" href="#">
                    View Projects
                </TextLink>
            </div>
        </section>
    );
}

