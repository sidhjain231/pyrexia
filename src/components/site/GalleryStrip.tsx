"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, Draggable, useGSAP } from "@/lib/gsap";
import Scramble from "@/components/fx/Scramble";

// Contact sheet from past editions. Frame numbers read like film negatives.
const FRAMES = [
  { src: "/images/gallery-01.jpg", alt: "Umbrella canopy over the fest entrance" },
  { src: "/images/gallery-03.jpg", alt: "Crowd under stage lights" },
  { src: "/images/gallery-05.jpg", alt: "Folk dancers mid-performance" },
  { src: "/images/gallery-06.jpg", alt: "Night crowd at the main stage" },
  { src: "/images/gallery-02.jpg", alt: "Theatre act by candlelight" },
  { src: "/images/gallery-07.jpg", alt: "Confetti falling over the pro-night crowd" },
  { src: "/images/gallery-04.jpg", alt: "Volleyball spike in front of the crowd" },
];

export default function GalleryStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;

      const wrap = wrapRef.current!;
      const track = trackRef.current!;

      // Draggable owns movement; native horizontal scroll would double it.
      wrap.classList.remove("overflow-x-auto");
      wrap.classList.add("overflow-hidden");

      Draggable.create(track, {
        type: "x",
        bounds: wrap,
        inertia: true,
        edgeResistance: 0.82,
        cursor: "grab",
        activeCursor: "grabbing",
      });

      // Frames develop as they enter: rise and settle into their tilt.
      gsap.from("[data-frame]", {
        y: 48,
        opacity: 0,
        duration: 0.9,
        ease: "fever",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-heat="#0d0a16"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Scramble
              as="p"
              text="Film · Past editions"
              className="chart-label text-monitor"
            />
            <h2 className="display-poster mt-3 text-[clamp(2.2rem,7vw,4.2rem)] text-bone">
              Proof of fever
            </h2>
          </div>
          <p className="chart-label pb-2 text-gauze">Drag ↔</p>
        </div>
      </div>

      <div
        ref={wrapRef}
        className="mt-10 overflow-x-auto pb-4 [scrollbar-width:none]"
      >
        <div ref={trackRef} className="flex w-max gap-5 px-4 sm:gap-7 sm:px-8">
          {FRAMES.map((frame, i) => (
            <figure
              key={frame.src}
              data-frame
              className={`shrink-0 border border-bone/15 bg-soot p-2 pb-3 shadow-[0_18px_50px_rgba(0,0,0,0.45)] ${
                i % 2 === 0 ? "rotate-[1.4deg]" : "-rotate-[1.6deg]"
              } ${i % 3 === 1 ? "mt-6" : ""}`}
            >
              <div className="relative h-56 w-40 overflow-hidden sm:h-80 sm:w-60">
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  sizes="(min-width: 640px) 15rem, 10rem"
                  className="object-cover"
                  draggable={false}
                />
              </div>
              <figcaption className="chart-label mt-2.5 flex justify-between text-[0.55rem] text-gauze">
                <span>PYX·25</span>
                <span>№ {String(i + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
