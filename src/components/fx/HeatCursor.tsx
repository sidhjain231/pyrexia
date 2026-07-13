"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const INTERACTIVE = "a, button, [role='button'], input, textarea, [data-cursor]";

/**
 * Thermal presence layer: a soft heat glow trails the pointer on desktop
 * (with a small comet dot and an ECG-blip pulse on click); on touch the same
 * glow follows the finger while it's down and blooms on tap. The native
 * cursor stays visible — this is warmth, not a cursor replacement.
 */
export default function HeatCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const glow = glowRef.current;
    const dot = dotRef.current;
    if (!glow || !dot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fine = window.matchMedia("(pointer: fine)").matches;

    gsap.set([glow, dot], { xPercent: -50, yPercent: -50, opacity: 0 });

    // The dot tracks tight, the glow lags — that lag is the "heat trail".
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const glowX = gsap.quickTo(glow, "x", { duration: 0.45, ease: "power2.out" });
    const glowY = gsap.quickTo(glow, "y", { duration: 0.45, ease: "power2.out" });

    const move = (x: number, y: number) => {
      dotX(x);
      dotY(y);
      glowX(x);
      glowY(y);
    };

    const show = (withDot: boolean) => {
      gsap.to(glow, { opacity: 1, duration: 0.3, overwrite: "auto" });
      if (withDot)
        gsap.to(dot, { opacity: 1, duration: 0.3, overwrite: "auto" });
    };

    const hide = () => {
      gsap.to([glow, dot], { opacity: 0, duration: 0.4, overwrite: "auto" });
    };

    const bloom = () => {
      gsap.fromTo(
        glow,
        { scale: 1 },
        { scale: 1.6, duration: 0.28, ease: "power2.out", yoyo: true, repeat: 1 },
      );
      gsap.fromTo(
        dot,
        { scale: 1 },
        { scale: 2.4, duration: 0.22, ease: "power3.out", yoyo: true, repeat: 1 },
      );
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // touch handled via down/move pair
      // First movement warms the layer up; jump straight to position so the
      // glow doesn't streak in from the corner.
      if (Number(gsap.getProperty(glow, "opacity")) === 0) {
        gsap.set([glow, dot], { x: e.clientX, y: e.clientY });
        show(fine);
      }
      move(e.clientX, e.clientY);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        gsap.set(glow, { x: e.clientX, y: e.clientY });
        show(false);
        bloom();
      } else {
        bloom();
      }
    };

    const onTouchDrag = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      glowX(e.clientX);
      glowY(e.clientY);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") hide();
    };

    // Warm the dot over interactive targets so links feel charged.
    const onOver = (e: Event) => {
      if ((e.target as Element).closest?.(INTERACTIVE))
        gsap.to(dot, { scale: 2.6, duration: 0.3, overwrite: "auto" });
    };
    const onOut = (e: Event) => {
      if ((e.target as Element).closest?.(INTERACTIVE))
        gsap.to(dot, { scale: 1, duration: 0.3, overwrite: "auto" });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointermove", onTouchDrag, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointermove", onTouchDrag);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] overflow-hidden"
    >
      <div
        ref={glowRef}
        className="absolute top-0 left-0 h-44 w-44 rounded-full mix-blend-screen will-change-transform"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,77,109,0.24) 0%, rgba(242,193,78,0.10) 45%, transparent 70%)",
        }}
      />
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-fever will-change-transform"
      />
    </div>
  );
}
