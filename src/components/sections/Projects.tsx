import { useContent } from '../../store/ContentProvider';
import { SectionHeading } from '../fx/Reveal';
import { ProjectCard } from './ProjectCard';
import { Reveal } from '../fx/Reveal';

export function Projects() {
  const { content } = useContent();

  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="03 · Selected work"
            title={
              <>
                Systems built to <span className="text-gradient-accent">solve something real</span>
              </>
            }
            description="Six builds across healthcare AI, retrieval, data quality and transaction risk. Each one starts with a problem worth taking seriously."
            className="mb-0"
          />
          <Reveal delay={0.12}>
            <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500">
              <span className="h-px w-10 bg-white/[0.15]" aria-hidden />
              {content.projects.length} projects
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {content.projects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 2) * 0.06} className="h-full">
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-5 sm:flex-row sm:items-center">
            <p className="text-[13px] text-slate-400">
              More experiments, notebooks and half-finished ideas live on GitHub.
            </p>
            <a
              href={content.settings.github}
              target="_blank"
              rel="noreferrer"
              className="btn-link"
            >
              Explore the repositories
              <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
