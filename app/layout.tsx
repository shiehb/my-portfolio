import "./globals.css";
import { SmoothScroll } from "@/lib/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { geistSans, geistMono, geistPixel } from "./fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${geistPixel.variable}`}
    >
      <body>
        <SmoothScroll />
        <Navbar />
        {children}
      </body>
    </html>
  );
}