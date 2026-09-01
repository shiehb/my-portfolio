import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "surface";
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border-primary)]",
    accent: "bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] border-[var(--color-accent-primary)]/30",
    surface: "bg-[var(--bg-canvas)] text-[var(--text-primary)] border-[var(--border-primary)]",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-mono font-medium border ${variantStyles[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
