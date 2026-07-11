import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { SettleIn } from "@/components/ui/settle-in";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />

        <Projects />

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
