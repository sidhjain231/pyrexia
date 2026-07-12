import Marquee from "@/components/fx/Marquee";
import Preloader from "@/components/fx/Preloader";
import ClusterShowcase from "@/components/site/ClusterShowcase";
import Finale from "@/components/site/Finale";
import HeatJourney from "@/components/site/HeatJourney";
import Hero from "@/components/site/Hero";
import Manifesto from "@/components/site/Manifesto";
import MonitorStrip from "@/components/site/MonitorStrip";
import StarNights from "@/components/site/StarNights";

const MARQUEE_A = [
  "Feel the fever",
  "October 2026",
  "AIIMS Rishikesh",
  "Star nights",
];

const MARQUEE_B = [
  "Dance",
  "Music",
  "Drama",
  "Sports",
  "Art",
  "E-gaming",
  "Informals",
];

export default function Home() {
  return (
    <>
      <Preloader />
      <HeatJourney />
      <MonitorStrip />
      <main>
        <Hero />

        <div className="overflow-hidden py-4">
          <div className="-rotate-[1.2deg] scale-x-[1.03] border-y border-ash/80 bg-soot/50 py-1">
            <Marquee items={MARQUEE_A} />
            <Marquee items={MARQUEE_B} reverse variant="outline" />
          </div>
        </div>

        <Manifesto />
        <ClusterShowcase />
        <StarNights />
        <Finale />
      </main>

      <footer className="relative border-t border-ash">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="display-poster text-xl text-bone">Pyrexia 2026</p>
            <p className="chart-label mt-2 text-gauze">
              Under observation · full site in development
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/pyrexiaaiims/"
              target="_blank"
              rel="noreferrer"
              className="chart-label text-monitor transition-colors hover:text-fever"
            >
              Instagram
            </a>
            <span className="chart-label text-gauze">
              ARSWA · AIIMS Rishikesh
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
