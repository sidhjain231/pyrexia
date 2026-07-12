function Row({ items, hidden = false }: { items: string[]; hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-6 pr-6 text-lg font-bold uppercase tracking-tight text-fever sm:text-xl"
        >
          {item}
          <span className="text-amber">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={`overflow-hidden border-y border-ash bg-soot ${className}`}>
      <div className="flex w-max animate-marquee py-3">
        <Row items={items} />
        <Row items={items} hidden />
      </div>
    </div>
  );
}
