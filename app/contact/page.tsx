import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with Jericho Urbano.",
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactPage() {
    return (
        <main className="bg-[var(--bg-canvas)] min-h-screen flex flex-col items-center justify-center pt-28 pb-16 text-center">
            <h1 className="font-sans font-medium text-4xl sm:text-5xl lg:text-7xl text-[var(--color-neutral-primary)] tracking-tight uppercase">
                CONTACT
            </h1>
        </main>
    );
}

