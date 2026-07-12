function Row({
  items,
  hidden = false,
  textClass,
}: {
  items: string[];
  hidden?: boolean;
  textClass: string;
}) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item, i) => (
        <span
          key={i}
          className={`display-poster flex items-center gap-5 pr-5 text-2xl sm:text-4xl ${textClass}`}
        >
          {item}
          <span className="text-amber/60">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee({
  items,
  reverse = false,
  variant = "solid",
}: {
  items: string[];
  reverse?: boolean;
  variant?: "solid" | "outline";
}) {
  const textClass = variant === "solid" ? "text-fever" : "text-outline";
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max animate-marquee py-2 ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        <Row items={items} textClass={textClass} />
        <Row items={items} textClass={textClass} hidden />
      </div>
    </div>
  );
}
