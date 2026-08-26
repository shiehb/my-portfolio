import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Work",
    description: "Projects and work by Jericho Urbano.",
    alternates: {
        canonical: "/work",
    },
};

export default function WorkPage() {
    return (
        <main className="section-dark min-h-screen flex flex-col items-center justify-center pt-28 pb-16 text-center">
            <h1 className="font-pixel-circle text-6xl md:text-7xl text-ink-300 tracking-wider uppercase">
                WORK
            </h1>
        </main>
    );
}

