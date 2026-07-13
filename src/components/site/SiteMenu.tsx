"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Navigation as a patient chart: every destination is a vital entry whose
// temperature encodes how deep into the fever it takes you. Register runs
// critical.
const VITALS = [
  {
    temp: "98.6",
    label: "Home",
    sub: "Baseline",
    href: "/",
    hue: "#b3a6ff",
  },
  {
    temp: "99.8",
    label: "About",
    sub: "Hx · Patient history",
    href: "/about",
    hue: "#d9a8d8",
  },
  {
    temp: "101.2",
    label: "Events",
    sub: "Chart · Eleven clusters",
    href: "/events",
    hue: "#f2c14e",
  },
  {
    temp: "102.3",
    label: "Gallery",
    sub: "Imaging · Past editions",
    href: "/gallery",
    hue: "#ff8a5c",
  },
  {
    temp: "103.4",
    label: "Star nights",
    sub: "Auriga · The headliners",
    href: "/star-nights",
    hue: "#ff6b64",
  },
  {
    temp: "104.2",
    label: "Register",
    sub: "Critical · Join the list",
    href: "/register",
    hue: "#ff4d6d",
  },
];

// Single heartbeat segment drawn under the hovered/pressed entry.
const SPIKE =
  "M0 12 H36 L42 8.5 L48 12 H84 L90 17 L97 2 L104 20 L110 12 H200";

export default function SiteMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Build once, then play/reverse on toggle. Reduced motion collapses
      // the choreography to a fast fade.
      const tl = gsap.timeline({ paused: true });
      if (reduced) {
        tl.fromTo(
          rootRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.15 },
        );
      } else {
        tl.fromTo(
          rootRef.current,
          { autoAlpha: 0, clipPath: "inset(0 0 100% 0)" },
          {
            autoAlpha: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.65,
            ease: "fever",
          },
        )
          .fromTo(
            "[data-menu-row]",
            { yPercent: 120 },
            {
              yPercent: 0,
              duration: 0.7,
              ease: "fever",
              stagger: 0.07,
            },
            0.18,
          )
          .fromTo(
            "[data-menu-meta]",
            { opacity: 0 },
            { opacity: 1, duration: 0.5, stagger: 0.06 },
            0.4,
          )
          .fromTo(
            "[data-menu-trace]",
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.1, ease: "power2.out" },
            0.35,
          );
      }
      tlRef.current = tl;
    },
    { scope: rootRef },
  );

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    let focusTimer: number | undefined;
    if (open) {
      tl.timeScale(1).play();
      document.documentElement.style.overflow = "hidden";
      // Move focus into the chart so keyboards land where the eyes are —
      // deferred past the first timeline tick, because focus() is a no-op
      // while the overlay is still visibility:hidden.
      focusTimer = window.setTimeout(() => {
        rootRef.current
          ?.querySelector<HTMLAnchorElement>("a")
          ?.focus({ preventScroll: true });
      }, 120);
    } else {
      tl.timeScale(1.6).reverse();
      document.documentElement.style.overflow = "";
    }
    return () => {
      window.clearTimeout(focusTimer);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={rootRef}
      inert={!open}
      aria-hidden={!open}
      className="invisible fixed inset-0 z-[45] flex flex-col justify-between bg-soot/85 pt-16 opacity-0 backdrop-blur-md"
      style={{ clipPath: "inset(0 0 100% 0)" }}
    >
      <nav
        aria-label="Site"
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 sm:px-6"
      >
        <p data-menu-meta className="chart-label text-gauze">
          Observation chart · Where to next
        </p>
        <ul className="mt-6 sm:mt-8">
          {VITALS.map((item) => (
            <li
              key={item.href}
              className="border-b border-ash/60 first:border-t"
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="group flex items-baseline gap-4 py-3 outline-none sm:gap-8 sm:py-4"
              >
                <span
                  data-menu-meta
                  className="chart-label w-16 shrink-0 text-right tabular-nums transition-colors duration-300 sm:w-20"
                  style={{ color: item.hue }}
                >
                  {item.temp}°
                </span>
                <span className="relative min-w-0 overflow-hidden">
                  <span
                    data-menu-row
                    className="display-poster block text-[clamp(1.9rem,7.4vw,5.2rem)] leading-[1.04] whitespace-nowrap text-bone transition-colors duration-300 group-hover:text-(--hue) group-focus-visible:text-(--hue) group-active:text-(--hue)"
                    style={{ "--hue": item.hue } as React.CSSProperties}
                  >
                    {item.label}
                  </span>
                  {/* heartbeat underline draws in on hover/press */}
                  <svg
                    viewBox="0 0 200 22"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-3 w-full"
                    style={{ color: item.hue }}
                  >
                    <path
                      d={SPIKE}
                      pathLength={1}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-[stroke-dashoffset] duration-500 ease-out [stroke-dasharray:1] [stroke-dashoffset:1] group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0] group-active:[stroke-dashoffset:0]"
                    />
                  </svg>
                </span>
                <span
                  data-menu-meta
                  className="chart-label hidden text-gauze md:inline"
                >
                  {item.sub}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
        <svg
          viewBox="0 0 600 40"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="h-8 w-full text-monitor/60"
        >
          <path
            data-menu-trace
            d="M0 24 H120 L128 18 L136 24 H240 L247 30 L256 6 L265 34 L272 24 H420 L428 18 L436 24 H600"
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <a
            data-menu-meta
            href="https://www.instagram.com/pyrexiaaiims/"
            target="_blank"
            rel="noreferrer"
            className="chart-label text-monitor transition-colors hover:text-fever"
          >
            Instagram ↗
          </a>
          <p data-menu-meta className="chart-label text-gauze">
            October 2026 · AIIMS Rishikesh
          </p>
        </div>
      </div>
    </div>
  );
}
