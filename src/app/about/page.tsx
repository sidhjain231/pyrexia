import type { Metadata } from "next";
import Link from "next/link";
import MonitorStrip from "@/components/site/MonitorStrip";
import Scramble from "@/components/fx/Scramble";
import TextReveal from "@/components/fx/TextReveal";

export const metadata: Metadata = {
  title: "About · PYREXIA 2026",
  description:
    "What Pyrexia is, who runs it, and how to reach AIIMS Rishikesh — the annual cultural, sports and literary fest on the banks of the Ganga.",
};

const FAQS = [
  {
    q: "Who can attend?",
    a: "Students from medical and allied colleges across the country. A delegate card gets you into the campus, the events and the star nights — details and pricing land with registrations.",
  },
  {
    q: "When exactly is it?",
    a: "October 2026. The exact dates are being locked with the academic calendar; the countdown on the home page tracks the current estimate.",
  },
  {
    q: "How do event registrations work?",
    a: "Buy a delegate card once, then register free for any events — solo or as a team. Team events use an invite-code roster created by the captain.",
  },
  {
    q: "Where do outstation delegates stay?",
    a: "Accommodation options for registered delegates are announced with the delegate card details. Rishikesh also has plenty of hostels and hotels within a short ride of campus.",
  },
];

export default function AboutPage() {
  return (
    <>
      <MonitorStrip />
      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-24 sm:px-6 sm:pt-32">
        <Scramble
          as="p"
          text="Hx · Patient history"
          className="chart-label text-monitor"
        />
        <h1 className="display-poster mt-3 text-[clamp(2.6rem,9vw,5.5rem)] text-bone">
          What is
          <br />
          Pyrexia?
        </h1>

        <div className="mt-10 grid gap-12 md:grid-cols-[2fr_1fr] md:gap-16">
          <div className="space-y-10">
            <TextReveal
              as="p"
              split="lines"
              className="max-w-2xl text-lg leading-relaxed text-bone/90 sm:text-2xl"
            >
              Pyrexia is the annual fest of AIIMS Rishikesh — five days in
              October when one of India&apos;s youngest AIIMS campuses trades
              ward rounds for stage lights. Dance, music, theatre, sports,
              literary battles, fine arts, informals, e-gaming and star
              nights, all run by students under ARSWA.
            </TextReveal>

            <div>
              <Scramble
                as="p"
                text="Loc · The campus"
                className="chart-label text-monitor"
              />
              <TextReveal
                as="p"
                split="lines"
                className="mt-4 max-w-2xl leading-relaxed text-bone/80"
              >
                AIIMS Rishikesh sits on the edge of the Himalayan foothills,
                minutes from the Ganga ghats, the Ram Jhula and Lakshman
                Jhula bridges, and the cafés and rafting camps that made
                Rishikesh famous. Fest week doubles as a hill-station trip.
              </TextReveal>
            </div>

            <div>
              <Scramble
                as="p"
                text="Route · Getting here"
                className="chart-label text-monitor"
              />
              <ul className="mt-4 max-w-2xl space-y-3 text-bone/80">
                <li className="flex gap-4 border-b border-ash/50 pb-3">
                  <span className="chart-label w-16 shrink-0 pt-1 text-gauze">Air</span>
                  <span>
                    Jolly Grant Airport, Dehradun (DED) — about 35 minutes by
                    cab.
                  </span>
                </li>
                <li className="flex gap-4 border-b border-ash/50 pb-3">
                  <span className="chart-label w-16 shrink-0 pt-1 text-gauze">Rail</span>
                  <span>
                    Rishikesh / Yog Nagari Rishikesh stations, with Haridwar
                    Junction (25 km) for long-distance trains.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="chart-label w-16 shrink-0 pt-1 text-gauze">Road</span>
                  <span>
                    Frequent buses from Delhi, Dehradun and Haridwar; the
                    campus is on the Dehradun–Rishikesh highway.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <aside className="h-max space-y-6">
            <div className="rounded-2xl border border-ash/70 p-6">
              <p className="chart-label text-monitor">Vitals</p>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex justify-between gap-4 border-b border-ash/50 pb-3">
                  <dt className="text-gauze">Organizer</dt>
                  <dd className="text-bone">ARSWA</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-ash/50 pb-3">
                  <dt className="text-gauze">Venue</dt>
                  <dd className="text-bone">AIIMS Rishikesh</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-ash/50 pb-3">
                  <dt className="text-gauze">Onset</dt>
                  <dd className="text-bone">October 2026</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gauze">Clusters</dt>
                  <dd className="text-bone">11</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-2xl border border-fever/30 bg-fever/5 p-6">
              <p className="chart-label text-fever">Organizing team</p>
              <p className="mt-3 text-sm leading-relaxed text-bone/75">
                Office bearers and cluster teams get their own page once the
                2026 roster is announced.
              </p>
            </div>
          </aside>
        </div>

        <section className="mt-20">
          <Scramble
            as="p"
            text="FAQ · Ask the desk"
            className="chart-label text-monitor"
          />
          <div className="mt-6 max-w-3xl">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group border-b border-ash/60 py-5 first:border-t"
              >
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-lg text-bone transition-colors hover:text-fever [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="chart-label shrink-0 text-gauze transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-xl leading-relaxed text-gauze">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
          <p className="chart-label mt-8 text-gauze">
            Something else?{" "}
            <Link href="/register" className="text-monitor transition-colors hover:text-fever">
              Pre-register
            </Link>{" "}
            and ask when we write back, or DM{" "}
            <a
              href="https://www.instagram.com/pyrexiaaiims/"
              target="_blank"
              rel="noreferrer"
              className="text-monitor transition-colors hover:text-fever"
            >
              @pyrexiaaiims
            </a>
          </p>
        </section>
      </main>
    </>
  );
}
