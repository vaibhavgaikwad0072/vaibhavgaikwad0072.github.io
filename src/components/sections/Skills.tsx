import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useContent } from '../../store/ContentProvider';
import { SectionHeading, Reveal } from '../fx/Reveal';
import { cn } from '../../lib/utils';

const tints = [
  'from-violet-500/25 to-violet-500/5 text-violet-200 border-violet-400/20',
  'from-electric-500/25 to-electric-500/5 text-electric-300 border-electric-400/20',
  'from-cyan-400/20 to-cyan-400/5 text-cyan-200 border-cyan-400/20',
  'from-emerald-400/20 to-emerald-400/5 text-emerald-200 border-emerald-400/20',
  'from-amber-400/20 to-amber-400/5 text-amber-200 border-amber-400/20',
  'from-rose-400/20 to-rose-400/5 text-rose-200 border-rose-400/20',
];

export function Skills() {
  const { content } = useContent();
  const { skillGroups } = content;
  const [active, setActive] = useState('all');
  const reduce = useReducedMotion();

  const visibleGroups = useMemo(
    () => (active === 'all' ? skillGroups : skillGroups.filter((group) => group.id === active)),
    [active, skillGroups],
  );

  const marqueeItems = useMemo(() => skillGroups.flatMap((group) => group.items.map((item) => item.name)), [skillGroups]);

  return (
    <section id="skills" className="relative border-y border-white/[0.05] bg-ink-900/30 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[length:64px_64px] opacity-[0.35] mask-fade-b" aria-hidden />
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="02 · Capabilities"
            title={
              <>
                The stack I <span className="text-gradient-accent">actually use</span>
              </>
            }
            description="Grouped by where it sits in a build. No invented proficiency bars — just the tools I reach for and how they fit."
            className="mb-0 max-w-2xl"
          />
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-1.5 rounded-2xl border border-white/[0.07] bg-ink-950/50 p-1.5">
              <button
                type="button"
                onClick={() => setActive('all')}
                className={cn(
                  'rounded-xl px-3 py-2 text-[12px] font-medium transition',
                  active === 'all' ? 'bg-white/[0.08] text-white' : 'text-slate-400 hover:text-white',
                )}
              >
                All skills
              </button>
              {skillGroups.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActive(group.id)}
                  className={cn(
                    'rounded-xl px-3 py-2 text-[12px] font-medium transition',
                    active === group.id ? 'bg-white/[0.08] text-white' : 'text-slate-400 hover:text-white',
                  )}
                >
                  {group.title}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleGroups.map((group, groupIndex) => (
              <motion.div
                key={group.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, delay: groupIndex * 0.04 }}
                className={cn(
                  'glass group relative overflow-hidden rounded-2xl p-6 card-hover hover:border-violet-400/25',
                  active === 'all' && groupIndex === 0 ? 'md:col-span-2 xl:col-span-1' : '',
                )}
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl transition-opacity duration-500 group-hover:bg-violet-500/20" aria-hidden />
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[15px] font-semibold text-white">{group.title}</h3>
                    <p className="mt-1 text-[12px] text-slate-500">{group.blurb}</p>
                  </div>
                  <span className="font-mono text-[10px] text-slate-600">
                    {String(group.items.length).padStart(2, '0')}
                  </span>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item, itemIndex) => (
                    <motion.li
                      key={item.name}
                      whileHover={reduce ? undefined : { y: -2 }}
                      className={cn(
                        'group/skill inline-flex items-center gap-2 rounded-xl border bg-gradient-to-br px-2.5 py-1.5 text-[12px] transition-colors',
                        tints[(groupIndex + itemIndex) % tints.length],
                      )}
                    >
                      <span className="font-mono text-[9px] font-medium uppercase opacity-60">
                        {item.name.slice(0, 2)}
                      </span>
                      <span className="text-slate-200">{item.name}</span>
                      {item.note ? <span className="font-mono text-[9px] text-slate-500">({item.note})</span> : null}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-ink-950/40 px-5 py-4">
            <Sparkles className="h-4 w-4 shrink-0 text-violet-300" aria-hidden />
            <p className="text-[12.5px] leading-relaxed text-slate-500">
              Currently deepening: agentic workflows with LangGraph, retrieval evaluation, and production RAG patterns.
            </p>
          </div>
        </Reveal>

        <div className="mask-fade-x relative mt-10 overflow-hidden py-2">
          <div className={cn('flex w-max gap-3', !reduce && 'animate-marquee')}>
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="whitespace-nowrap rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 font-mono text-[11px] text-slate-500"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
