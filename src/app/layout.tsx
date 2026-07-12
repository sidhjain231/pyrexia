import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PYREXIA 2026 — AIIMS Rishikesh",
  description:
    "India's biggest med-fest returns to AIIMS Rishikesh in October 2026. Dance, music, drama, sports, art, e-gaming and star nights — feel the fever.",
};

export const viewport: Viewport = {
  themeColor: "#0b0907",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable} antialiased`}
    >
      <body className="bg-ink text-bone">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
