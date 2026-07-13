// PQRST heartbeat trace over a 200×40 viewBox; two copies loop seamlessly.
const TRACE =
  "M0 24 H38 L44 20.5 L50 24 H68 L73 29 L79 5 L85 33 L91 24 H118 L126 17.5 L134 24 H200";

export default function Ecg({
  className = "",
  duration,
}: {
  className?: string;
  /** Seconds per sweep; lower reads as a faster heartbeat. */
  duration?: number;
}) {
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="flex h-full w-[200%] animate-ecg"
        style={duration ? { animationDuration: `${duration}s` } : undefined}
      >
        {[0, 1].map((copy) => (
          <svg
            key={copy}
            viewBox="0 0 200 40"
            preserveAspectRatio="none"
            className="h-full w-1/2 shrink-0"
          >
            <path
              d={TRACE}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}
