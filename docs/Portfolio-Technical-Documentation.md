# Portfolio — Technical Documentation

**Version:** 1.0
**Owner:** Don Davis
**Status:** Authoritative spec. Claude Code must treat this document as the single source of truth. Where this document and general best practice conflict, this document wins.

---

## 1. Project Overview

A personal developer portfolio for **Don Davis, Angular Developer (4 years)**, built in **Next.js 15** and deployed on **Vercel**. Its single job: convince a recruiter or hiring engineer within 30 seconds that Don builds enterprise-grade frontend systems, then give them the evidence (live demos, GitHub, architecture write-ups).

**Why Next.js when Don is an Angular developer?** This is a deliberate talking point, not a contradiction: it demonstrates framework breadth and that Don's skills (components, reactivity, routing, state) are transferable. The projects being showcased are Angular; the frame around them is React.

### Goals
- Bold, animated, memorable UI (Aceternity-style motion) that still loads fast
- Showcase ESMP and PulseTicker as *engineered systems*, not just links
- Zero backend, zero CMS, zero API keys — all content is typed TypeScript data
- Deployable on Vercel free tier; Lighthouse Performance ≥ 90 on mobile

### Non-Goals
- No blog (may be added later; the structure must not block it)
- No contact form backend — `mailto:` + social links only in v1
- No i18n, no auth, no database

---

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15, App Router | Static generation for every route (`output` stays default; all pages are SSG) |
| Language | TypeScript, `strict: true` | Same discipline as ESMP/PulseTicker |
| Styling | Tailwind CSS v4 | CSS-first config via `@theme` in `globals.css` |
| Components | shadcn/ui (copied source) | Only pull components actually used |
| Animated components | Aceternity UI / Magic UI patterns (copy-paste) | Spotlight, BentoGrid, animated text, marquee, timeline. Copied into `components/ui/`, never installed as a package |
| Motion | `motion` (Framer Motion successor) | All animation goes through it; no ad-hoc CSS keyframe soup |
| Theming | Dark only in v1 | `next-themes` deferred; dark is the brand |
| Icons | `lucide-react` | |
| Fonts | Space Grotesk (display), Inter (body), JetBrains Mono (code/labels) | Via `next/font/google`, `display: swap` |
| Utilities | `clsx`, `tailwind-merge` (`cn()` helper) | Required by shadcn/Aceternity components |
| Deployment | Vercel | Connect GitHub repo `DON-008/portfolio` |

**Environment:** Windows (native, no WSL). All scripts must be cross-platform (no `&&`-chained shell-specific commands in npm scripts; use `npm-run-all` only if actually needed — prefer single commands).

---

## 3. Repository & Folder Structure

```
portfolio/
├── CLAUDE.md
├── docs/
│   └── Portfolio-Technical-Documentation.md   (this file)
├── public/
│   ├── cv/Don-Davis-CV.pdf
│   ├── images/           (project screenshots, og image)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx            (fonts, metadata, shell)
│   │   ├── page.tsx              (single-page home: all sections)
│   │   ├── projects/
│   │   │   └── [slug]/page.tsx   (SSG detail pages, generateStaticParams)
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/          (shadcn + Aceternity-derived primitives)
│   │   ├── layout/      (Navbar, Footer)
│   │   └── sections/    (Hero, Projects, Skills, Experience, Education, Contact)
│   ├── content/
│   │   └── data.ts      (ALL site content, fully typed — the only place copy lives)
│   └── lib/
│       └── utils.ts     (cn helper)
├── tailwind/globals.css
└── package.json
```

**Rule:** No copy (names, descriptions, dates, links) hard-coded inside components. Everything renders from `content/data.ts`. Changing a job title must never require touching a component.

---

## 4. Design System — "Zero Gravity"

### 4.1 Identity & Concept

**Theme: deep space, zero gravity — engineered, not decorated.** The page background is space; foreground elements drift gently as if weightless. The governing principle that keeps it clean:

> **The grid never moves. Only pixels drift around it.**

Every element has a fixed resting position in a normal, disciplined layout grid. "Floating" is a small transform-only oscillation *around* that resting position — remove all animation and the page is a perfectly aligned, ordinary portfolio. This guarantees zero-gravity feel without mess.

The accent palette (indigo/teal on deep dark) carries over from Don's existing technical documents — in space they read as nebula and starlight, so brand continuity survives the theme.

### 4.2 Tokens (define in `globals.css` via Tailwind v4 `@theme`)

