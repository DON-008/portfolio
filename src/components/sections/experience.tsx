import { experience } from "@/content/data";
import { SettleIn } from "@/components/ui/settle-in";
import { Timeline } from "@/components/ui/timeline";

export function Experience() {
  const items = experience.map((entry) => ({
    title: entry.role,
    subtitle: `${entry.company} · ${entry.period} · ${entry.location}`,
    points: entry.points,
  }));

  return (
    <section
      id="experience"
      className="scroll-mt-28 flex min-h-[50vh] flex-col items-center gap-10 px-6 py-24"
    >
      <SettleIn>
        <h2 className="font-display text-2xl text-text">Experience</h2>
      </SettleIn>

      <Timeline items={items} />
    </section>
  );
}
