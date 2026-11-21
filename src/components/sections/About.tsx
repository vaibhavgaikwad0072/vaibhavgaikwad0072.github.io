import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, Briefcase, CalendarDays, GraduationCap, MapPin } from 'lucide-react';
import { useContent } from '../../store/ContentProvider';
import { Reveal, SectionHeading } from '../fx/Reveal';

export function About() {
  const { content } = useContent();
  const { settings, experience } = content;
  const reduce = useReducedMotion();

  const degree = settings.education[0];
  const internship = experience[0];
  const timeline = [
    degree
      ? {
          year: '2022',
          title: degree.qualification,
          detail: `${degree.institution} · ${degree.detail}`,
          icon: GraduationCap,
        }
      : null,
    {
      year: '2025 — 2026',
      title: 'Built applied AI systems',
      detail: 'HealthLens, RAG Teaching Assistant, Text-to-SQL and DataGuard AI.',
      icon: Award,
    },
    internship
      ? {
          year: 'Feb — Jul 2026',
          title: `${internship.role} · ${internship.org}`,
          detail: 'Applied ML, analytics and Power BI dashboards in a production-facing team.',
          icon: Briefcase,
        }
      : null,
    {
      year: '2026',
      title: 'Graduated and open to work',
      detail: 'B.E. AI & Data Science, CGPA 8.45 — looking for AI engineering roles.',
      icon: CalendarDays,
    },
  ].filter(Boolean) as { year: string; title: string; detail: string; icon: typeof Award }[];

  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="01 · About"
          title={
            <>
              A little <span className="text-gradient-accent">about me</span>
            </>
          }
          description="Engineering background, applied AI focus. I like systems where the data, the model and the explanation all line up."
        />

        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div className="space-y-5">
            <Reveal>
              <div className="glass relative overflow-hidden rounded-2xl p-6">
                <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet-600/20 blur-3xl" aria-hidden />
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">Profile</p>
                    <p className="mt-1 font-display text-lg font-medium text-white">{settings.name}</p>
                  </div>
                  <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-300">
                    Open to work
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-[13px]">
                  <p className="flex items-center gap-2.5 text-slate-300">
                    <MapPin className="h-3.5 w-3.5 text-electric-300" aria-hidden />
                    {settings.location}
                  </p>
                  {degree ? (
                    <p className="flex items-start gap-2.5 text-slate-300">
                      <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-300" aria-hidden />
                      <span>
                        {degree.qualification}
                        <span className="block text-[12px] text-slate-500">{degree.institution}</span>
                      </span>
                    </p>
                  ) : null}
                  <p className="flex items-start gap-2.5 text-slate-300">
                    <Briefcase className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" aria-hidden />
                    <span>
                      Data Science Intern
                      <span className="block text-[12px] text-slate-500">ITROOTS Pvt. Ltd. · 2026</span>
                    </span>
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-3 divide-x divide-white/[0.07] rounded-xl border border-white/[0.07] bg-ink-950/40 py-3 text-center">
                  {[
                    { value: '8.45', label: 'CGPA' },
                    { value: '06', label: 'Builds' },
                    { value: '2026', label: 'Graduate' },
                  ].map((stat) => (
                    <div key={stat.label} className="px-2">
                      <p className="font-display text-lg font-semibold text-white">{stat.value}</p>
                      <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <a
                  href={settings.resumeUrl}
                  download
                  className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-medium text-electric-300 transition-colors hover:text-white"
                >
                  Download full resume
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="glass rounded-2xl p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">Certifications</p>
                <ul className="mt-4 space-y-2.5">
                  {settings.certifications.map((cert) => (
                    <li key={cert} className="flex items-start gap-2.5 text-[12.5px] text-slate-400">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-violet-400" aria-hidden />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="text-[15px] leading-relaxed text-slate-300 sm:text-[16.5px]">{settings.aboutParagraph}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 text-[14px] leading-relaxed text-slate-400 sm:text-[15px]">{settings.aboutSecondary}</p>
            </Reveal>

            <div className="mt-10">
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">The path so far</p>
              <ol className="relative space-y-7 border-l border-white/[0.08] pl-7">
                {reduce ? null : (
                  <motion.span
                    aria-hidden
                    className="absolute -left-px top-0 w-px origin-top bg-gradient-to-b from-violet-400 via-electric-400 to-transparent"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1.4, ease: 'easeOut' }}
                    style={{ height: '100%' }}
                  />
                )}
                {timeline.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.title} delay={index * 0.07}>
                      <li className="relative">
                        <span className="absolute -left-[38px] top-0.5 grid h-6 w-6 place-items-center rounded-full border border-white/10 bg-ink-900 text-violet-300 shadow-glow-sm">
                          <Icon className="h-3 w-3" aria-hidden />
                        </span>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-electric-300/80">{item.year}</p>
                        <p className="mt-1 text-[14.5px] font-medium text-white">{item.title}</p>
                        <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">{item.detail}</p>
                      </li>
                    </Reveal>
                  );
                })}
              </ol>
            </div>

            <Reveal delay={0.16}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/projects/transaction-risk-investigation" className="btn-ghost !px-5 !py-2.5 text-[13px]">
                  See the risk system case study
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