| Token | Value | Use |
|---|---|---|
| `--color-void` | `#050914` | Page background (deep space, near-black navy) |
| `--color-ink` | `#0D1320` | Secondary background bands |
| `--color-panel` | `#121A2B` | Cards / "hull" surfaces, slightly translucent over the starfield (`bg-panel/80` + `backdrop-blur`) |
| `--color-panel-2` | `#1A2438` | Elevated surfaces, hover |
| `--color-line` | `#243049` | Borders, dividers, constellation lines |
| `--color-text` | `#E8EDF7` | Primary text (starlight white) |
| `--color-muted` | `#93A0B8` | Secondary text |
| `--color-indigo` | `#7C8CFF` | Primary accent, links, CTAs, nebula glow |
| `--color-teal` | `#2FD4A7` | Data accent, highlights, star pulses |
| `--color-amber` | `#FFB454` | Sparse tertiary accent (badges, one "warm star") |
| `--glow-indigo` | `0 0 24px rgb(124 140 255 / .25)` | Hover glow shadow |

Fonts unchanged: `--font-display` Space Grotesk (the name is a gift for this theme), `--font-sans` Inter, `--font-mono` JetBrains Mono (eyebrows, badges, HUD-style labels).

### 4.3 The Space Background (three cheap layers, no particle libraries)

Built as a fixed, full-viewport background stack behind all content:

1. **Starfield** — 2 layers of tiny stars (1–2px dots) with different densities. Implementation: two absolutely-positioned divs using `background-image: radial-gradient(...)` patterns or one small `<canvas>` drawn once (no per-frame redraw). A handful (≤ 12) of individually placed SVG stars twinkle via slow opacity keyframes with staggered delays.
2. **Nebula glow** — 2–3 huge, heavily blurred radial-gradient blobs in indigo and teal at 6–10% opacity, positioned off-center. Static (or drifting over ≥ 60s). This gives depth without noise.
3. **Scroll parallax** — the two star layers translate at ~0.15× and ~0.3× of scroll speed (transform only, via Motion `useScroll` + `useTransform`). Content scrolls at 1×. Subtle; if it's noticeable, it's too much.

Hard limits: no `three.js`, no particle packages, no per-frame canvas loops. The whole background must idle at ~0% CPU (only compositor-driven transforms/opacity) and be fully static under reduced motion.

### 4.4 Zero-Gravity Float Rules (this is what "clean" means)

- **Transform-only drift:** floating = `y` (and optionally `x`) oscillation of **≤ 8px amplitude**, duration **6–12s**, `easeInOut`, `repeat: Infinity, repeatType: 'mirror'`. Optional rotation ≤ 0.4°. Never animate layout properties.
- **Staggered phase:** every floating element gets a randomized `delay`/duration within range so nothing bobs in sync — synchronized motion reads as a gimmick, desynchronized reads as weightlessness.
- **What floats:** cards (project cells, education card, skill groups), badges, decorative stars, the hero constellation nodes.
- **What never floats:** running text, headings while being read in flow, the navbar, timeline entries' text column, anything currently focused. Readability is gravity.
- **Docking:** on hover or keyboard focus, a floating card animates to rest (offset → 0, ~0.3s) and holds still, then gets the `--glow-indigo` border treatment. Interactive targets must be stationary when the user engages them.
- **Reveal metaphor:** sections don't slide up on scroll — they **drift in and settle** (small y offset + slight overshoot spring, `once: true`), like an object coming to rest in orbit.
- **One orchestrated moment:** hero load — stars fade in → constellation draws itself → name and CTAs drift in and settle. Everything after is ambient.
- **`prefers-reduced-motion`:** global `MotionConfig reducedMotion="user"`; all floats, twinkles, parallax, and the constellation animation are disabled — page becomes a static, perfectly aligned dark site. Hard requirement.
- Animations must never block content: text is readable at 0ms; motion is garnish.

### 4.5 Signature Element — the Constellation Architecture

The hero background feature merges the space theme with Don's systems identity: the ESMP dataflow (template → store → effect → API → back) drawn **as a constellation** — nodes are stars (teal/indigo points with soft glow), edges are faint `--color-line` strokes, tiny mono labels beside key nodes. On load it draws itself (stroke-dashoffset animation); afterwards, occasional pulses of light travel along an edge every few seconds, and nodes drift on the zero-gravity float rules above. It reads as "a constellation" at a glance and as "an architecture diagram" on a second look — which is exactly the impression the portfolio exists to make. Single SVG + Motion; < 5% CPU idle; static under reduced motion.

---

## 5. Page & Section Spec

### 5.1 Home (`/`) — single scrolling page

Sticky floating navbar (blur backdrop, pill shape) with anchor links: Projects · Skills · Experience · Contact, plus a GitHub icon button.

