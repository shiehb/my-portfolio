"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Magnetic } from "../ui/Magnetic";
import { AnimatedMenuIcon } from "../ui/AnimatedMenuIcon";
import { usePageTransition } from "../ui/PageTransition";
import { MenuOverlay } from "./MenuOverlay";

interface NavbarProps {
    onNavigate?: (targetId: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
    const pathname = usePathname();
    const { navigateTo } = usePageTransition();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Top Navigation Bar */}
            <header className="bg-transparent fixed top-0 inset-x-0 z-50 flex items-center justify-between gap-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-5">
                <Link
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        if (pathname !== "/") {
                            navigateTo("/");
                        } else {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                    }}
                    className="shrink-0 group focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
                    aria-label="Jericho Urbano Home"
                >
                    <Image
                        src="/logo.webp"
                        alt="Jericho Urbano Logo"
                        width={40}
                        height={40}
                        className="h-10 w-auto object-contain transition-opacity hover:opacity-80 invert-100"
                        priority
                    />
                </Link>

                {/* Menu Toggle Button */}
                <Magnetic strength={0.4}>
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-expanded={isOpen}
                        aria-controls="navigation-overlay"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        className="p-2 md:p-3 rounded-pill border-none bg-transparent text-ink-50 hover:text-primary-500 transition-colors cursor-pointer"
                    >
                        <AnimatedMenuIcon isOpen={isOpen} />
                    </button>
                </Magnetic>
            </header>

            {/* Segregated Fullscreen Menu Overlay */}
            <MenuOverlay
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onNavigate={onNavigate}
            />
        </>
    );
}
