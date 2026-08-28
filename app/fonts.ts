import { GeistMono } from "geist/font/mono";
import { Geist_Pixel } from "next/font/google";

export const geistMono = GeistMono;

// Variable pixel font with ELSH axis support for square/circle/line dot shapes
export const geistPixel = Geist_Pixel({
    subsets: ["latin"],
    axes: ["ELSH"],
    variable: "--font-geist-pixel",
    display: "swap",
    fallback: ["monospace"],
    adjustFontFallback: false,
});
