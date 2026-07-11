import { SettleIn } from "@/components/ui/settle-in";
import { Drift } from "@/components/ui/drift";

interface TimelineItem {
  title: string;
  subtitle: string;
  points: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

// Aceternity-style vertical timeline, adapted to our tokens. Per spec 4.4
// the text column is rock-steady (SettleIn reveal only, no continuous
// float) — only the node dots drift subtly.
export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative w-full max-w-2xl">
      <div className="absolute top-2 bottom-2 left-[5px] w-px bg-line" aria-hidden="true" />
      <ol className="flex flex-col gap-10">
        {items.map((item, index) => (
          <li key={index} className="relative pl-8">
            <Drift
              amplitude={3}
              duration={8 + (index % 3)}
              delay={(index % 4) * 0.3}
              dockable={false}
              className="absolute top-1.5 left-0 h-2.5 w-2.5 rounded-full bg-teal"
            />
            <SettleIn delay={index * 0.05}>
              <div>
                <h3 className="font-display text-lg text-text">{item.title}</h3>
                <p className="font-mono text-xs tracking-wide text-muted uppercase">
                  {item.subtitle}
                </p>
                <ul className="mt-3 flex flex-col gap-1.5 font-sans text-sm text-muted">
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </SettleIn>
          </li>
        ))}
      </ol>
    </div>
  );
}
