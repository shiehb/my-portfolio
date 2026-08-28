"use client";

import React, { useState } from "react";

export interface AnimatedSplitTextProps {
    text: string;
    className?: string;
    charClassName?: string;
    isHovered?: boolean;
    colorTop?: string;
    colorBottom?: string;
    staggerMs?: number;
    durationMs?: number;
    ease?: string;
}

/**
 * Reusable split-character animated hover text component.
 * Features a character-by-character staggered slide-up roll transition on hover.
 */
export function AnimatedSplitText({
    text,
    className = "",
    charClassName = "",
    isHovered,
    colorTop = "text-ink-300",
    colorBottom = "text-primary-500",
    staggerMs = 25,
    durationMs = 450,
    ease = "cubic-bezier(0.25, 1, 0.5, 1)",
}: AnimatedSplitTextProps) {
    const chars = text.split("");

    return (
        <span className={`relative inline-flex overflow-hidden leading-none ${className}`}>
            {/* Primary Layer (slides up on hover) */}
            <span
                aria-hidden="true"
                className={`inline-flex items-center leading-none ${colorTop}`}
            >
                {chars.map((char, index) => (
                    <span
                        key={`top-${index}`}
                        className={`inline-block transition-transform ${charClassName}`}
                        style={{
                            transitionDuration: `${durationMs}ms`,
                            transitionTimingFunction: ease,
                            transitionDelay: `${index * staggerMs}ms`,
                            transform: isHovered ? "translateY(-105%)" : "translateY(0%)",
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </span>

            {/* Replacement Layer (slides in from bottom on hover) */}
            <span
                aria-hidden="true"
                className={`absolute inset-0 inline-flex items-center leading-none ${colorBottom}`}
            >
                {chars.map((char, index) => (
                    <span
                        key={`bot-${index}`}
                        className={`inline-block transition-transform ${charClassName}`}
                        style={{
                            transitionDuration: `${durationMs}ms`,
                            transitionTimingFunction: ease,
                            transitionDelay: `${index * staggerMs}ms`,
                            transform: isHovered ? "translateY(0%)" : "translateY(105%)",
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </span>
        </span>
    );
}

/**
 * Convenience wrapper for an interactive link or button that self-manages its hover state.
 */
export interface SplitTextHoverProps {
    text: string;
    className?: string;
    charClassName?: string;
    colorTop?: string;
    colorBottom?: string;
    staggerMs?: number;
    durationMs?: number;
    children?: (isHovered: boolean) => React.ReactNode;
}

export function SplitTextHover({
    text,
    className = "",
    charClassName = "",
    colorTop = "text-ink-300",
    colorBottom = "text-primary-500",
    staggerMs = 25,
    durationMs = 450,
    children,
}: SplitTextHoverProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <span
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="inline-flex items-center"
        >
            <AnimatedSplitText
                text={text}
                isHovered={hovered}
                className={className}
                charClassName={charClassName}
                colorTop={colorTop}
                colorBottom={colorBottom}
                staggerMs={staggerMs}
                durationMs={durationMs}
            />
            {children && children(hovered)}
        </span>
    );
}

export default AnimatedSplitText;
