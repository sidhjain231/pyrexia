"use client";

import Image from "next/image";
import { useRef, useEffect, useCallback } from "react";
import { clusters, type Cluster } from "@/data/clusters";

function Card({ cluster }: { cluster: Cluster }) {
  return (
    <article
      className="group relative h-[58svh] w-[76vw] max-w-88 shrink-0 snap-center overflow-hidden rounded-2xl border border-bone/10 transition-colors duration-300 hover:border-bone/30 md:h-[64vh] md:w-96"
    >
      {cluster.image ? (
        <>
          <Image
            src={cluster.image}
            alt={cluster.imageAlt ?? cluster.name}
            fill
            sizes="(min-width: 768px) 24rem, 76vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
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
        <p className="chart-label" style={{ color: cluster.hue }}>
          {cluster.domain}
        </p>
        <h3 className="display-poster mt-2 text-[1.65rem] leading-none text-bone [font-stretch:115%] md:text-[2rem]">
          {cluster.name}
        </h3>
        <p className="mt-2 max-w-[24ch] text-sm leading-snug text-bone/70">
          {cluster.tag}
        </p>
      </div>
    </article>
  );
}

export default function ClusterShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Mouse-drag horizontal scroll for desktop (pointer devices)
  const enableDragScroll = useCallback((track: HTMLDivElement) => {
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let hasDragged = false;

    const onPointerDown = (e: PointerEvent) => {
      // Only handle primary mouse button
      if (e.button !== 0) return;
      isDown = true;
      hasDragged = false;
      startX = e.clientX;
      scrollStart = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
      track.style.cursor = "grabbing";
      track.style.userSelect = "none";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) hasDragged = true;
      track.scrollLeft = scrollStart - dx;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDown) return;
      isDown = false;
      track.releasePointerCapture(e.pointerId);
      track.style.cursor = "grab";
      track.style.userSelect = "";
      // Prevent click events after drag
      if (hasDragged) {
        const cancel = (ev: Event) => {
          ev.stopPropagation();
          ev.preventDefault();
        };
        track.addEventListener("click", cancel, { once: true, capture: true });
      }
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);

    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Enable drag on devices with fine pointers (mouse/trackpad)
    const mq = window.matchMedia("(pointer: fine)");
    if (mq.matches) {
      track.style.cursor = "grab";
      return enableDragScroll(track);
    }
  }, [enableDragScroll]);

  return (
    <section
      ref={sectionRef}
      id="symptoms"
      data-heat="#120b1e"
      className="relative overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6 md:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="chart-label text-monitor">Chart · Symptoms</p>
            <h2 className="display-poster mt-3 text-[clamp(2.4rem,8vw,4.8rem)] text-bone">
              Eleven ways to catch it
            </h2>
          </div>
          <p className="chart-label pb-2 text-gauze">
            Swipe →
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-10 [scrollbar-width:none] md:mt-12 md:gap-7 md:px-16 md:pb-14"
      >
        {clusters.map((cluster) => (
          <Card key={cluster.slug} cluster={cluster} />
        ))}
        <div className="w-4 shrink-0 md:w-24" aria-hidden="true" />
      </div>
    </section>
  );
}
