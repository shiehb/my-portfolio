"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Magnetic } from "@/components/ui/Magnetic";
import { AnimatedMenuIcon } from "@/components/ui/AnimatedMenuIcon";
import { AnimatedSplitText } from "@/components/ui/AnimatedSplitText";
import { usePageTransition } from "@/components/ui/PageTransition";
import { MenuOverlay } from "@/components/layout/menu-overlay";

export const NAVBAR_LINKS = [
  { label: "ABOUT", href: "/about" },
  { label: "WORK", href: "/work" },
  { label: "CONTACT", href: "/contact" },
];

export interface NavbarProps {
  onNavigate?: (targetId: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const pathname = usePathname();
  const { navigateTo } = usePageTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      setIsScrolled(scrolled);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Body Scroll-Lock Handler for fullscreen menu overlay
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [isOpen]);

  const showNavLinks = !isOpen && !isScrolled;
  const showMenuButton = isOpen || isScrolled;

  return (
    <>
      <header className="bg-transparent fixed top-0 inset-x-0 z-50 pointer-events-none py-6 sm:py-8">
        <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between gap-6 px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pointer-events-none">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              navigateTo("/");
            }}
            className="pointer-events-auto shrink-0 group focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] rounded-md cursor-pointer"
            aria-label="Jericho Urbano Home"
          >
            <Image
              src="/logo.webp"
              alt="Jericho Urbano Logo"
              width={40}
              height={40}
              style={{ width: "auto", height: "auto" }}
              className="h-10 w-auto object-contain transition-opacity hover:opacity-80"
              priority
            />
          </Link>

          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 pointer-events-auto">
            <nav
              aria-label="Header Navigation"
              className={`hidden md:flex items-center gap-5 lg:gap-8 transition-opacity duration-500 ease-in-out ${
                showNavLinks
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {NAVBAR_LINKS.map((item) => {
                const isActive = pathname === item.href;
                const isHovered = hoveredNav === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      navigateTo(item.href, item.label);
                    }}
                    onMouseEnter={() => setHoveredNav(item.href)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className="group relative inline-flex items-center py-2 px-1 text-[var(--text-primary)] hover:text-[var(--color-accent-primary)] transition-colors uppercase cursor-pointer focus-visible:outline-none"
                    aria-label={item.label}
                  >
                    <AnimatedSplitText
                      text={item.label}
                      isHovered={isHovered || isActive}
                      className="font-sans text-xs sm:text-sm md:text-base tracking-widest font-medium pointer-events-none"
                      colorTop={
                        isActive
                          ? "text-[var(--color-accent-primary)]"
                          : "text-[var(--text-primary)]"
                      }
                      colorBottom="text-[var(--color-accent-primary)]"
                    />
                  </Link>
                );
              })}
            </nav>

            <div
              className={`transition-opacity duration-500 ease-in-out ${
                showMenuButton
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-100 pointer-events-auto md:opacity-0 md:pointer-events-none"
              }`}
            >
              <Magnetic strength={0.4}>
                <button
                  type="button"
                  onClick={() => setIsOpen((prev) => !prev)}
                  aria-expanded={isOpen}
                  aria-controls="navigation-overlay"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  className="p-2 md:p-3 rounded-full border-none bg-transparent text-[var(--text-primary)] hover:text-[var(--color-accent-primary)] transition-colors cursor-pointer focus-visible:outline-none"
                >
                  <AnimatedMenuIcon isOpen={isOpen} />
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </header>

      <MenuOverlay
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
}

export default Navbar;
