import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { About } from "@/components/sections/About";
import { DesignSystemShowcase } from "@/components/sections/DesignSystemShowcase";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechStack />
      <About />
      <DesignSystemShowcase />
    </main>
  );
}