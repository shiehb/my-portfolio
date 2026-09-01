import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { About } from "@/components/sections/About";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechStack />
      <About />
    </main>
  );
}