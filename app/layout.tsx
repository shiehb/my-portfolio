import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScroll } from "@/lib/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PageTransitionProvider } from "@/components/ui/PageTransition";
import { geistMono, geistPixel } from "./fonts";

const BASE_URL = "https://jerichourbano.com";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Jericho Urbano | Software & Systems Engineer",
    template: "%s | Jericho Urbano",
  },
  description:
    "Portfolio of Jericho Urbano — building custom software, data integrations, and scalable cloud systems.",
  keywords: [
    "Jericho Urbano",
    "Software Engineer",
    "Systems Engineer",
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "Python",
    "Django",
    "Cloud Architecture",
  ],
  authors: [{ name: "Jericho Urbano", url: BASE_URL }],
  creator: "Jericho Urbano",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jericho Urbano | Software & Systems Engineer",
    description:
      "Building custom software, data integrations, and scalable cloud systems.",
    url: BASE_URL,
    siteName: "Jericho Urbano Portfolio",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "Jericho Urbano Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jericho Urbano | Software & Systems Engineer",
    description:
      "Building custom software, data integrations, and scalable cloud systems.",
    images: ["/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jericho Urbano",
    jobTitle: "Software & Systems Engineer",
    url: BASE_URL,
    image: `${BASE_URL}/logo.webp`,
    sameAs: [
      "https://github.com/jerichourbano",
      "https://linkedin.com/in/jerichourbano",
      "https://instagram.com/jerichourbano",
    ],
    description:
      "Software & systems engineer specializing in custom software, integrations, and cloud infrastructure.",
  };

  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${geistPixel.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <PageTransitionProvider>
          <SmoothScroll />
          <Navbar />
          {children}
          <Footer />
        </PageTransitionProvider>
      </body>
    </html>
  );
}