1. **Hero** — eyebrow (mono, teal): `ANGULAR · TYPESCRIPT · NGRX`. H1 in Space Grotesk: name + role. One-sentence pitch (from `data.ts`). Three CTAs: *View projects* (primary, indigo), *Download CV* (`/cv/Don-Davis-CV.pdf`), *GitHub*. The constellation architecture (§4.5) sits behind the text; hero content drifts in and settles on load.
2. **Projects** — bento grid. ESMP gets the large cell (flagship); PulseTicker a standard cell with a `mono` amber badge `IN DEVELOPMENT` until shipped, then swap to live-demo link via one field change in `data.ts`. Each card: name, one-liner, 4–6 tech badges, architecture highlight line, links (Live · GitHub · Case study →).
3. **Skills** — grouped grid (Frontend / State & Reactivity / Backend / Testing / Tooling), each skill as a mono-font chip. One slow marquee row of core tech logos is allowed; keep it subtle.
4. **Experience** — vertical timeline (Aceternity timeline pattern): The Elms (UK) → ThinkPalm Technologies → CIED Group → Travidux Technologies. Each entry: role, company, period, 2–3 impact bullets from `data.ts`.
5. **Education** — single card: M.Sc. Computing (Distinction), De Montfort University, UK.
6. **Contact** — short invitation line, `mailto:` button, LinkedIn + GitHub icons. Footer: © year, "Built with Next.js — projects built with Angular".

### 5.2 Project detail (`/projects/[slug]`)

Statically generated from `data.ts` (`generateStaticParams`). Sections: hero (name, links, badges) → **Problem** → **Architecture** (rendered highlight list; ESMP page may embed a simplified version of the dataflow SVG) → **Key engineering decisions** (the existing talking points: Signals-vs-NgRx split rule, `concatMap` for status updates, `optimisticBackup` keyed by `caseId`, `provideAppInitializer` session restore, JWT refresh interceptor; for PulseTicker: WebSocket backpressure via `bufferTime`/`auditTime`, no-backend design) → **Stack** → back link.

These pages are the differentiator. The copy for them lives in `data.ts` as structured fields (`problem`, `architecture[]`, `decisions[]`), not markdown blobs, so the layout stays consistent.

---

## 6. Content Inventory (`content/data.ts`)

Typed interfaces (define exactly these):

```ts
interface Project {
  slug: string; name: string; tagline: string; status: 'live' | 'in-development';
  liveUrl?: string; repoUrl: string; stack: string[];
  highlight: string;            // one-line architecture hook for the card
  problem: string;
  architecture: string[];       // bullet points
  decisions: { title: string; body: string }[];
  featured: boolean;            // ESMP true → large bento cell
}
interface Experience { company: string; role: string; period: string; location: string; points: string[] }
interface SkillGroup { label: string; skills: string[] }
```

Seed data (Claude Code fills from this table; Don reviews and corrects wording at the verification checkpoint):

- **ESMP** — `live`, https://esmp-gnp8.onrender.com/ , https://github.com/DON-008/esmp — Angular 22, NgRx, Signals, NestJS, TypeORM, SQLite, JWT (HTTP-only refresh cookies). Note on the card/page that the Render free-tier demo may cold-start (~30 s).
- **PulseTicker** — `in-development`, repo URL to be added — Angular 22, Signals, RxJS, Binance public WebSocket streams, no backend.
- Experience entries: role titles, periods, and bullets to be supplied/confirmed by Don at Step 3's checkpoint (do not invent metrics).
- Placeholders that must be flagged, never silently invented: email address, LinkedIn URL, CV PDF, project screenshots.

---

## 7. Quality Requirements

- **Performance:** Lighthouse mobile ≥ 90 Performance, ≥ 95 Accessibility/Best Practices/SEO. Hero animation must not tank LCP — H1 text is the LCP element and renders immediately. The space background + all ambient motion must idle at ~0% CPU (compositor-only transforms/opacity; no per-frame JS).
- **Accessibility:** semantic landmarks, one `h1`, visible keyboard focus (`:focus-visible` ring in indigo), alt text on all images, reduced-motion respected (page must be fully static and fully usable), color contrast ≥ 4.5:1 for body text. Long-form text always sits on a panel surface or over a locally darkened region — never directly over a busy star cluster. Floating elements dock when hovered/focused so interactive targets are stationary.
- **SEO:** `metadata` in `layout.tsx` (title template, description), OpenGraph image (1200×630, generated once as a static asset), `sitemap.ts`, `robots.ts`, canonical URL.
- **Responsive:** designed mobile-first; bento grid collapses to single column; navbar collapses to icon-only pill.
- **Testing scope (deliberate):** `tsc --noEmit` + ESLint clean + manual Lighthouse run. No unit/E2E tests for a static portfolio — the testing story lives in ESMP/PulseTicker and the case-study pages say so.

---

## 8. Build Plan — 12 Steps

