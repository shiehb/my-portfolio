"use client";

import React, { useState } from "react";
import { ArrowUpRight, Copy, Check, Layers, Palette, Grid3X3, MousePointerClick } from "lucide-react";

export function Contact() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string, tokenName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const palette = [
    { name: "Canvas (Main Background)", hex: "#fafafa", token: "--color-canvas", bgClass: "bg-[#fafafa] border border-[#efefef]", textLight: false },
    { name: "Text Color (Dark Gray)", hex: "#212121", token: "--color-text", bgClass: "bg-[#212121]", textLight: true },
    { name: "Surface / Sections", hex: "#efefef", token: "--color-surface", bgClass: "bg-[#efefef] border border-[#efefef]", textLight: false },
    { name: "Signature Accent (Orange)", hex: "#ff4d00", token: "--color-accent", bgClass: "bg-[#ff4d00]", textLight: true },
  ];

  return (
    <section id="contact" className="c-section relative w-full max-w-[1920px] mx-auto border-t border-[var(--border-primary)]">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)] animate-pulse" />
          <span className="font-sans text-xs uppercase tracking-widest text-[var(--text-secondary)] font-medium">
            {"// DESIGN SYSTEM & UI SPECS"}
          </span>
        </div>
        <h2 className="c-heading text-3xl sm:text-4xl md:text-5xl font-sans font-semibold tracking-tight normal-case mb-4">
          Ultra-Minimalist 4-Color Palette
        </h2>
        <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] max-w-3xl leading-relaxed">
          Aggressively minimal color system composed strictly of Canvas (#fafafa), Text (#212121), Surface (#efefef), and Signature Accent (#ff4d00).
        </p>
      </div>

      {/* 1. Palette & Color Swatches */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Palette className="w-4 h-4 text-[var(--color-accent-primary)]" />
          <h3 className="c-heading is-secondary text-xl font-bold font-sans">
            1. Core Color Palette Tokens
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {palette.map((item) => {
            const isCopied = copiedToken === item.token;
            return (
              <div
                key={item.token}
                onClick={() => copyToClipboard(item.hex, item.token)}
                className="group c-card has-shadow p-4 rounded-card bg-[var(--bg-secondary)] border border-[var(--border-primary)] cursor-pointer hover:border-[var(--color-accent-primary)] transition-all flex flex-col justify-between h-36"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-8 h-8 rounded-md shadow-inner ${item.bgClass}`} />
                  <button
                    type="button"
                    aria-label={`Copy ${item.name} color`}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded bg-[var(--bg-primary)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--color-neutral-primary)] truncate font-sans">{item.name}</p>
                  <p className="text-[11px] font-sans text-[var(--text-muted)]">{item.hex} • {item.token}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Responsive 12-Column Grid & Reusable Cards */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Grid3X3 className="w-4 h-4 text-[var(--color-accent-primary)]" />
          <h3 className="c-heading is-secondary text-xl font-bold font-sans">
            2. Responsive 12-Column Grid (.u-grid-12) & Cards
          </h3>
        </div>

        <div className="u-grid-12">
          {/* Card 1: Default .c-card */}
          <div className="col-span-12 md:col-span-4 c-card p-6 rounded-card bg-[var(--bg-primary)] border border-[var(--border-primary)]">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-accent-primary)] font-semibold block mb-2">
              Variant: .c-card
            </span>
            <h4 className="text-base font-bold text-[var(--color-neutral-primary)] mb-2 font-sans">
              Default Pure White Card
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 font-sans">
              Base card component on pure white background (<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">--bg-primary</code>) with crisp border.
            </p>
            <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[var(--color-accent-primary)] hover:underline">
              Explore component <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Card 2: .c-card.is-light */}
          <div className="col-span-12 md:col-span-4 c-card is-light p-6 rounded-card border border-[var(--border-primary)]">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-accent-primary)] font-semibold block mb-2">
              Variant: .c-card.is-light
            </span>
            <h4 className="text-base font-bold text-[var(--color-neutral-primary)] mb-2 font-sans">
              Soft Gray-White Surface
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 font-sans">
              Enhanced contrast using <code className="text-xs bg-slate-200/60 px-1 py-0.5 rounded">--bg-card (#f8fafc)</code> for distinct modular blocks.
            </p>
            <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[var(--color-accent-primary)] hover:underline">
              Explore component <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Card 3: .c-card.has-shadow (Dark charcoal inverse card) */}
          <div className="col-span-12 md:col-span-4 c-card has-shadow p-6 rounded-card bg-[var(--color-neutral-primary)] text-white border border-[var(--color-neutral-secondary)] shadow-md">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-accent-primary)] font-semibold block mb-2">
              Variant: .c-card (Inverse Dark)
            </span>
            <h4 className="c-heading is-white text-base font-bold mb-2 font-sans">
              Dark Charcoal Inverse Card
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
              High-contrast dark card using <code className="text-xs bg-slate-800 text-slate-200 px-1 py-0.5 rounded">--color-neutral-primary (#121826)</code> with crisp white contrast.
            </p>
            <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[var(--color-accent-primary)] hover:underline">
              Explore component <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. Button Component Matrix (.c-btn variants) */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <MousePointerClick className="w-4 h-4 text-[var(--color-accent-primary)]" />
          <h3 className="c-heading is-secondary text-xl font-bold font-sans">
            3. Button System (.c-btn variants)
          </h3>
        </div>

        <div className="p-6 rounded-card bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex flex-wrap items-center gap-4">
          {/* Primary Button */}
          <button type="button" className="c-btn">
            .c-btn (Primary Charcoal)
          </button>

          {/* Secondary Button */}
          <button type="button" className="c-btn is-secondary">
            .c-btn.is-secondary (Signature Orange)
          </button>

          {/* White Button */}
          <button type="button" className="c-btn is-white">
            .c-btn.is-white (Pure White)
          </button>
        </div>
      </div>

      {/* 4. Typography Scale & Hierarchy */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-4 h-4 text-[var(--color-accent-primary)]" />
          <h3 className="c-heading is-secondary text-xl font-bold font-sans">
            4. Typographic Scale (Geist Sans)
          </h3>
        </div>

        <div className="p-6 rounded-card bg-[var(--bg-primary)] border border-[var(--border-primary)] space-y-6">
          <div className="border-b border-[var(--border-primary)] pb-4">
            <span className="text-[11px] font-sans text-[var(--text-muted)] block mb-1">Display Hero • 3.052rem (48.8px) • Line Height 1.0em • Letter Spacing -2%</span>
            <div className="c-heading text-4xl sm:text-5xl font-sans font-semibold">
              Display Hero Typography
            </div>
          </div>

          <div className="border-b border-[var(--border-primary)] pb-4">
            <span className="text-[11px] font-sans text-[var(--text-muted)] block mb-1">H1 Heading • 2.441rem (39.1px) • Line Height 1.1em • Letter Spacing -1.5%</span>
            <div className="c-heading text-3xl sm:text-4xl font-bold font-sans">
              Heading Level 1: Dark Charcoal Contrast
            </div>
          </div>

          <div className="border-b border-[var(--border-primary)] pb-4">
            <span className="text-[11px] font-sans text-[var(--text-muted)] block mb-1">H2 Heading (.is-secondary) • 1.953rem (31.2px) • Line Height 1.2em • Letter Spacing -1%</span>
            <div className="c-heading is-secondary text-2xl sm:text-3xl font-bold font-sans">
              Heading Level 2: Deep Slate Secondary Tone
            </div>
          </div>

          <div>
            <span className="text-[11px] font-sans text-[var(--text-muted)] block mb-1">Body Text • 1.000rem (16px base) • Line Height 1.5em • Letter Spacing 0%</span>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl font-sans">
              Body paragraph copy set in high-contrast neutral charcoal with optimal reading rhythm, clean line-height, and comfortable visual hierarchy across all mobile and desktop viewports.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Contact as DesignSystemShowcase };
export default Contact;
