"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Reveal from "@/components/fx/Reveal";
import Scramble from "@/components/fx/Scramble";
import Countdown from "@/components/site/Countdown";
import { REVEAL_DATE } from "@/data/fest";

export default function StarNights() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        "[data-star-img]",
        { yPercent: -9 },
        {
          yPercent: 9,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );

      // Stage spotlight chases the pointer (or finger) — a pre-rendered
      // glow that only ever moves by transform, so phones pay compositing,
      // not repaints.
      const spot = spotRef.current!;
      const section = sectionRef.current!;
      const xTo = gsap.quickTo(spot, "x", { duration: 0.6, ease: "power2.out" });
      const yTo = gsap.quickTo(spot, "y", { duration: 0.6, ease: "power2.out" });

      const onPointer = (e: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        xTo(e.clientX - rect.left - spot.offsetWidth / 2);
        yTo(e.clientY - rect.top - spot.offsetHeight / 2);
      };
      section.addEventListener("pointermove", onPointer, { passive: true });
      section.addEventListener("pointerdown", onPointer, { passive: true });

      return () => {
        section.removeEventListener("pointermove", onPointer);
        section.removeEventListener("pointerdown", onPointer);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="auriga"
      data-heat="#06070f"
      className="relative flex min-h-svh items-end overflow-hidden"
    >
      <div
        data-star-img
        className="absolute -inset-y-[12%] inset-x-0 will-change-transform"
      >
        <Image
          src="/images/pronite-green.jpg"
          alt="Singer on the Pyrexia pro-night stage under falling confetti"
          fill
          sizes="100vw"
          className="object-cover object-[57%_40%] md:object-[12%_42%]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />

      {/* follow-spot: warm light that chases the pointer across the stage */}
      <div
        ref={spotRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 h-[60vmin] w-[60vmin] rounded-full opacity-70 mix-blend-soft-light will-change-transform"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,241,214,0.95) 0%, rgba(255,209,102,0.35) 45%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-40 sm:px-6 sm:pb-24">
        <Reveal>
          <Scramble
            as="p"
            text="Auriga · The star nights"
            className="chart-label text-shield text-amber"
          />
          <h2 className="display-poster text-shield mt-4 text-[clamp(2.6rem,10vw,7rem)] text-bone">
            Lineup:
            <br />
            <span
              className="text-outline glow-fever"
              style={{ WebkitTextStrokeColor: "#f2c14ecc" }}
            >
              diagnosis pending
            </span>
          </h2>
          {REVEAL_DATE ? (
            <Countdown
              className="mt-6"
              target={REVEAL_DATE}
              label="Reveal in"
            />
          ) : (
            <p className="text-shield mt-6 max-w-xl text-base leading-relaxed text-bone/85 sm:text-lg">
              Sealed until the reveal. For scale, the last edition ran Sonu
              Nigam, Amit Mishra, Nikita Gandhi, Maadhyam and Antariksh across
              its nights.
            </p>
          )}
          <a
            href="https://www.instagram.com/pyrexiaaiims/"
            target="_blank"
            rel="noreferrer"
            className="chart-label mt-8 inline-block rounded-full border border-bone/25 px-6 py-3.5 text-bone transition-colors hover:border-fever hover:text-fever"
          >
            Get the reveal first ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
}