Claude Code executes **one step at a time** and **stops for Don's verification** after each. Each step lists its verification checkpoint.

**Step 1 — Scaffold.** `npx create-next-app@latest` (TypeScript, Tailwind, App Router, `src/` dir, no ESLint prompts skipped). Add `clsx`, `tailwind-merge`, `motion`, `lucide-react`; create `lib/utils.ts` (`cn`). Commit.
✅ *Verify:* `npm run dev` serves the default page on Windows; `tsc --noEmit` passes.

**Step 2 — Design tokens, fonts & space background.** Tailwind v4 `@theme` tokens from §4.2; wire Space Grotesk/Inter/JetBrains Mono via `next/font`; global `:focus-visible` style; `MotionConfig reducedMotion="user"` in layout. Build the `<SpaceBackground />` component per §4.3 (starfield layers, nebula blobs, twinkles) mounted fixed behind everything — parallax deferred to Step 10.
✅ *Verify:* space background renders with correct depth and near-zero idle CPU (check DevTools Performance); static under OS reduced-motion; a throwaway text block confirms fonts/colors.

**Step 3 — Content layer.** `content/data.ts` with the interfaces and seed data from §6. No UI yet.
✅ *Verify:* Don reviews every string — names, dates, bullets, links — and corrects before any component consumes it.

**Step 4 — Layout shell + float primitives.** Floating pill navbar (anchor links + GitHub icon, blur backdrop, scroll-aware — navbar itself never drifts), footer, empty section placeholders with anchor ids. Build the two reusable motion primitives from §4.4: `<Drift>` (zero-gravity float wrapper: amplitude/duration props, randomized phase, docks on hover/focus, inert under reduced motion) and `<SettleIn>` (drift-in-and-settle scroll reveal, `once: true`).
✅ *Verify:* anchors scroll smoothly; navbar usable at 375px; a test card wrapped in `<Drift>` floats ≤ 8px, desyncs from a second test card, and docks on hover.

**Step 5 — Hero.** Eyebrow, H1, pitch, three CTAs; load sequence per §4.4 (content drifts in and settles). Constellation SVG *stubbed static* — correct nodes/edges/labels, faint, no animation yet (comes in Step 10).
✅ *Verify:* LCP element is the H1 and renders immediately; hero reads perfectly with animations disabled; text stays fully legible over the starfield.

**Step 6 — Projects bento grid.** Cards per §5.1 rendered from `data.ts` on translucent panel surfaces; each card wrapped in `<Drift>`; hover docks + indigo glow; ESMP featured cell; status badge logic.
✅ *Verify:* links work; cards never overlap or collide while floating at any breakpoint; grid collapses cleanly on mobile; adding a fake third project in `data.ts` renders without code changes (then remove it).

**Step 7 — Skills + marquee.** Grouped chips from `data.ts`; one subtle marquee row; marquee pauses under reduced motion.
✅ *Verify:* visual check + reduced-motion check.

**Step 8 — Experience timeline + Education.** Timeline entries reveal via `<SettleIn>`; per §4.4 the timeline's text column does **not** float (readability is gravity) — only the timeline's node dots may drift subtly. Education card floats via `<Drift>`.
✅ *Verify:* order, dates, and wording match Don's CV exactly; timeline text is rock-steady while reading.

**Step 9 — Contact + footer polish.** `mailto:`, social icons, footer line.
✅ *Verify:* mail link opens with correct address (flag if still placeholder).

**Step 10 — Project detail pages + constellation animation + parallax.** `/projects/[slug]` with `generateStaticParams`; render problem/architecture/decisions. Animate the hero constellation per §4.5 (self-drawing edges on load, periodic edge pulses, node drift). Add the two-layer scroll parallax from §4.3.
✅ *Verify:* both slugs build statically (`next build` output lists them); case-study copy approved; idle CPU stays ~0% with the tab in focus; everything static under reduced motion; parallax is barely noticeable (if Don immediately notices it, dial it down).

**Step 11 — SEO, meta, assets.** Metadata + title template, OG image, favicon, `sitemap.ts`, `robots.ts`; add real screenshots to project cards/pages; CV PDF in `/public/cv/`.
✅ *Verify:* OG preview renders in a checker; `next build` clean with zero type or lint errors.

**Step 12 — Deploy + audit.** Push to `DON-008/portfolio`, import to Vercel, production deploy. Run Lighthouse (mobile) on the production URL; fix anything under target from §7.
✅ *Verify:* live URL shared; Lighthouse scores meet §7; site tested on a real phone.

---

## 9. Future (out of scope for v1, structure must not block)

- PulseTicker flips to `live` (one-field change in `data.ts`)
- Light theme via `next-themes`
- Blog under `/blog` (MDX)
- OG images generated per-project via `next/og`
