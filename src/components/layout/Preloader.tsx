import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = reduce ? 250 : 1500;
    const started = performance.now();
    let frame = 0;
    function tick(now: number) {
      const ratio = Math.min(1, (now - started) / duration);
      setProgress(ratio);
      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(onDone, reduce ? 0 : 220);
      }
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone, reduce]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink-950"
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
    >
      <div className="relative">
        <div className="absolute -inset-16 rounded-full bg-radial-faded blur-2xl" aria-hidden />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col items-center"
        >
          <div className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">
            VG<span className="text-violet-400">.</span>
          </div>
          <div className="mt-8 h-px w-48 overflow-hidden bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-electric-400 transition-[width] duration-150 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className="mt-4 flex w-48 items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
            <span>Initialising</span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
