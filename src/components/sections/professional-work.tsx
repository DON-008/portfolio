import { professionalWork } from "@/content/data";
import { Drift } from "@/components/ui/drift";
import { SettleIn } from "@/components/ui/settle-in";
import { ProfessionalWorkCard } from "./professional-work-card";

export function ProfessionalWork() {
  return (
    <section
      id="professional-work"
      className="scroll-mt-28 flex min-h-[40vh] flex-col items-center gap-10 px-6 py-24"
    >
      <SettleIn>
        <h2 className="font-display text-2xl text-text">Professional Work</h2>
      </SettleIn>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {professionalWork.map((work, index) => (
          <Drift
            key={work.name}
            amplitude={5 + (index % 3)}
            duration={7 + (index % 4) * 1.2}
            delay={(index % 5) * 0.35}
            className="rounded-xl border border-line bg-panel/80 p-6 backdrop-blur"
          >
            <ProfessionalWorkCard work={work} />
          </Drift>
        ))}
      </div>
    </section>
  );
}
