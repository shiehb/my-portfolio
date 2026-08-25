"use client";

import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { usePageTransition } from "./PageTransition";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";

const variantClass: Record<ButtonVariant, string> = {
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    tertiary: "btn btn-tertiary",
};

const sizeClass: Record<ButtonSize, string> = {
    sm: "text-xs py-1.5 px-3",
    md: "text-sm py-2.5 px-5",
    lg: "text-base py-3 px-6",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    icon?: ReactNode;
    children: ReactNode;
};

export function Button({
    variant = "primary",
    size = "md",
    loading = false,
    icon,
    disabled,
    className = "",
    children,
    ...rest
}: ButtonProps) {
    return (
        <button
            className={`${variantClass[variant]} ${sizeClass[size]} ${className}`.trim()}
            disabled={disabled || loading}
            aria-busy={loading}
            {...rest}
        >
            {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
            ) : icon ? (
                <span className="inline-flex shrink-0">{icon}</span>
            ) : null}
            {children}
        </button>
    );
}

export type LinkVariant = "primary" | "secondary" | "tertiary";

const linkVariantClass: Record<LinkVariant, string> = {
    primary: "link link-primary",
    secondary: "link link-secondary",
    tertiary: "link link-tertiary",
};

export type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: LinkVariant;
    href: string;
    icon?: ReactNode;
    children: ReactNode;
};

export function TextLink({
    variant = "primary",
    href,
    icon,
    className = "",
    children,
    onClick,
    ...rest
}: TextLinkProps) {
    const { navigateTo } = usePageTransition();
    const isInternal = href.startsWith("/") || href.startsWith("#");
    const isPageRoute = href.startsWith("/") && !href.startsWith("/#") && href !== "#";
    const combinedClassName = `${linkVariantClass[variant]} ${className}`.trim();

    if (isInternal) {
        return (
            <Link
                href={href}
                className={combinedClassName}
                onClick={(e) => {
                    if (onClick) onClick(e);
                    if (isPageRoute && !e.defaultPrevented) {
                        e.preventDefault();
                        navigateTo(href);
                    }
                }}
                {...rest}
            >
                {icon ? <span className="inline-flex shrink-0 mr-1.5">{icon}</span> : null}
                {children}
            </Link>
        );
    }

    return (
        <a href={href} className={combinedClassName} onClick={onClick} {...rest}>
            {icon ? <span className="inline-flex shrink-0 mr-1.5">{icon}</span> : null}
            {children}
        </a>
    );
}