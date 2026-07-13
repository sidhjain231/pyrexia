import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { clusters } from "@/data/clusters";
import MonitorStrip from "@/components/site/MonitorStrip";
import Scramble from "@/components/fx/Scramble";
import TextReveal from "@/components/fx/TextReveal";

export function generateStaticParams() {
  return clusters.map((cluster) => ({ slug: cluster.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cluster = clusters.find((c) => c.slug === slug);
  if (!cluster) return {};
  return {
    title: `${cluster.name} · PYREXIA 2026`,
    description: `${cluster.domain} at Pyrexia 2026 — ${cluster.tag}.`,
  };
}

export default async function ClusterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = clusters.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const cluster = clusters[index];
  const prev = clusters[(index + 10) % 11];
  const next = clusters[(index + 1) % 11];

  return (
    <>
      <MonitorStrip />
      <main>
        {/* chart header, tinted by the cluster's own hue */}
        <section className="relative overflow-hidden">
          {cluster.image && (
            <>
              <Image
                src={cluster.image}
                alt={cluster.imageAlt ?? cluster.name}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-ink/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
            </>
          )}
          {!cluster.image && (
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: `radial-gradient(110% 100% at 80% -20%, ${cluster.hue}59 0%, transparent 60%)`,
              }}
            />
          )}
          <span
            aria-hidden="true"
            className="display-poster pointer-events-none absolute -top-8 right-0 text-[16rem] leading-none opacity-60 sm:text-[24rem]"
            style={{
              WebkitTextStroke: `1.5px ${cluster.hue}59`,
              color: "transparent",
            }}
          >
            {cluster.name[0]}
          </span>

          <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-36">
            <Link
              href="/events"
              className="chart-label text-gauze transition-colors hover:text-fever"
            >
              ← All clusters
            </Link>
            <Scramble
              as="p"
              text={`${String(index + 1).padStart(2, "0")} / 11 · ${cluster.domain}`}
              className="chart-label text-shield mt-8 text-monitor"
            />
            <h1
              className="display-poster text-shield mt-3 text-[clamp(3rem,12vw,8rem)] text-bone"
              style={{ textShadow: `0 0 60px ${cluster.hue}40` }}
            >
              {cluster.name}
            </h1>
            <p
              className="chart-label text-shield mt-4"
              style={{ color: cluster.hue }}
            >
              {cluster.tag}
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
          <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
            <div>
              <Scramble
                as="p"
                text="Hx · The cluster"
                className="chart-label text-monitor"
              />
              <TextReveal
                as="p"
                split="lines"
                className="mt-4 max-w-2xl text-lg leading-relaxed text-bone/90 sm:text-xl"
              >
                {cluster.description}
              </TextReveal>

              <div className="mt-10 rounded-2xl border border-ash/70 bg-soot/40 p-6 sm:p-8">
                <p className="chart-label text-amber">
                  Rx · 2026 event list
                </p>
                <p className="mt-3 max-w-xl leading-relaxed text-bone/80">
                  Events, rules and team sizes for 2026 are being confirmed
                  with the organizing team. They drop here the moment
                  registrations open — delegate-card holders register free.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/register"
                    className="inline-block rounded-full bg-fever px-6 py-3 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-amber"
                  >
                    Pre-register
                  </Link>
                  <a
                    href="https://www.instagram.com/pyrexiaaiims/"
                    target="_blank"
                    rel="noreferrer"
                    className="chart-label self-center text-monitor transition-colors hover:text-fever"
                  >
                    Follow for drops ↗
                  </a>
                </div>
              </div>
            </div>

            <aside className="h-max rounded-2xl border border-ash/70 p-6">
              <p className="chart-label text-monitor">Vitals</p>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex justify-between gap-4 border-b border-ash/50 pb-3">
                  <dt className="text-gauze">Cluster</dt>
                  <dd className="text-bone">
                    {String(index + 1).padStart(2, "0")} of 11
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-ash/50 pb-3">
                  <dt className="text-gauze">Domain</dt>
                  <dd className="text-bone">{cluster.domain}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-ash/50 pb-3">
                  <dt className="text-gauze">Onset</dt>
                  <dd className="text-bone">October 2026</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gauze">Coordinators</dt>
                  <dd className="text-bone/70">With the event list</dd>
                </div>
              </dl>
            </aside>
          </div>

          {/* chart continuity: read the previous / next entry */}
          <nav
            aria-label="Cluster"
            className="mt-16 grid gap-4 border-t border-ash/60 pt-8 sm:grid-cols-2"
          >
            <Link
              href={`/events/${prev.slug}`}
              className="group rounded-2xl border border-ash/60 p-5 transition-colors hover:border-bone/30"
            >
              <p className="chart-label text-gauze">← Previous</p>
              <p
                className="display-poster mt-2 text-2xl transition-colors group-hover:text-(--hue)"
                style={{ "--hue": prev.hue } as React.CSSProperties}
              >
                {prev.name}
              </p>
            </Link>
            <Link
              href={`/events/${next.slug}`}
              className="group rounded-2xl border border-ash/60 p-5 text-right transition-colors hover:border-bone/30"
            >
              <p className="chart-label text-gauze">Next →</p>
              <p
                className="display-poster mt-2 text-2xl transition-colors group-hover:text-(--hue)"
                style={{ "--hue": next.hue } as React.CSSProperties}
              >
                {next.name}
              </p>
            </Link>
          </nav>
        </section>
      </main>
    </>
  );
}
