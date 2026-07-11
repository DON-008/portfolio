import { Mail } from "lucide-react";
import { profile } from "@/content/data";
import { SettleIn } from "@/components/ui/settle-in";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-28 flex min-h-[40vh] flex-col items-center justify-center gap-6 px-6 py-24 text-center"
    >
      <SettleIn>
        <h2 className="font-display text-2xl text-text">Contact</h2>
      </SettleIn>

      <SettleIn delay={0.1}>
        <p className="max-w-xl font-sans text-muted">{profile.contactInvitation}</p>
      </SettleIn>

      <SettleIn delay={0.2}>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-indigo px-5 py-2.5 font-sans text-sm font-medium text-void transition-transform hover:scale-[1.03] focus-visible:scale-[1.03]"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Don Davis on LinkedIn"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-indigo hover:text-text focus-visible:border-indigo focus-visible:text-text"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Don Davis on GitHub"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-indigo hover:text-text focus-visible:border-indigo focus-visible:text-text"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
        </div>
      </SettleIn>
    </section>
  );
}
