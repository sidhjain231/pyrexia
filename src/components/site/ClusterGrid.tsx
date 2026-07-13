"use client";

import Image from "next/image";
import Link from "next/link";
import { clusters } from "@/data/clusters";
import TiltCard from "@/components/fx/TiltCard";

/** Index grid of all eleven clusters; each tile is a chart entry. */
export default function ClusterGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {clusters.map((cluster, i) => (
        <Link
          key={cluster.slug}
          href={`/events/${cluster.slug}`}
          className="group outline-none"
        >
          <TiltCard
            glow={cluster.hue}
            className="relative h-72 overflow-hidden rounded-2xl border border-bone/10 transition-colors duration-300 group-hover:border-bone/30 group-focus-visible:border-fever sm:h-80"
          >
            {cluster.image ? (
              <>
                <Image
                  src={cluster.image}
                  alt={cluster.imageAlt ?? cluster.name}
                  fill
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-ink/10" />
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(120% 90% at 85% -10%, ${cluster.hue}66 0%, transparent 58%), linear-gradient(165deg, ${cluster.hue}2b 0%, #0e0a18 65%)`,
                  }}
                />
                <span
                  aria-hidden="true"
                  className="display-poster absolute -top-3 right-1 text-[7.5rem] leading-none"
                  style={{
                    WebkitTextStroke: `1.5px ${cluster.hue}a6`,
                    color: "transparent",
                  }}
                >
                  {cluster.name[0]}
                </span>
              </>
            )}

            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="chart-label" style={{ color: cluster.hue }}>
                  {cluster.domain}
                </p>
                <p className="chart-label text-gauze">
                  {String(i + 1).padStart(2, "0")} / 11
                </p>
              </div>
              <h2 className="display-poster mt-2 text-[1.7rem] leading-none text-bone [font-stretch:115%]">
                {cluster.name}
              </h2>
              <p className="mt-2 max-w-[28ch] text-sm leading-snug text-bone/70">
                {cluster.tag}
              </p>
            </div>
          </TiltCard>
        </Link>
      ))}
    </div>
  );
}
