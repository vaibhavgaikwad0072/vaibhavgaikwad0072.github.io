import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { useContent } from '../../store/ContentProvider';
import { isEmail } from '../../lib/utils';

type State = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const { submitInquiry, content } = useContent();
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');
  const [fields, setFields] = useState({ name: '', email: '', message: '', website: '' });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = {
    name: fields.name.trim().length < 2 ? 'Please share your name.' : '',
    email: isEmail(fields.email) ? '' : 'Enter a valid email address.',
    message: fields.message.trim().length < 10 ? 'A little more detail helps — at least 10 characters.' : '',
  };
  const valid = !errors.name && !errors.email && !errors.message;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!valid || state === 'submitting') return;
    if (fields.website) {
      setState('success');
      return;
    }
    setState('submitting');
    setError('');
    try {
      await submitInquiry({
        kind: 'contact',
        name: fields.name.trim(),
        email: fields.email.trim(),
        message: fields.message.trim(),
      });
      setState('success');
      setFields({ name: '', email: '', message: '', website: '' });
      setTouched({});
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please email directly.');
    }
  }

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-500/[0.15] blur-3xl" aria-hidden />
      <AnimatePresence mode="wait">
        {state === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[360px] flex-col items-center justify-center text-center"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
              <CheckCircle2 className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-white">Message received.</h3>
            <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-slate-400">
              Thanks for reaching out. I usually reply within one working day. If it is urgent, email me directly at{' '}
              <a href={`mailto:${content.settings.email}`} className="text-electric-300 hover:text-white">
                {content.settings.email}
              </a>
              .
            </p>
            <button type="button" onClick={() => setState('idle')} className="btn-ghost mt-6 !py-2.5 text-[13px]">
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white">Send a message</h3>
              <p className="mt-1 text-[12.5px] text-slate-500">Roles, collaborations or a quick question — all welcome.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="field-label">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  className="field"
                  placeholder="Your name"
                  value={fields.name}
                  onChange={(event) => setFields((prev) => ({ ...prev, name: event.target.value }))}
                  onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                  aria-invalid={Boolean(touched.name && errors.name)}
                  aria-describedby={touched.name && errors.name ? 'contact-name-error' : undefined}
                />
                {touched.name && errors.name ? (
                  <p id="contact-name-error" className="mt-1.5 text-[11px] text-rose-300">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="contact-email" className="field-label">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="field"
                  placeholder="you@company.com"
                  value={fields.email}
                  onChange={(event) => setFields((prev) => ({ ...prev, email: event.target.value }))}
                  onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                  aria-invalid={Boolean(touched.email && errors.email)}
                  aria-describedby={touched.email && errors.email ? 'contact-email-error' : undefined}
                />
                {touched.email && errors.email ? (
                  <p id="contact-email-error" className="mt-1.5 text-[11px] text-rose-300">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="contact-message" className="field-label">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                className="field resize-none"
                placeholder="A sentence or two about what you are working on…"
                value={fields.message}
                onChange={(event) => setFields((prev) => ({ ...prev, message: event.target.value }))}
                onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
                aria-invalid={Boolean(touched.message && errors.message)}
                aria-describedby={touched.message && errors.message ? 'contact-message-error' : undefined}
              />
              {touched.message && errors.message ? (
                <p id="contact-message-error" className="mt-1.5 text-[11px] text-rose-300">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div className="hidden" aria-hidden>
              <label htmlFor="contact-website">Leave this field empty</label>
              <input
                id="contact-website"
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

            <button type="submit" disabled={state === 'submitting'} className="btn-primary mt-5 w-full sm:w-auto">
              {state === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
              {state === 'submitting' ? 'Sending…' : 'Send message'}
            </button>
            <p className="mt-3 text-[11px] text-slate-600">
              Sent securely. No mailing lists, no automated follow-ups.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
