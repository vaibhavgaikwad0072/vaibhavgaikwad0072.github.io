import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ExternalLink, Github, Lock } from 'lucide-react';
import type { Project } from '../../data/types';
import { Artwork } from '../fx/Artwork';
import { TiltCard } from '../fx/Tilt';
import { cn } from '../../lib/utils';

export function StatusPill({ status }: { status: Project['status'] }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] backdrop-blur',
        status === 'Shipped' && 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
        status === 'In development' && 'border-amber-400/25 bg-amber-400/10 text-amber-200',
        status === 'Research' && 'border-violet-400/25 bg-violet-400/10 text-violet-200',
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current" aria-hidden />
      {status}
    </span>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <TiltCard strength={4} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-900/[0.45] card-hover hover:border-violet-400/25 hover:bg-ink-900/[0.65]">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]">
            <Artwork project={project} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" aria-hidden />
          <div className="absolute inset-x-4 top-4 flex items-center justify-between">
            <StatusPill status={project.status} />
            <span className="font-mono text-[10px] tracking-[0.18em] text-slate-400">{project.year}</span>
          </div>
          <span className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.2em] text-slate-500">
            {String(index + 1).padStart(2, '0')} / {project.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-xl font-semibold tracking-tight text-white">
            <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{project.tagline}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((tech) => (
              <li key={tech} className="chip !px-2.5 !py-0.5 !text-[10px]">
                {tech}
              </li>
            ))}
            {project.tech.length > 4 ? (
              <li className="chip !px-2.5 !py-0.5 !text-[10px] text-slate-500">+{project.tech.length - 4}</li>
            ) : null}
          </ul>

          <div className="relative z-10 mt-6 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-electric-300 transition-colors group-hover:text-white">
              View case study
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </span>
            <div className="flex items-center gap-1">
              {project.links.github ? (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/[0.07] text-slate-400 transition hover:border-white/20 hover:text-white"
                  aria-label={`${project.title} on GitHub`}
                >
                  <Github className="h-3.5 w-3.5" aria-hidden />
                </a>
              ) : (
                <span
                  className="grid h-8 w-8 cursor-help place-items-center rounded-lg border border-white/[0.05] text-slate-600"
                  title="Repository is not public yet"
                  aria-label="Repository not public yet"
                >
                  <Lock className="h-3.5 w-3.5" aria-hidden />
                </span>
              )}
              {project.links.demo ? (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/[0.07] text-slate-400 transition hover:border-white/20 hover:text-white"
                  aria-label={`${project.title} live demo`}
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              ) : null}
              <Link
                to={`/projects/${project.slug}`}
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/[0.07] text-slate-400 transition hover:border-white/20 hover:text-white"
                aria-label={`Open ${project.title} case study`}
              >
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
