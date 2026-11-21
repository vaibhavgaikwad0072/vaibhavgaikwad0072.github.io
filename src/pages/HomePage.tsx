import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { Projects } from '../components/sections/Projects';
import { Experience } from '../components/sections/Experience';
import { Services } from '../components/sections/Services';
import { Contact } from '../components/sections/Contact';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export function HomePage() {
  useDocumentMeta({
    title: 'Vaibhav Gaikwad — AI Engineer & Generative AI Developer',
    description:
      'Portfolio of Vaibhav Gaikwad, an AI and Data Science engineer building intelligent applications with Python, LLMs, RAG systems and FastAPI.',
    url: 'https://vaibhavgaikwad0072.github.io/',
  });

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Services />
      <Contact />
    </>
  );
}
