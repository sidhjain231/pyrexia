"use client";

import { useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import Ecg from "@/components/fx/Ecg";
import SiteMenu from "@/components/site/SiteMenu";

export default function MonitorStrip() {
  const { scrollYProgress } = useScroll();
  const temperature = useTransform(scrollYProgress, [0, 1], [98.6, 104.2]);
  const [reading, setReading] = useState("98.6");
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(temperature, "change", (value) =>
    setReading(value.toFixed(1)),
  );

  const degrees = parseFloat(reading);
  const heat =
    degrees >= 102
      ? "text-fever"
      : degrees >= 100
        ? "text-amber"
        : "text-monitor";
  // The heartbeat sweeps faster as the page heats up: 3.4s at rest → 1.2s
  // at peak fever.
  const sweep = 3.4 - ((degrees - 98.6) / (104.2 - 98.6)) * 2.2;

  return (
    <>
      {/* Anchored during route transitions (globals.css site-header rules). */}
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-ash/70 bg-ink/80 backdrop-blur-md"
        style={{ viewTransitionName: "site-header" }}
      >
        <div className="mx-auto flex h-11 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Ecg className="h-6 w-20 text-monitor glow-monitor" duration={sweep} />
            <span className={`chart-label tabular-nums ${heat}`}>
              {reading}°F
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="chart-label text-gauze">
              <span className="text-bone">Pyrexia 2026</span>
              <span className="hidden sm:inline"> · AIIMS Rishikesh</span>
            </span>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="chart-label group flex items-center gap-2 text-bone transition-colors hover:text-fever"
            >
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  menuOpen ? "bg-fever" : "bg-monitor group-hover:bg-fever"
                }`}
              />
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>
      <div id="site-menu">
        <SiteMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </>
  );
}
