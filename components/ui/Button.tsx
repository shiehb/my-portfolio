import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-medium rounded-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[var(--color-neutral-primary)] text-[var(--color-neutral-inverse)] hover:opacity-90 active:translate-y-0.5",
    secondary:
      "bg-transparent text-[var(--text-primary)] border border-[var(--border-primary)] hover:bg-[#1a1a1a] hover:border-[var(--border-secondary)] active:translate-y-0.5",
    accent:
      "bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-primary-hover)] shadow-sm hover:shadow-[0_0_16px_rgba(255,77,0,0.3)] active:translate-y-0.5",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
