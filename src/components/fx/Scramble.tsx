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
  const ref = useRef<HTMLElement>(null);

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

  // Render the real text for SEO/reduced-motion; GSAP scrambles it in place.
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text}
    </Tag>
  );
}
