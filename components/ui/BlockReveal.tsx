"use client";

import React, { useEffect, useRef, useId } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type BlockRevealMode = "word" | "line" | "paragraph" | "item" | "none";

export interface BlockRevealProps {
    /** Text string to split and reveal (if not using children) */
    text?: string;
    /** Child elements or components to reveal (e.g. lists, links, badges) */
    children?: React.ReactNode;
    /** Splitting mode: word-by-word, line-by-line, whole paragraph/block, or child items */
    mode?: BlockRevealMode;
    /** Wrapper HTML tag/component (defaults to "div" or "span" based on layout) */
    as?: React.ElementType;
    /** Tailwind background class or custom solid color for the overlay curtain block (default: "bg-primary-500") */
    blockColor?: string;
    /** Controlled active flag. When true, transitions in; when false, transitions out in reverse */
    isActive?: boolean;
    /** Auto-trigger reveal when scrolled into view (used when isActive is not controlled) */
    triggerOnView?: boolean;
    /** Duration in seconds for each block sweep */
    duration?: number;
    /** Stagger delay in seconds between consecutive words/lines/items */
    stagger?: number;
    /** Initial delay in seconds before animation begins */
    delay?: number;
    /** Direction of block sweep: "ltr" (left-to-right) or "rtl" (right-to-left) */
    direction?: "ltr" | "rtl";
    /** Whether to play reverse transition on exit */
    reverseOut?: boolean;
    /** Class applied to the outer root container */
    className?: string;
    /** Class applied to each individual word/line/item wrapper */
    itemClassName?: string;
    /** Class applied to the inner content */
    contentClassName?: string;
    /** Custom styling for the solid colored curtain overlay */
    curtainClassName?: string;
    /** Callback when transition in/out completes */
    onComplete?: () => void;
}

/**
 * Reusable solid colored block text & element reveal component.
 * Features solid color blocks that sit over the text/items and clear off word-by-word,
 * line-by-line, or item-by-item on transition-in, and wipe back in reverse on transition-out.
 * Conforms precisely to text width without overflowing or expanding to the entire line.
 */
