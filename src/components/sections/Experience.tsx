import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useContent } from '../../store/ContentProvider';
import { Reveal, SectionHeading } from '../fx/Reveal';

export function Experience() {
  const { content } = useContent();

  return (
    <section id="experience" className="relative border-y border-white/[0.05] bg-ink-900/25 py-24 sm:py-28">
      <div className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-electric-500/10 blur-[110px]" aria-hidden />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="04 · Experience"
          title={
            <>
              Where I've <span className="text-gradient-accent">done the work</span>
            </>
          }
          description="Training and internship experience, presented as it was — real models, real dashboards, real constraints."
        />

        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          {content.experience.map((item) => (
            <Reveal key={item.id}>
              <article className="glass relative h-full overflow-hidden rounded-2xl p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-electric-500/10 font-display text-sm font-bold text-white">
                      IR
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.role}</h3>
                      <p className="mt-0.5 text-[13px] text-electric-300">{item.org}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        {item.period} · {item.location}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">
                    {item.mode}
                  </span>
                </div>

                <p className="mt-6 text-[13.5px] leading-relaxed text-slate-400">{item.summary}</p>

                <ul className="mt-5 space-y-3">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-[13px] leading-relaxed text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-400/80" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-5">
                  {item.tech.map((tech) => (
                    <span key={tech} className="chip !text-[10px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}

          <div className="space-y-4">
            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">How I work</p>
                <ul className="mt-4 space-y-4">
                  {[
                    {
                      title: 'Understand before modelling',
                      body: 'Sketch the problem, constraints and what a wrong answer would cost.',
                    },
                    {
                      title: 'Validate the data first',
                      body: 'Most model failures are data failures wearing a different hat.',
                    },
                    {
                      title: 'Measure honestly',
                      body: 'Proper splits, stated limitations, and no cherry-picked numbers.',
                    },
                  ].map((principle, index) => (
                    <li key={principle.title} className="flex gap-3">
                      <span className="font-mono text-[10px] text-violet-400/70">0{index + 1}</span>
                      <div>
                        <p className="text-[13px] font-medium text-white">{principle.title}</p>
                        <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{principle.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <a
                href={content.settings.resumeUrl}
                download
                className="group flex items-center justify-between gap-4 rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/[0.12] to-electric-500/[0.06] p-5 transition hover:border-violet-400/40"
              >
                <div>
                  <p className="text-[13px] font-medium text-white">Full resume, PDF</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">Education, projects and certifications</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-violet-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
