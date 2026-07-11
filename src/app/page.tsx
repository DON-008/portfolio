import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Drift } from "@/components/ui/drift";
import { SettleIn } from "@/components/ui/settle-in";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />

        <section
          id="projects"
          className="scroll-mt-28 flex min-h-[60vh] flex-col items-center gap-8 px-6 py-24"
        >
          <SettleIn>
            <h2 className="font-display text-2xl text-text">Projects</h2>
          </SettleIn>
          {/* Drift primitive check — two test cards, desynced amplitude/duration,
              dock on hover. Replaced by the real bento grid in Step 6. */}
          <div className="flex flex-wrap justify-center gap-6">
            <Drift
              amplitude={6}
              duration={7}
              delay={0}
              className="rounded-xl border border-line bg-panel/80 p-6 text-sm text-text"
            >
              Drift test card A
            </Drift>
            <Drift
              amplitude={7}
              duration={9.5}
              delay={1.5}
              className="rounded-xl border border-line bg-panel/80 p-6 text-sm text-text"
            >
              Drift test card B
            </Drift>
          </div>
        </section>

        <section
          id="skills"
          className="scroll-mt-28 flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 py-24"
        >
          <SettleIn>
            <h2 className="font-display text-2xl text-text">Skills</h2>
          </SettleIn>
        </section>

        <section
          id="experience"
          className="scroll-mt-28 flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 py-24"
        >
          <SettleIn>
            <h2 className="font-display text-2xl text-text">Experience</h2>
          </SettleIn>
        </section>

        <section
          id="education"
          className="scroll-mt-28 flex min-h-[30vh] flex-col items-center justify-center gap-4 px-6 py-24"
        >
          <SettleIn>
            <h2 className="font-display text-2xl text-text">Education</h2>
          </SettleIn>
        </section>

        <section
          id="contact"
          className="scroll-mt-28 flex min-h-[40vh] flex-col items-center justify-center gap-4 px-6 py-24"
        >
          <SettleIn>
            <h2 className="font-display text-2xl text-text">Contact</h2>
          </SettleIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
