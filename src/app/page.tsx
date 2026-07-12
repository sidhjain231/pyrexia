import Image from "next/image";
import Marquee from "@/components/fx/Marquee";
import Reveal from "@/components/fx/Reveal";
import ClusterList from "@/components/site/ClusterList";
import Hero from "@/components/site/Hero";
import MonitorStrip from "@/components/site/MonitorStrip";

const MARQUEE_ITEMS = [
  "Feel the fever",
  "October 2026",
  "AIIMS Rishikesh",
  "5 days",
  "60+ events",
  "Star nights",
];

export default function Home() {
  return (
    <>
      <MonitorStrip />
      <main>
        <Hero />

        <div className="overflow-hidden py-2">
          <div className="-rotate-1 scale-x-[1.03]">
            <Marquee items={MARQUEE_ITEMS} />
          </div>
        </div>

        <ClusterList />

        <section className="relative h-[60svh] overflow-hidden">
          <Image
            src="/images/pronite-green.jpg"
            alt="Singer on stage under green light and falling confetti at Pyrexia 5.0"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/60" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
              <Reveal>
                <p className="chart-label text-monitor">History · Pyrexia 5.0</p>
                <p className="display-poster mt-2 text-3xl text-bone sm:text-5xl">
                  Last year the fever peaked
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ash">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="display-poster text-xl text-bone">Pyrexia 2026</p>
            <p className="chart-label mt-2 text-gauze">
              Under observation — full site in development
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
