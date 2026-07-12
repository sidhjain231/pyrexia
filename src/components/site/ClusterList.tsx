import Reveal from "@/components/fx/Reveal";
import { clusters } from "@/data/clusters";

export default function ClusterList() {
  return (
    <section
      id="symptoms"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <Reveal>
        <p className="chart-label text-monitor">Chart · Symptoms</p>
        <h2 className="display-poster mt-3 max-w-3xl text-[clamp(2.6rem,9vw,5.5rem)] text-bone">
          Eleven ways to catch it
        </h2>
        <p className="mt-4 max-w-xl text-gauze">
          Every cluster is its own outbreak — dance floors, stages, arenas,
          canvases and consoles. Full event pages arrive with registration.
        </p>
      </Reveal>

      <ul className="mt-12 border-t border-ash">
        {clusters.map((cluster, i) => (
          <li key={cluster.name} className="border-b border-ash">
            <Reveal delay={Math.min(i * 0.04, 0.3)}>
              <div className="group flex items-baseline justify-between gap-4 py-5">
                <span className="display-poster text-2xl text-bone transition-colors group-hover:text-fever sm:text-4xl">
                  {cluster.name}
                </span>
                <span className="chart-label shrink-0 text-right text-gauze">
                  {cluster.tag}
                </span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
