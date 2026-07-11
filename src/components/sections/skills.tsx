import { skillGroups } from "@/content/data";
import { Drift } from "@/components/ui/drift";
import { SettleIn } from "@/components/ui/settle-in";
import { Marquee } from "@/components/ui/marquee";

const CORE_TECH = Array.from(
  new Set(
    skillGroups.flatMap((group) => group.skills).filter((skill) => !skill.startsWith("TODO"))
  )
);

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-28 flex min-h-[50vh] flex-col items-center gap-10 px-6 py-24"
    >
      <SettleIn>
        <h2 className="font-display text-2xl text-text">Skills</h2>
      </SettleIn>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Drift
            key={group.label}
            amplitude={5 + (index % 3)}
            duration={7 + (index % 4) * 1.2}
            delay={(index % 5) * 0.35}
            className="rounded-xl border border-line bg-panel/80 p-6 backdrop-blur"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-teal">
              {group.label}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-line px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Drift>
        ))}
      </div>

      <Marquee items={CORE_TECH} className="max-w-4xl" />
    </section>
  );
}
