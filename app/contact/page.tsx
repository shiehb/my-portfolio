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
        <main className="section-dark min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <h1 className="font-pixel-circle text-6xl md:text-7xl text-ink-300 tracking-wider uppercase">
               Contact
            </h1>
        </main>
    );
}

