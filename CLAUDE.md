# CLAUDE.md — Portfolio (Next.js)

## Authoritative Spec

`docs/Portfolio-Technical-Documentation.md` is the **single source of truth** for this project. Read it fully before doing anything. If an instruction here or in a prompt conflicts with the tech doc, ask Don before proceeding.

## Workflow Rules

1. **One step at a time.** Follow the 12-step build plan in §8 of the tech doc, in order. Never start step N+1 before Don has explicitly verified step N.
2. **Stop for verification.** After completing a step, summarize what was done, list the files touched, state the verification checkpoint from the tech doc, and wait.
3. **Never invent content.** All copy lives in `src/content/data.ts`. If a fact is missing (email, LinkedIn URL, job bullet, date, screenshot), insert a clearly marked `TODO:` placeholder and flag it in the step summary. Do not fabricate metrics, dates, or achievements.
4. **No copy in components.** Components render from `content/data.ts` only. Changing wording must never require touching a component file.
5. **Small commits.** One commit per step, message format: `step-N: <summary>`.

## Environment

- **Windows, native (no WSL).** Use cross-platform commands only. No `rm -rf`, no `&&` chains in npm scripts, no bash-only syntax. Prefer Node/npm-native solutions.
- Node LTS, npm (not pnpm/yarn).
- Dev server: `npm run dev` (default port 3000).

## Stack Constraints (see tech doc §2 for full detail)

- Next.js 15 App Router, TypeScript `strict: true`. Every page is statically generated.
- Tailwind CSS v4 — tokens via `@theme` in `globals.css`, **not** a `tailwind.config.ts` theme object.
- Aceternity/Magic UI patterns are **copied into `src/components/ui/`** and adapted to our tokens — never installed as packages, never left with their default colors.
- All animation via `motion`. Global `MotionConfig reducedMotion="user"` is mandatory and must never be removed.
- Dark theme only in v1. No `next-themes` yet.
- No backend, no API routes, no env secrets.

## Design Guardrails — Zero Gravity (tech doc §4 is the full spec)

- **The grid never moves; only pixels drift around it.** All floating is transform-only oscillation around a fixed resting position: amplitude ≤ 8px, duration 6–12s, randomized phase, via the shared `<Drift>` primitive. Never animate layout properties. Never let floating elements overlap.
- **Running text, headings in reading flow, and the navbar never float.** Floating cards **dock** (stop, ~0.3s) on hover/focus.
- Space background per §4.3 only: layered gradients/static canvas + ≤ 12 twinkling SVG stars + nebula blobs. **No three.js, no particle libraries, no per-frame animation loops.** Idle CPU must stay ~0%.
- Colors and fonts come from the token table in tech doc §4.2. Never hard-code hex values in components.
- One orchestrated animation moment (hero load: stars → constellation draw → content settles). Everything else: ambient drift, `<SettleIn>` reveals (`once: true`), hover docking.
- `MotionConfig reducedMotion="user"` is mandatory; under reduced motion the entire site (floats, twinkles, parallax, constellation) is static and fully usable.
- The H1 must render immediately (it is the LCP element). Animations are additive, never blocking. Long-form text always sits on a panel surface, never directly over a busy star cluster.
- Accessibility floor: semantic landmarks, one `h1` per page, visible focus rings, alt text everywhere, contrast ≥ 4.5:1.

## Definition of Done (per step)

- `npx tsc --noEmit` passes
- `npm run lint` passes
- `npm run dev` renders without console errors
- Verification checkpoint from tech doc §8 stated and awaiting Don's confirmation
