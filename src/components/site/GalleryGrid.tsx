"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const PHOTOS = [
  { src: "/images/hero-artist.jpg", alt: "Star-night performer under warm light" },
  { src: "/images/gallery-05.jpg", alt: "Folk dancers in full colour" },
  { src: "/images/gallery-01.jpg", alt: "Umbrella canopy over the entrance" },
  { src: "/images/hero-stage.jpg", alt: "Band under stage flames" },
  { src: "/images/gallery-04.jpg", alt: "Volleyball spike at the net" },
  { src: "/images/pronite-green.jpg", alt: "Pro-night stage in green light" },
  { src: "/images/gallery-02.jpg", alt: "Theatre act by candlelight" },
  { src: "/images/gallery-06.jpg", alt: "Night crowd at the main stage" },
  { src: "/images/gallery-03.jpg", alt: "Crowd under stage lights" },
  { src: "/images/gallery-07.jpg", alt: "Confetti over the pro-night crowd" },
];

export default function GalleryGrid() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* CSS-columns masonry: cheap, responsive, no layout JS */}
      <div className="columns-2 gap-4 md:columns-3">
        {PHOTOS.map((photo, i) => (
          <motion.button
            key={photo.src}
            layoutId={photo.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open photo: ${photo.alt}`}
            className={`group relative mb-4 block w-full overflow-hidden rounded-xl border border-bone/10 outline-none focus-visible:border-fever ${
              i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="chart-label absolute bottom-2 left-3 text-[0.55rem] text-bone/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              № {String(i + 1).padStart(2, "0")}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[65] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-10"
          >
            <motion.div
              layoutId={PHOTOS[open].src}
              className="relative h-full max-h-[82svh] w-full max-w-4xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={PHOTOS[open].src}
                alt={PHOTOS[open].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
            <button
              type="button"
              onClick={() => setOpen(null)}
              autoFocus
              className="chart-label absolute top-5 right-5 flex items-center gap-2 text-bone transition-colors hover:text-fever"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-fever" />
              Close
            </button>
            <p className="chart-label absolute bottom-5 left-1/2 -translate-x-1/2 text-gauze">
              {PHOTOS[open].alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
