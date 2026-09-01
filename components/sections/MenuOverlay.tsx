"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { usePageTransition } from "../ui/PageTransition";
import { AnimatedSplitText } from "../ui/AnimatedSplitText";
import { getCurvePaths } from "../ui/CurveTransition";

export interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate?: (targetId: string) => void;
}

export interface NavLinkItem {
    label: string;
    href: string;
}

export interface SocialLinkItem {
    label: string;
    href: string;
}

export const NAV_LINKS: NavLinkItem[] = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "WORK", href: "/work" },
    { label: "CONTACT", href: "/contact" },
];

export const SOCIALS: SocialLinkItem[] = [
    { label: "GITHUB", href: "https://github.com/jerichourbano" },
    { label: "LINKEDIN", href: "https://linkedin.com/in/jerichourbano" },
    { label: "INSTAGRAM", href: "https://instagram.com/jerichourbano" },
];

export const EMAIL = "jerichourbano.01.01.04@gmail.com";

/* -------------------------------------------------------------------------- */
/* Sub-Component: Navigation List                                              */
/* -------------------------------------------------------------------------- */
interface NavigationListProps {
    pathname: string;
    hoveredLink: string | null;
    setHoveredLink: (href: string | null) => void;
    onItemClick: (href: string, label?: string) => void;
}

function NavigationList({ pathname, hoveredLink, setHoveredLink, onItemClick }: NavigationListProps) {
    return (
        <nav aria-label="Main Navigation" className="flex-1 flex flex-col justify-center gap-6 md:gap-8 items-center text-center w-full my-auto">
            {NAV_LINKS.map((link) => {
                const isHovered = hoveredLink === link.href;
                const isActive = pathname === link.href;

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                            e.preventDefault();
                            onItemClick(link.href, link.label);
                        }}
                        onMouseEnter={() => setHoveredLink(link.href)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="nav-stagger-item group flex items-center justify-center text-center cursor-pointer focus-visible:outline-none w-full"
                    >
                        <AnimatedSplitText
                            text={link.label}
                            isHovered={isHovered || isActive}
                            className="font-sans font-medium text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-center"
                            colorTop={isActive ? "text-[var(--color-accent-primary)]" : "text-[var(--text-inverse-primary)]"}
                            colorBottom="text-[var(--color-accent-primary)]"
                        />
                    </Link>
                );
            })}
        </nav>
    );
}

/* -------------------------------------------------------------------------- */
/* Sub-Component: Social Profiles Footer                                      */
/* -------------------------------------------------------------------------- */
interface SocialFooterProps {
    hoveredSocial: string | null;
    setHoveredSocial: (label: string | null) => void;
}

function SocialFooter({ hoveredSocial, setHoveredSocial }: SocialFooterProps) {
    return (
        <div className="nav-stagger-item flex flex-col items-center justify-center gap-3 w-full text-center">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--text-inverse-secondary)] font-medium text-center">
                Social Profiles
            </span>
            <ul className="flex flex-row items-center justify-center gap-6 sm:gap-8 whitespace-nowrap">
                {SOCIALS.map(({ label, href }) => {
                    const isHovered = hoveredSocial === label;

                    return (
                        <li key={label} className="inline-flex items-center">
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => setHoveredSocial(label)}
                                onMouseLeave={() => setHoveredSocial(null)}
                                className="group inline-flex items-center gap-2 text-sm lg:text-base text-[var(--text-inverse-secondary)] hover:text-[var(--color-accent-primary)] transition-colors py-0.5"
                            >
                                <AnimatedSplitText
                                    text={label}
                                    isHovered={isHovered}
                                    className="font-sans text-sm lg:text-base font-medium tracking-wide"
                                    colorTop="text-[var(--text-inverse-secondary)]"
                                    colorBottom="text-[var(--color-accent-primary)]"
                                />
                                <ArrowUpRight
                                    className={`w-4 h-4 transition-transform duration-300 ease-out ${isHovered
                                        ? "text-[var(--color-accent-primary)] translate-x-0.5 -translate-y-0.5 opacity-100"
                                        : "text-[var(--text-inverse-secondary)] opacity-70"
                                        }`}
                                />
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Main Component: MenuOverlay                                                */
/* -------------------------------------------------------------------------- */
export function MenuOverlay({ isOpen, onClose, onNavigate }: MenuOverlayProps) {
    const pathname = usePathname();
    const { navigateTo } = usePageTransition();
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const isNavigatingRef = useRef(false);

    const handleNavigate = (href: string, label?: string) => {
        // Suppress competing menu exit curve animation so PageTransition handles the full transition cleanly
        isNavigatingRef.current = true;
        onClose();
        if (onNavigate) onNavigate(href);
        navigateTo(href, label);
    };

    useEffect(() => {
        if (!overlayRef.current || !pathRef.current) return;

        const width = window.innerWidth;
        const height = window.innerHeight;
        const paths = getCurvePaths(width, height, 250);

        if (isOpen) {
            isNavigatingRef.current = false;
            if (timelineRef.current) timelineRef.current.kill();

            gsap.set(overlayRef.current, { display: "flex", pointerEvents: "auto" });
            gsap.set(pathRef.current, { attr: { d: paths.initial } });
            gsap.set(contentRef.current, { opacity: 0, y: -20 });

            const tl = gsap.timeline();

            tl.to(pathRef.current, {
                duration: 0.5,
                ease: "power3.in",
                attr: { d: paths.curveDown },
            })
                .to(pathRef.current, {
                    duration: 0.35,
                    ease: "power2.out",
                    attr: { d: paths.flat },
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

            // If navigation is occurring, immediately hide menu overlay without overlapping curves
            if (isNavigatingRef.current) {
                isNavigatingRef.current = false;
                if (overlayRef.current) {
                    gsap.set(overlayRef.current, { display: "none", pointerEvents: "none" });
                }
                return;
            }

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
                        attr: { d: paths.curveUp },
                    },
                    "-=0.06"
                )
                .to(pathRef.current, {
                    duration: 0.18,
                    ease: "power2.out",
                    attr: { d: paths.initial },
                });

            timelineRef.current = tl;
        }
    }, [isOpen]);

    return (
        <div
            id="navigation-overlay"
            ref={overlayRef}
            aria-hidden={!isOpen}
            className="fixed inset-0 z-40 hidden flex-col items-center justify-center pointer-events-none"
        >
            {/* SVG Morphing Canvas */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    ref={pathRef}
                    fill="#121826"
                    d="M0 0 L1000 0 L1000 0 Q500 0 0 0 Z"
                />
            </svg>

            {/* Menu 2-Column Grid Layout */}
            <div
                ref={contentRef}
                className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-0 w-full max-w-[1920px] mx-auto px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 min-h-[70vh] md:min-h-[75vh] py-8"
            >
                {/* Column 1: Left Spacer (Desktop Only) */}
                <div className="hidden md:block" aria-hidden="true" />

                {/* Column 2: Navigation Links (Vertically Centered) & Social Profiles (Bottom) */}
                <div className="flex flex-col justify-between items-center h-full min-h-[80vh] md:min-h-[90vh] gap-12 md:gap-16 w-full md:w-fit md:ml-auto pr-0 md:pr-10 lg:pr-45">
                    <NavigationList
                        pathname={pathname}
                        hoveredLink={hoveredLink}
                        setHoveredLink={setHoveredLink}
                        onItemClick={handleNavigate}
                    />

                    <SocialFooter
                        hoveredSocial={hoveredSocial}
                        setHoveredSocial={setHoveredSocial}
                    />
                </div>
            </div>
        </div>
    );
}

