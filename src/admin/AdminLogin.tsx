import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, KeyRound, LockKeyhole } from 'lucide-react';
import { useContent } from '../store/ContentProvider';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export function AdminLogin() {
  const { login } = useContent();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);
  useDocumentMeta({ title: 'Admin — Vaibhav Gaikwad', description: 'Portfolio admin access.' });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!login(password)) {
      setError('That password does not match. Try again.');
      return;
    }
    setError('');
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-violet-600/[0.14] blur-[120px]" />
        <div className="absolute inset-0 bg-grid-faint bg-[length:72px_72px] opacity-25 mask-fade-b" />
      </div>

      <div className="relative w-full max-w-md">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-[12px] text-slate-400 transition hover:text-white">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Back to portfolio
        </Link>
        <div className="glass-strong rounded-3xl p-7 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-electric-500/10 text-violet-200">
              <LockKeyhole className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500">Admin · private</span>
          </div>
          <h1 className="mt-5 text-2xl font-semibold text-white">Portfolio control room</h1>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
            Sign in to manage projects, services and inquiries. This demo runs local-first; Supabase auth is documented
            for production.
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            <label htmlFor="admin-password" className="field-label">
              Admin password
            </label>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden />
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                className="field !pl-10"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'admin-error' : undefined}
              />
            </div>
            {error ? (
              <p id="admin-error" role="alert" className="mt-2 text-[11.5px] text-rose-300">
                {error}
              </p>
            ) : null}
            <button type="submit" className="btn-primary mt-4 w-full">
              Unlock dashboard
            </button>
          </form>

          <button
            type="button"
            onClick={() => setShowHint((value) => !value)}
            className="mt-4 text-[11px] text-slate-500 underline-offset-4 transition hover:text-slate-300 hover:underline"
          >
            Demo access details
          </button>
          {showHint ? (
            <p className="mt-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 font-mono text-[11px] leading-relaxed text-slate-400">
              Default password: <span className="text-violet-300">vg-admin-2026</span>
              <br />
              Override with VITE_ADMIN_PASSWORD. Session lasts until the tab closes.
            </p>
          ) : null}
        </div>
        <p className="mt-4 text-center text-[10.5px] leading-relaxed text-slate-600">
          Client-side gate for a static demo. Real deployments should use Supabase Auth with row-level security.
        </p>
      </div>
    </div>
  );
}
