"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import Ecg from "@/components/fx/Ecg";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TITLE = "PYREXIA";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Scroll scrub: the stage zooms in, heat rises from below, copy lifts away,
  // and the title lingers a beat longer before the next scene takes over.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=110%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to("[data-hero-img]", { scale: 1.18, yPercent: 7 }, 0)
        .to("[data-hero-glow]", { opacity: 1 }, 0)
        .to("[data-hero-copy]", { yPercent: -36, opacity: 0 }, 0.05)
        .to("[data-hero-title]", { yPercent: -58, opacity: 0.12 }, 0.22);
    },
    { scope: sectionRef },
  );

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section
      ref={sectionRef}
      data-heat="#0a0a12"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      <div data-hero-img className="absolute inset-0 will-change-transform">
        <Image
          src="/images/hero-stage.jpg"
          alt="Pro-night stage at Pyrexia — flames, confetti and a roaring crowd"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[38%_center]"
        />
      </div>

      {/* readability scrim + rising heat */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink" />
      <div
        data-hero-glow
        className="absolute inset-x-0 bottom-0 h-2/3 opacity-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 110%, rgba(255,77,109,0.42) 0%, rgba(139,92,246,0.14) 45%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-28 sm:px-6 sm:pb-16">
        <div data-hero-title className="will-change-transform">
          <motion.p {...rise(0.4)} className="chart-label text-monitor">
            Case file · Annual fest of AIIMS Rishikesh
          </motion.p>
          <h1 className="display-poster mt-3 whitespace-nowrap text-[clamp(3.2rem,16.5vw,6rem)] text-bone md:text-[clamp(6rem,13vw,11.5rem)]">
            {TITLE.split("").map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={reduceMotion ? false : { opacity: 0, y: "0.4em" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.5 + i * 0.055,
                  ease: EASE,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </div>

        <div data-hero-copy className="will-change-transform">
          <motion.div {...rise(0.85)} className="mt-5 max-w-xl">
            <p className="text-base leading-relaxed text-bone/85 sm:text-lg">
              India&apos;s biggest med-fest runs hot again — five days of
              dance, music, drama, sport, art and star nights on the banks of
              the Ganga.
            </p>
            <p className="chart-label mt-4 text-amber">
              Onset · October 2026 — dates soon
            </p>
          </motion.div>

          <motion.div
            {...rise(1.0)}
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
            {...rise(1.15)}
            className="mt-12 flex items-center gap-3 text-gauze"
          >
            <Ecg className="h-5 w-16 text-monitor/70" />
            <span className="chart-label">Scroll to run diagnostics</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
