/** Hide the Next.js dev-tools badge when capturing a dev server. */
const LEEN_CSS = "nextjs-portal{display:none!important}";
const LEEN = "http://localhost:3000";
const RED_SEA = "http://127.0.0.1:4201";
const HWADI = "http://127.0.0.1:4202/dashboard/xp";
const EPATH = "https://demo.skyapps.me";
const ETOLV = "https://portal.etolv.net/newportal";
/** The weak-password notice on ETOLV's home page: close it, never click "Change password". */
const ETOLV_DISMISS = [".home-alert__close"];
/** "Top officers" chart draws staff names on its canvas — blur the label column. */
const ETOLV_CHART_LABELS = [{ selector: "canvas", x: 0, y: 0, w: 0.17, h: 1 }];
/** ePath list pages open on the form tab; this switches to the list ("القائمة"). */
const EPATH_LIST_AR = [{ click: 'text="القائمة"' }, { wait: 1500 }];

/**
 * What to capture. URLs and steps only — never credentials. One distinct page per shot:
 * vary dark mode and language across pages instead of repeating the same page.
 *
 * - `id`        stable id; the file becomes `<id>-<device>-<scheme>.webp`
 * - `slug`      project slug in web/src/content/projects.ts
 * - `part`      Comply360 suite part id (optional)
 * - `scrollTo`  scroll this many viewport heights before the shot (0 = top)
 * - `devices`   default ["desktop"]
 * - `schemes`   default ["light"]
 * - `storage`   localStorage set before load (e.g. ePath `{ lang: "en" }`)
 * - `auth`      "epath" | "etolv" | "leen" — log in once per browser context first (see capture.mjs)
 * - `local`     a local dev build (skips the generic cookie-banner clicker)
 * - `steps`     [{ wait } | { hover } | { move } | { click } | { dispatch } | { scroll } | { goto }]
 * - `dismiss`   selectors of notices to close if visible
 * - `blur`      regions to blur: { selector, x, y, w, h } as fractions of the element box
 * - `hideCss`   CSS injected before the shot
 */
