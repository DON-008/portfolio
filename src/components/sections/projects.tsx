import { projects } from "@/content/data";
import { Drift } from "@/components/ui/drift";
import { SettleIn } from "@/components/ui/settle-in";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

export function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-28 flex min-h-[60vh] flex-col items-center gap-10 px-6 py-24"
    >
      <SettleIn>
        <h2 className="font-display text-2xl text-text">Projects</h2>
      </SettleIn>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Drift
            key={project.slug}
            amplitude={5 + (index % 3)}
            duration={7 + (index % 4) * 1.3}
            delay={(index % 5) * 0.4}
            className={cn(
              "rounded-xl border border-line bg-panel/80 p-6 backdrop-blur",
              project.featured && "col-span-full"
            )}
          >
            <ProjectCard project={project} />
          </Drift>
        ))}
      </div>
    </section>
  );
}
