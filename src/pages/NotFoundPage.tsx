import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export function NotFoundPage() {
  useDocumentMeta({ title: 'Page not found — Vaibhav Gaikwad', description: 'The page you were looking for does not exist.' });

  return (
    <section className="flex min-h-[80vh] items-center pt-24">
      <div className="container-x text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-violet-300">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">This page went off-pipeline.</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-400">
          The link may be outdated, or the project no longer exists. The good stuff is back on the main page.
        </p>
        <Link to="/" className="btn-primary mt-8">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to portfolio
        </Link>
      </div>
    </section>
  );
}
