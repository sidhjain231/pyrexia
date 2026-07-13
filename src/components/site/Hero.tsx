"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import Ecg from "@/components/fx/Ecg";
import HeatHaze from "@/components/fx/HeatHaze";
import Magnetic from "@/components/fx/Magnetic";
import Scramble from "@/components/fx/Scramble";
import Countdown from "@/components/site/Countdown";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TITLE = "PYREXIA";

// Archivo's width axis runs 62.5%–125%. The title lives at 110 so pointer
// heat has headroom to push letters wider before the ceiling.
const STRETCH_BASE = 110;
const STRETCH_MAX = 125;
const STRETCH_MIN = 62.5;

// Small heartbeat for the secondary-CTA underline.
const SPIKE = "M0 8 H26 L31 5 L36 8 H60 L65 12 L71 1 L77 14 L82 8 H140";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;

      const letters = gsap.utils.toArray<HTMLElement>("[data-hero-letter]");

      // Entrance: letters rise and breathe open from the narrow end of the
      // width axis.
      gsap.fromTo(
        letters,
        { y: "0.4em", opacity: 0, fontStretch: `${STRETCH_MIN}%` },
        {
          y: 0,
          opacity: 1,
          fontStretch: `${STRETCH_BASE}%`,
          duration: 0.9,
          delay: 0.2,
          ease: "fever",
          stagger: 0.05,
        },
      );

      // Pointer heat: letters near the pointer/finger widen toward the
      // axis ceiling and relax as it moves away.
      const setters = letters.map((el) =>
        gsap.quickTo(el, "fontStretch", { duration: 0.4, ease: "power2.out" }),
      );
      let heatOn = true;
      const onPointer = (e: PointerEvent) => {
        if (!heatOn) return;
        letters.forEach((el, i) => {
          const rect = el.getBoundingClientRect();
          const dx = e.clientX - (rect.left + rect.width / 2);
          const dy = e.clientY - (rect.top + rect.height / 2);
          const dist = Math.hypot(dx, dy);
          const warmth = Math.max(0, 1 - dist / 260);
          setters[i](STRETCH_BASE + (STRETCH_MAX - STRETCH_BASE) * warmth);
        });
      };
      const section = sectionRef.current!;
      section.addEventListener("pointermove", onPointer, { passive: true });
      section.addEventListener("pointerdown", onPointer, { passive: true });

      // Pinned scrub on every device (mobile parity): phones get a shorter
      // pin and unsmoothed scrub so touch scrolling never feels detached.
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
        },
        (ctx) => {
          const desktop = ctx.conditions?.desktop;
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: desktop ? "+=70%" : "+=45%",
              scrub: desktop ? 0.7 : true,
              pin: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                // pointer heat off while the exit compression owns the axis
                heatOn = self.progress < 0.05;
              },
            },
          });

          tl.to("[data-hero-img]", { scale: 1.18, yPercent: 7 }, 0)
            .to("[data-hero-glow]", { opacity: 1 }, 0)
            .to("[data-hero-copy]", { yPercent: -36, opacity: 0 }, 0.05)
            .to(
              letters,
              { fontStretch: `${STRETCH_MIN}%`, stagger: 0.02 },
              0.1,
            )
            .to("[data-hero-title]", { yPercent: -58, opacity: 0.12 }, 0.22);
        },
      );

      return () => {
        section.removeEventListener("pointermove", onPointer);
        section.removeEventListener("pointerdown", onPointer);
      };
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
          src="/images/hero-artist.jpg"
          alt="Star-night performer singing under warm stage light at Pyrexia"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_24%]"
        />
        {/* heat shimmer; fades in over the image once its texture loads */}
        <HeatHaze
          src="/images/hero-artist.jpg"
          focal={[0.62, 0.76]}
          className="absolute inset-0 h-full w-full"
        />
      </div>

      {/* light scrims: just enough for text readability, image stays visible */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 via-ink/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/40 to-transparent" />
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
          <Scramble
            as="p"
            text="Case file · Annual fest of AIIMS Rishikesh"
            delay={0.3}
            className="chart-label text-shield text-monitor"
          />
          <h1
            className="display-poster text-shield mt-3 whitespace-nowrap text-[clamp(3.2rem,16.5vw,6rem)] text-bone md:text-[clamp(6rem,13vw,11.5rem)]"
            aria-label={TITLE}
          >
            {TITLE.split("").map((letter, i) => (
              <span
                key={i}
                data-hero-letter
                aria-hidden="true"
                className="inline-block"
                style={{ fontStretch: `${STRETCH_BASE}%` }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        <div data-hero-copy className="will-change-transform">
          {/* movement-only entrance: this block is the page's LCP element,
              so it must be visible in the server-rendered HTML (no opacity
              gate that waits for hydration) */}
          <motion.div
            initial={reduceMotion ? false : { y: 28 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="mt-5 max-w-xl"
          >
            <p className="text-shield text-base leading-relaxed text-bone/90 sm:text-lg">
              India&apos;s biggest med-fest runs hot again: five days of
              dance, music, drama, sport, art and star nights on the banks of
              the Ganga.
            </p>
          </motion.div>

          <motion.div {...rise(0.45)}>
            <Countdown className="mt-6" />
          </motion.div>

          <motion.div
            {...rise(0.55)}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#symptoms"
                className="inline-block rounded-full bg-fever px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-amber active:scale-[0.98]"
              >
                See the events
              </a>
            </Magnetic>
            <Link
              href="/register"
              className="group relative pb-2 outline-none"
            >
              <span className="chart-label text-shield text-gauze transition-colors group-hover:text-fever group-focus-visible:text-fever group-active:text-fever">
                Pre-register now →
              </span>
              <svg
                viewBox="0 0 140 15"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-2 w-full text-fever"
              >
                <path
                  d={SPIKE}
                  pathLength={1}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-[stroke-dashoffset] duration-500 ease-out [stroke-dasharray:1] [stroke-dashoffset:1] group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0] group-active:[stroke-dashoffset:0]"
                />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            {...rise(0.65)}
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
