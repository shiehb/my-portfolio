import { Hero } from "@/sections/home/hero";
import { Projects } from "@/sections/home/projects";
import { About } from "@/sections/home/about";
import { Contact } from "@/sections/home/contact";

export default function Home() {
  return (
    <main id="main-content" className="w-full flex flex-col flex-1">
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}

