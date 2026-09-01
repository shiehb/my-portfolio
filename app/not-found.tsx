import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The requested page could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[var(--bg-canvas)]">
      <p className="text-sm sm:text-base font-sans font-semibold text-[var(--color-accent-primary)] tracking-widest uppercase mb-2">
        404 Error
      </p>
      <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-6xl text-[var(--color-neutral-primary)] mb-4 tracking-tight">
        PAGE NOT FOUND
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-md mb-8 font-sans">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="c-btn inline-flex items-center gap-2 text-sm sm:text-base font-sans"
      >
        <ArrowLeft className="w-4 h-4" />
        Return Home
      </Link>
    </main>
  );
}
