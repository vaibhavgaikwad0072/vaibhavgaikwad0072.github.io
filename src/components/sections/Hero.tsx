import { Fragment, useEffect, useRef, useState, type MouseEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type Variants } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, MapPin, Sparkles } from 'lucide-react';
import { useContent } from '../../store/ContentProvider';
import { scrollToSection } from '../../lib/utils';
import { Magnetic } from '../fx/Tilt';
import { ParticleField } from '../fx/ParticleField';

function useTypewriter(words: string[], enabled: boolean) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(enabled ? words[0] : '');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const current = words[index % words.length];
    let timeout: number;

    if (!deleting && text === current) {
      timeout = window.setTimeout(() => setDeleting(true), 1900);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((value) => (value + 1) % words.length);
      return;
    } else {
      timeout = window.setTimeout(
        () => {
          setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
        },
        deleting ? 34 : 62,
      );
    }
    return () => window.clearTimeout(timeout);
  }, [text, deleting, index, words, enabled]);

  return text;
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.15 },
  },
};

const word: Variants = {
  hidden: { y: '110%', opacity: 0 },
  show: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const { content } = useContent();
  const { settings } = content;
  const reduce = useReducedMotion();
  const roles = settings.roles.length ? settings.roles : ['AI Engineer'];
  const typed = useTypewriter(roles, !reduce);
  const sectionRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const imageX = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const imageY = useTransform(springY, [-0.5, 0.5], [8, -8]);

  function handlePointer(event: MouseEvent<HTMLDivElement>) {
    if (reduce || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  const headingWords = settings.heroHeading.split(' ');

  return (
    <section id="home" ref={sectionRef} onMouseMove={handlePointer} className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] h-[540px] w-[540px] rounded-full bg-violet-600/20 blur-[130px]" />
        <div className="absolute left-[-15%] top-[30%] h-[420px] w-[420px] rounded-full bg-electric-600/[0.15] blur-[120px]" />
        <ParticleField className="absolute inset-0 h-full w-full opacity-70" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="relative">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-300 backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {settings.heroIntro}
            </motion.div>

            <motion.h1
              variants={container}
              initial={reduce ? false : 'hidden'}
              animate="show"
              className="mt-6 max-w-2xl text-[2.65rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.1rem] xl:text-[4.5rem]"
            >
              {headingWords.map((item, index) => (
                <Fragment key={`${item}-${index}`}>
                  {index > 0 ? ' ' : null}
                  <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span
                      variants={word}
                      className={index >= 1 ? 'text-gradient inline-block' : 'inline-block'}
                    >
                      {item}
                    </motion.span>
                  </span>
                </Fragment>
              ))}
            </motion.h1>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="mt-6 flex h-7 items-center gap-2 font-mono text-sm text-slate-400 sm:text-[15px]"
            >
              <span className="text-violet-400">&gt;</span>
              <span className="text-slate-200">{typed}</span>
              <span className="inline-block h-4 w-[2px] animate-pulse bg-electric-300" aria-hidden />
            </motion.div>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-400 sm:text-base"
            >
              {settings.heroDescription}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.7 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <button type="button" onClick={() => scrollToSection('projects')} className="btn-primary group">
                  Explore My Work
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                </button>
              </Magnetic>
              <Magnetic strength={8}>
                <a href={settings.resumeUrl} download className="btn-ghost">
                  <Download className="h-4 w-4" aria-hidden />
                  Download Resume
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="btn-link ml-1 px-2 py-2"
              >
                Hire Me
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </button>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/[0.07] pt-6 text-[12px] text-slate-500"
            >
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-electric-300" aria-hidden />
                {settings.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-violet-300" aria-hidden />
                6 featured builds · CGPA 8.45
              </span>
              <span className="hidden items-center gap-2 sm:inline-flex">
                <span className="h-1 w-1 rounded-full bg-slate-600" />
                B.E. AI &amp; Data Science, 2026
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[420px] lg:max-w-none"
          >
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-radial-faded blur-2xl" aria-hidden />

            <div
              className="relative overflow-hidden rounded-[2.2rem] p-[1.5px] shadow-glow"
              style={{
                background:
                  'conic-gradient(from 160deg, rgba(139,92,246,0.85), rgba(76,111,255,0.2), rgba(34,211,238,0.6), rgba(139,92,246,0.2), rgba(139,92,246,0.85))',
              }}
            >
              <motion.div
                style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
                className="relative rounded-[calc(2.2rem-1.5px)] border border-white/10 bg-ink-900/95 p-2.5"
              >
              <div className="relative overflow-hidden rounded-[1.75rem]">
                <motion.img
                  style={reduce ? undefined : { x: imageX, y: imageY, scale: 1.06 }}
                  src={settings.photoUrl}
                  alt={`${settings.name}, ${settings.roles[0]}`}
                  width={896}
                  height={1152}
                  className="aspect-[4/5] w-full object-cover object-[center_18%]"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />

                <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3">
                  <div className="rounded-xl border border-white/10 bg-ink-950/[0.65] px-3.5 py-2.5 backdrop-blur-md">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-400">Focus</p>
                    <p className="mt-0.5 text-[12px] font-medium text-white">LLMs · RAG · Python</p>
                  </div>
                  <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-300">
                    Available
                  </span>
                </div>
              </div>
            </motion.div>
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="absolute -left-4 top-10 hidden rounded-xl border border-white/10 bg-ink-900/80 px-3.5 py-2.5 shadow-glass backdrop-blur md:block"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">Recent</p>
              <p className="mt-0.5 text-[12px] font-medium text-white">ITRoots · Data Science</p>
            </motion.div>

            <div className="pointer-events-none absolute -right-3 top-1/3 h-2 w-2 animate-ping rounded-full bg-violet-400/70" aria-hidden />
            <div className="pointer-events-none absolute -left-6 bottom-24 h-1.5 w-1.5 animate-pulse rounded-full bg-electric-300/80" aria-hidden />
          </motion.div>
        </div>

        <motion.button
          type="button"
          onClick={() => scrollToSection('about')}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mx-auto mt-16 hidden items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500 transition-colors hover:text-slate-300 sm:flex"
          aria-label="Scroll to about section"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10">
            <ArrowDown className="h-3.5 w-3.5" aria-hidden />
          </span>
          Scroll to explore
        </motion.button>
      </div>
    </section>
  );
}
