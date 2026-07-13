import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    SplitText,
    ScrambleTextPlugin,
    Flip,
    CustomEase,
    Draggable,
    InertiaPlugin,
    useGSAP,
  );

  // House ease: same curve as the Motion EASE [0.22, 1, 0.36, 1] so GSAP and
  // Motion animations read as one voice.
  CustomEase.create("fever", "M0,0 C0.22,1 0.36,1 1,1");
}

/** Glyphs the Scramble primitive cycles through — reads as monitor static. */
export const SCRAMBLE_GLYPHS = "▓▒░/+·◦-—|";

export { gsap, ScrollTrigger, SplitText, Flip, Draggable, useGSAP };
