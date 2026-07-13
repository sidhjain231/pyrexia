"use client";

import { useRef, type ElementType } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SCRAMBLE_GLYPHS } from "@/lib/gsap";

type Props = {
  text: string;
  as?: ElementType;
  delay?: number;
  duration?: number;
  className?: string;
};

/**
 * Monitor-static text: characters resolve out of medical glyph noise
 * (▓▒░+·) when the element scrolls into view. Used for chart labels so the
 * "instrument UI" voice feels alive on every device.
 */
export default function Scramble({
  text,
  as: Tag = "span",
  delay = 0,
  duration = 1,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.to(el, {
        scrambleText: {
          text,
          chars: SCRAMBLE_GLYPHS,
          speed: 0.4,
          revealDelay: delay,
        },
        duration: duration + delay,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [text] },
  );

  // A sr-only copy carries the accessible text; the animated span is hidden
  // from AT so nobody hears glyph noise (and aria-label is prohibited on
  // plain paragraphs).
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </Tag>
  );
}
