"use client";

import { useEffect, useState } from "react";

const TRACE =
  "M0 24 H38 L44 20.5 L50 24 H68 L73 29 L79 5 L85 33 L91 24 H118 L126 17.5 L134 24 H200";

export default function Preloader() {
  const [phase, setPhase] = useState<"show" | "exit" | "done">("show");

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      sessionStorage.getItem("pyx-intro")
    ) {
      setPhase("done");
      return;
    }
    const exit = setTimeout(() => setPhase("exit"), 1250);
    const done = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("pyx-intro", "1");
    }, 1850);
    return () => {
      clearTimeout(exit);
      clearTimeout(done);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[90] flex flex-col items-center justify-center gap-5 bg-ink transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:hidden ${
        phase === "exit" ? "-translate-y-full" : ""
      }`}
    >
      <svg
        viewBox="0 0 200 40"
        className="glow-monitor w-52 text-monitor sm:w-64"
      >
        <path
          d={TRACE}
          pathLength={1}
          className="ecg-draw"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <p className="chart-label text-gauze">Pyrexia · reading vitals</p>
    </div>
  );
}
