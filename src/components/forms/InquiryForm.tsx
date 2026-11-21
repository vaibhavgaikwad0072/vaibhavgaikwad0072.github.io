import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { useContent } from '../../store/ContentProvider';
import { isEmail } from '../../lib/utils';

type State = 'idle' | 'submitting' | 'success' | 'error';

const budgets = ['Not sure yet', 'Under ₹10,000', '₹10,000 — ₹30,000', '₹30,000 — ₹75,000', '₹75,000+'];

export function InquiryForm({ presetService }: { presetService?: string }) {
  const { submitInquiry, content } = useContent();
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [fields, setFields] = useState({
    name: '',
    email: '',
    company: '',
    service: presetService ?? '',
    budget: '',
    message: '',
    website: '',
  });

  useEffect(() => {
    if (presetService) setFields((prev) => ({ ...prev, service: presetService }));
  }, [presetService]);

  const errors = {
    name: fields.name.trim().length < 2 ? 'Please share your name.' : '',
    email: isEmail(fields.email) ? '' : 'Enter a valid email address.',
    service: fields.service ? '' : 'Pick the service that fits best.',
    message: fields.message.trim().length < 15 ? 'Tell me a bit more — at least 15 characters.' : '',
  };
  const valid = !errors.name && !errors.email && !errors.service && !errors.message;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setTouched({ name: true, email: true, service: true, message: true });
    if (!valid || state === 'submitting') return;
    if (fields.website) {
      setState('success');
      return;
    }
    setState('submitting');
    setError('');
    try {
      await submitInquiry({
        kind: 'project',
        name: fields.name.trim(),
        email: fields.email.trim(),
        company: fields.company.trim() || undefined,
        service: fields.service,
        budget: fields.budget || undefined,
        message: fields.message.trim(),
      });
      setState('success');
      setFields({ name: '', email: '', company: '', service: '', budget: '', message: '', website: '' });
      setTouched({});
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please email directly.');
    }
  }

  return (
    <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gradient-line" aria-hidden />
      <AnimatePresence mode="wait">
        {state === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center px-4 text-center"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
              <CheckCircle2 className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-white">Project brief received.</h3>
            <p className="mt-2 max-w-md text-[13px] leading-relaxed text-slate-400">
              Thanks — I will review the scope and reply with next steps, questions and a realistic timeline. For anything
              urgent, email{' '}
              <a href={`mailto:${content.settings.email}`} className="text-electric-300 hover:text-white">
                {content.settings.email}
              </a>
              .
            </p>
            <button type="button" onClick={() => setState('idle')} className="btn-ghost mt-6 !py-2.5 text-[13px]">
              Submit another inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">Start a project inquiry</h3>
                <p className="mt-1 text-[12.5px] text-slate-500">A short brief is enough to begin. No obligation.</p>
              </div>
              <Sparkles className="mt-1 h-4 w-4 shrink-0 text-violet-300" aria-hidden />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="inq-name" className="field-label">Your name</label>
                <input
                  id="inq-name"
                  autoComplete="name"
                  className="field"
                  placeholder="Full name"
                  value={fields.name}
                  onChange={(event) => setFields((prev) => ({ ...prev, name: event.target.value }))}
                  onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                  aria-invalid={Boolean(touched.name && errors.name)}
                />
                {touched.name && errors.name ? <p className="mt-1.5 text-[11px] text-rose-300">{errors.name}</p> : null}
              </div>
              <div>
                <label htmlFor="inq-email" className="field-label">Email</label>
                <input
                  id="inq-email"
                  type="email"
                  autoComplete="email"
                  className="field"
                  placeholder="you@company.com"
                  value={fields.email}
                  onChange={(event) => setFields((prev) => ({ ...prev, email: event.target.value }))}
                  onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                  aria-invalid={Boolean(touched.email && errors.email)}
                />
                {touched.email && errors.email ? <p className="mt-1.5 text-[11px] text-rose-300">{errors.email}</p> : null}
              </div>
              <div>
                <label htmlFor="inq-company" className="field-label">
                  Company <span className="text-slate-600">(optional)</span>
                </label>
                <input
                  id="inq-company"
                  autoComplete="organization"
                  className="field"
                  placeholder="Company or team"
                  value={fields.company}
                  onChange={(event) => setFields((prev) => ({ ...prev, company: event.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="inq-budget" className="field-label">
                  Budget <span className="text-slate-600">(optional)</span>
                </label>
                <select
                  id="inq-budget"
                  className="field"
                  value={fields.budget}
                  onChange={(event) => setFields((prev) => ({ ...prev, budget: event.target.value }))}
                >
                  <option value="">Select a range</option>
                  {budgets.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="inq-service" className="field-label">Service required</label>
                <select
                  id="inq-service"
                  className="field"
                  value={fields.service}
                  onChange={(event) => setFields((prev) => ({ ...prev, service: event.target.value }))}
                  onBlur={() => setTouched((prev) => ({ ...prev, service: true }))}
                  aria-invalid={Boolean(touched.service && errors.service)}
                >
                  <option value="">Select a service</option>
                  {content.services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                  <option value="Something else">Something else</option>
                </select>
                {touched.service && errors.service ? <p className="mt-1.5 text-[11px] text-rose-300">{errors.service}</p> : null}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="inq-message" className="field-label">Project description</label>
                <textarea
                  id="inq-message"
                  rows={5}
                  className="field resize-none"
                  placeholder="What are you building, what does success look like, and when do you need it?"
                  value={fields.message}
                  onChange={(event) => setFields((prev) => ({ ...prev, message: event.target.value }))}
                  onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
                  aria-invalid={Boolean(touched.message && errors.message)}
                />
                {touched.message && errors.message ? <p className="mt-1.5 text-[11px] text-rose-300">{errors.message}</p> : null}
              </div>
            </div>

            <div className="hidden" aria-hidden>
              <label htmlFor="inq-website">Leave empty</label>
              <input
                id="inq-website"
                tabIndex={-1}
                autoComplete="off"
                value={fields.website}
                onChange={(event) => setFields((prev) => ({ ...prev, website: event.target.value }))}
              />
            </div>

            {state === 'error' ? (
              <div role="alert" className="mt-4 flex items-start gap-2 rounded-xl border border-rose-400/20 bg-rose-400/[0.06] px-3.5 py-3 text-[12px] text-rose-200">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                <span>
                  {error}{' '}
                  <a href={`mailto:${content.settings.email}`} className="underline underline-offset-2">
                    Email directly
                  </a>
                  .
                </span>
              </div>
            ) : null}

            <div className="mt-6 flex flex-col-reverse items-start justify-between gap-3 sm:flex-row sm:items-center">
              <p className="text-[11px] text-slate-600">Typical reply within one working day.</p>
              <button type="submit" disabled={state === 'submitting'} className="btn-primary w-full sm:w-auto">
                {state === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
                {state === 'submitting' ? 'Sending brief…' : 'Send project inquiry'}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
