"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Magnetic from "@/components/fx/Magnetic";
import Reveal from "@/components/fx/Reveal";
import Scramble from "@/components/fx/Scramble";

export default function Finale() {
  const sectionRef = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Velocity marquee: the watermark always drifts, and scrolling hard
      // whips it — the page's pulse made visible.
      const line = markRef.current!;
      let x = 0;
      let velo = 0;
      let active = false;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          active = self.isActive;
        },
        onUpdate: (self) => {
          velo = self.getVelocity();
        },
      });

      const tick = (_t: number, dtMs: number) => {
        if (!active) return;
        const half = line.scrollWidth / 2;
        if (!half) return;
        const speed = 70 + Math.min(Math.abs(velo) * 0.16, 1100); // px/s
        x = (x - (speed * dtMs) / 1000) % half;
        gsap.set(line, { x });
        velo *= 0.92; // decay between scroll events
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
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
        ref={markRef}
        aria-hidden="true"
        className="display-poster text-outline pointer-events-none absolute top-6 left-0 flex w-max whitespace-nowrap text-[24vw] opacity-40 will-change-transform"
      >
        <span className="pr-[0.5em]">Pyrexia · Pyrexia · Pyrexia ·</span>
        <span className="pr-[0.5em]">Pyrexia · Pyrexia · Pyrexia ·</span>
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <Scramble
            as="p"
            text="Rx · Prescription"
            className="chart-label text-monitor"
          />
          <h2 className="display-poster glow-fever mt-4 text-[clamp(3rem,12vw,7.5rem)] text-bone">
            Catch the <span className="text-fever">fever</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-bone/75 sm:text-lg">
            Delegate cards, event sign-ups and star-night passes will all live
            right here. One site, one fever.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a
                href="https://www.instagram.com/pyrexiaaiims/"
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-full bg-fever px-8 py-4 text-sm font-bold uppercase tracking-wider text-ink transition-[background-color,box-shadow] duration-300 hover:bg-amber hover:shadow-[0_0_44px_rgba(242,193,78,0.4)] active:scale-[0.98]"
              >
                Follow @pyrexiaaiims
              </a>
            </Magnetic>
            <Magnetic>
              <Link
                href="/register"
                className="chart-label inline-block rounded-full border border-fever/40 bg-fever/10 px-6 py-4 text-fever transition-[background-color,box-shadow] duration-300 hover:bg-fever/20 hover:shadow-[0_0_36px_rgba(255,77,109,0.35)]"
              >
                Pre-register now
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
