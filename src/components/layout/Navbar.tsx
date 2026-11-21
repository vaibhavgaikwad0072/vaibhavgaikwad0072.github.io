import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { useContent } from '../../store/ContentProvider';
import { scrollToSection } from '../../lib/utils';
import { cn } from '../../lib/utils';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const { content } = useContent();
  const location = useLocation();
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const onHome = location.pathname === '/';

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
      if (!onHome) return;
      const offset = window.scrollY + window.innerHeight * 0.32;
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= offset) current = section.id;
      }
      setActive(current);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  function goTo(id: string) {
    setOpen(false);
    if (onHome) {
      scrollToSection(id);
    } else {
      navigate(`/#${id}`);
    }
  }

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled ? 'py-2.5' : 'py-4 sm:py-5',
        )}
      >
        <div className="container-x">
          <div
            className={cn(
              'flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5',
              scrolled
                ? 'border border-white/[0.08] bg-ink-950/70 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl'
                : 'border border-transparent bg-transparent',
            )}
          >
            <Link
              to="/"
              className="group flex items-center gap-2.5"
              aria-label="Vaibhav Gaikwad — home"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-electric-500/20 font-display text-sm font-bold text-white shadow-glow-sm transition-transform duration-300 group-hover:scale-105">
                VG<span className="text-violet-400">.</span>
              </span>
              <span className="hidden text-sm font-medium tracking-tight text-slate-200 sm:block">
                {content.settings.name}
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
              {sections.map((section) => {
                const isActive = onHome && active === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => goTo(section.id)}
                    className={cn(
                      'relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors',
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white',
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative">{section.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={content.settings.resumeUrl}
                download
                className="btn-ghost hidden !px-4 !py-2 text-[13px] sm:inline-flex"
              >
                <Download className="h-3.5 w-3.5" aria-hidden />
                Resume
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-200 lg:hidden"
                aria-label="Open navigation menu"
                aria-expanded={open}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[70] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-ink-950/95 backdrop-blur-2xl" />
            <div className="relative flex h-full flex-col">
              <div className="container-x flex items-center justify-between py-5">
                <span className="font-display text-lg font-semibold text-white">
                  VG<span className="text-violet-400">.</span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav aria-label="Mobile" className="container-x mt-6 flex flex-col gap-1">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    type="button"
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.045, duration: 0.4 }}
                    onClick={() => goTo(section.id)}
                    className="flex items-center justify-between border-b border-white/[0.06] py-4 text-left"
                  >
                    <span className="font-display text-2xl font-medium text-white">{section.label}</span>
                    <span className="font-mono text-[11px] text-slate-500">0{index + 1}</span>
                  </motion.button>
                ))}
              </nav>
              <div className="container-x mt-auto space-y-3 pb-10">
                <p className="flex items-center gap-2 text-[13px] text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {content.settings.availability}
                </p>
                <a href={content.settings.resumeUrl} download className="btn-primary w-full">
                  <Download className="h-4 w-4" aria-hidden />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
