import { education } from "@/content/data";
import { SettleIn } from "@/components/ui/settle-in";
import { Drift } from "@/components/ui/drift";

export function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-28 flex min-h-[30vh] flex-col items-center gap-8 px-6 py-24"
    >
      <SettleIn>
        <h2 className="font-display text-2xl text-text">Education</h2>
      </SettleIn>

      <Drift
        amplitude={5}
        duration={9}
        className="w-full max-w-md rounded-xl border border-line bg-panel/80 p-6 text-center backdrop-blur"
      >
        <p className="font-display text-lg text-text">{education.degree}</p>
        <p className="mt-1 font-sans text-sm text-muted">{education.institution}</p>
        <p className="font-mono text-xs tracking-wide text-muted uppercase">
          {education.location}
        </p>
      </Drift>
    </section>
  );
}
