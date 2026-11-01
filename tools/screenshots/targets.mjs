/** Hide the Next.js dev-tools badge when capturing a dev server. */
const LEEN_CSS = "nextjs-portal{display:none!important}";
const RED_SEA = "http://127.0.0.1:4201";
const HWADI = "http://127.0.0.1:4202/dashboard/xp";
const ETOLV = "https://portal.etolv.net/newportal";
/** The weak-password notice on ETOLV's home page: close it, never click "Change password". */
const ETOLV_DISMISS = [".home-alert__close"];
/** "Top officers" chart draws staff names on its canvas — blur the label column. */
const ETOLV_CHART_LABELS = [{ selector: "canvas", x: 0, y: 0, w: 0.17, h: 1 }];

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

  // ── Red Sea (local: clone AbdulrhmanSamir3579/red-sea-frontend, `npx ng serve --port 4201`) ──
  { id: "rs-partnerships", slug: "film-sa-red-sea", local: true, url: `${RED_SEA}/main/rsg-analysis/partnerships` },
  { id: "rs-partner-hover", slug: "film-sa-red-sea", local: true, url: `${RED_SEA}/main/rsg-analysis/partnerships`, steps: [{ hover: ".card >> nth=0" }, { wait: 900 }] },
  { id: "rs-partner-details", slug: "film-sa-red-sea", local: true, url: `${RED_SEA}/main/rsg-analysis/partnerships`, steps: [{ click: ".card >> nth=1" }, { wait: 1600 }] },

  // ── Hwadi (local: clone Next-devteam/hwadi_dashboard_front, `npx ng serve --port 4202`) ──
  { id: "hw-group-ceo", slug: "daem-spi-hwadi", local: true, url: `${HWADI}/internal-environment/group-ceo` },
  { id: "hw-financial", slug: "daem-spi-hwadi", local: true, url: `${HWADI}/internal-environment/group-ceo`, steps: [{ click: "button:has-text('Financial Accounting')" }, { wait: 1500 }] },
  { id: "hw-cfo", slug: "daem-spi-hwadi", local: true, url: `${HWADI}/internal-environment/cfo-dashboard` },
  { id: "hw-cfo-balances", slug: "daem-spi-hwadi", local: true, url: `${HWADI}/internal-environment/cfo-dashboard`, scrollTo: 1 },
  { id: "hw-pmo", slug: "daem-spi-hwadi", local: true, url: `${HWADI}/internal-environment/pmo-dashboard` },
  { id: "hw-executive", slug: "daem-spi-hwadi", local: true, url: `${HWADI}/internal-environment/executive-director` },
  { id: "hw-demographics", slug: "daem-spi-hwadi", local: true, url: `${HWADI}/external-environment/demographic-analysis` },

  // ── ETOLV new portal (live, demo account from env: ETOLV_DEMO_USER / ETOLV_DEMO_PASS) ──
  // Customers / suppliers lists hold personal data — never capture them.
  { id: "et-home", slug: "etolv-tourism-erp", auth: "etolv", url: `${ETOLV}/home`, schemes: ["light", "dark"], dismiss: ETOLV_DISMISS, blur: ETOLV_CHART_LABELS },
  { id: "et-quick-access", slug: "etolv-tourism-erp", auth: "etolv", url: `${ETOLV}/home`, scrollTo: 0.85, dismiss: ETOLV_DISMISS, blur: ETOLV_CHART_LABELS },
  { id: "et-umrah", slug: "etolv-tourism-erp", auth: "etolv", url: `${ETOLV}/umrah`, dismiss: ETOLV_DISMISS },
  { id: "et-statistics", slug: "etolv-tourism-erp", auth: "etolv", url: `${ETOLV}/statistics/home`, dismiss: ETOLV_DISMISS },
  { id: "et-hrm", slug: "etolv-tourism-erp", auth: "etolv", url: `${ETOLV}/hrm`, schemes: ["light", "dark"], dismiss: ETOLV_DISMISS },
  { id: "et-contracts", slug: "etolv-tourism-erp", auth: "etolv", url: `${ETOLV}/contracts`, dismiss: ETOLV_DISMISS },

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

/**
 * Short screen recordings (MP4). Same fields as targets, plus `steps` that play while recording.
 * Logins (auth) happen in a separate unrecorded browser context first.
 */
export const videos = [
  {
    id: "rs-partnerships-tour",
    slug: "film-sa-red-sea",
    url: `${RED_SEA}/main/rsg-analysis/partnerships`,
    steps: [
      // Hovering a card expands it over the others, so park the mouse between hovers.
      { wait: 900 },
      { hover: ".card >> nth=0" }, { wait: 1100 }, { move: [700, 300] }, { wait: 500 },
      { hover: ".card >> nth=1" }, { wait: 1100 }, { move: [700, 300] }, { wait: 500 },
      { hover: ".card >> nth=2" }, { wait: 1100 }, { move: [700, 300] }, { wait: 500 },
      { click: ".card >> nth=1" }, { wait: 2400 },
      { click: ".back-button" }, { wait: 1500 },
      { click: ".card >> nth=3" }, { wait: 2400 },
    ],
  },
  {
    id: "hw-dashboards-tour",
    slug: "daem-spi-hwadi",
    url: `${HWADI}/internal-environment/group-ceo`,
    steps: [
      { wait: 1800 },
      { click: "button:has-text('Financial Accounting')" }, { wait: 2200 },
      { dispatch: 'a[href$="cfo-dashboard"]' }, { wait: 2200 },
      { scroll: 1 }, { wait: 1200 },
      { dispatch: 'a[href$="pmo-dashboard"]' }, { wait: 2200 },
      { dispatch: 'a[href$="executive-director"]' }, { wait: 2400 },
    ],
  },
  {
    id: "et-portal-tour",
    slug: "etolv-tourism-erp",
    auth: "etolv",
    url: `${ETOLV}/home`,
    dismiss: ETOLV_DISMISS,
    blur: ETOLV_CHART_LABELS,
    // Videos can't be blurred frame by frame: blur the whole staff-names chart instead.
    hideCss: "canvas{filter:blur(9px)}",
    steps: [
      { wait: 1500 },
      { scroll: 0.85 }, { wait: 1500 },
      { click: "text=HRM >> nth=-1" }, { wait: 2500 },
    ],
  },
];