export const targets = [
  // ── Comply360 & the 360 suite (public pages only) ─────────────────────────
  { id: "comply-home", slug: "comply360", part: "comply360", url: "https://comply360.tech/", devices: ["desktop", "mobile"] },
  { id: "comply-capabilities", slug: "comply360", part: "comply360", url: "https://comply360.tech/", scrollTo: 1 },
  { id: "comply-pricing", slug: "comply360", part: "comply360", url: "https://comply360.tech/pricing" },
  { id: "comply-about", slug: "comply360", part: "comply360", url: "https://comply360.tech/about-us" },
  { id: "comply-signin", slug: "comply360", part: "comply360", url: "https://client.comply360.tech/auth/sign-in" },

  { id: "eco-home", slug: "comply360", part: "360-technologies", url: "https://360-technologies.com/en/", devices: ["desktop", "mobile"] },
  { id: "eco-ar", slug: "comply360", part: "360-technologies", url: "https://360-technologies.com/ar/", scrollTo: 1.1 },
  { id: "eco-journey", slug: "comply360", part: "360-technologies", url: "https://360-technologies.com/en/", scrollTo: 2.4 },

  { id: "signals-home", slug: "comply360", part: "signals360", url: "https://dev.signals360.tech/", devices: ["desktop", "mobile"] },
  { id: "signals-sectors", slug: "comply360", part: "signals360", url: "https://dev.signals360.tech/sectors" },
  { id: "signals-why-egypt", slug: "comply360", part: "signals360", url: "https://dev.signals360.tech/why-egypt" },

  { id: "belvro-home", slug: "comply360", part: "belvro-wealth", url: "https://belvrowealth.com/", devices: ["desktop", "mobile"] },
  { id: "belvro-how", slug: "comply360", part: "belvro-wealth", url: "https://belvrowealth.com/how-it-works" },

  // ── SkyApps website (Arabic at the root, English under /en) ───────────────
  { id: "sky-home", slug: "skyapps-website", url: "https://website.skyapps.me/", devices: ["desktop", "mobile"] },
  { id: "sky-home-en", slug: "skyapps-website", url: "https://website.skyapps.me/en/" },
  { id: "sky-pricing", slug: "skyapps-website", url: "https://website.skyapps.me/pricing/" },
  { id: "sky-sectors", slug: "skyapps-website", url: "https://website.skyapps.me/sectors/" },
  { id: "sky-solutions", slug: "skyapps-website", url: "https://website.skyapps.me/en/solutions/" },
  { id: "sky-contact", slug: "skyapps-website", url: "https://website.skyapps.me/contact/" },

  // ── ePath / SkyApps ERP (demo login from env: EPATH_DEMO_USER / EPATH_DEMO_PASS) ──
  { id: "epath-home", slug: "epath-erp", auth: "epath", url: `${EPATH}/`, devices: ["desktop", "mobile"] },
  { id: "epath-journals", slug: "epath-erp", auth: "epath", url: `${EPATH}/finance/journals`, steps: EPATH_LIST_AR },
  { id: "epath-approval", slug: "epath-erp", auth: "epath", url: `${EPATH}/finance/entries-approval`, storage: { lang: "en" } },
  { id: "epath-trial-balance", slug: "epath-erp", auth: "epath", url: `${EPATH}/finance/total-report`, schemes: ["dark"] },
  { id: "epath-chart-of-accounts", slug: "epath-erp", auth: "epath", url: `${EPATH}/finance/chart-of-accounts`, storage: { lang: "en" } },
  { id: "epath-purchase-orders", slug: "epath-erp", auth: "epath", url: `${EPATH}/purchases/orders`, steps: EPATH_LIST_AR },
  { id: "epath-stock-movements", slug: "epath-erp", auth: "epath", url: `${EPATH}/inventory/stock-movements`, schemes: ["dark"], storage: { lang: "en" } },
  { id: "epath-dashboard-en", slug: "epath-erp", auth: "epath", url: `${EPATH}/`, schemes: ["dark"], storage: { lang: "en" } },

  // ── Leen (local seeded build: start ~/Personal/markaz with `pnpm db:up && pnpm dev`) ──
  { id: "leen-dashboard", slug: "leen", auth: "leen", url: `${LEEN}/ar/dashboard`, devices: ["desktop", "mobile"], hideCss: LEEN_CSS },
  { id: "leen-schedule", slug: "leen", auth: "leen", url: `${LEEN}/ar/schedule`, schemes: ["dark"], hideCss: LEEN_CSS },
  { id: "leen-students", slug: "leen", auth: "leen", url: `${LEEN}/ar/students`, hideCss: LEEN_CSS },
  { id: "leen-question-bank", slug: "leen", auth: "leen", url: `${LEEN}/ar/exams/bank`, hideCss: LEEN_CSS },
  { id: "leen-payments", slug: "leen", auth: "leen", url: `${LEEN}/ar/finance/payments`, schemes: ["dark"], hideCss: LEEN_CSS },
  { id: "leen-honor-board", slug: "leen", auth: "leen", url: `${LEEN}/ar/honor-board`, hideCss: LEEN_CSS },
  { id: "leen-groups-en", slug: "leen", auth: "leen", url: `${LEEN}/en/groups`, hideCss: LEEN_CSS },
  { id: "leen-public-page", slug: "leen", local: true, url: `${LEEN}/ar/c/al-nour-demo`, devices: ["desktop", "mobile"], hideCss: LEEN_CSS },

  // ── Red Sea (local: clone AbdulrhmanSamir3579/red-sea-frontend, `npx ng serve --port 4201`) ──
  // Only the Partnerships page is built in that repo; the video shows its interactions.
  { id: "rs-partnerships", slug: "film-sa-red-sea", local: true, url: `${RED_SEA}/main/rsg-analysis/partnerships` },
  { id: "rs-partner-details", slug: "film-sa-red-sea", local: true, url: `${RED_SEA}/main/rsg-analysis/partnerships`, steps: [{ click: ".card >> nth=1" }, { wait: 1600 }] },

  // ── Hwadi (local: clone Next-devteam/hwadi_dashboard_front, `npx ng serve --port 4202`) ──
  { id: "hw-group-ceo", slug: "daem-spi-hwadi", local: true, url: `${HWADI}/internal-environment/group-ceo` },
  { id: "hw-cfo", slug: "daem-spi-hwadi", local: true, url: `${HWADI}/internal-environment/cfo-dashboard` },
  { id: "hw-cfo-balances", slug: "daem-spi-hwadi", local: true, url: `${HWADI}/internal-environment/cfo-dashboard`, scrollTo: 1 },
  { id: "hw-pmo", slug: "daem-spi-hwadi", local: true, url: `${HWADI}/internal-environment/pmo-dashboard` },
  { id: "hw-executive", slug: "daem-spi-hwadi", local: true, url: `${HWADI}/internal-environment/executive-director` },
  { id: "hw-demographics", slug: "daem-spi-hwadi", local: true, url: `${HWADI}/external-environment/demographic-analysis` },

  // ── ETOLV new portal (live, demo account from env: ETOLV_DEMO_USER / ETOLV_DEMO_PASS) ──
  // Users, customers, suppliers, Masar Hajj, disbursement forms and messages show personal data — never capture them.
  { id: "et-home", slug: "etolv-tourism-erp", auth: "etolv", url: `${ETOLV}/home`, dismiss: ETOLV_DISMISS, blur: ETOLV_CHART_LABELS },
  { id: "et-quick-access", slug: "etolv-tourism-erp", auth: "etolv", url: `${ETOLV}/home`, scrollTo: 0.85, dismiss: ETOLV_DISMISS, blur: ETOLV_CHART_LABELS },
  { id: "et-statistics", slug: "etolv-tourism-erp", auth: "etolv", url: `${ETOLV}/statistics/home`, schemes: ["dark"], dismiss: ETOLV_DISMISS },
  { id: "et-hrm", slug: "etolv-tourism-erp", auth: "etolv", url: `${ETOLV}/hrm`, dismiss: ETOLV_DISMISS },
];

/**
 * Short screen recordings (MP4). Same fields as targets, plus `steps` that play while recording.
 * Logins (auth) happen in a separate unrecorded browser context first.
 */
export const videos = [
  {
    id: "epath-tour",
    slug: "epath-erp",
    auth: "epath",
    url: `${EPATH}/`,
    steps: [
      { wait: 2000 },
      { goto: `${EPATH}/finance/journals` }, ...EPATH_LIST_AR, { wait: 1200 },
      { goto: `${EPATH}/finance/entries-approval` }, { wait: 1800 },
      { goto: `${EPATH}/finance/total-report` }, { wait: 2000 },
      { goto: `${EPATH}/purchases/orders` }, ...EPATH_LIST_AR, { wait: 1500 },
    ],
  },
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
