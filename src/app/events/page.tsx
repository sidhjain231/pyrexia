import type { Metadata } from "next";
import MonitorStrip from "@/components/site/MonitorStrip";
import ClusterGrid from "@/components/site/ClusterGrid";
import Scramble from "@/components/fx/Scramble";
import TextReveal from "@/components/fx/TextReveal";

export const metadata: Metadata = {
  title: "Events · PYREXIA 2026",
  description:
    "Eleven event clusters at Pyrexia 2026 — dance, music, theatre, sports, literary, fine arts, informals, e-gaming, personality and the star nights.",
};

export default function EventsPage() {
  return (
    <>
      <MonitorStrip />
      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-24 sm:px-6 sm:pt-32">
        <Scramble
          as="p"
          text="Chart · Symptoms · Full workup"
          className="chart-label text-monitor"
        />
        <h1 className="display-poster mt-3 text-[clamp(2.6rem,9vw,5.5rem)] text-bone">
          Eleven ways
          <br />
          to catch it
        </h1>
        <TextReveal
          as="p"
          split="lines"
          className="mt-5 max-w-xl text-base leading-relaxed text-gauze sm:text-lg"
        >
          Every cluster runs its own events, rules and rivalries. The 2026
          workup is being confirmed — open any chart for the current picture.
        </TextReveal>

        <div className="mt-12 sm:mt-16">
          <ClusterGrid />
        </div>
      </main>
    </>
  );
}
