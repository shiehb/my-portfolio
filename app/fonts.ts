import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Geist_Pixel } from "next/font/google";

export const geistSans = GeistSans;
export const geistMono = GeistMono;

// Experimental variable font — the "ELSH" axis morphs the shape from square
// to circle to triangle to line.
export const geistPixel = Geist_Pixel({
    subsets: ["latin"],
    axes: ["ELSH"],
    variable: "--font-geist-pixel",
    display: "swap",
});