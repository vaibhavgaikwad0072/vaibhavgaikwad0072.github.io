# Vaibhav Gaikwad — Portfolio

Live: https://vaibhavgaikwad0072.github.io/

A dark, animated portfolio for an AI engineer: cinematic hero, particle canvas, 3D-tilt project cards, case-study pages, a services inquiry flow, and a browser-based admin dashboard for editing the content.

Built with React 18, TypeScript, Vite, Tailwind CSS, Framer Motion and React Router. No UI kit, no template.

## Quick start

```bash
npm install
cp .env.example .env       # optional; defaults work out of the box
npm run dev                # http://localhost:5173
```

```bash
npm run build              # type-check + production bundle in dist/
npm run preview            # serve the production build
npm run typecheck
```

Node 18+ recommended.

## Admin dashboard

Open `/admin` and sign in with the password from `VITE_ADMIN_PASSWORD`. If the variable is unset, the demo fallback is `vg-admin-2026`.

What you can edit:

- Projects, including slug, stack, status, links, outcomes, features, architecture steps and screenshots
- Skill groups and tools
- Experience entries
- Services and their feature lists
- Site settings: name, availability, photo, hero copy, about copy, education, certifications, social links, resume URL
- Inquiries: filter, mark status, delete
- Export / import the whole content as JSON, or reset to the shipped defaults

**How persistence works.** This build is local-first: content is saved in `localStorage` under `vg.portfolio.content.v1`, inquiries under `vg.portfolio.inquiries.v1`, and the admin session in `sessionStorage`. That means edits are per-browser and survive reloads, but they are not shared between devices.

**Security note.** The password gate is a static-site convenience, not real authentication — anyone can read the bundled JavaScript. It is fine for a personal demo, not for multi-user production. The Supabase path below replaces it with real auth and row-level security.

## Replacing content

- **Photo** — upload it in the admin Settings panel, or replace `public/assets/vaibhav.png` with a photo of the same name. Recommended: portrait orientation, at least 900 px wide. The frame, glow and parallax stay the same.
- **Resume** — replace `public/Vaibhav_Gaikwad_Resume.pdf`. The download button and resume links use `/Vaibhav_Gaikwad_Resume.pdf`.
- **Projects and links** — edit in the dashboard, or change the defaults in `src/data/content.ts`. Project links that were not verified are intentionally rendered as a disabled "not public" state instead of a fake URL.
- **Contact details** — also in `src/data/content.ts` (`settings`) and the admin Settings panel.

## Forms

Both the contact form and the services inquiry form validate on the client, include a honeypot field, and show loading, success and error states.

- With `VITE_FORM_ENDPOINT` unset, submissions are stored in this browser so the admin inbox works as a demo.
- With `VITE_FORM_ENDPOINT` set, the same inquiry object is POSTed as JSON:

```json
{
  "id": "…",
  "kind": "project",
  "name": "…",
  "email": "…",
  "company": "…",
  "service": "…",
  "budget": "…",
  "message": "…",
  "createdAt": "2026-11-19T10:00:00.000Z",
  "status": "new",
  "source": "vaibhav-portfolio"
}
```

Any endpoint that accepts JSON works (Formspree, Web3Forms, a serverless function). If the request fails, the user sees an error and is pointed to direct email — the form never pretends it succeeded.

## Production data layer (Supabase)

`supabase/schema.sql` contains the full Postgres schema, updated-at triggers, a public `portfolio-media` storage bucket, and row-level security policies:

- Public (anon) read for published content
- Anon insert allowed only for inquiries, with no read/update/delete
- Writes restricted to authenticated users

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to use it. Never put a service-role key in the frontend.

**Current status:** the UI ships on the local-first store. The schema and policies are ready for a production wiring pass (swap the ContentProvider storage adapter for Supabase client calls and replace the password gate with Supabase Auth). That was deliberate: no Supabase project credentials were available in this environment, so inventing them would have produced a broken admin.

## Deployment

The app uses `BrowserRouter`, so the host must serve `index.html` for unknown paths.

**Vercel** — connect the repo; `vercel.json` already rewrites all paths to `index.html`. Set the env vars in the project settings.

**Netlify** — build command `npm run build`, publish directory `dist`, and add `/* /index.html 200` as a redirect.

**GitHub Pages** — this repository deploys through `.github/workflows/deploy.yml`. On every push to `main`, GitHub Actions installs dependencies, runs `npm run build`, and publishes `dist/` with `actions/deploy-pages`. In the repository settings, keep **Settings → Pages → Source** set to **GitHub Actions**.

`npm run build` also writes `dist/404.html` (a copy of the SPA shell) and `dist/.nojekyll`, so deep links such as `/projects/healthlens` load on GitHub Pages without a server rewrite. The 404 fallback returns an HTTP 404 status for those paths, which is acceptable for a portfolio but not ideal for SEO; Vercel or Netlify with a real rewrite is preferable if search indexing matters.

The canonical link, OG URLs, `public/sitemap.xml` and `public/robots.txt` point at `https://vaibhavgaikwad0072.github.io/`. Update them (plus `settings.portfolio` in `src/data/content.ts`) if you move to another domain.

## Verification

A Playwright script drives installed Microsoft Edge headless against a running dev server and checks the real UI:

```bash
npm run dev                # in one terminal
npm run verify             # in another
```

It covers desktop and mobile layouts, horizontal overflow, the hero photo and resume file, nav scrolling, section presence, project detail pages, contact and inquiry submissions, admin login rejection/acceptance, the inquiries inbox, the project editor, settings, the 404 page, and the mobile menu. Screenshots land in `shots/` with a machine-readable `shots/report.json`.

Override paths if needed:

```bash
EDGE_PATH="/path/to/msedge" VERIFY_BASE_URL="http://127.0.0.1:4173" npm run verify
```

The script writes test inquiries and content edits to `localStorage` in the throwaway browser profile it creates; it does not touch your own browser data.

## Project layout

```
src/
  admin/            login, dashboard shell, panels, editors
  components/
    fx/             reveal, tilt/magnetic, particles, per-project artwork
    layout/         navbar, footer, cursor/progress, preloader, back-to-top
    sections/       hero, about, skills, projects, experience, services, contact
    forms/          contact and inquiry forms
  data/             types and default content (the source of truth)
  pages/            home, project case study, admin, 404
  store/            content + inquiries context with local persistence
  lib/              utilities (image compression, validation, scroll, JSON)
supabase/schema.sql  production schema, RLS and storage policies
public/              photo, resume, OG image, favicon, robots, sitemap
scripts/verify.mjs   Playwright end-to-end checks
```

## Honesty and limitations

- No invented proficiency percentages, project links, metrics or testimonials.
- HealthLens outcomes are shown as project benchmark results with a clear "not clinically validated" disclaimer.
- Text-to-SQL reports ~91% accuracy exactly as stated on the resume (self-reported), not measured by this build.
- ContextForge is marked "In development" and does not claim a stack or results.
- The transaction-risk case study uses the verified figures from its repository (1,090 transactions, 150 accounts, 107 tests) rather than decorative numbers.
- Project pages only show screenshots you upload in the admin; until then, an abstract generated artwork is used instead of a fake product screenshot.
- The admin password gate is client-side and local-first, as described above.

## Accessibility and motion

- `prefers-reduced-motion` is respected by the particle field, reveals, tilt, parallax, cursor and typewriter.
- Sections have landmarks and labels; decorative canvas/SVG/artwork is hidden from assistive tech.
- Visible focus styles, labelled navigation and form fields, and keyboard-accessible menus are included.
