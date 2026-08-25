import React, { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

interface MagneticProps {
    children: ReactNode;
    strength?: number;
    active?: boolean;
    className?: string;
}

export function Magnetic({
    children,
    strength = 0.35,
    active = true,
    className = "inline-flex",
}: MagneticProps) {
    const magneticRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!active || !magneticRef.current) return;

        const el = magneticRef.current;

        // QuickTo setters for ultra-smooth 60fps performance
        const xTo = gsap.quickTo(el, "x", {
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
        });
        const yTo = gsap.quickTo(el, "y", {
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
        });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = (clientX - (left + width / 2)) * strength;
            const y = (clientY - (top + height / 2)) * strength;

            xTo(x);
            yTo(y);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
            gsap.killTweensOf(el);
        };
    }, [strength, active]);

    return (
        <div ref={magneticRef} className={className}>
            {children}
        </div>
    );
}
