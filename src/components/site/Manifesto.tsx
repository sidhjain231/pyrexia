"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";

// A longer, three-beat trace for the section-wide draw.
const LONG_TRACE =
  "M0 48 H70 L78 42 L86 48 H120 L127 56 L136 14 L145 62 L152 48 H210 L220 39 L230 48 H300 L307 56 L316 14 L325 62 L332 48 H420 L428 42 L436 48 H470 L477 56 L486 14 L495 62 L502 48 H600";

const STATS: { value: number; suffix?: string; label: string }[] = [
  { value: 5, label: "days of fest" },
  { value: 11, label: "event clusters" },
  { value: 60, suffix: "+", label: "events & battles" },
  { value: 1, label: "diagnosis: fever" },
];

function Stat({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "circOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className="border-l border-ash pl-4 sm:pl-6">
      <div className="display-poster text-5xl text-fever tabular-nums sm:text-7xl">
        {n}
        {suffix}
      </div>
      <div className="chart-label mt-2 text-gauze">{label}</div>
    </div>
  );
}

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Kinetic lines drift in opposite directions while in view.
      gsap.fromTo(
        "[data-kinetic-a]",
        { xPercent: 4 },
        {
          xPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-kinetic-wrap]",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );
      gsap.fromTo(
        "[data-kinetic-b]",
        { xPercent: -14 },
        {
          xPercent: 2,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-kinetic-wrap]",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );

      // The heartbeat draws itself as the reader crosses the section.
      gsap.fromTo(
        "[data-ecg-path]",
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-ecg-wrap]",
            start: "top 90%",
            end: "top 30%",
            scrub: 0.8,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-heat="#171029"
      className="relative overflow-hidden pt-24 pb-16 sm:py-32"
    >
      <div data-kinetic-wrap className="select-none" aria-hidden="true">
        <div
          data-kinetic-a
          className="display-poster glow-fever whitespace-nowrap text-[clamp(3.2rem,11vw,9rem)] text-fever will-change-transform"
        >
          The fever spreads · The fever spreads · The fever spreads
        </div>
        <div
          data-kinetic-b
          className="display-poster text-outline mt-1 whitespace-nowrap text-[clamp(3.2rem,11vw,9rem)] will-change-transform"
        >
          October 2026 · Rishikesh · October 2026 · Rishikesh
        </div>
      </div>

      <div className="mx-auto mt-16 w-full max-w-6xl px-4 sm:mt-24 sm:px-6">
        <p className="chart-label text-monitor">Dx · What is Pyrexia</p>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-bone/90 sm:text-2xl">
          One full week packed with everything you can think of: dance,
          music, drama, sports, art, literary battles, informal games, Mr &
          Ms Pyrexia, and the much-awaited star nights.
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-gauze">
          Performing on stage, showing off on the field, or just vibing with
          your people. Pyrexia is where all the action happens.
        </p>

        <div data-ecg-wrap className="mt-14 sm:mt-20" aria-hidden="true">
          <svg
            viewBox="0 0 600 80"
            preserveAspectRatio="none"
            className="glow-monitor h-16 w-full text-monitor sm:h-24"
          >
            <path
              data-ecg-path
              d={LONG_TRACE}
              pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-20 md:grid-cols-4">
          {STATS.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
