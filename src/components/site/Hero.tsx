"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Ecg from "@/components/fx/Ecg";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TITLE = "PYREXIA";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden">
      <Image
        src="/images/hero-stage.jpg"
        alt="Pro-night stage at Pyrexia — flames, confetti and a roaring crowd"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[38%_center]"
      />
      {/* heat scrim: keeps type readable, fades the stage into ink */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-28 sm:px-6 sm:pb-20">
        <motion.p {...rise(0.1)} className="chart-label text-monitor">
          Case file · Annual fest of AIIMS Rishikesh
        </motion.p>

        <h1 className="display-poster mt-3 text-[clamp(3.8rem,20.5vw,14rem)] text-bone">
          {TITLE.split("").map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={reduceMotion ? false : { opacity: 0, y: "0.35em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 + i * 0.055, ease: EASE }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.div {...rise(0.55)} className="mt-5 max-w-xl">
          <p className="text-base leading-relaxed text-bone/85 sm:text-lg">
            India&apos;s biggest med-fest runs hot again — five days of dance,
            music, drama, sport, art and star nights on the banks of the Ganga.
          </p>
          <p className="chart-label mt-4 text-amber">
            Onset · October 2026 — dates soon
          </p>
        </motion.div>

        <motion.div
          {...rise(0.7)}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#symptoms"
            className="rounded-full bg-fever px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-amber active:scale-[0.98]"
          >
            See the events
          </a>
          <span className="chart-label text-gauze">
            Registrations opening soon
          </span>
        </motion.div>

        <motion.div
          {...rise(0.9)}
          className="mt-12 flex items-center gap-3 text-gauze"
        >
          <Ecg className="h-5 w-16 text-monitor/70" />
          <span className="chart-label">Scroll to run diagnostics</span>
        </motion.div>
      </div>
    </section>
  );
}
