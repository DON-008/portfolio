import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import type { Project } from "@/content/data";

function isPlaceholder(value: string) {
  return value.startsWith("TODO");
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasLive = !!project.liveUrl && !isPlaceholder(project.liveUrl);
  const hasRepo = !isPlaceholder(project.repoUrl);
  const coldStart = hasLive && project.liveUrl!.includes("onrender.com");

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl text-text">{project.name}</h3>
        {project.status === "in-development" && (
          <span className="shrink-0 rounded-full bg-amber/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-amber">
            In development
          </span>
        )}
      </div>

      <p className="font-sans text-sm text-muted">{project.tagline}</p>

      <div className="flex flex-wrap gap-2">
        {project.stack.slice(0, 6).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      <p className="font-mono text-xs text-teal">{project.highlight}</p>

      {coldStart && (
        <p className="font-sans text-xs text-muted/70">
          Demo may cold-start (~30s) on first load — free-tier hosting.
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-4 pt-2 font-sans text-sm">
        {hasLive && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-text transition-colors hover:text-indigo focus-visible:text-indigo"
          >
            Live <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
        {hasRepo ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-text transition-colors hover:text-indigo focus-visible:text-indigo"
          >
            <GithubIcon className="h-3.5 w-3.5" /> GitHub
          </a>
        ) : (
          <span className="inline-flex items-center gap-1 text-muted/50">
            <GithubIcon className="h-3.5 w-3.5" /> GitHub
          </span>
        )}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-text transition-colors hover:text-indigo focus-visible:text-indigo"
        >
          Case study <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
