"use client";

import { useEffect, useState } from "react";
import { FEST_START, DATES_CONFIRMED } from "@/data/fest";

type Parts = { d: string; h: string; m: string; s: string };

function partsUntil(target: Date): Parts {
  const ms = Math.max(0, target.getTime() - Date.now());
  const total = Math.floor(ms / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    d: pad(Math.floor(total / 86400)),
    h: pad(Math.floor(total / 3600) % 24),
    m: pad(Math.floor(total / 60) % 60),
    s: pad(total % 60),
  };
}

function Cell({ value, unit }: { value: string; unit: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        // Re-keying on value replays the tick animation on every change —
        // the digit lands like a monitor refresh.
        key={value}
        className="display-poster animate-tick text-2xl text-bone tabular-nums sm:text-3xl"
      >
        {value}
      </span>
      <span className="chart-label mt-1 text-[0.5rem] text-gauze">{unit}</span>
    </div>
  );
}

/**
 * Onset countdown: DD:HH:MM:SS to fest start, monitor-styled. Renders
 * placeholders until mounted so the static export never disagrees with the
 * client clock.
 */
export default function Countdown({
  className,
  target = FEST_START,
  label,
}: {
  className?: string;
  target?: Date;
  label?: string;
}) {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const tick = () => setParts(partsUntil(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const p = parts ?? { d: "––", h: "––", m: "––", s: "––" };

  return (
    <div className={className}>
      <p className="chart-label text-amber">
        {label ?? (DATES_CONFIRMED ? "Onset in" : "Estimated onset · dates soon")}
      </p>
      <div className="mt-3 flex items-start gap-2 sm:gap-3">
        <Cell value={p.d} unit="days" />
        <span className="display-poster text-2xl text-fever/70 sm:text-3xl">:</span>
        <Cell value={p.h} unit="hrs" />
        <span className="display-poster text-2xl text-fever/70 sm:text-3xl">:</span>
        <Cell value={p.m} unit="min" />
        <span className="display-poster text-2xl text-fever/70 sm:text-3xl">:</span>
        <Cell value={p.s} unit="sec" />
      </div>
    </div>
  );
}
