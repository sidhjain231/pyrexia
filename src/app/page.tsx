import Marquee from "@/components/fx/Marquee";
import Preloader from "@/components/fx/Preloader";
import ClusterShowcase from "@/components/site/ClusterShowcase";
import Finale from "@/components/site/Finale";
import GalleryStrip from "@/components/site/GalleryStrip";
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
        <GalleryStrip />
        <Finale />
      </main>
    </>
  );
}
