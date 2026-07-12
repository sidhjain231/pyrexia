"use client";

import { useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import Ecg from "@/components/fx/Ecg";

export default function MonitorStrip() {
  const { scrollYProgress } = useScroll();
  const temperature = useTransform(scrollYProgress, [0, 1], [98.6, 104.2]);
  const [reading, setReading] = useState("98.6");

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ash/70 bg-ink/90 md:bg-ink/80 md:backdrop-blur-md">
      <div className="mx-auto flex h-11 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Ecg className="h-6 w-20 text-monitor md:glow-monitor" />
          <span className={`chart-label tabular-nums ${heat}`}>
            {reading}°F
          </span>
        </div>
        <span className="chart-label text-gauze">
          <span className="text-bone">Pyrexia 2026</span>
          <span className="hidden sm:inline"> · AIIMS Rishikesh</span>
        </span>
      </div>
    </header>
  );
}
