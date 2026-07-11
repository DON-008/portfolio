import { education, certifications } from "@/content/data";
import { SettleIn } from "@/components/ui/settle-in";
import { Drift } from "@/components/ui/drift";

export function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-28 flex min-h-[30vh] flex-col items-center gap-10 px-6 py-24"
    >
      <SettleIn>
        <h2 className="font-display text-2xl text-text">Education</h2>
      </SettleIn>

      <div className="flex w-full max-w-3xl flex-wrap justify-center gap-6">
        {education.map((entry, index) => (
          <Drift
            key={entry.degree}
            amplitude={5}
            duration={9 + index}
            delay={index * 0.4}
            className="w-full max-w-sm rounded-xl border border-line bg-panel/80 p-6 text-center backdrop-blur sm:w-auto sm:flex-1"
          >
            <p className="font-display text-lg text-text">
              {entry.degree}
              {entry.note && <span className="text-teal"> ({entry.note})</span>}
            </p>
            <p className="mt-1 font-sans text-sm text-muted">{entry.institution}</p>
            <p className="font-mono text-xs tracking-wide text-muted uppercase">
              {entry.location} · {entry.year}
            </p>
          </Drift>
        ))}
      </div>

      <SettleIn delay={0.15}>
        <div className="flex max-w-2xl flex-col items-center gap-3">
          <h3 className="font-mono text-xs tracking-widest text-teal uppercase">
            Certifications
          </h3>
          <ul className="flex flex-wrap justify-center gap-2">
            {certifications.map((cert) => (
              <li
                key={cert}
                className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted"
              >
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </SettleIn>
    </section>
  );
}
