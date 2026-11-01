# Portfolio site (`web/`)

Next.js 16 (App Router) exported as static HTML for GitHub Pages, with English at `/en/` and Arabic (RTL) at `/ar/`.

## Scripts

```bash
npm install
npm run dev         # http://localhost:3000/en/
npm run lint
npm run typecheck   # next typegen && tsc --noEmit
npm run build       # → out/ (static export)
```

## Where things live

| What | Where |
| --- | --- |
| All copy (EN / AR) | `src/content/en.ts`, `src/content/ar.ts` — both `satisfies SiteContent`, so they can't drift apart |
| Projects (order, dates, stack, links) | `src/content/projects.ts` |
| Experience timeline | `src/content/experience.ts` |
| Contact links, tech marquee | `src/content/profile.ts` |
| Screenshots | `public/portfolio/<slug>/` + `src/content/media.generated.json` (written by `tools/screenshots`) |
| CV download | `public/cv/Abdulrahman-Samir-CV.pdf` |
| Routes | `src/app/[lang]/` (site), `src/app/(gate)/` (`/` → picks a language), `src/app/global-not-found.tsx` (404) |

## Adding a project

1. Add an entry to `src/content/projects.ts` and a new `ProjectSlug` in `src/content/types.ts`.
2. Add its copy under `projects` in **both** `en.ts` and `ar.ts` (TypeScript fails until both exist).
3. Optional: add capture targets in `tools/screenshots/targets.mjs`, capture, review, publish.

## Notes

- Static export: no server redirects, no API routes, `images.unoptimized`. Language detection for `/` runs in the browser.
- Long-form copy is passed to components as props from server pages; only short UI labels go through `LocaleProvider`.
- Arabic text: wrap Latin runs that start or end with punctuation (`.NET`, `v8 → v19`) in `⁦ … ⁩`.
- `useReducedMotion` comes from `src/lib/use-reduced-motion.ts` (hydration-safe), not from `framer-motion`.
