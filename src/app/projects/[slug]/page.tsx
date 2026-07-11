import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "@/content/data";
import { GithubIcon } from "@/components/ui/icons";
import { HeroConstellation } from "@/components/sections/hero-constellation";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

function isPlaceholder(value: string) {
  return value.startsWith("TODO");
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.name, description: project.tagline };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const hasLive = !!project.liveUrl && !isPlaceholder(project.liveUrl);
  const hasRepo = !isPlaceholder(project.repoUrl);

  return (
    <article className="relative z-10 mx-auto flex max-w-3xl flex-col gap-16 px-6 py-24">
      <Link
        href="/#projects"
        className="inline-flex w-fit items-center gap-2 font-mono text-xs tracking-wide text-muted uppercase transition-colors hover:text-text focus-visible:text-text"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Back to projects
      </Link>

      <header className="flex flex-col gap-4">
        {project.screenshot && (
          <Image
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            width={1200}
            height={675}
            className="rounded-xl border border-line"
          />
        )}
        {project.status === "in-development" && (
          <span className="w-fit rounded-full bg-amber/15 px-2.5 py-1 font-mono text-[10px] tracking-wide text-amber uppercase">
            In development
          </span>
        )}
        <h1 className="font-display text-3xl text-text sm:text-4xl">{project.name}</h1>
        <p className="font-sans text-lg text-muted">{project.tagline}</p>
        <div className="flex flex-wrap gap-4 font-sans text-sm">
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
        </div>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="font-mono text-xs tracking-widest text-teal uppercase">Problem</h2>
        <p className="font-sans text-text">{project.problem}</p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-mono text-xs tracking-widest text-teal uppercase">Architecture</h2>
        {project.slug === "esmp" && <HeroConstellation variant="standalone" />}
        <ul className="flex flex-col gap-2 font-sans text-text">
          {project.architecture.map((bullet, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-teal">–</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-mono text-xs tracking-widest text-teal uppercase">
          Key engineering decisions
        </h2>
        <div className="flex flex-col gap-4">
          {project.decisions.map((decision) => (
            <div
              key={decision.title}
              className="rounded-xl border border-line bg-panel/80 p-5 backdrop-blur"
            >
              <h3 className="font-display text-base text-text">{decision.title}</h3>
              <p className="mt-1 font-sans text-sm text-muted">{decision.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-mono text-xs tracking-widest text-teal uppercase">Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </article>
  );
}
