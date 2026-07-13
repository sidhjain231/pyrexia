"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  /** Wrapper element; keep it a text container so SplitText can walk it. */
  as?: ElementType;
  /** "lines" reads editorial; "words"/"chars" read kinetic. */
  split?: "lines" | "words" | "chars";
  delay?: number;
  className?: string;
};

/**
 * SplitText masked reveal: each line/word/char rises out of an overflow
 * clip as the element scrolls into view. Same treatment on every device;
 * animates transform/opacity only.
 */
export default function TextReveal({
  children,
  as: Tag = "div",
  split = "lines",
  delay = 0,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // mask:"lines" wraps each unit in an overflow-clipped parent, which is
      // what turns a plain fade into the editorial "rising out of a slit" cut.
      // aria:"none" because the animated copy is aria-hidden — a sr-only
      // duplicate carries the accessible text (aria-label is prohibited on
      // plain paragraphs).
      const splitter = SplitText.create(el, {
        type: split,
        mask: split,
        autoSplit: true,
        aria: "none",
        onSplit: (self) => {
          const units =
            split === "lines"
              ? self.lines
              : split === "words"
                ? self.words
                : self.chars;
          return gsap.from(units, {
            yPercent: 110,
            opacity: split === "lines" ? 1 : 0,
            duration: 0.9,
            delay,
            ease: "fever",
            stagger: split === "chars" ? 0.02 : 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          });
        },
      });

      return () => splitter.revert();
    },
    { scope: ref },
  );

  return (
    <Tag className={className}>
      <span className="sr-only">{children}</span>
      <span ref={ref} aria-hidden="true" className="block">
        {children}
      </span>
    </Tag>
  );
}
