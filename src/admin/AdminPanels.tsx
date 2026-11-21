import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Archive,
  ArrowUpRight,
  CheckCheck,
  Download,
  FolderKanban,
  Inbox,
  Mail,
  RotateCcw,
  Sparkles,
  Trash2,
  Upload,
  Wrench,
} from 'lucide-react';
import { useContent } from '../store/ContentProvider';
import { formatDate } from '../lib/utils';
import { Notice, PanelHeader } from './shared';
import type { AdminTab } from './AdminDashboard';

export function OverviewPanel({ onNavigate }: { onNavigate: (tab: AdminTab) => void }) {
  const { content, inquiries } = useContent();
  const newInquiries = inquiries.filter((inquiry) => inquiry.status === 'new');
  const latest = inquiries.slice(0, 3);
  const supabaseConfigured = Boolean(import.meta.env.VITE_SUPABASE_URL);

  const stats = [
    { label: 'Projects', value: content.projects.length, tab: 'projects' as AdminTab, icon: FolderKanban },
    { label: 'Services', value: content.services.length, tab: 'services' as AdminTab, icon: Sparkles },
    {
      label: 'Skill groups',
      value: content.skillGroups.length,
      tab: 'skills' as AdminTab,
      icon: Wrench,
    },
    { label: 'New inquiries', value: newInquiries.length, tab: 'inquiries' as AdminTab, icon: Inbox },
  ];

  return (
    <div>
      <PanelHeader
        title="Overview"
        description="Everything on the public site is editable from here. Changes save to this browser immediately."
        actions={
          <Link to="/" className="btn-ghost !px-4 !py-2 text-[12px]">
            View live site
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        }
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <button
              key={stat.label}
              type="button"
              onClick={() => onNavigate(stat.tab)}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-left transition hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-violet-200">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-600 transition group-hover:text-violet-300" aria-hidden />
              </div>
              <p className="mt-4 font-display text-2xl font-semibold text-white">{String(stat.value).padStart(2, '0')}</p>
              <p className="mt-0.5 text-[11.5px] text-slate-500">{stat.label}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[13.5px] font-medium text-white">Recent inquiries</h2>
            <button type="button" onClick={() => onNavigate('inquiries')} className="text-[11px] text-electric-300 hover:text-white">
              View all
            </button>
          </div>
          {latest.length ? (
            <ul className="mt-4 divide-y divide-white/[0.06]">
              {latest.map((inquiry) => (
                <li key={inquiry.id} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-medium text-slate-200">
                      {inquiry.name}
                      {inquiry.company ? <span className="font-normal text-slate-500"> · {inquiry.company}</span> : null}
                    </p>
                    <p className="mt-0.5 truncate text-[11.5px] text-slate-500">{inquiry.message}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[9px] uppercase tracking-wider text-slate-600">
                    {inquiry.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-[12px] text-slate-500">No inquiries yet. Submit the contact or project form on the site to test this panel.</p>
          )}
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <h2 className="text-[13.5px] font-medium text-white">Storage mode</h2>
          <p className="mt-2 text-[11.5px] leading-relaxed text-slate-500">
            {supabaseConfigured
              ? 'Supabase environment variables detected. Use the SQL schema to mirror these tables and switch the data layer for production.'
              : 'Local-first demo: content and inquiries persist in this browser (localStorage). Nothing is sent to a server.'}
          </p>
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/[0.06] bg-ink-950/50 px-3 py-2">
            <span className={`h-1.5 w-1.5 rounded-full ${supabaseConfigured ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
              {supabaseConfigured ? 'Supabase env set' : 'Browser storage'}
            </span>
          </div>
          <button type="button" onClick={() => onNavigate('content')} className="mt-3 text-[11px] text-electric-300 hover:text-white">
            Export or import content →
          </button>
        </div>
      </div>

      <div className="mt-4">
        <Notice>
          Last updated {formatDate(content.updatedAt)}. The public pages read this same content store, so admin edits
          appear instantly on a refresh.
        </Notice>
      </div>
    </div>
  );
}

type Filter = 'all' | 'new' | 'read' | 'archived';

export function InquiriesPanel() {
  const { inquiries, setInquiryStatus, deleteInquiry } = useContent();
  const [filter, setFilter] = useState<Filter>('all');

  const visible = filter === 'all' ? inquiries : inquiries.filter((inquiry) => inquiry.status === filter);

  return (
    <div>
      <PanelHeader
        title="Inquiries"
        description="Messages submitted through the contact form and the project inquiry form. Stored locally in this demo; Supabase table included."
      />

      <div className="mt-5 flex flex-wrap gap-1.5">
        {(['all', 'new', 'read', 'archived'] as Filter[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-lg border px-3 py-1.5 text-[11.5px] capitalize transition ${
              filter === item
                ? 'border-violet-400/30 bg-violet-400/10 text-white'
                : 'border-white/[0.07] text-slate-400 hover:text-white'
            }`}
          >
            {item}
            {item !== 'all' ? (
              <span className="ml-1.5 font-mono text-[9px] text-slate-500">
                {inquiries.filter((inquiry) => inquiry.status === item).length}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {visible.map((inquiry) => (
          <article key={inquiry.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[14px] font-medium text-white">{inquiry.name}</h2>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-slate-500">
                    {inquiry.kind}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
                      inquiry.status === 'new'
                        ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300'
                        : inquiry.status === 'read'
                          ? 'border-electric-400/25 bg-electric-400/10 text-electric-300'
                          : 'border-white/10 text-slate-500'
                    }`}
                  >
                    {inquiry.status}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[10.5px] text-slate-500">
                  {formatDate(inquiry.createdAt)}
                  {inquiry.company ? ` · ${inquiry.company}` : ''}
                  {inquiry.service ? ` · ${inquiry.service}` : ''}
                  {inquiry.budget ? ` · ${inquiry.budget}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <a
                  href={`mailto:${inquiry.email}?subject=${encodeURIComponent('Re: your portfolio inquiry')}`}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:text-white"
                  aria-label={`Reply to ${inquiry.name}`}
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                </a>
                {inquiry.status !== 'read' ? (
                  <button
                    type="button"
                    onClick={() => setInquiryStatus(inquiry.id, 'read')}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:text-white"
                    aria-label="Mark as read"
                  >
                    <CheckCheck className="h-3.5 w-3.5" aria-hidden />
                  </button>
                ) : null}
                {inquiry.status !== 'archived' ? (
                  <button
                    type="button"
                    onClick={() => setInquiryStatus(inquiry.id, 'archived')}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:text-white"
                    aria-label="Archive inquiry"
                  >
                    <Archive className="h-3.5 w-3.5" aria-hidden />
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Delete the inquiry from ${inquiry.name}?`)) deleteInquiry(inquiry.id);
                  }}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-500 transition hover:border-rose-400/30 hover:text-rose-300"
                  aria-label="Delete inquiry"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden />
                </button>
              </div>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-[12.5px] leading-relaxed text-slate-300">{inquiry.message}</p>
            <p className="mt-2 font-mono text-[10.5px] text-slate-500">{inquiry.email}</p>
          </article>
        ))}
        {!visible.length ? (
          <div className="rounded-2xl border border-dashed border-white/10 py-14 text-center">
            <Inbox className="mx-auto h-6 w-6 text-slate-600" aria-hidden />
            <p className="mt-3 text-[12.5px] text-slate-500">No {filter === 'all' ? '' : filter} inquiries.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ContentPanel() {
  const { content, exportContent, importContent, resetContent } = useContent();
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ tone: 'success' | 'error'; text: string } | null>(null);

  async function handleFile(file?: File) {
    if (!file) return;
    const text = await file.text();
    const result = importContent(text);
    setMessage({ tone: result.ok ? 'success' : 'error', text: result.message });
  }

  return (
    <div>
      <PanelHeader
        title="Content & data"
        description="Move portfolio content between browsers, keep a backup, or reset the demo to its original state."
      />

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <h2 className="text-[13.5px] font-medium text-white">Export</h2>
          <p className="mt-2 text-[11.5px] leading-relaxed text-slate-500">
            Download the full content model as JSON: settings, projects, skills, experience and services. Inquiries are
            stored separately.
          </p>
          <button type="button" onClick={exportContent} className="btn-primary mt-4 !px-4 !py-2 text-[12px]">
            <Download className="h-3.5 w-3.5" aria-hidden />
            Export JSON
          </button>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <h2 className="text-[13.5px] font-medium text-white">Import</h2>
          <p className="mt-2 text-[11.5px] leading-relaxed text-slate-500">
            Restore a previous export. The file must be valid JSON from this dashboard.
          </p>
          <button type="button" onClick={() => fileRef.current?.click()} className="btn-ghost mt-4 !px-4 !py-2 text-[12px]">
            <Upload className="h-3.5 w-3.5" aria-hidden />
            Choose JSON file
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(event) => {
              void handleFile(event.target.files?.[0]);
              event.target.value = '';
            }}
          />
        </div>
      </div>

      {message ? (
        <div className="mt-4">
          <Notice tone={message.tone}>{message.text}</Notice>
        </div>
      ) : null}

      <div className="mt-4 rounded-2xl border border-rose-400/[0.15] bg-rose-400/[0.03] p-5">
        <h2 className="text-[13.5px] font-medium text-white">Reset demo content</h2>
        <p className="mt-2 text-[11.5px] leading-relaxed text-slate-500">
          Restores the original projects, skills, experience, services and settings. Uploaded images and edits are
          removed from this browser.
        </p>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Reset all portfolio content to its original state? This cannot be undone.')) resetContent();
          }}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-rose-400/25 px-4 py-2 text-[12px] text-rose-200 transition hover:bg-rose-400/10"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          Reset content
        </button>
      </div>

      <div className="mt-4">
        <Notice>
          Content version {content.version} · last saved {formatDate(content.updatedAt)}.
        </Notice>
      </div>
    </div>
  );
}
