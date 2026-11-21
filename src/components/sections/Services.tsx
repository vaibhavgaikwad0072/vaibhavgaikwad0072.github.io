import { useRef, useState } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  BrainCircuit,
  Database,
  LineChart,
  Network,
  Server,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { useContent } from '../../store/ContentProvider';
import { Reveal, SectionHeading } from '../fx/Reveal';
import { InquiryForm } from '../forms/InquiryForm';
import { scrollToSection } from '../../lib/utils';
import type { ServiceIcon } from '../../data/types';

const icons: Record<ServiceIcon, typeof Bot> = {
  chatbot: Bot,
  rag: Network,
  llm: BrainCircuit,
  automation: Workflow,
  ml: LineChart,
  dashboard: BarChart3,
  backend: Server,
  database: Database,
};

export function Services() {
  const { content } = useContent();
  const [presetService, setPresetService] = useState<string | undefined>();
  const inquiryRef = useRef<HTMLDivElement>(null);

  function startInquiry(serviceTitle: string) {
    setPresetService(serviceTitle);
    scrollToSection('inquiry');
    inquiryRef.current?.focus();
  }

  return (
    <section id="services" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="05 · Services"
          title={
            <>
              Let's build something <span className="text-gradient-accent">intelligent</span>
            </>
          }
          description="Freelance engagements for teams that need an AI feature built properly — scoped, measured and handed over with documentation."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {content.services.map((service, index) => {
            const Icon = icons[service.icon] ?? Bot;
            return (
              <Reveal key={service.id} delay={(index % 4) * 0.05}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-900/40 p-5 card-hover hover:-translate-y-1 hover:border-violet-400/30 hover:bg-ink-900/70">
                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-500/[0.07] blur-2xl transition-all duration-500 group-hover:bg-violet-500/[0.16]" aria-hidden />
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/[0.15] to-electric-500/10 text-violet-200 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-[14.5px] font-semibold leading-snug text-white">{service.title}</h3>
                  <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-slate-400">{service.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {service.tech.slice(0, 3).map((tech) => (
                      <li key={tech} className="font-mono text-[9.5px] uppercase tracking-wider text-slate-500">
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => startInquiry(service.title)}
                    className="mt-5 inline-flex items-center gap-1.5 border-t border-white/[0.06] pt-4 text-left text-[12px] font-medium text-slate-300 transition-colors hover:text-white"
                  >
                    Contact for project
                    <ArrowUpRight className="h-3.5 w-3.5 text-violet-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div id="inquiry" ref={inquiryRef} tabIndex={-1} className="mt-16 grid scroll-mt-28 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <Reveal>
              <span className="eyebrow">
                <Sparkles className="h-3 w-3" aria-hidden />
                Project inquiry
              </span>
              <h3 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                Tell me what you are trying to build.
              </h3>
              <p className="mt-4 text-[14px] leading-relaxed text-slate-400">
                I take on a small number of freelance projects alongside full-time opportunities. The best fit is a
                well-defined AI feature, retrieval system, dashboard or API — something with a measurable outcome.
              </p>
            </Reveal>

            <div className="mt-8 space-y-5">
              {[
                {
                  title: '1 · Scope call',
                  body: 'A short conversation about the problem, data and constraints. No sales script.',
                },
                {
                  title: '2 · Written plan',
                  body: 'Architecture, milestones, risks and what I will not promise — before any code.',
                },
                {
                  title: '3 · Build and hand over',
                  body: 'Working software, documentation and a walkthrough so your team can own it.',
                },
              ].map((step, index) => (
                <Reveal key={step.title} delay={0.06 * index}>
                  <div className="flex gap-3.5 border-l border-white/10 pl-4">
                    <div>
                      <p className="text-[13px] font-medium text-white">{step.title}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-8 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <p className="text-[11.5px] leading-relaxed text-slate-500">
                  Prefer email? Write to{' '}
                  <a href={`mailto:${content.settings.email}`} className="text-electric-300 hover:text-white">
                    {content.settings.email}
                  </a>{' '}
                  with a sentence about the project.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <InquiryForm presetService={presetService} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
