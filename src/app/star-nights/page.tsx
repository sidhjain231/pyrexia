import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MonitorStrip from "@/components/site/MonitorStrip";
import Countdown from "@/components/site/Countdown";
import Scramble from "@/components/fx/Scramble";
import TextReveal from "@/components/fx/TextReveal";
import Reveal from "@/components/fx/Reveal";
import { REVEAL_DATE } from "@/data/fest";

export const metadata: Metadata = {
  title: "Star Nights · PYREXIA 2026",
  description:
    "Auriga — the star nights of Pyrexia at AIIMS Rishikesh. Past editions ran Sonu Nigam, Amit Mishra, Nikita Gandhi, Maadhyam and Antariksh. The 2026 lineup is sealed until the reveal.",
};

// Past headliners, most recent edition first. Grows as editions pass.
const PAST_LINEUP = [
  { name: "Sonu Nigam", note: "Playback legend · PYX·25" },
  { name: "Amit Mishra", note: "Bollywood vocals · PYX·25" },
  { name: "Nikita Gandhi", note: "Playback & pop · PYX·25" },
  { name: "Maadhyam", note: "Live band · PYX·25" },
  { name: "Antariksh", note: "Rock · PYX·25" },
];

export default function StarNightsPage() {
  return (
    <>
      <MonitorStrip />
      <main>
        <section className="relative flex min-h-[70svh] items-end overflow-hidden">
          <Image
            src="/images/pronite-green.jpg"
            alt="Pro-night stage under green light and falling confetti"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[57%_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/25" />

          <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-32 sm:px-6">
            <Scramble
              as="p"
              text="Auriga · The star nights"
              className="chart-label text-shield text-amber"
            />
            <h1 className="display-poster text-shield mt-4 text-[clamp(3rem,12vw,8rem)] text-bone">
              The big
              <br />
              stage
            </h1>
            {REVEAL_DATE ? (
              <Countdown
                className="mt-6"
                target={REVEAL_DATE}
                label="Lineup reveal in"
              />
            ) : (
              <p className="chart-label text-shield mt-6 text-gauze">
                2026 lineup · diagnosis pending
              </p>
            )}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <TextReveal
            as="p"
            split="lines"
            className="max-w-2xl text-lg leading-relaxed text-bone/90 sm:text-2xl"
          >
            Every edition, the fest hands its biggest nights to national
            headliners. The 2026 names are sealed until the reveal — for
            scale, this is what the stage has carried before.
          </TextReveal>

          <div className="mt-14">
            <Scramble
              as="p"
              text="Log · Past headliners"
              className="chart-label text-monitor"
            />
            <ul className="mt-6">
              {PAST_LINEUP.map((artist) => (
                <li
                  key={artist.name}
                  className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ash/60 py-4 first:border-t"
                >
                  <span className="display-poster text-[clamp(1.8rem,6vw,3.6rem)] text-bone/90 transition-colors group-hover:text-amber">
                    {artist.name}
                  </span>
                  <span className="chart-label text-gauze">{artist.note}</span>
                </li>
              ))}
            </ul>
          </div>

          <Reveal className="mt-16 rounded-2xl border border-ash/70 bg-soot/40 p-6 text-center sm:p-10">
            <p className="chart-label text-amber">Be first to know</p>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-bone/80">
              The reveal lands on Instagram and right here. Pre-register and
              you&apos;re on the list either way.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-block rounded-full bg-fever px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-amber"
              >
                Pre-register
              </Link>
              <a
                href="https://www.instagram.com/pyrexiaaiims/"
                target="_blank"
                rel="noreferrer"
                className="chart-label text-monitor transition-colors hover:text-fever"
              >
                @pyrexiaaiims ↗
              </a>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
