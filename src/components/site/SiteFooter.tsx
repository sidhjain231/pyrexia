"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const CHART_LINKS = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Star nights", href: "/star-nights" },
  { label: "Register", href: "/register" },
];

export default function SiteFooter() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // The wordmark's outline warms from monitor lavender to fever rose as
      // the footer scrolls into view — the page's last temperature rise.
      gsap.fromTo(
        "[data-footer-mark]",
        { "--stroke": "rgba(179, 166, 255, 0.4)" },
        {
          "--stroke": "rgba(255, 77, 109, 0.75)",
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 95%",
            end: "bottom bottom",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-ash">
      <div
        data-footer-mark
        aria-hidden="true"
        className="display-poster pointer-events-none mt-4 text-center text-[17.5vw] leading-none whitespace-nowrap select-none"
        style={
          {
            "--stroke": "rgba(179, 166, 255, 0.4)",
            WebkitTextStroke: "1.5px var(--stroke)",
            color: "transparent",
          } as React.CSSProperties
        }
      >
        PYREXIA
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 border-t border-ash/60 pt-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-2">
            <p className="display-poster text-xl text-bone">Pyrexia 2026</p>
            <p className="chart-label mt-3 text-gauze">
              Under observation · full site in development
            </p>
          </div>
          <div>
            <p className="chart-label text-monitor">Chart</p>
            <ul className="mt-4 space-y-2.5">
              {CHART_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-bone/80 transition-colors hover:text-fever"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="chart-label text-monitor">Connect</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="https://www.instagram.com/pyrexiaaiims/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-bone/80 transition-colors hover:text-fever"
                >
                  Instagram ↗
                </a>
              </li>
              <li>
                <span className="text-sm text-bone/60">
                  ARSWA · AIIMS Rishikesh
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-ash/60 pt-6">
          <p className="chart-label text-gauze">Feel the fever</p>
          <p className="chart-label text-gauze">
            October 2026 · Banks of the Ganga
          </p>
        </div>
      </div>
    </footer>
  );
}
