import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/content/data";
import { SettleIn } from "@/components/ui/settle-in";
import { GithubIcon } from "@/components/ui/icons";
import { HeroConstellation } from "./hero-constellation";
import { HeroTitle } from "./hero-title";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen scroll-mt-28 flex-col items-center justify-center gap-10 overflow-hidden p-8 text-center lg:flex-row lg:justify-center lg:gap-16 lg:p-16 lg:text-left"
    >
      <div className="relative z-10 flex max-w-xl flex-col items-center gap-6 lg:items-start">
        <SettleIn>
          <p className="font-mono text-sm uppercase tracking-widest text-teal">
            {profile.eyebrow}
          </p>
        </SettleIn>

        <HeroTitle name={profile.name} role={profile.role} />

        <SettleIn delay={0.15}>
          <p className="max-w-xl font-sans text-lg text-muted">{profile.pitch}</p>
        </SettleIn>

        <SettleIn delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-indigo px-5 py-2.5 font-sans text-sm font-medium text-void transition-transform hover:scale-[1.03] focus-visible:scale-[1.03]"
            >
              View projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={profile.cvPath}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-sans text-sm text-text transition-colors hover:border-indigo focus-visible:border-indigo"
            >
              Download CV
              <Download className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-sans text-sm text-text transition-colors hover:border-indigo focus-visible:border-indigo"
            >
              GitHub
              <GithubIcon className="h-4 w-4" />
            </a>
          </div>
        </SettleIn>
      </div>

      <HeroConstellation />
    </section>
  );
}
