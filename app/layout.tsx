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
      <body
      className=" px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <SmoothScroll />
        <Navbar />
        {children}
      </body>
    </html>
  );
}