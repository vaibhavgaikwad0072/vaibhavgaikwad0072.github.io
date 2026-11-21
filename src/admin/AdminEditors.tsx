import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { useContent } from '../store/ContentProvider';
import { arrayToLines, linesToArray, slugify, splitCsv, uid } from '../lib/utils';
import { Field, ImageUploader, Notice, PanelHeader } from './shared';
import type {
  Accent,
  ExperienceItem,
  Project,
  ProjectOutcome,
  ServiceIcon,
  ServiceItem,
  SiteSettings,
  SkillGroup,
} from '../data/types';

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const accents: Accent[] = ['violet', 'electric', 'cyan', 'emerald', 'amber', 'rose'];

export function ProjectsPanel() {
  const { content, deleteProject, reorderProject } = useContent();
  const [editing, setEditing] = useState<Project | null>(null);

  if (editing) {
    return <ProjectEditor initial={editing} onClose={() => setEditing(null)} />;
  }

  return (
    <div>
      <PanelHeader
        title="Projects"
        description="The order here is the order shown on the homepage. Each project gets its own case-study page."
        actions={
          <button
            type="button"
            onClick={() =>
              setEditing({
                id: uid('project'),
                slug: '',
                title: 'New project',
                tagline: '',
                summary: '',
                category: 'Generative AI',
                year: String(new Date().getFullYear()),
                status: 'In development',
                accent: 'violet',
                tech: [],
                links: {},
                problem: '',
                solution: '',
                architecture: [],
                features: [],
                outcomes: [],
                screenshots: [],
              })
            }
            className="btn-primary !px-4 !py-2 text-[12px]"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
            New project
          </button>
        }
      />

      <div className="mt-5 space-y-2.5">
        {content.projects.map((project, index) => (
          <div
            key={project.id}
            className="flex flex-col gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-slate-600">{String(index + 1).padStart(2, '0')}</span>
                <h2 className="truncate text-[13.5px] font-medium text-white">{project.title}</h2>
                <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-wider text-slate-500">
                  {project.status}
                </span>
              </div>
              <p className="mt-1 truncate font-mono text-[10.5px] text-slate-500">/projects/{project.slug}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => reorderProject(project.id, -1)}
                disabled={index === 0}
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:text-white disabled:opacity-30"
                aria-label="Move project up"
              >
                <ArrowUp className="h-3.5 w-3.5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => reorderProject(project.id, 1)}
                disabled={index === content.projects.length - 1}
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:text-white disabled:opacity-30"
                aria-label="Move project down"
              >
                <ArrowDown className="h-3.5 w-3.5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => setEditing(clone(project))}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/10 px-2.5 text-[11px] text-slate-300 transition hover:text-white"
              >
                <Pencil className="h-3 w-3" aria-hidden />
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Delete “${project.title}”?`)) deleteProject(project.id);
                }}
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-500 transition hover:border-rose-400/30 hover:text-rose-300"
                aria-label="Delete project"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          </div>
        ))}
        {!content.projects.length ? (
          <p className="rounded-xl border border-dashed border-white/10 py-10 text-center text-[12px] text-slate-500">
            No projects. Add one to populate the homepage.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function ProjectEditor({ initial, onClose }: { initial: Project; onClose: () => void }) {
  const { content, saveProject } = useContent();
  const [draft, setDraft] = useState<Project>(() => clone(initial));
  const [architecture, setArchitecture] = useState(arrayToLines(initial.architecture));
  const [features, setFeatures] = useState(arrayToLines(initial.features));
  const [outcomes, setOutcomes] = useState(
    initial.outcomes.map((item) => [item.value, item.label, item.note].filter(Boolean).join(' | ')).join('\n'),
  );
  const [tech, setTech] = useState(initial.tech.join(', '));
  const [error, setError] = useState('');

  function update<K extends keyof Project>(key: K, value: Project[K]) {
    setDraft((previous) => ({ ...previous, [key]: value }));
  }

  function handleSave() {
    if (!draft.title.trim()) {
      setError('A project title is required.');
      return;
    }
    const slug = slugify(draft.slug || draft.title);
    if (!slug) {
      setError('The slug must contain letters or numbers.');
      return;
    }
    if (content.projects.some((project) => project.slug === slug && project.id !== draft.id)) {
      setError('Another project already uses that slug.');
      return;
    }
    const parsedOutcomes: ProjectOutcome[] = [];
    linesToArray(outcomes).forEach((line) => {
      const [value, label, note] = line.split('|').map((part) => part.trim());
      if (value && label) parsedOutcomes.push({ value, label, note: note || undefined });
    });

    saveProject({
      ...draft,
      slug,
      title: draft.title.trim(),
      tagline: draft.tagline.trim(),
      summary: draft.summary.trim(),
      tech: splitCsv(tech),
      architecture: linesToArray(architecture),
      features: linesToArray(features),
      outcomes: parsedOutcomes,
    });
    onClose();
  }

  return (
    <div>
      <PanelHeader
        title={initial.slug ? `Edit: ${initial.title}` : 'New project'}
        description="Fields map directly to the public case-study page. Screenshots are optional and appear when added."
        actions={
          <>
            <button type="button" onClick={onClose} className="btn-ghost !px-4 !py-2 text-[12px]">
              <X className="h-3.5 w-3.5" aria-hidden />
              Cancel
            </button>
            <button type="button" onClick={handleSave} className="btn-primary !px-4 !py-2 text-[12px]">
              <Save className="h-3.5 w-3.5" aria-hidden />
              Save project
            </button>
          </>
        }
      />

      {error ? (
        <div className="mt-4">
          <Notice tone="error">{error}</Notice>
        </div>
      ) : null}

      <div className="mt-6 space-y-6">
        <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <h2 className="text-[13px] font-medium text-white">Basics</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Title">
              <input className="field" value={draft.title} onChange={(event) => update('title', event.target.value)} />
            </Field>
            <Field label="Slug" hint={`Public URL: /projects/${slugify(draft.slug || draft.title) || '…'}`}>
              <input
                className="field font-mono text-[12px]"
                value={draft.slug}
                placeholder="auto-generated-from-title"
                onChange={(event) => update('slug', event.target.value)}
              />
            </Field>
            <Field label="Tagline" className="sm:col-span-2">
              <input className="field" value={draft.tagline} onChange={(event) => update('tagline', event.target.value)} />
            </Field>
            <Field label="Card summary" className="sm:col-span-2">
              <textarea
                rows={3}
                className="field resize-none"
                value={draft.summary}
                onChange={(event) => update('summary', event.target.value)}
              />
            </Field>
            <Field label="Category">
              <input className="field" value={draft.category} onChange={(event) => update('category', event.target.value)} />
            </Field>
            <Field label="Year">
              <input className="field" value={draft.year} onChange={(event) => update('year', event.target.value)} />
            </Field>
            <Field label="Status">
              <select
                className="field"
                value={draft.status}
                onChange={(event) => update('status', event.target.value as Project['status'])}
              >
                <option>Shipped</option>
                <option>In development</option>
                <option>Research</option>
              </select>
            </Field>
            <Field label="Accent colour">
              <select
                className="field"
                value={draft.accent}
                onChange={(event) => update('accent', event.target.value as Accent)}
              >
                {accents.map((accent) => (
                  <option key={accent} value={accent}>
                    {accent}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Technologies" hint="Comma separated." className="sm:col-span-2">
              <input className="field" value={tech} onChange={(event) => setTech(event.target.value)} />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <h2 className="text-[13px] font-medium text-white">Links</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="GitHub URL" hint="Leave empty to show a “not public” state instead of a broken button.">
              <input
                className="field"
                value={draft.links.github ?? ''}
                placeholder="https://github.com/…"
                onChange={(event) => update('links', { ...draft.links, github: event.target.value.trim() || undefined })}
              />
            </Field>
            <Field label="Live demo URL" hint="Optional. Only link to a demo that actually works.">
              <input
                className="field"
                value={draft.links.demo ?? ''}
                placeholder="https://…"
                onChange={(event) => update('links', { ...draft.links, demo: event.target.value.trim() || undefined })}
              />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <h2 className="text-[13px] font-medium text-white">Case study</h2>
          <div className="mt-4 grid gap-4">
            <Field label="Problem">
              <textarea rows={3} className="field resize-none" value={draft.problem} onChange={(event) => update('problem', event.target.value)} />
            </Field>
            <Field label="Solution">
              <textarea rows={3} className="field resize-none" value={draft.solution} onChange={(event) => update('solution', event.target.value)} />
            </Field>
            <Field label="Architecture" hint="One step per line, shown as a numbered list.">
              <textarea rows={5} className="field resize-none font-mono text-[12px]" value={architecture} onChange={(event) => setArchitecture(event.target.value)} />
            </Field>
            <Field label="Features" hint="One feature per line.">
              <textarea rows={5} className="field resize-none font-mono text-[12px]" value={features} onChange={(event) => setFeatures(event.target.value)} />
            </Field>
            <Field label="Measured outcomes" hint="One per line: value | label | optional note. Only include verified numbers.">
              <textarea rows={3} className="field resize-none font-mono text-[12px]" value={outcomes} onChange={(event) => setOutcomes(event.target.value)} />
            </Field>
            <Field label="Disclaimer" hint="Optional context about limitations or project status.">
              <textarea rows={2} className="field resize-none" value={draft.disclaimer ?? ''} onChange={(event) => update('disclaimer', event.target.value || undefined)} />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <h2 className="text-[13px] font-medium text-white">Screenshots</h2>
          <p className="mt-1.5 text-[11.5px] text-slate-500">Uploads are resized and stored in this browser for the demo.</p>
          <div className="mt-4 space-y-3">
            {draft.screenshots.map((shot, index) => (
              <div key={`${shot.caption}-${index}`} className="flex flex-col gap-3 rounded-xl border border-white/[0.07] bg-ink-950/40 p-3 sm:flex-row sm:items-center">
                <img src={shot.src} alt="" className="h-16 w-24 rounded-lg object-cover" />
                <input
                  className="field flex-1"
                  value={shot.caption}
                  placeholder="Caption"
                  onChange={(event) => {
                    const screenshots = [...draft.screenshots];
                    screenshots[index] = { ...shot, caption: event.target.value };
                    update('screenshots', screenshots);
                  }}
                />
                <button
                  type="button"
                  onClick={() => update('screenshots', draft.screenshots.filter((_, itemIndex) => itemIndex !== index))}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 text-slate-500 transition hover:text-rose-300"
                  aria-label="Remove screenshot"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden />
                </button>
              </div>
            ))}
            <ImageUploader
              label="Add a screenshot"
              hint="PNG or JPG. Added to the gallery above."
              aspect="aspect-video"
              onChange={(src) => {
                if (!src) return;
                update('screenshots', [...draft.screenshots, { src, caption: `Screenshot ${draft.screenshots.length + 1}` }]);
              }}
            />
          </div>
        </section>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button type="button" onClick={onClose} className="btn-ghost !px-4 !py-2 text-[12px]">
          Cancel
        </button>
        <button type="button" onClick={handleSave} className="btn-primary !px-4 !py-2 text-[12px]">
          <Save className="h-3.5 w-3.5" aria-hidden />
          Save project
        </button>
      </div>
    </div>
  );
}

export function SkillsPanel() {
  const { content, saveSkillGroups } = useContent();
  const [draft, setDraft] = useState<SkillGroup[]>(() => clone(content.skillGroups));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(clone(content.skillGroups));
  }, [content.skillGroups]);

  function updateGroup(index: number, patch: Partial<SkillGroup>) {
    setSaved(false);
    setDraft((previous) => previous.map((group, groupIndex) => (groupIndex === index ? { ...group, ...patch } : group)));
  }

  return (
    <div>
      <PanelHeader
        title="Skills"
        description="Categories and their items. Items support an optional note after a pipe, for example: AWS | foundational."
        actions={
          <>
            <button
              type="button"
              onClick={() => {
                setDraft((previous) => [...previous, { id: uid('skill'), title: 'New category', blurb: '', items: [] }]);
                setSaved(false);
              }}
              className="btn-ghost !px-4 !py-2 text-[12px]"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Add category
            </button>
            <button
              type="button"
              onClick={() => {
                saveSkillGroups(draft);
                setSaved(true);
              }}
              className="btn-primary !px-4 !py-2 text-[12px]"
            >
              <Save className="h-3.5 w-3.5" aria-hidden />
              Save skills
            </button>
          </>
        }
      />
      {saved ? (
        <div className="mt-4">
          <Notice tone="success">Skills saved.</Notice>
        </div>
      ) : null}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {draft.map((group, index) => (
          <div key={group.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-3">
                <Field label="Title">
                  <input className="field" value={group.title} onChange={(event) => updateGroup(index, { title: event.target.value })} />
                </Field>
                <Field label="Blurb">
                  <input className="field" value={group.blurb} onChange={(event) => updateGroup(index, { blurb: event.target.value })} />
                </Field>
              </div>
              <button
                type="button"
                onClick={() => setDraft((previous) => previous.filter((_, groupIndex) => groupIndex !== index))}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 text-slate-500 transition hover:text-rose-300"
                aria-label="Delete category"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
            <Field label="Items" hint="One per line: Name | optional note" className="mt-3">
              <textarea
                rows={6}
                className="field resize-none font-mono text-[11.5px]"
                value={group.items.map((item) => (item.note ? `${item.name} | ${item.note}` : item.name)).join('\n')}
                onChange={(event) =>
                  updateGroup(index, {
                    items: linesToArray(event.target.value).map((line) => {
                      const [name, note] = line.split('|').map((part) => part.trim());
                      return { name, note: note || undefined };
                    }),
                  })
                }
              />
            </Field>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExperiencePanel() {
  const { content, saveExperience } = useContent();
  const [draft, setDraft] = useState<ExperienceItem[]>(() => clone(content.experience));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(clone(content.experience));
  }, [content.experience]);

  function updateItem(index: number, patch: Partial<ExperienceItem>) {
    setSaved(false);
    setDraft((previous) => previous.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }

  return (
    <div>
      <PanelHeader
        title="Experience"
        description="Internships and roles shown in the Experience section. Keep claims accurate and verifiable."
        actions={
          <>
            <button
              type="button"
              onClick={() => {
                setDraft((previous) => [
                  ...previous,
                  {
                    id: uid('exp'),
                    role: 'New role',
                    org: '',
                    period: '',
                    location: '',
                    mode: 'Internship',
                    summary: '',
                    bullets: [],
                    tech: [],
                  },
                ]);
                setSaved(false);
              }}
              className="btn-ghost !px-4 !py-2 text-[12px]"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Add role
            </button>
            <button
              type="button"
              onClick={() => {
                saveExperience(draft);
                setSaved(true);
              }}
              className="btn-primary !px-4 !py-2 text-[12px]"
            >
              <Save className="h-3.5 w-3.5" aria-hidden />
              Save experience
            </button>
          </>
        }
      />
      {saved ? (
        <div className="mt-4">
          <Notice tone="success">Experience saved.</Notice>
        </div>
      ) : null}

      <div className="mt-5 space-y-4">
        {draft.map((item, index) => (
          <div key={item.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[13px] font-medium text-white">{item.role || 'Untitled role'}</h2>
              <button
                type="button"
                onClick={() => setDraft((previous) => previous.filter((_, itemIndex) => itemIndex !== index))}
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-500 transition hover:text-rose-300"
                aria-label="Delete role"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Role">
                <input className="field" value={item.role} onChange={(event) => updateItem(index, { role: event.target.value })} />
              </Field>
              <Field label="Organisation">
                <input className="field" value={item.org} onChange={(event) => updateItem(index, { org: event.target.value })} />
              </Field>
              <Field label="Period">
                <input className="field" value={item.period} onChange={(event) => updateItem(index, { period: event.target.value })} />
              </Field>
              <Field label="Location">
                <input className="field" value={item.location} onChange={(event) => updateItem(index, { location: event.target.value })} />
              </Field>
              <Field label="Mode">
                <input className="field" value={item.mode} onChange={(event) => updateItem(index, { mode: event.target.value })} />
              </Field>
              <Field label="Technologies" hint="Comma separated.">
                <input
                  className="field"
                  value={item.tech.join(', ')}
                  onChange={(event) => updateItem(index, { tech: splitCsv(event.target.value) })}
                />
              </Field>
              <Field label="Summary" className="sm:col-span-2">
                <textarea rows={2} className="field resize-none" value={item.summary} onChange={(event) => updateItem(index, { summary: event.target.value })} />
              </Field>
              <Field label="Highlights" hint="One bullet per line." className="sm:col-span-2">
                <textarea
                  rows={5}
                  className="field resize-none font-mono text-[11.5px]"
                  value={item.bullets.join('\n')}
                  onChange={(event) => updateItem(index, { bullets: linesToArray(event.target.value) })}
                />
              </Field>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const serviceIcons: ServiceIcon[] = ['chatbot', 'rag', 'llm', 'automation', 'ml', 'dashboard', 'backend', 'database'];

export function ServicesPanel() {
  const { content, saveServices } = useContent();
  const [draft, setDraft] = useState<ServiceItem[]>(() => clone(content.services));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(clone(content.services));
  }, [content.services]);

  function updateItem(index: number, patch: Partial<ServiceItem>) {
    setSaved(false);
    setDraft((previous) => previous.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }

  return (
    <div>
      <PanelHeader
        title="Freelance services"
        description="Service cards on the homepage and the options shown in the project inquiry form."
        actions={
          <>
            <button
              type="button"
              onClick={() => {
                setDraft((previous) => [
                  ...previous,
                  { id: uid('service'), title: 'New service', description: '', tech: [], icon: 'chatbot' },
                ]);
                setSaved(false);
              }}
              className="btn-ghost !px-4 !py-2 text-[12px]"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Add service
            </button>
            <button
              type="button"
              onClick={() => {
                saveServices(draft);
                setSaved(true);
              }}
              className="btn-primary !px-4 !py-2 text-[12px]"
            >
              <Save className="h-3.5 w-3.5" aria-hidden />
              Save services
            </button>
          </>
        }
      />
      {saved ? (
        <div className="mt-4">
          <Notice tone="success">Services saved.</Notice>
        </div>
      ) : null}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {draft.map((item, index) => (
          <div key={item.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[13px] font-medium text-white">{item.title || 'Untitled service'}</h2>
              <button
                type="button"
                onClick={() => setDraft((previous) => previous.filter((_, itemIndex) => itemIndex !== index))}
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-500 transition hover:text-rose-300"
                aria-label="Delete service"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Title" className="sm:col-span-2">
                <input className="field" value={item.title} onChange={(event) => updateItem(index, { title: event.target.value })} />
              </Field>
              <Field label="Icon">
                <select
                  className="field"
                  value={item.icon}
                  onChange={(event) => updateItem(index, { icon: event.target.value as ServiceIcon })}
                >
                  {serviceIcons.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Technologies" hint="Comma separated.">
                <input
                  className="field"
                  value={item.tech.join(', ')}
                  onChange={(event) => updateItem(index, { tech: splitCsv(event.target.value) })}
                />
              </Field>
              <Field label="Description" className="sm:col-span-2">
                <textarea rows={3} className="field resize-none" value={item.description} onChange={(event) => updateItem(index, { description: event.target.value })} />
              </Field>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SettingsPanel() {
  const { content, saveSettings } = useContent();
  const [draft, setDraft] = useState<SiteSettings>(() => clone(content.settings));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(clone(content.settings));
  }, [content.settings]);

  function update<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSaved(false);
    setDraft((previous) => ({ ...previous, [key]: value }));
  }

  const degree = draft.education[0] ?? {
    institution: '',
    qualification: '',
    period: '',
    detail: '',
  };

  function updateDegree(patch: Partial<typeof degree>) {
    update('education', [{ ...degree, ...patch }]);
  }

  return (
    <div>
      <PanelHeader
        title="Site settings"
        description="Identity, hero copy, contact links and photo. These values drive the whole site, including the resume link."
        actions={
          <button
            type="button"
            onClick={() => {
              saveSettings(draft);
              setSaved(true);
            }}
            className="btn-primary !px-4 !py-2 text-[12px]"
          >
            <Save className="h-3.5 w-3.5" aria-hidden />
            Save settings
          </button>
        }
      />
      {saved ? (
        <div className="mt-4">
          <Notice tone="success">Settings saved. The public site updates on refresh.</Notice>
        </div>
      ) : null}

      <div className="mt-5 space-y-4">
        <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <h2 className="text-[13px] font-medium text-white">Identity</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <input className="field" value={draft.name} onChange={(event) => update('name', event.target.value)} />
            </Field>
            <Field label="Initials">
              <input className="field" value={draft.shortName} onChange={(event) => update('shortName', event.target.value)} />
            </Field>
            <Field label="Availability">
              <input className="field" value={draft.availability} onChange={(event) => update('availability', event.target.value)} />
            </Field>
            <Field label="Location">
              <input className="field" value={draft.location} onChange={(event) => update('location', event.target.value)} />
            </Field>
            <div className="sm:col-span-2">
              <ImageUploader
                label="Profile photo"
                value={draft.photoUrl}
                hint="Portrait orientation works best. Replaces the hero image only; do not use a synthetic face."
                aspect="aspect-[4/5]"
                onChange={(value) => update('photoUrl', value || '/assets/vaibhav.png')}
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <h2 className="text-[13px] font-medium text-white">Hero</h2>
          <div className="mt-4 grid gap-4">
            <Field label="Intro line">
              <input className="field" value={draft.heroIntro} onChange={(event) => update('heroIntro', event.target.value)} />
            </Field>
            <Field label="Roles" hint="Comma separated. Used by the typing animation.">
              <input className="field" value={draft.roles.join(', ')} onChange={(event) => update('roles', splitCsv(event.target.value))} />
            </Field>
            <Field label="Headline">
              <input className="field" value={draft.heroHeading} onChange={(event) => update('heroHeading', event.target.value)} />
            </Field>
            <Field label="Hero description">
              <textarea rows={3} className="field resize-none" value={draft.heroDescription} onChange={(event) => update('heroDescription', event.target.value)} />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <h2 className="text-[13px] font-medium text-white">About</h2>
          <div className="mt-4 grid gap-4">
            <Field label="Primary paragraph">
              <textarea rows={4} className="field resize-none" value={draft.aboutParagraph} onChange={(event) => update('aboutParagraph', event.target.value)} />
            </Field>
            <Field label="Secondary paragraph">
              <textarea rows={3} className="field resize-none" value={draft.aboutSecondary} onChange={(event) => update('aboutSecondary', event.target.value)} />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <h2 className="text-[13px] font-medium text-white">Education & certifications</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Institution" className="sm:col-span-2">
              <input className="field" value={degree.institution} onChange={(event) => updateDegree({ institution: event.target.value })} />
            </Field>
            <Field label="Qualification">
              <input className="field" value={degree.qualification} onChange={(event) => updateDegree({ qualification: event.target.value })} />
            </Field>
            <Field label="Period">
              <input className="field" value={degree.period} onChange={(event) => updateDegree({ period: event.target.value })} />
            </Field>
            <Field label="Detail (CGPA, city)" className="sm:col-span-2">
              <input className="field" value={degree.detail} onChange={(event) => updateDegree({ detail: event.target.value })} />
            </Field>
            <Field label="Certifications" hint="One per line." className="sm:col-span-2">
              <textarea
                rows={4}
                className="field resize-none font-mono text-[11.5px]"
                value={draft.certifications.join('\n')}
                onChange={(event) => update('certifications', linesToArray(event.target.value))}
              />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <h2 className="text-[13px] font-medium text-white">Links</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Email">
              <input className="field" value={draft.email} onChange={(event) => update('email', event.target.value)} />
            </Field>
            <Field label="Resume URL" hint="Place the PDF in /public or use an external URL.">
              <input className="field" value={draft.resumeUrl} onChange={(event) => update('resumeUrl', event.target.value)} />
            </Field>
            <Field label="GitHub">
              <input className="field" value={draft.github} onChange={(event) => update('github', event.target.value)} />
            </Field>
            <Field label="Portfolio">
              <input className="field" value={draft.portfolio} onChange={(event) => update('portfolio', event.target.value)} />
            </Field>
            <Field label="LinkedIn" hint="Leave empty to show a disabled placeholder." className="sm:col-span-2">
              <input className="field" value={draft.linkedin} onChange={(event) => update('linkedin', event.target.value)} />
            </Field>
          </div>
        </section>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => {
            saveSettings(draft);
            setSaved(true);
          }}
          className="btn-primary !px-4 !py-2 text-[12px]"
        >
          <Save className="h-3.5 w-3.5" aria-hidden />
          Save settings
        </button>
      </div>
    </div>
  );
}