export function BlockReveal({
    text,
    children,
    mode,
    as: Component = "span",
    blockColor = "bg-primary-500",
    isActive,
    triggerOnView = false,
    duration = 0.4,
    stagger = 0.08,
    delay = 0,
    direction = "ltr",
    reverseOut = true,
    className = "",
    itemClassName = "",
    contentClassName = "",
    curtainClassName = "",
    onComplete,
}: BlockRevealProps) {
    const rootRef = useRef<HTMLElement | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const isFirstRender = useRef(true);
    const isControlled = typeof isActive === "boolean";
    const uniqueId = useId();

    // Determine actual split mode based on inputs
    const resolvedMode: BlockRevealMode =
        mode || (text ? (text.includes("\n") ? "line" : "word") : children ? "item" : "none");

    useEffect(() => {
        if (!rootRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const rootEl = rootRef.current;
        const items = rootEl.querySelectorAll<HTMLElement>(".block-reveal-item");
        if (items.length === 0) return;

        // Origin configs based on direction
        const enterOrigin1 = direction === "ltr" ? "left center" : "right center";
        const enterOrigin2 = direction === "ltr" ? "right center" : "left center";
        const exitOrigin1 = direction === "ltr" ? "right center" : "left center";
        const exitOrigin2 = direction === "ltr" ? "left center" : "right center";

        const animateIn = (startDelay = delay) => {
            if (timelineRef.current) timelineRef.current.kill();

            const tl = gsap.timeline({
                defaults: { ease: "power3.inOut" },
                onComplete,
            });

            items.forEach((item, index) => {
                const content = item.querySelector<HTMLElement>(".block-reveal-content");
                const curtain = item.querySelector<HTMLElement>(".block-reveal-curtain");
                if (!content || !curtain) return;

                const itemStart = startDelay + index * stagger;

                // 1. Initial state for this item (hidden content, collapsed curtain)
                tl.set(content, { opacity: 0 }, 0);
                tl.set(curtain, { scaleX: 0, transformOrigin: enterOrigin1 }, 0);

                // 2. Solid block wipes across from 0% to 100% width covering the text
                tl.to(
                    curtain,
                    {
                        scaleX: 1,
                        duration: duration * 0.48,
                        ease: "power2.in",
                        transformOrigin: enterOrigin1,
                    },
                    itemStart
                );

                // 3. Make text content visible while underneath solid block
                tl.set(content, { opacity: 1 }, itemStart + duration * 0.48);

                // 4. Solid block clears off from 100% to 0% width, revealing the text
                tl.to(
                    curtain,
                    {
                        scaleX: 0,
                        duration: duration * 0.52,
                        ease: "power3.out",
                        transformOrigin: enterOrigin2,
                    },
                    itemStart + duration * 0.48
                );
            });

            timelineRef.current = tl;
            return tl;
        };

        const animateOut = () => {
            if (timelineRef.current) timelineRef.current.kill();

            const tl = gsap.timeline({
                defaults: { ease: "power3.inOut" },
                onComplete,
            });

            const reversedItems = Array.from(items).reverse();

            reversedItems.forEach((item, index) => {
                const content = item.querySelector<HTMLElement>(".block-reveal-content");
                const curtain = item.querySelector<HTMLElement>(".block-reveal-curtain");
                if (!content || !curtain) return;

                const itemStart = index * (stagger * 0.75);

                // 1. Prepare curtain
                tl.set(curtain, { scaleX: 0, transformOrigin: exitOrigin1 }, 0);

                // 2. Block wipes back over visible text in reverse
                tl.to(
                    curtain,
                    {
                        scaleX: 1,
                        duration: duration * 0.45,
                        ease: "power2.in",
                        transformOrigin: exitOrigin1,
                    },
                    itemStart
                );

                // 3. Hide content once covered by block
                tl.set(content, { opacity: 0 }, itemStart + duration * 0.45);

                // 4. Block clears away, leaving area clean and hidden
                tl.to(
                    curtain,
                    {
                        scaleX: 0,
                        duration: duration * 0.45,
                        ease: "power2.out",
                        transformOrigin: exitOrigin2,
                    },
                    itemStart + duration * 0.45
                );
            });

            timelineRef.current = tl;
            return tl;
        };

        if (isControlled) {
            if (isFirstRender.current) {
                isFirstRender.current = false;
                if (isActive) {
                    animateIn();
                } else {
                    // Initial hidden state without animating out
                    items.forEach((item) => {
                        const content = item.querySelector<HTMLElement>(".block-reveal-content");
                        const curtain = item.querySelector<HTMLElement>(".block-reveal-curtain");
                        if (content) gsap.set(content, { opacity: 0 });
                        if (curtain) gsap.set(curtain, { scaleX: 0 });
                    });
                }
            } else {
                if (isActive) {
                    animateIn();
                } else if (reverseOut) {
                    animateOut();
                } else {
                    // Immediate hide
                    items.forEach((item) => {
                        const content = item.querySelector<HTMLElement>(".block-reveal-content");
                        const curtain = item.querySelector<HTMLElement>(".block-reveal-curtain");
                        if (content) gsap.set(content, { opacity: 0 });
                        if (curtain) gsap.set(curtain, { scaleX: 0 });
                    });
                }
            }
        } else if (triggerOnView) {
            // ScrollTrigger integration
            const st = ScrollTrigger.create({
                trigger: rootEl,
                start: "top 85%",
                once: true,
                onEnter: () => animateIn(),
            });

            return () => {
                st.kill();
                if (timelineRef.current) timelineRef.current.kill();
            };
        } else {
            // Auto animate on mount
            animateIn();
        }

        return () => {
            if (timelineRef.current) timelineRef.current.kill();
        };
    }, [isActive, isControlled, triggerOnView, duration, stagger, delay, direction, reverseOut, onComplete]);

    // RENDER LOGIC
    // 1. Word-by-word mode
    if (text && resolvedMode === "word") {
        const words = text.split(" ").filter((w) => w.length > 0);

        return (
            <Component
                ref={rootRef}
                className={`block-reveal-root inline-flex flex-wrap items-center ${className}`}
            >
                {words.map((word, index) => (
                    <span
                        key={`word-${uniqueId}-${index}`}
                        className={`block-reveal-item relative inline-block w-fit overflow-hidden mr-[0.25em] align-top select-none ${itemClassName}`}
                    >
                        <span
                            className={`block-reveal-content inline-block will-change-transform ${contentClassName}`}
                        >
                            {word}
                        </span>
                        <span
                            aria-hidden="true"
                            className={`block-reveal-curtain absolute inset-0 pointer-events-none z-20 ${blockColor} ${curtainClassName}`}
                            style={{ transformOrigin: "left center" }}
                        />
                    </span>
                ))}
            </Component>
        );
    }

    // 2. Line-by-line mode
    if (text && resolvedMode === "line") {
        const lines = text.split("\n").filter((l) => l.trim().length > 0);

        return (
            <Component
                ref={rootRef}
                className={`block-reveal-root flex flex-col items-start ${className}`}
            >
                {lines.map((line, index) => (
                    <span
                        key={`line-${uniqueId}-${index}`}
                        className={`block-reveal-item relative inline-block w-fit overflow-hidden align-top ${itemClassName}`}
                    >
                        <span
                            className={`block-reveal-content inline-block will-change-transform ${contentClassName}`}
                        >
                            {line}
                        </span>
                        <span
                            aria-hidden="true"
                            className={`block-reveal-curtain absolute inset-0 pointer-events-none z-20 ${blockColor} ${curtainClassName}`}
                            style={{ transformOrigin: "left center" }}
                        />
                    </span>
                ))}
            </Component>
        );
    }

    // 3. Whole paragraph or single block mode
    if (text && (resolvedMode === "paragraph" || resolvedMode === "none")) {
        return (
            <Component
                ref={rootRef}
                className={`block-reveal-root inline-flex ${className}`}
            >
                <span
                    className={`block-reveal-item relative inline-block w-fit overflow-hidden align-top ${itemClassName}`}
                >
                    <span
                        className={`block-reveal-content inline-block will-change-transform ${contentClassName}`}
                    >
                        {text}
                    </span>
                    <span
                        aria-hidden="true"
                        className={`block-reveal-curtain absolute inset-0 pointer-events-none z-20 ${blockColor} ${curtainClassName}`}
                        style={{ transformOrigin: "left center" }}
                    />
                </span>
            </Component>
        );
    }

    // 4. Children elements mode (items, custom links, list items)
    const childArray = React.Children.toArray(children);

    return (
        <Component
            ref={rootRef}
            className={`block-reveal-root inline-flex ${className}`}
        >
            {childArray.map((child, index) => (
                <span
                    key={`child-${uniqueId}-${index}`}
                    className={`block-reveal-item relative inline-block w-fit overflow-hidden align-top ${itemClassName}`}
                >
                    <span
                        className={`block-reveal-content inline-block will-change-transform ${contentClassName}`}
                    >
                        {child}
                    </span>
                    <span
                        aria-hidden="true"
                        className={`block-reveal-curtain absolute inset-0 pointer-events-none z-20 ${blockColor} ${curtainClassName}`}
                        style={{ transformOrigin: "left center" }}
                    />
                </span>
            ))}
        </Component>
    );
}

export default BlockReveal;
