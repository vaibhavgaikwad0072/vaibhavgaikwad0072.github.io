import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Copy, Github, Globe, Linkedin, Mail } from 'lucide-react';
import { useContent } from '../../store/ContentProvider';

export function Footer() {
  const { content } = useContent();
  const { settings } = content;
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(settings.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950/60">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-electric-500/20 font-display text-sm font-bold text-white">
                VG<span className="text-violet-400">.</span>
              </span>
              <span className="font-display text-base font-medium text-white">{settings.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              AI engineering, retrieval systems and data products — built to be understood, measured and
              handed over.
            </p>
            <p className="mt-4 flex items-center gap-2 text-[12px] text-slate-500">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {settings.availability}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">Navigate</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {['About', 'Skills', 'Projects', 'Experience', 'Services', 'Contact'].map((label) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => navigate(`/#${label.toLowerCase()}`)}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">Elsewhere</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={settings.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-white">
                  <Github className="h-3.5 w-3.5" aria-hidden /> GitHub
                </a>
              </li>
              {settings.linkedin ? (
                <li>
                  <a href={settings.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-white">
                    <Linkedin className="h-3.5 w-3.5" aria-hidden /> LinkedIn
                  </a>
                </li>
              ) : null}
              {settings.portfolio ? (
                <li>
                  <a href={settings.portfolio} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-white">
                    <Globe className="h-3.5 w-3.5" aria-hidden /> Portfolio site
                  </a>
                </li>
              ) : null}
              <li>
                <button type="button" onClick={copyEmail} className="inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-white">
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
                  {copied ? 'Email copied' : 'Copy email'}
                </button>
              </li>
              <li>
                <a href={`mailto:${settings.email}`} className="inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-white">
                  <Mail className="h-3.5 w-3.5" aria-hidden /> {settings.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.06] pt-6 text-[12px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {settings.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span>React · TypeScript · Framer Motion</span>
            <Link to="/admin" className="transition-colors hover:text-slate-300">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
