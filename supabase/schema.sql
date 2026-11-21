-- ============================================================================
-- Vaibhav Gaikwad portfolio — Supabase schema
-- Run in the Supabase SQL editor. Safe to re-run (idempotent where practical).
--
-- Security model:
--   * Public (anon) can READ published portfolio content.
--   * Public (anon) can INSERT inquiries, but never read them back.
--   * Only authenticated admins can write content and read/manage inquiries.
--   * Never expose the service-role key in the frontend.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Updated-at helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Site settings (singleton row)
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  name text not null,
  short_name text not null default 'VG',
  roles text[] not null default '{}',
  availability text not null default 'Open to work',
  location text not null default '',
  email text not null,
  github text not null default '',
  portfolio text not null default '',
  linkedin text not null default '',
  resume_url text not null default '/Vaibhav_Gaikwad_Resume.pdf',
  photo_url text not null default '/assets/vaibhav.png',
  hero_intro text not null default '',
  hero_heading text not null default '',
  hero_description text not null default '',
  about_paragraph text not null default '',
  about_secondary text not null default '',
  education jsonb not null default '[]'::jsonb,
  certifications text[] not null default '{}',
  updated_at timestamptz not null default now()
);

drop trigger if exists site_settings_updated_at on public.site_settings;
create trigger site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Projects
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  tagline text not null default '',
  summary text not null default '',
  category text not null default '',
  year text not null default '',
  status text not null default 'In development'
    check (status in ('Shipped', 'In development', 'Research')),
  accent text not null default 'violet'
    check (accent in ('violet', 'electric', 'cyan', 'emerald', 'amber', 'rose')),
  tech text[] not null default '{}',
  links jsonb not null default '{}'::jsonb,
  problem text not null default '',
  solution text not null default '',
  architecture text[] not null default '{}',
  features text[] not null default '{}',
  outcomes jsonb not null default '[]'::jsonb,
  screenshots jsonb not null default '[]'::jsonb,
  disclaimer text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_sort_idx on public.projects (sort_order);

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Skills, experience, services
-- ---------------------------------------------------------------------------
create table if not exists public.skill_groups (
  id text primary key,
  title text not null,
  blurb text not null default '',
  items jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  org text not null default '',
  period text not null default '',
  location text not null default '',
  mode text not null default '',
  summary text not null default '',
  bullets text[] not null default '{}',
  tech text[] not null default '{}',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  tech text[] not null default '{}',
  icon text not null default 'chatbot',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Inquiries (write-only for the public)
-- ---------------------------------------------------------------------------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'project' check (kind in ('project', 'contact')),
  name text not null,
  email text not null,
  company text,
  service text,
  budget text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists inquiries_created_idx on public.inquiries (created_at desc);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.site_settings enable row level security;
alter table public.projects enable row level security;
alter table public.skill_groups enable row level security;
alter table public.experience enable row level security;
alter table public.services enable row level security;
alter table public.inquiries enable row level security;

-- Public reads
drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects"
  on public.projects for select
  to anon, authenticated
  using (published = true or auth.role() = 'authenticated');

drop policy if exists "Public can read skills" on public.skill_groups;
create policy "Public can read skills"
  on public.skill_groups for select
  to anon, authenticated
  using (true);

drop policy if exists "Public can read experience" on public.experience;
create policy "Public can read experience"
  on public.experience for select
  to anon, authenticated
  using (true);

drop policy if exists "Public can read services" on public.services;
create policy "Public can read services"
  on public.services for select
  to anon, authenticated
  using (true);

-- Public can submit an inquiry but cannot read, update or delete them
drop policy if exists "Public can submit inquiries" on public.inquiries;
create policy "Public can submit inquiries"
  on public.inquiries for insert
  to anon, authenticated
  with check (
    length(name) between 1 and 200
    and length(message) between 1 and 5000
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );

drop policy if exists "Admins can read inquiries" on public.inquiries;
create policy "Admins can read inquiries"
  on public.inquiries for select
  to authenticated
  using (true);

drop policy if exists "Admins can update inquiries" on public.inquiries;
create policy "Admins can update inquiries"
  on public.inquiries for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins can delete inquiries" on public.inquiries;
create policy "Admins can delete inquiries"
  on public.inquiries for delete
  to authenticated
  using (true);

-- Authenticated admins can manage content
drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings"
  on public.site_settings for all
  to authenticated
  using (true) with check (true);

drop policy if exists "Admins manage projects" on public.projects;
create policy "Admins manage projects"
  on public.projects for all
  to authenticated
  using (true) with check (true);

drop policy if exists "Admins manage skills" on public.skill_groups;
create policy "Admins manage skills"
  on public.skill_groups for all
  to authenticated
  using (true) with check (true);

drop policy if exists "Admins manage experience" on public.experience;
create policy "Admins manage experience"
  on public.experience for all
  to authenticated
  using (true) with check (true);

drop policy if exists "Admins manage services" on public.services;
create policy "Admins manage services"
  on public.services for all
  to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Storage bucket for project screenshots and profile photo
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

drop policy if exists "Public can read portfolio media" on storage.objects;
create policy "Public can read portfolio media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'portfolio-media');

drop policy if exists "Admins can upload portfolio media" on storage.objects;
create policy "Admins can upload portfolio media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio-media');

drop policy if exists "Admins can update portfolio media" on storage.objects;
create policy "Admins can update portfolio media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio-media');

drop policy if exists "Admins can delete portfolio media" on storage.objects;
create policy "Admins can delete portfolio media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio-media');

-- ---------------------------------------------------------------------------
-- Seed the singleton settings row (edit values to match the portfolio)
-- ---------------------------------------------------------------------------
insert into public.site_settings (id, name, email, github, portfolio, linkedin)
values (
  1,
  'Vaibhav Gaikwad',
  'vaibhavgaikwad7968@gmail.com',
  'https://github.com/vaibhavgaikwad0072',
  'https://vaibhavgaikwad0072.github.io',
  'https://www.linkedin.com/in/vaibhav-gaikwad-50a1b4257/'
)
on conflict (id) do nothing;
