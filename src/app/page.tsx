import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { ProfessionalWork } from "@/components/sections/professional-work";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />

      <Projects />

      <Skills />

      <Experience />

      <ProfessionalWork />

      <Education />

      <Contact />
    </main>
  );
}
