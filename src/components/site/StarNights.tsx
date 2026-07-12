"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Reveal from "@/components/fx/Reveal";

export default function StarNights() {
  const sectionRef = useRef<HTMLElement>(null);

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
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
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

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-40 sm:px-6 sm:pb-24">
        <Reveal>
          <p className="chart-label text-shield text-amber">
            Auriga · The star nights
          </p>
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
          <p className="text-shield mt-6 max-w-xl text-base leading-relaxed text-bone/85 sm:text-lg">
            Sealed until the reveal. For scale, the last edition ran Sonu
            Nigam, Amit Mishra, Nikita Gandhi, Maadhyam and Antariksh across
            its nights.
          </p>
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
