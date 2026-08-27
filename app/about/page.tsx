import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "About Jericho Urbano.",
    alternates: {
        canonical: "/about",
    },
};

export default function AboutPage() {
    return (
        <main className="section-dark min-h-screen flex flex-col items-center justify-center pt-28 pb-16 text-center">
            <h1 className="font-pixel-circle text-3xl sm:text-4xl lg:text-6xl text-ink-300 tracking-wider uppercase">
                ABOUT
            </h1>
        </main>
    );
}

