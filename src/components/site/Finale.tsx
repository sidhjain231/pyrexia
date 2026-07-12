"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Reveal from "@/components/fx/Reveal";

export default function Finale() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        "[data-watermark]",
        { xPercent: 3 },
        {
          xPercent: -9,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-heat="#1a0f22"
      className="relative overflow-hidden py-28 text-center sm:py-40"
    >
      {/* rising heat */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-3/4"
        style={{
          background:
            "radial-gradient(90% 85% at 50% 105%, rgba(255,77,109,0.30) 0%, rgba(139,92,246,0.10) 50%, transparent 72%)",
        }}
      />
      <div
        data-watermark
        aria-hidden="true"
        className="display-poster text-outline pointer-events-none absolute top-6 left-0 whitespace-nowrap text-[24vw] opacity-40 will-change-transform"
      >
        Pyrexia · Pyrexia · Pyrexia
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <p className="chart-label text-monitor">Rx · Prescription</p>
          <h2 className="display-poster glow-fever mt-4 text-[clamp(3rem,12vw,7.5rem)] text-bone">
            Catch the <span className="text-fever">fever</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-bone/75 sm:text-lg">
            Delegate cards, event sign-ups and star-night passes will all live
            right here. One site, one fever.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/pyrexiaaiims/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-fever px-8 py-4 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-amber active:scale-[0.98]"
            >
              Follow @pyrexiaaiims
            </a>
            <span className="chart-label rounded-full border border-fever/40 bg-fever/10 px-6 py-4 text-fever">
              Registrations opening soon
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
