"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  /** Peak rotation in degrees. Keep subtle; this is garnish, not a gimmick. */
  max?: number;
  /** Hue for the pointer-following glow; defaults to fever rose. */
  glow?: string;
  className?: string;
};

/**
 * Pointer-tilt card: tilts toward the cursor on hover and toward the finger
 * while pressed/dragged on touch, with a heat glow that follows the contact
 * point. Transform/opacity only; identical behavior on every device.
 */
export default function TiltCard({
  children,
  max = 5,
  glow = "#ff4d6d",
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const halo = glowRef.current;
      if (!el || !halo) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.set(el, { transformPerspective: 700 });
      const rxTo = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power2.out" });
      const ryTo = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power2.out" });
      const gxTo = gsap.quickTo(halo, "xPercent", { duration: 0.5, ease: "power2.out" });
      const gyTo = gsap.quickTo(halo, "yPercent", { duration: 0.5, ease: "power2.out" });

      let active = false;

      const track = (clientX: number, clientY: number) => {
        const rect = el.getBoundingClientRect();
        const nx = (clientX - rect.left) / rect.width - 0.5; // -0.5 … 0.5
        const ny = (clientY - rect.top) / rect.height - 0.5;
        rxTo(-ny * max * 2);
        ryTo(nx * max * 2);
        gxTo(nx * 100);
        gyTo(ny * 100);
      };

      const engage = (e: PointerEvent) => {
        active = true;
        gsap.to(halo, { opacity: 1, duration: 0.35, overwrite: "auto" });
        track(e.clientX, e.clientY);
      };

      const onMove = (e: PointerEvent) => {
        // Mouse tilts on hover; touch tilts only while a finger is down so
        // ordinary page scrolls don't wobble the cards.
        if (e.pointerType === "touch" && !active) return;
        if (e.pointerType !== "touch") active = true;
        track(e.clientX, e.clientY);
      };

      const reset = () => {
        active = false;
        rxTo(0);
        ryTo(0);
        gsap.to(halo, { opacity: 0, duration: 0.5, overwrite: "auto" });
      };

      const onDown = (e: PointerEvent) => {
        if (e.pointerType === "touch") engage(e);
      };
      const onEnter = (e: PointerEvent) => {
        if (e.pointerType !== "touch") engage(e);
      };

      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", reset);
      el.addEventListener("pointerup", reset);
      el.addEventListener("pointercancel", reset);

      return () => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", reset);
        el.removeEventListener("pointerup", reset);
        el.removeEventListener("pointercancel", reset);
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background: `radial-gradient(45% 45% at 50% 50%, ${glow}2e 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
