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
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center section-dark">
      <p className="text-sm font-mono text-primary-500 tracking-widest uppercase mb-2">
        404 Error
      </p>
      <h1 className="font-pixel-circle text-6xl text-ink-300 mb-4">
        PAGE NOT FOUND
      </h1>
      <p className="text-base text-ink-500 max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="btn btn-primary"
      >
        <ArrowLeft className="w-4 h-4" />
        Return Home
      </Link>
    </main>
  );
}
