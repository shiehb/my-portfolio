"use client";

import React, { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { usePageTransition } from "./PageTransition";

export interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "primary" | "secondary" | "accent";
  icon?: ReactNode;
  children: ReactNode;
}

export function CustomLink({
  href,
  variant = "primary",
  icon,
  className = "",
  children,
  onClick,
  ...rest
}: CustomLinkProps) {
  const { navigateTo } = usePageTransition();
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const isPageRoute = href.startsWith("/") && !href.startsWith("/#") && href !== "#";

  const variantStyles = {
    primary: "text-[var(--text-primary)] hover:text-[var(--color-accent-primary)]",
    secondary: "text-[var(--text-secondary)] hover:text-[var(--color-accent-primary)]",
    accent: "text-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary-hover)]",
  };

  const baseClasses = `inline-flex items-center gap-1.5 font-sans font-medium transition-colors cursor-pointer ${variantStyles[variant]} ${className}`.trim();

  if (isInternal) {
    return (
      <Link
        href={href}
        className={baseClasses}
        onClick={(e) => {
          if (onClick) onClick(e);
          if (isPageRoute && !e.defaultPrevented) {
            e.preventDefault();
            navigateTo(href);
          }
        }}
        {...rest}
      >
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <a href={href} className={baseClasses} onClick={onClick} {...rest}>
      {children}
      {icon}
    </a>
  );
}

export default CustomLink;
