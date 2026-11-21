import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add('custom-cursor');

    function onMove(event: MouseEvent) {
      target.current = { x: event.clientX, y: event.clientY };
      setVisible(true);
      const el = event.target as HTMLElement | null;
      setHovering(Boolean(el?.closest('a, button, [data-cursor="pointer"], input, textarea, select')));
    }
    function onLeave() {
      setVisible(false);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    let frame = 0;
    function tick() {
      ring.current.x += (target.current.x - ring.current.x) * 0.16;
      ring.current.y += (target.current.y - ring.current.y) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('custom-cursor');
    };
  }, [reduce]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden lg:block">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 rounded-full border transition-[width,height,opacity,border-color] duration-300"
        style={{
          width: hovering ? 46 : 30,
          height: hovering ? 46 : 30,
          opacity: visible ? 1 : 0,
          borderColor: hovering ? 'rgba(196,181,253,0.9)' : 'rgba(157,182,255,0.45)',
          backgroundColor: hovering ? 'rgba(139,92,246,0.12)' : 'transparent',
        }}
      />
    </div>
  );
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, window.scrollY / height) : 0);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[80] h-[2px] bg-transparent">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-violet-500 via-electric-400 to-cyan-300"
        style={{ scaleX: progress }}
      />
    </div>
  );
}
