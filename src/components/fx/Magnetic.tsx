"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  /** How far the element leans toward the pointer, as a fraction of offset. */
  strength?: number;
  className?: string;
};

/**
 * Magnetic wrapper: the child leans toward the pointer while hovered
 * (desktop) or pressed (touch) and springs back on release — the same
 * physics everywhere, transform-only.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

      const pull = (clientX: number, clientY: number) => {
        const rect = el.getBoundingClientRect();
        xTo((clientX - (rect.left + rect.width / 2)) * strength);
        yTo((clientY - (rect.top + rect.height / 2)) * strength);
      };

      const release = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.35)",
          overwrite: "auto",
        });
      };

      const onMove = (e: PointerEvent) => pull(e.clientX, e.clientY);
      const onDown = (e: PointerEvent) => {
        if (e.pointerType === "touch") pull(e.clientX, e.clientY);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointerleave", release);
      el.addEventListener("pointerup", release);
      el.addEventListener("pointercancel", release);

      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("pointerleave", release);
        el.removeEventListener("pointerup", release);
        el.removeEventListener("pointercancel", release);
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className ?? "inline-block"}>
      {children}
    </div>
  );
}
