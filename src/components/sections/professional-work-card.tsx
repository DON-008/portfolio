import { ExternalLink } from "lucide-react";
import type { WorkProject } from "@/content/data";

interface ProfessionalWorkCardProps {
  work: WorkProject;
}

export function ProfessionalWorkCard({ work }: ProfessionalWorkCardProps) {
  return (
    <div className="flex h-full flex-col gap-3">
      <h3 className="font-display text-lg text-text">{work.name}</h3>
      <p className="font-sans text-sm text-muted">{work.description}</p>
      <div className="flex flex-wrap gap-2">
        {work.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
      {work.url && (
        <a
          href={work.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1 font-sans text-sm text-text transition-colors hover:text-indigo focus-visible:text-indigo"
        >
          Visit <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
