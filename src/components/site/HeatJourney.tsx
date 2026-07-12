"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Tweens the fixed background layer (#heat-bg) to each section's data-heat
 * colour as it crosses the viewport centre — the page "changes temperature"
 * as one scene hands over to the next.
 */
export default function HeatJourney() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const shift = (color: string) =>
      gsap.to("#heat-bg", {
        backgroundColor: color,
        duration: 1.1,
        ease: "power2.out",
        overwrite: "auto",
      });

    document.querySelectorAll<HTMLElement>("[data-heat]").forEach((section) => {
      const color = section.dataset.heat;
      if (!color) return;
      ScrollTrigger.create({
        trigger: section,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => shift(color),
        onEnterBack: () => shift(color),
      });
    });
  });

  return (
    <div
      ref={ref}
      id="heat-bg"
      aria-hidden="true"
      className="fixed inset-0 -z-10 bg-ink"
    />
  );
}
