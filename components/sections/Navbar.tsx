"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Copy, Check, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { Magnetic } from "../ui/Magnetic";
import { AnimatedMenuIcon } from "../ui/AnimatedMenuIcon";

interface NavbarProps {
    onNavigate?: (targetId: string) => void;
}

const NAV_LINKS = [
    { label: "ABOUT", href: "#about", target: "about" },
    { label: "WORK", href: "#work", target: "work" },
    { label: "CONTACT", href: "#contact", target: "contact" },
];

const SOCIALS = [
    { label: "GitHub", href: "https://github.com/jerichourbano" },
    { label: "LinkedIn", href: "https://linkedin.com/in/jerichourbano" },
    { label: "Instagram", href: "https://instagram.com/jerichourbano" },
];

const EMAIL = "jerichourbano.01.01.04@gmail.com";

export function Navbar({ onNavigate }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!overlayRef.current || !pathRef.current) return;

        // Dimensions for SVG curve animation
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Exact symmetrical curve parameters
        const initialPath = `M0 0 L${width} 0 L${width} 0 Q${width / 2} 0 0 0 Z`;
        const openCurveDown = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 250} 0 ${height} Z`;
        const flatFull = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} Z`;

        // Closing curve: starts flatFull, pulls upward trailing the curve, finishes at initialPath
        const closeCurveUp = `M0 0 L${width} 0 L${width} 0 Q${width / 2} 250 0 0 Z`;

        if (isOpen) {
            if (timelineRef.current) timelineRef.current.kill();

            gsap.set(overlayRef.current, { display: "flex", pointerEvents: "auto" });
            gsap.set(pathRef.current, { attr: { d: initialPath } });
            gsap.set(contentRef.current, { opacity: 0, y: -20 });

            const tl = gsap.timeline();

            // Open: Step 1 (curved swipe down) -> Step 2 (flatten to bottom)
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

            // Close: Quick stagger out -> Step 1 (fast curved swipe up) -> Step 2 (snap flatten to top)
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

    const handleLinkClick = (targetId: string) => {
        setIsOpen(false);
        if (onNavigate) {
            onNavigate(targetId);
        } else {
            const el = document.getElementById(targetId);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const copyEmail = () => {
        navigator.clipboard.writeText(EMAIL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            {/* Top Navbar */}
            <header className="bg-transparent fixed top-0 inset-x-0 z-50 flex items-center justify-between gap-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-5">
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="shrink-0 group"
                    aria-label="Home"
                >
                    {/* Logo from public/logo.webp */}
                    <img
                        src="/logo.webp"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="h-10 w-auto object-contain transition-opacity hover:opacity-80"
                        onError={(e) => {
                            e.currentTarget.src = "/logo.svg";
                        }}
                    />
                </a>

                {/* Menu Toggle Button (Magnetic GSAP) */}
                <Magnetic strength={0.4}>
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-expanded={isOpen}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        className="btn btn-tertiary !bg-transparent hover:!bg-transparent !p-2 md:!p-3 rounded-full border-none shadow-none text-white hover:text-[#ff4d00] transition-colors cursor-pointer"
                    >
                        <AnimatedMenuIcon isOpen={isOpen} />
                    </button>
                </Magnetic>
            </header>

            {/* Fullscreen Overlay Menu with GSAP Curved SVG Swipe & #222222 BG */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-40 hidden flex-col items-center justify-center pointer-events-none"
            >
                {/* SVG Curved Swipe Surface (#222222) */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        ref={pathRef}
                        fill="#222222"
                        d="M0 0 L1000 0 L1000 0 Q500 0 0 0 Z"
                    />
                </svg>

                {/* Menu Content Container */}
                <div
                    ref={contentRef}
                    className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20  items-center"
                >
                    {/* Left Column: Big Circle Dot Pixel Links with Slide-to-the-Right on Hover */}
                    <nav className="flex flex-col gap-6 md:gap-8 items-start text-left">
                        {NAV_LINKS.map((link) => {
                            const isHovered = hoveredLink === link.target;
                            return (
                                <button
                                    key={link.href}
                                    onClick={() => handleLinkClick(link.target)}
                                    onMouseEnter={() => setHoveredLink(link.target)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    className="nav-stagger-item group flex items-center gap-4 text-left cursor-pointer focus:outline-none transition-transform duration-300 ease-out"
                                    style={{
                                        transform: isHovered ? "translateX(28px)" : "translateX(0px)",
                                    }}
                                >
                                    {/* Subtle hover indicator dot / arrow */}
                                    <span
                                        className={`w-3 h-3 rounded-full bg-[#ff4d00] transition-all duration-300 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-0 -mr-7"
                                            }`}
                                    />

                                    {/* Main Pixel Dot Text (Circle Font) */}
                                    <span
                                        className={`font-pixel-circle text-[clamp(2.75rem,7vw,5.5rem)] leading-none tracking-wider transition-colors duration-300 ${isHovered ? "text-[#ff4d00]" : "text-[#d7d7d3]"
                                            }`}
                                    >
                                        {link.label}
                                    </span>

                                    {/* Slide-in subtle arrow indicator */}
                                    <ArrowRight
                                        className={`w-6 h-6 text-[#ff4d00] transition-all duration-300 ${isHovered
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 -translate-x-3 pointer-events-none"
                                            }`}
                                    />
                                </button>
                            );
                        })}
                    </nav>

                    {/* Right Column: Contact Info & Socials */}
                    <div className="flex flex-col gap-8 items-start justify-center text-white/90">
                        <div className="nav-stagger-item flex flex-col gap-2">
                            <span className="text-xs uppercase tracking-widest text-[#8a8a86] font-mono">
                                Get In Touch
                            </span>
                            <div className="flex items-center gap-3">
                                <a
                                    href={`mailto:${EMAIL}`}
                                    className="text-lg md:text-xl text-[#ff4d00] hover:text-white font-medium transition-colors border-b border-[#ff4d00]/40 pb-0.5"
                                >
                                    {EMAIL}
                                </a>
                                <Magnetic strength={0.3}>
                                    <button
                                        onClick={copyEmail}
                                        title="Copy email"
                                        className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                                    >
                                        {copied ? (
                                            <Check className="w-4 h-4 text-green-400" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </button>
                                </Magnetic>
                            </div>
                        </div>

                        <div className="nav-stagger-item flex flex-col gap-3">
                            <span className="text-xs uppercase tracking-widest text-[#8a8a86] font-mono">
                                Social Profiles
                            </span>
                            <ul className="flex flex-col gap-3">
                                {SOCIALS.map(({ label, href }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-base text-[#d7d7d3]/80 hover:text-[#ff4d00] transition-colors"
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
        </>
    );
}
