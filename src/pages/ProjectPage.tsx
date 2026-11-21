import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, ExternalLink, Github, Lock, TriangleAlert } from 'lucide-react';
import { useContent } from '../store/ContentProvider';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { Artwork } from '../components/fx/Artwork';
import { Reveal } from '../components/fx/Reveal';
import { StatusPill } from '../components/sections/ProjectCard';
import { NotFoundPage } from './NotFoundPage';

export function ProjectPage() {
  const { slug } = useParams();
  const { content } = useContent();
  const index = content.projects.findIndex((item) => item.slug === slug);
  const project = content.projects[index];

  useDocumentMeta({
    title: project ? `${project.title} — Vaibhav Gaikwad` : 'Project not found — Vaibhav Gaikwad',
    description: project?.summary ?? 'Project case study.',
    url: project ? `https://vaibhavgaikwad0072.github.io/projects/${project.slug}` : undefined,
  });

  if (!project) return <NotFoundPage />;

  const previous = content.projects[(index - 1 + content.projects.length) % content.projects.length];
  const next = content.projects[(index + 1) % content.projects.length];

  return (
    <article className="pt-28 sm:pt-32">
      <div className="container-x">
        <Reveal>
          <Link to="/#projects" className="inline-flex items-center gap-2 text-[12px] font-medium text-slate-400 transition hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            All projects
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Reveal delay={0.05}>
              <div className="flex flex-wrap items-center gap-3">
                <StatusPill status={project.status} />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  {project.category} · {project.year}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.4rem]">
                {project.title}
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-400 sm:text-base">{project.summary}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {project.links.github ? (
                  <a href={project.links.github} target="_blank" rel="noreferrer" className="btn-primary">
                    <Github className="h-4 w-4" aria-hidden />
                    View repository
                  </a>
                ) : (
                  <span
                    className="btn-ghost cursor-help opacity-70"
                    title="This repository is not publicly linked yet"
                  >
                    <Lock className="h-4 w-4" aria-hidden />
                    Repository not public
                  </span>
                )}
                {project.links.demo ? (
                  <a href={project.links.demo} target="_blank" rel="noreferrer" className="btn-ghost">
                    <ExternalLink className="h-4 w-4" aria-hidden />
                    Live demo
                  </a>
                ) : null}
                <Link to="/#contact" className="btn-link px-2 py-2">
                  Discuss a similar build
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/60 p-2 shadow-glass">
              <div className="overflow-hidden rounded-[1.35rem]">
                <Artwork project={project} className="aspect-[4/3]" />
              </div>
            </div>
          </Reveal>
        </div>

        {project.outcomes.length ? (
          <Reveal delay={0.1}>
            <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {project.outcomes.map((outcome) => (
                <div key={`${outcome.value}-${outcome.label}`} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                  <p className="font-display text-3xl font-semibold text-gradient-accent">{outcome.value}</p>
                  <p className="mt-1.5 text-[12.5px] font-medium text-slate-200">{outcome.label}</p>
                  {outcome.note ? <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{outcome.note}</p> : null}
                </div>
              ))}
            </div>
          </Reveal>
        ) : null}

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-12">
            <Reveal>
              <section>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-violet-300/80">The problem</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-300">{project.problem}</p>
              </section>
            </Reveal>
            <Reveal>
              <section>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-electric-300/80">The approach</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-300">{project.solution}</p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-300/80">What it does</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-[12.5px] leading-relaxed text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-400/80" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {project.screenshots.length ? (
              <Reveal>
                <section>
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-300/80">Screenshots</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {project.screenshots.map((shot, shotIndex) => (
                      <figure key={`${shot.caption}-${shotIndex}`} className="overflow-hidden rounded-xl border border-white/10 bg-ink-900">
                        <img src={shot.src} alt={shot.caption} loading="lazy" className="w-full object-cover" />
                        <figcaption className="border-t border-white/[0.06] px-3.5 py-2.5 text-[11px] text-slate-500">
                          {shot.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              </Reveal>
            ) : null}

            {project.disclaimer ? (
              <Reveal>
                <div className="flex items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-4">
                  <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden />
                  <p className="text-[12px] leading-relaxed text-amber-100/80">{project.disclaimer}</p>
                </div>
              </Reveal>
            ) : null}
          </div>

          <div>
            <Reveal delay={0.08}>
              <div className="glass sticky top-24 rounded-2xl p-6">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">Architecture</h2>
                <ol className="mt-5 space-y-4">
                  {project.architecture.map((step, stepIndex) => (
                    <li key={step} className="flex gap-3.5">
                      <span className="mt-0.5 font-mono text-[10px] text-violet-400/70">
                        {String(stepIndex + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[12.5px] leading-relaxed text-slate-400">{step}</p>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 border-t border-white/[0.06] pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">Stack</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <li key={tech} className="chip !text-[10px]">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-4 border-t border-white/[0.06] pt-8 sm:grid-cols-2">
          <Link to={`/projects/${previous.slug}`} className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition hover:border-violet-400/25">
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">
              <ArrowLeft className="h-3 w-3" aria-hidden /> Previous
            </span>
            <span className="mt-2 block text-[14px] font-medium text-white transition group-hover:text-violet-200">
              {previous.title}
            </span>
          </Link>
          <Link to={`/projects/${next.slug}`} className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-right transition hover:border-violet-400/25">
            <span className="flex items-center justify-end gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">
              Next <ArrowRight className="h-3 w-3" aria-hidden />
            </span>
            <span className="mt-2 block text-[14px] font-medium text-white transition group-hover:text-violet-200">
              {next.title}
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
