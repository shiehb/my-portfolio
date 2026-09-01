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
        <main className="bg-[var(--bg-canvas)] min-h-screen flex flex-col items-center justify-center pt-28 pb-16 text-center">
            <h1 className="font-sans font-medium text-4xl sm:text-5xl lg:text-7xl text-[var(--color-neutral-primary)] tracking-tight uppercase">
                WORK
            </h1>
        </main>
    );
}

