"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import gsap from "gsap";
import { Magnetic } from "../ui/Magnetic";
import { usePageTransition } from "../ui/PageTransition";

export interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate?: (targetId: string) => void;
}

export const NAV_LINKS = [
    { num: "[01]", label: "HOME", href: "/" },
    { num: "[02]", label: "ABOUT", href: "/about" },
    { num: "[03]", label: "WORK", href: "/work" },
    { num: "[04]", label: "CONTACT", href: "/contact" },
];

export const SOCIALS = [
    { label: "GitHub", href: "https://github.com/jerichourbano" },
    { label: "LinkedIn", href: "https://linkedin.com/in/jerichourbano" },
    { label: "Instagram", href: "https://instagram.com/jerichourbano" },
];

export const EMAIL = "jerichourbano.01.01.04@gmail.com";

export function MenuOverlay({ isOpen, onClose, onNavigate }: MenuOverlayProps) {
    const pathname = usePathname();
    const { navigateTo } = usePageTransition();
    const [copied, setCopied] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!overlayRef.current || !pathRef.current) return;

        const width = window.innerWidth;
        const height = window.innerHeight;

        const initialPath = `M0 0 L${width} 0 L${width} 0 Q${width / 2} 0 0 0 Z`;
        const openCurveDown = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 250} 0 ${height} Z`;
        const flatFull = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} Z`;
        const closeCurveUp = `M0 0 L${width} 0 L${width} 0 Q${width / 2} 250 0 0 Z`;

        if (isOpen) {
            if (timelineRef.current) timelineRef.current.kill();

            gsap.set(overlayRef.current, { display: "flex", pointerEvents: "auto" });
            gsap.set(pathRef.current, { attr: { d: initialPath } });
            gsap.set(contentRef.current, { opacity: 0, y: -20 });

            const tl = gsap.timeline();

            tl.to(pathRef.current, {
                duration: 0.5,
                ease: "power3.in",
                attr: { d: openCurveDown },
            })
                .to(pathRef.current, {
                    duration: 0.35,
                    ease: "power2.out",
                    attr: { d: flatFull },
                })
                .to(
                    contentRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "power2.out",
                    },
                    "-=0.25"
                )
                .fromTo(
                    ".nav-stagger-item",
                    { opacity: 0, y: 30, x: -10 },
                    {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        duration: 0.5,
                        stagger: 0.07,
                        ease: "power3.out",
                    },
                    "-=0.3"
                );

            timelineRef.current = tl;
        } else {
            if (timelineRef.current) timelineRef.current.kill();

            const tl = gsap.timeline({
                onComplete: () => {
                    if (overlayRef.current) {
                        gsap.set(overlayRef.current, { display: "none", pointerEvents: "none" });
                    }
                },
            });

            tl.to(".nav-stagger-item", {
                opacity: 0,
                y: -10,
                duration: 0.12,
                stagger: 0.015,
                ease: "power2.in",
            })
                .to(
                    contentRef.current,
                    {
                        opacity: 0,
                        duration: 0.1,
                    },
                    "-=0.08"
                )
                .to(
                    pathRef.current,
                    {
                        duration: 0.28,
                        ease: "power3.in",
                        attr: { d: closeCurveUp },
                    },
                    "-=0.06"
                )
                .to(pathRef.current, {
                    duration: 0.18,
                    ease: "power2.out",
                    attr: { d: initialPath },
                });

            timelineRef.current = tl;
        }
    }, [isOpen]);

    const copyEmail = () => {
        navigator.clipboard.writeText(EMAIL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            id="navigation-overlay"
            ref={overlayRef}
            aria-hidden={!isOpen}
            className="fixed inset-0 z-40 hidden flex-col items-center justify-center pointer-events-none"
        >
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    ref={pathRef}
                    fill="#1a1a1a"
                    d="M0 0 L1000 0 L1000 0 Q500 0 0 0 Z"
                />
            </svg>

            {/* Menu Content Container */}
            <div
                ref={contentRef}
                className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 items-center"
            >
                {/* Primary Links */}
                <nav aria-label="Main Navigation" className="flex flex-col gap-6 md:gap-8 items-start text-left">
                    {NAV_LINKS.map((link) => {
                        const isHovered = hoveredLink === link.href;
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onClose();
                                    if (onNavigate) onNavigate(link.href);
                                    navigateTo(link.href);
                                }}
                                onMouseEnter={() => setHoveredLink(link.href)}
                                onMouseLeave={() => setHoveredLink(null)}
                                className="nav-stagger-item group flex items-baseline gap-4 md:gap-6 text-left cursor-pointer focus-visible:outline-none"
                            >
                                <span className="font-pixel-circle text-primary-500 text-[clamp(1.25rem,2.5vw,2rem)] leading-none select-none tracking-widest shrink-0">
                                    {link.num}
                                </span>

                                <span
                                    className={`font-pixel-circle text-[clamp(2.75rem,7vw,5.5rem)] leading-none tracking-wider transition-all duration-300 ease-out ${
                                        isHovered || isActive ? "text-primary-500 translate-x-3" : "text-ink-300 translate-x-0"
                                    }`}
                                >
                                    {link.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Contact Info & Socials */}
                <div className="flex flex-col gap-8 items-start justify-center text-ink-100">
                    <div className="nav-stagger-item flex flex-col gap-2">
                        <span className="text-xs uppercase tracking-widest text-ink-500 font-mono">
                            Get In Touch
                        </span>
                        <div className="flex items-center gap-3">
                            <a
                                href={`mailto:${EMAIL}`}
                                className="text-lg md:text-xl text-primary-500 hover:text-ink-50 font-medium transition-colors border-b border-primary-500/40 pb-0.5"
                            >
                                {EMAIL}
                            </a>
                            <Magnetic strength={0.3}>
                                <button
                                    type="button"
                                    onClick={copyEmail}
                                    aria-label="Copy email address"
                                    className="p-2 rounded-sm bg-white/10 hover:bg-white/20 text-ink-300 hover:text-white transition-colors cursor-pointer"
                                >
                                    {copied ? (
                                        <Check className="w-4 h-4 text-primary-500" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>
                            </Magnetic>
                        </div>
                    </div>

                    <div className="nav-stagger-item flex flex-col gap-3">
                        <span className="text-xs uppercase tracking-widest text-ink-500 font-mono">
                            Social Profiles
                        </span>
                        <ul className="flex flex-col gap-3">
                            {SOCIALS.map(({ label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-base text-ink-300/80 hover:text-primary-500 transition-colors"
                                    >
                                        <span>{label}</span>
                                        <ArrowUpRight className="w-4 h-4 opacity-60" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
