"use client";

import Image from "next/image";
import { useRef } from "react";
import { clusters, type Cluster } from "@/data/clusters";
import { gsap, useGSAP } from "@/lib/gsap";
import { SCRAMBLE_GLYPHS } from "@/lib/gsap";
import Scramble from "@/components/fx/Scramble";
import TiltCard from "@/components/fx/TiltCard";

function Card({ cluster }: { cluster: Cluster }) {
  const labelRef = useRef<HTMLParagraphElement>(null);

  // Re-scramble the domain label on hover/press — the card "re-reads" its
  // own chart entry.
  const rescramble = () => {
    const el = labelRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(el, {
      scrambleText: {
        text: cluster.domain,
        chars: SCRAMBLE_GLYPHS,
        speed: 0.6,
      },
      duration: 0.6,
      ease: "none",
      overwrite: "auto",
    });
  };

  return (
    <TiltCard
      glow={cluster.hue}
      className="group relative h-[58svh] w-[76vw] max-w-88 shrink-0 snap-center overflow-hidden rounded-2xl border border-bone/10 transition-colors duration-300 hover:border-bone/30 md:h-[64vh] md:w-96"
    >
      <div
        data-card-inner
        className="absolute inset-0"
        onPointerEnter={rescramble}
        onPointerDown={rescramble}
      >
        {cluster.image ? (
          <>
            <div data-card-img className="absolute -inset-x-[8%] inset-y-0">
              <Image
                src={cluster.image}
                alt={cluster.imageAlt ?? cluster.name}
                fill
                sizes="(min-width: 768px) 28rem, 88vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-ink/10" />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(120% 90% at 85% -10%, ${cluster.hue}73 0%, transparent 58%), linear-gradient(165deg, ${cluster.hue}30 0%, #0e0a18 65%)`,
              }}
            />
            <span
              aria-hidden="true"
              className="display-poster absolute -top-4 right-1 text-[9rem] leading-none md:text-[11rem]"
              style={{
                WebkitTextStroke: `1.5px ${cluster.hue}a6`,
                color: "transparent",
              }}
            >
              {cluster.name[0]}
            </span>
          </>
        )}

        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
          <p
            ref={labelRef}
            className="chart-label"
            style={{ color: cluster.hue }}
          >
            {cluster.domain}
          </p>
          <h3 className="display-poster mt-2 text-[1.65rem] leading-none text-bone [font-stretch:115%] md:text-[2rem]">
            {cluster.name}
          </h3>
          <p className="mt-2 max-w-[24ch] text-sm leading-snug text-bone/70">
            {cluster.tag}
          </p>
        </div>
      </div>
    </TiltCard>
  );
}

export default function ClusterShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Vertical scroll drives horizontal travel through all eleven clusters,
  // pinned, on every device. The markup itself is a native snap-scroller,
  // which stays as the reduced-motion / no-JS experience.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;

      const section = sectionRef.current!;
      const track = trackRef.current!;

      // Hand control to the scrub: native horizontal scrolling would fight
      // the translate.
      track.classList.remove("overflow-x-auto", "snap-x", "snap-mandatory");
      track.classList.add("overflow-visible");

      const travel = () => track.scrollWidth - window.innerWidth;

      const mm = gsap.matchMedia();
      mm.add(
        { desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" },
        (ctx) => {
          const tween = gsap.to(track, {
            x: () => -travel(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${travel()}`,
              scrub: ctx.conditions?.desktop ? 0.5 : true,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (barRef.current)
                  barRef.current.style.transform = `scaleX(${self.progress})`;
              },
            },
          });

          // Each card's photo drifts against the travel — depth without
          // layout reads (transform-only, driven by the same tween).
          gsap.utils
            .toArray<HTMLElement>("[data-card-img]", section)
            .forEach((img) => {
              gsap.fromTo(
                img,
                { xPercent: -5 },
                {
                  xPercent: 5,
                  ease: "none",
                  scrollTrigger: {
                    trigger: img,
                    containerAnimation: tween,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                  },
                },
              );
            });
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="symptoms"
      data-heat="#120b1e"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden py-10"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Scramble
              as="p"
              text="Chart · Symptoms"
              className="chart-label text-monitor"
            />
            <h2 className="display-poster mt-3 text-[clamp(2.4rem,8vw,4.8rem)] text-bone">
              Eleven ways to catch it
            </h2>
          </div>
          <p className="chart-label pb-2 text-gauze">Keep scrolling →</p>
        </div>
        {/* temperature bar: fills monitor → fever as the chart is read */}
        <div className="mt-5 h-px w-full bg-ash/70">
          <div
            ref={barRef}
            className="h-full w-full origin-left"
            style={{
              transform: "scaleX(0)",
              background:
                "linear-gradient(90deg, var(--color-heat-0), var(--color-heat-2), var(--color-heat-4))",
            }}
          />
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 will-change-transform [scrollbar-width:none] md:mt-10 md:gap-7 md:px-16"
      >
        {clusters.map((cluster) => (
          <Card key={cluster.slug} cluster={cluster} />
        ))}
        <div className="w-4 shrink-0 md:w-24" aria-hidden="true" />
      </div>
    </section>
  );
}
