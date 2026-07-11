import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { ProfessionalWork } from "@/components/sections/professional-work";
import { Education } from "@/components/sections/education";
import { SettleIn } from "@/components/ui/settle-in";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />

        <Projects />

        <Skills />

        <Experience />

        <ProfessionalWork />

        <Education />

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
