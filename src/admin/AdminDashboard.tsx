import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Database,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { useContent } from '../store/ContentProvider';
import { ContentPanel, InquiriesPanel, OverviewPanel } from './AdminPanels';
import { ExperiencePanel, ProjectsPanel, ServicesPanel, SettingsPanel, SkillsPanel } from './AdminEditors';
import { Notice } from './shared';
import { cn } from '../lib/utils';

export type AdminTab =
  | 'overview'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'services'
  | 'inquiries'
  | 'settings'
  | 'content';

const tabs: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'services', label: 'Services', icon: Sparkles },
  { id: 'inquiries', label: 'Inquiries', icon: Inbox },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'content', label: 'Content', icon: Database },
];

function Panel({ tab, onNavigate }: { tab: AdminTab; onNavigate: (tab: AdminTab) => void }) {
  switch (tab) {
    case 'overview':
      return <OverviewPanel onNavigate={onNavigate} />;
    case 'projects':
      return <ProjectsPanel />;
    case 'skills':
      return <SkillsPanel />;
    case 'experience':
      return <ExperiencePanel />;
    case 'services':
      return <ServicesPanel />;
    case 'inquiries':
      return <InquiriesPanel />;
    case 'settings':
      return <SettingsPanel />;
    case 'content':
      return <ContentPanel />;
    default:
      return null;
  }
}

export function AdminDashboard() {
  const { logout, inquiries, storageError } = useContent();
  const [tab, setTab] = useState<AdminTab>('overview');
  const newCount = inquiries.filter((inquiry) => inquiry.status === 'new').length;

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-[1500px]">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-white/[0.06] bg-ink-950/70 p-5 lg:flex">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-electric-500/20 font-display text-sm font-bold text-white">
              VG<span className="text-violet-400">.</span>
            </span>
            <div>
              <p className="text-[12.5px] font-medium text-white">Portfolio admin</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">Local demo</p>
            </div>
          </div>

          <nav className="mt-8 flex-1 space-y-0.5" aria-label="Admin sections">
            {tabs.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[12.5px] transition',
                    tab === item.id
                      ? 'border border-white/10 bg-white/[0.06] text-white'
                      : 'border border-transparent text-slate-400 hover:bg-white/[0.03] hover:text-white',
                  )}
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Icon className="h-4 w-4" aria-hidden />
                    {item.label}
                  </span>
                  {item.id === 'inquiries' && newCount ? (
                    <span className="rounded-full bg-violet-500/20 px-1.5 py-0.5 font-mono text-[9px] text-violet-200">{newCount}</span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <div className="space-y-1.5 border-t border-white/[0.06] pt-4">
            <Link to="/" className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[12px] text-slate-400 transition hover:bg-white/[0.03] hover:text-white">
              View public site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[12px] text-slate-400 transition hover:bg-rose-400/[0.06] hover:text-rose-200"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden />
              Sign out
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-ink-950/80 backdrop-blur-xl lg:hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="font-display text-sm font-semibold text-white">
                VG<span className="text-violet-400">.</span> admin
              </span>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <Link to="/" className="hover:text-white">Site</Link>
                <button type="button" onClick={logout} className="hover:text-rose-200">Sign out</button>
              </div>
            </div>
            <div className="flex gap-1 overflow-x-auto px-3 pb-2">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={cn(
                    'whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[11px] transition',
                    tab === item.id ? 'bg-white/[0.08] text-white' : 'text-slate-400',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </header>

          <main className="p-4 sm:p-6 lg:p-8">
            {storageError ? (
              <div className="mb-4">
                <Notice tone="error">{storageError}</Notice>
              </div>
            ) : null}
            <Panel tab={tab} onNavigate={setTab} />
          </main>
        </div>
      </div>
    </div>
  );
}
