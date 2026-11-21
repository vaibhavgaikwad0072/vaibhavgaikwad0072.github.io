import { useRef, useState, type ReactNode } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { compressImage } from '../lib/utils';

export function Field({
  label,
  hint,
  htmlFor,
  children,
  className,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="field-label">
        {label}
      </label>
      {children}
      {hint ? <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">{hint}</p> : null}
    </div>
  );
}

export function PanelHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold text-white sm:text-2xl">{title}</h1>
        <p className="mt-1.5 max-w-2xl text-[12.5px] leading-relaxed text-slate-500">{description}</p>
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function ImageUploader({
  value,
  onChange,
  label = 'Image',
  hint = 'JPG or PNG, resized automatically.',
  aspect = 'aspect-[4/3]',
}: {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  hint?: string;
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(file?: File) {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const dataUrl = await compressImage(file, 1400, 0.8);
      onChange(dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not process this image.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <span className="field-label">{label}</span>
      <div className="flex flex-wrap items-start gap-3">
        {value ? (
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-ink-900">
            <img src={value} alt="" className={`${aspect} w-40 object-cover`} />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-ink-950/80 text-slate-300 transition hover:text-white"
              aria-label="Remove image"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : null}
        <div className="flex-1">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl border border-dashed border-white/[0.15] bg-white/[0.02] px-4 py-3 text-[12px] text-slate-300 transition hover:border-violet-400/40 hover:text-white disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <ImagePlus className="h-4 w-4" aria-hidden />}
            {value ? 'Replace image' : 'Upload image'}
          </button>
          <p className="mt-2 text-[11px] text-slate-500">{hint}</p>
          {error ? <p className="mt-1 text-[11px] text-rose-300">{error}</p> : null}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(event) => {
          void handleFile(event.target.files?.[0]);
          event.target.value = '';
        }}
      />
    </div>
  );
}

export function Notice({ tone = 'info', children }: { tone?: 'info' | 'success' | 'error'; children: ReactNode }) {
  const styles = {
    info: 'border-electric-400/20 bg-electric-400/[0.06] text-electric-100/80',
    success: 'border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-100/80',
    error: 'border-rose-400/20 bg-rose-400/[0.06] text-rose-100/80',
  }[tone];

  return <div className={`rounded-xl border px-3.5 py-3 text-[12px] leading-relaxed ${styles}`}>{children}</div>;
}
