/** Hide the Next.js dev-tools badge when capturing a dev server. */
const LEEN_CSS = "nextjs-portal{display:none!important}";

/**
 * What to capture. URLs and scroll positions only — never credentials.
 *
 * - `id`        stable id; the file becomes `<id>-<device>-<scheme>.webp`
 * - `slug`      project slug in web/src/content/projects.ts
 * - `part`      Comply360 suite part id (optional)
 * - `scrollTo`  scroll this many viewport heights before the shot (0 = top)
 * - `devices`   default ["desktop"]
 * - `schemes`   default ["light"] — only add "dark" when the site honours prefers-color-scheme
 * - `auth`      "epath" | "leen" — log in once per browser context first (see capture.mjs)
 * - `hideCss`   CSS injected before the shot (chat bubbles, cookie bars that can't be dismissed)
 */
export const targets = [
  // ── Comply360 & the 360 suite ────────────────────────────────────────────
  { id: "comply-home", slug: "comply360", part: "comply360", url: "https://comply360.tech/", devices: ["desktop", "mobile"] },
  { id: "comply-flow", slug: "comply360", part: "comply360", url: "https://comply360.tech/", scrollTo: 1 },
  { id: "comply-roadmap", slug: "comply360", part: "comply360", url: "https://comply360.tech/", scrollTo: 2 },
  { id: "comply-signin", slug: "comply360", part: "comply360", url: "https://client.comply360.tech/auth/sign-in" },

  { id: "eco-home", slug: "comply360", part: "360-technologies", url: "https://360-technologies.com/en/", devices: ["desktop", "mobile"] },
  { id: "eco-products", slug: "comply360", part: "360-technologies", url: "https://360-technologies.com/en/", scrollTo: 1.1 },

  { id: "signals-home", slug: "comply360", part: "signals360", url: "https://dev.signals360.tech/", devices: ["desktop", "mobile"] },
  { id: "signals-insights", slug: "comply360", part: "signals360", url: "https://dev.signals360.tech/", scrollTo: 1.2 },

  { id: "belvro-home", slug: "comply360", part: "belvro-wealth", url: "https://belvrowealth.com/", devices: ["desktop", "mobile"] },
  { id: "belvro-services", slug: "comply360", part: "belvro-wealth", url: "https://belvrowealth.com/", scrollTo: 1.2 },

  // ── SkyApps website ──────────────────────────────────────────────────────
  { id: "sky-home", slug: "skyapps-website", url: "https://website.skyapps.me/", devices: ["desktop", "mobile"] },
  { id: "sky-modules", slug: "skyapps-website", url: "https://website.skyapps.me/", scrollTo: 1.1 },
  { id: "sky-sectors", slug: "skyapps-website", url: "https://website.skyapps.me/", scrollTo: 2.2 },
  { id: "sky-home-en", slug: "skyapps-website", url: "https://website.skyapps.me/en/" },

  // ── Leen (local seeded build: start ~/Personal/markaz with `pnpm db:up && pnpm dev`) ──
  { id: "leen-dashboard", slug: "leen", auth: "leen", url: "http://localhost:3000/ar/dashboard", devices: ["desktop", "mobile"], schemes: ["light", "dark"], hideCss: LEEN_CSS },
  { id: "leen-schedule", slug: "leen", auth: "leen", url: "http://localhost:3000/ar/schedule", hideCss: LEEN_CSS },
  { id: "leen-attendance", slug: "leen", auth: "leen", url: "http://localhost:3000/ar/attendance", hideCss: LEEN_CSS },
  { id: "leen-finance", slug: "leen", auth: "leen", url: "http://localhost:3000/ar/reports/finance", schemes: ["dark"], hideCss: LEEN_CSS },
  { id: "leen-students", slug: "leen", auth: "leen", url: "http://localhost:3000/ar/students", hideCss: LEEN_CSS },
  { id: "leen-dashboard-en", slug: "leen", auth: "leen", url: "http://localhost:3000/en/dashboard", hideCss: LEEN_CSS },
  { id: "leen-public-page", slug: "leen", url: "http://localhost:3000/ar/c/al-nour-demo", devices: ["desktop", "mobile"], hideCss: LEEN_CSS },

  // ── ePath / SkyApps ERP (demo login from env: EPATH_DEMO_USER / EPATH_DEMO_PASS) ──
  { id: "epath-home", slug: "epath-erp", auth: "epath", url: "https://demo.skyapps.me/", devices: ["desktop", "mobile"], schemes: ["light", "dark"] },
  { id: "epath-finance", slug: "epath-erp", auth: "epath", url: "https://demo.skyapps.me/finance" },
  { id: "epath-entries", slug: "epath-erp", auth: "epath", url: "https://demo.skyapps.me/finance/entries" },
  { id: "epath-approval", slug: "epath-erp", auth: "epath", url: "https://demo.skyapps.me/finance/entries-approval" },
  { id: "epath-accounts-tree", slug: "epath-erp", auth: "epath", url: "https://demo.skyapps.me/finance/accounts-tree", schemes: ["dark"] },
  { id: "epath-balance-sheet", slug: "epath-erp", auth: "epath", url: "https://demo.skyapps.me/finance/balance-sheet" },
  { id: "epath-sales", slug: "epath-erp", auth: "epath", url: "https://demo.skyapps.me/sales" },
  { id: "epath-inventory", slug: "epath-erp", auth: "epath", url: "https://demo.skyapps.me/inventory" },
];
