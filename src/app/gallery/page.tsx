import type { Metadata } from "next";
import MonitorStrip from "@/components/site/MonitorStrip";
import GalleryGrid from "@/components/site/GalleryGrid";
import Scramble from "@/components/fx/Scramble";
import TextReveal from "@/components/fx/TextReveal";

export const metadata: Metadata = {
  title: "Gallery · PYREXIA 2026",
  description:
    "Photographic evidence from past editions of Pyrexia — stages, crowds, courts and star nights at AIIMS Rishikesh.",
};

export default function GalleryPage() {
  return (
    <>
      <MonitorStrip />
      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-24 sm:px-6 sm:pt-32">
        <Scramble
          as="p"
          text="Imaging · Past editions"
          className="chart-label text-monitor"
        />
        <h1 className="display-poster mt-3 text-[clamp(2.6rem,9vw,5.5rem)] text-bone">
          Proof of fever
        </h1>
        <TextReveal
          as="p"
          split="lines"
          className="mt-5 max-w-xl text-base leading-relaxed text-gauze sm:text-lg"
        >
          Evidence from previous editions. More scans get added as the archive
          is digitized — tap any frame to enlarge.
        </TextReveal>

        <div className="mt-12 sm:mt-16">
          <GalleryGrid />
        </div>
      </main>
    </>
  );
}
