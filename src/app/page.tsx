import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";
import { EngineeringApproach } from "@/components/sections/EngineeringApproach";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vaibhav Gaikwad",
  url: "https://vaibhavgaikwad0072.github.io",
  jobTitle: "Software Engineer",
  description:
    "Software engineer and AI systems builder focused on backend systems, machine learning, and LLM applications.",
  sameAs: [
    "https://github.com/vaibhavgaikwad0072",
    "https://www.linkedin.com/in/vaibhav-gaikwad-50a1b4257/",
  ],
  knowsAbout: [
    "Software engineering",
    "Artificial intelligence",
    "Machine learning",
    "FastAPI",
    "React",
    "Large language model applications",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
      />
      <main className="bg-slate-950 text-white min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <EngineeringApproach />
      <Experience />
      <Contact />
      <Footer />
      </main>
    </>
  );
}
