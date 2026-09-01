/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles.css",
  ],
  theme: {
    screens: {
      "mobile-portrait": { min: "240px", max: "379px" },
      "mobile-landscape": { min: "480px", max: "767px" },
      tablet: { min: "768px", max: "991px" },
      desktop: "1440px",
      "desktop-xl": "1920px",
      // Standard Tailwind breakpoints retained for fluid fallback
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        /* Core Palette Defaults */
        "neutral-primary": "var(--color-neutral-primary)",
        "neutral-secondary": "var(--color-neutral-secondary)",
        "neutral-inverse": "var(--color-neutral-inverse)",
        "accent-primary": "var(--color-accent-primary)",
        "accent-primary-hover": "var(--color-accent-primary-hover)",
        "accent-secondary": "var(--color-accent-secondary)",
        "accent-secondary-hover": "var(--color-accent-secondary-hover)",
        "accent-tertiary": "var(--color-accent-tertiary)",
        "accent-tertiary-hover": "var(--color-accent-tertiary-hover)",

        /* Tint Scales */
        "neutral-primary-a90": "var(--color-neutral-primary-a90)",
        "neutral-primary-a80": "var(--color-neutral-primary-a80)",
        "neutral-primary-a50": "var(--color-neutral-primary-a50)",
        "neutral-primary-a20": "var(--color-neutral-primary-a20)",
        "neutral-primary-a10": "var(--color-neutral-primary-a10)",

        /* Applied Contextual Variables */
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-accent-primary": "var(--bg-accent-primary)",
        "bg-accent-secondary": "var(--bg-accent-secondary)",
        "bg-accent-tertiary": "var(--bg-accent-tertiary)",
        "bg-inverse": "var(--bg-inverse)",

        /* Text Colors */
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-inverse-primary": "var(--text-inverse-primary)",
        "text-inverse-secondary": "var(--text-inverse-secondary)",
        "text-accent-primary": "var(--text-accent-primary)",

        /* Border Colors */
        "border-primary": "var(--border-primary)",
        "border-secondary": "var(--border-secondary)",
        "border-accent": "var(--border-accent)",
        "border-inverse-primary": "var(--border-inverse-primary)",
        "border-inverse-secondary": "var(--border-inverse-secondary)",
      },
      spacing: {
        "0-25x": "var(--space-0-25x)",
        "0-5x": "var(--space-0-5x)",
        "0-75x": "var(--space-0-75x)",
        "1x": "var(--space-1x)",
        "1-25x": "var(--space-1-25x)",
        "1-5x": "var(--space-1-5x)",
        "1-75x": "var(--space-1-75x)",
        "2x": "var(--space-2x)",
        "3x": "var(--space-3x)",
        "4x": "var(--space-4x)",
        "5x": "var(--space-5x)",
        "6x": "var(--space-6x)",
        "7x": "var(--space-7x)",
        "8x": "var(--space-8x)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        round: "var(--radius-round)",
      },
      fontSize: {
        /* Major Thirds Scale (1.25 ratio starting from 1rem base) */
        base: ["1rem", { lineHeight: "1.5em", letterSpacing: "0" }],
        h6: ["1.25rem", { lineHeight: "1.4em", letterSpacing: "-0.005em" }],
        h5: ["1.5625rem", { lineHeight: "1.3em", letterSpacing: "-0.008em" }],
        h4: ["1.953rem", { lineHeight: "1.2em", letterSpacing: "-0.01em" }],
        h3: ["2.441rem", { lineHeight: "1.15em", letterSpacing: "-0.015em" }],
        h2: ["3.052rem", { lineHeight: "1.1em", letterSpacing: "-0.018em" }],
        h1: ["3.815rem", { lineHeight: "1.0em", letterSpacing: "-0.02em" }],
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        pixel: ["var(--font-geist-pixel)", "monospace"],
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(18, 24, 38, 0.05), 0 2px 4px -2px rgba(18, 24, 38, 0.05)",
        elevated: "0 20px 25px -5px rgba(18, 24, 38, 0.08), 0 8px 10px -6px rgba(18, 24, 38, 0.04)",
        glow: "0 0 20px rgba(37, 99, 235, 0.25)",
      },
    },
  },
  plugins: [],
};
