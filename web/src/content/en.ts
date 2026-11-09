import type { SiteContent } from "@/content/types";

export const en = {
  meta: {
    title: "Abdulrahman Samir · Senior Frontend Engineer",
    description:
      "Senior Frontend Engineer with full-stack capability, specializing in enterprise ERP, FinTech and analytics platforms: frontend architecture plus production Node.js/NestJS backends. Selected work: Comply360, the SkyApps ERP, and more.",
    ogAlt: "Abdulrahman Samir — Senior Frontend Engineer portfolio",
  },
  person: {
    name: "Abdulrahman Samir",
    alternateName: "عبدالرحمن سمير",
    jobTitle: "Senior Frontend Engineer",
    headerTagline: "Senior Frontend Engineer · Full-Stack Capable",
    location: "Cairo, Egypt",
  },
  hero: {
    badge: "Frontend architecture · ERP & financial systems · data visualization",
    eyebrow: "Portfolio · Senior Frontend Engineer",
    title: "Enterprise products, from the first screen to the API",
    lead:
      "I specialize in enterprise ERP, FinTech and analytics platforms across LegalTech, GovTech and Tourism. I own frontend architecture end to end and build production backends in Node.js/NestJS when the product needs it, with working knowledge of .NET Core.",
    ctaWork: "See selected work",
    ctaContact: "Contact",
    panelKicker: "What I focus on",
    panelLead: "Where I add the most value on a team.",
    panelCards: [
      {
        title: "Financial & ERP systems",
        detail:
          "Accounting, journal entries, approvals, payroll, invoicing, reconciliation and audit trails — screens that have to be exactly right.",
      },
      {
        title: "Configuration over code",
        detail:
          "Wizard, dynamic-flow and templating engines so new workflows ship as configuration across a whole product suite.",
      },
      {
        title: "Frontend-led full stack",
        detail:
          "Production APIs in Node.js/NestJS with Prisma and PostgreSQL when the product needs them, plus working knowledge of .NET Core.",
      },
    ],
    panelLink: "View skills",
  },
  about: {
    eyebrow: "About",
    headline: "A senior frontend engineer who understands the business behind the screens.",
    paragraphs: [
      "I’m Abdulrahman, a Senior Frontend Engineer based in Cairo. I’ve worked with Angular from v8 to v22 — Signals, NgRx, RxJS, SSR and Nx monorepos — and today I'm the main engineer on a five-product SaaS suite, where I also review and merge the team's pull requests.",
      "Most of my work sits in domains where details matter: accounting and ERP finance, compliance, and government platforms. I like learning the domain well enough to model it properly — journal entries, approval chains, audit history, jurisdiction rules — instead of just drawing the forms.",
      "On the backend I build with Node.js — NestJS and Express, REST and WebSockets, Prisma on PostgreSQL — so I can deliver a feature end to end when the roadmap needs it. I build in Arabic and English, with RTL as a first-class layout rather than an afterthought.",
    ],
  },
  skills: {
    kicker: "Skills",
    title: "Deep in Angular, comfortable across the stack",
    description:
      "Grouped by how I actually use them — what I’m an expert in, what I run in production, and what I’m proficient with.",
    tiers: [
      {
        name: "Expert",
        items:
          "Angular (v8–22: Signals, NgRx, RxJS, SSR), TypeScript, Nx monorepos, SCSS architecture",
      },
      {
        name: "Backend",
        items: "Node.js — NestJS, Express; REST APIs, WebSockets, Prisma, PostgreSQL, Redis · .NET Core (working knowledge)",
      },
      {
        name: "Proficient",
        items: "React, Next.js (SSR/SSG, static export), TanStack Query, Tailwind CSS",
      },
      {
        name: "Integrations",
        items: "Payments (Stripe, Paymob) · Server-Sent Events · JWT auth · Google Maps and OpenStreetMap",
      },
      {
        name: "Testing & delivery",
        items: "Vitest, Jest, Playwright · GitHub Actions",
      },
    ],
    domain: {
      kicker: "Domain depth",
      title: "The problems I know best",
      lead: "Technology is the easy part to list. These are the domains I’ve shipped real products in.",
      bullets: [
        {
          title: "ERP & financial systems",
          body: "Accounting, journal entries, multi-stage approvals, payroll, invoicing, reconciliation and line-level audit trails.",
        },
        {
          title: "Data visualization",
          body: "Themeable chart systems on Chart.js, ECharts and Recharts, plus maps and 3D globes — reusable across products, not one-off widgets.",
        },
        {
          title: "Configuration-driven architecture",
          body: "Wizard, dynamic-flow and templating engines that let teams ship new multi-step workflows without new code.",
        },
        {
          title: "LegalTech, compliance & GovTech",
          body: "Market-entry compliance, government portals and high-security dashboards for Saudi and Egyptian clients.",
        },
        {
          title: "Bilingual, RTL-first products",
          body: "Arabic and English interfaces where right-to-left layout, typography and formatting are designed in from day one.",
        },
      ],
    },
  },
  experience: {
    kicker: "Experience",
    title: "Where I’ve worked",
    description: "Three companies, one thread: complex business products that have to be correct, fast and maintainable.",
    items: {
      expanders360: {
        org: "Expanders 360",
        location: "Egypt",
        roles: ["Senior Frontend Engineer"],
        highlights: [
          "Main engineer on the suite's Angular 22 Nx monorepo — Comply360, Expand360, Signals360, Masar and Belvro — and the reviewer who merges the team's pull requests.",
          "Upgraded the workspace to Angular 22, zoneless with OnPush everywhere, and built the shared flow engine, component library and form infrastructure.",
          "Shipped Comply360's access layer, compliance workspace, Stripe billing and real-time notifications.",
          "Built and deployed the bilingual 360 ecosystem site with SEO and generative-engine optimization (JSON-LD, hreflang, llms.txt).",
        ],
      },
      next: {
        org: "NEXT & Associates",
        location: "Cairo, Egypt",
        roles: ["Senior Frontend Engineer"],
        highlights: [
          "Lead contributor on the Film SA cash-rebate admin — the permission-driven workflow from application review to rebate payout.",
          "Built DAEM's Entertainment sector module, financial benchmarking and extractor, and the DAEM – Qiyas compliance platform for the Human Resources Development Fund.",
          "Built the Hwadi executive strategy dashboard alone, on a reusable Chart.js engine.",
          "Also delivered interfaces for Red Sea, Momah, Saudi WC and DT Requirements.",
        ],
      },
      etolv: {
        org: "ETOLV",
        location: "Giza, Egypt",
        roles: ["Frontend Developer", "Senior Frontend Developer"],
        highlights: [
          "Built much of the travel portal's reservations, Umrah, hotel, transport and incoming-tourism modules, plus customer invoices and proformas.",
          "Built the accounting app's invoicing, tax-authority e-invoicing and e-receipts, supplier payments, trial balance and P&L rework, and year-end closure.",
          "Moved modules to the new portal and added a shared reference-data cache.",
          "Promoted to senior frontend developer.",
        ],
      },
    },
  },
  work: {
    kicker: "Selected work",
    title: "Products I’ve built and shipped",
    description:
      "Real products, most of them live. Employer code is private, so these are case studies with screenshots and links to the running apps.",
    earlierTitle: "Earlier work",
    earlierDescription:
      "Case studies from previous roles, with screenshots and short videos from local builds and demo accounts.",
  },
  contact: {
    kicker: "Contact",
    title: "Let’s talk",
    description:
      "Open to senior frontend and full-stack roles, and to interesting product work. Email is the fastest way to reach me.",
    emailCta: "Email me",
    backToWork: "Back to work",
    footerNote: "Built with Next.js · deployed on GitHub Pages",
  },
  projects: {
    comply360: {
      title: "Comply360 & the 360 suite",
      org: "Expanders 360",
      role: "Senior Frontend Engineer · main engineer on the suite",
      summary: "A five-product SaaS suite for market expansion, compliance and economic intelligence — one Angular 22 Nx monorepo where I'm the main engineer, with Comply360 as the core product.",
      problem: "Companies entering a new market face licensing, legal-structure, tax and regulatory requirements that differ by country, city and jurisdiction. Five products had to turn that into guided workflows without each one rebuilding its own forms, access control and dashboards.",
      built: [
        {
          title: "Architecture & platform",
          items: [
            "Main engineer on the suite's Angular/Nx monorepo — about two-thirds of the commits on main across nine apps.",
            "Upgraded the workspace to Angular 22 and TypeScript 6, made all seven apps zoneless with OnPush change detection everywhere, and reorganized it into product-scoped libraries with Nx scope and type tags.",
            "Wrote the engineering standards as code and docs: unified error handling, validation and i18n gates, plus about 50 architecture docs (flow runner, drawers, data lists, API contracts, billing, deployment).",
            "Set up CI/CD: production deploy workflows per app, a new staging environment, and a Playwright end-to-end harness.",
          ],
        },
        {
          title: "Flow engine & component library",
          items: [
            "Built the shared flow engine — a contract-driven question runner with repeaters, record pickers, searchable trees, document uploads, rejected-answer handling, auto-retry and server-owned progress — that powers Comply360's incorporation and compliance journeys.",
            "Built the component and template library: five pixel-perfect Figma templates (dashboard, data list, record detail, tabbed record, wizard) plus about 30 workspace templates such as case review, document workspace, ownership graph and report builder.",
            "Built the form infrastructure: a config-driven table, one unified select for lazy, paginated and catalog data, form templates on Angular Signal Forms, and stacked deep-linkable drawers that keep the page's filters and scroll.",
          ],
        },
        {
          title: "Comply360",
          items: [
            "Built the client and admin apps from scratch: email OTP sign-in, registration and email verification, invitations, workspace selection and company onboarding.",
            "Built the compliance workspace: companies (people, licences, fees, cases), a document vault and permit workspace, locations, branches, premises and assets with a 5-step branch wizard and map picker, an obligations table and a compliance calendar.",
            "Built case-document review for admins — accept or reject each document with reasons and lifecycle states.",
            "Shipped billing end to end: an admin plan catalog with immutable versions, offers and access links, and Stripe checkout with trials, prorated upgrades, scheduled downgrades and invoices.",
            "Built the access layer: IAM users and invites, subject-access grants, and route, sidebar and action gating driven by the backend's access API.",
            "Built real-time notifications: a durable inbox in a bell popup with live Server-Sent Events, plus admin configuration and monitoring.",
          ],
        },
        {
          title: "Shared plumbing",
          items: [
            "One shared HTTP interceptor across the apps, a 429/5xx retry interceptor with backoff, a central API contract and error classifier, and pages that recover after a token refresh.",
            "Arabic and English with RTL in every app, a locale-aware date picker, and an i18n checker that keeps about 1,600 shared keys in sync.",
          ],
        },
        {
          title: "The rest of the suite",
          items: [
            "Expand360: company-incorporation steps, fee estimates with payment and progress tracking for clients; laws, fees, licences, providers, service rates, quotations and orders for admins; single sign-on through the shared IAM.",
            "Signals360: extended the chart builder with interactive filters, an x-axis slicer, mixed bar-and-line charts, bilingual labels, Excel date parsing and bulk chart creation.",
            "360 ecosystem site: built and deployed it solo — a statically prerendered bilingual Angular site with motion directives, JSON-LD, hreflang, a sitemap and llms.txt for search and AI discoverability.",
            "Belvro Wealth: scaffolded its Nx workspace (website, client and admin apps with shared core and UI libraries) and set up its nine deploy pipelines.",
            "Masar: set up its three Angular 21 apps — an SSR landing site, an investor and startup portal, and an admin — with production deploys.",
          ],
        },
      ],
      outcome: "One codebase, one design language and one flow engine behind every product in the suite. New workflows ship as configuration, and every app shares the same access, error-handling and i18n standards.",
      partCopy: {
        comply360: { summary: "Compliance intelligence for market entry: jurisdiction mapping, licensing, legal structure and tax requirements, guided by the flow engine." },
        "360-technologies": { summary: "The umbrella site for the ecosystem — expansion, compliance and intelligence for multinationals, investment groups and government-linked entities. I built and deployed it solo." },
        signals360: { summary: "Economic intelligence for Egypt: new-company signals, sector performance, regional indicators and investment opportunities. I extended its chart builder." },
        "belvro-wealth": { summary: "Arabic-first financial advisory platform. I scaffolded its Nx workspace and set up its deploy pipelines; most feature screens were built by a teammate." },
      },
    },
    "epath-erp": {
      title: "ePath — SkyApps cloud ERP",
      org: "SkyApps",
      role: "Main frontend engineer",
      summary: "A bilingual (Arabic/English) cloud accounting ERP rebuilt in Angular 21 and NgRx — finance, tax, purchasing, inventory and administration. I'm its main frontend engineer.",
      problem: "An established accounting ERP needed a modern frontend: dense financial screens, multi-stage approvals and full auditability, rebuilt without losing the domain rules accountants depend on.",
      built: [
        {
          title: "Finance & tax",
          items: [
            "Built the double-entry finance core: chart of accounts and cost centers as trees, branch and bank accounts, partners, opening balances, and fiscal years with periods in the Gregorian or Hijri calendar.",
            "Built the full journal lifecycle: entries with metadata and journal types, an approvals screen with bulk unapprove, bulk posting with partial-success handling, quick two-line entries and automatic tax lines.",
            "Built receipt and expense vouchers with foreign-currency and exchange-rate handling, linked to their journal entries.",
            "Built the tax engine end to end — codes, rates, registrations, return schemes with a formula editor, tax returns with PDF export and tax transactions — and wired it into journals, item groups and purchase bills.",
            "Built the ledger report, trial balance and account statement, with filters and links back to source documents.",
          ],
        },
        {
          title: "Purchasing & inventory",
          items: [
            "Built purchasing from requisition to payment: RFQs with a quote comparison matrix and award, purchase orders, goods receipts, purchase bills with a 3-way match and override, posting and payment, and purchase returns with linked documents.",
            "Built about 13 inventory screens: items with kits, units and variants, item groups as trees, warehouses and bins, stock documents and counts, movements, balances, cost layers and reorder rules.",
          ],
        },
        {
          title: "Administration & access",
          items: [
            "Built the systems module: organization, branches, departments, currencies, banks, exchange rates, coding patterns, users and permission groups — with route guards and a permission check on every row action.",
          ],
        },
        {
          title: "Shared platform",
          items: [
            "Designed a library of about 47 shared components: a smart table with server pagination, saved columns and filters, a dual Gregorian/Hijri date picker, a searchable tree, map and account pickers, and server-fed selects.",
            "Built line-level audit history — added and removed rows, previous values, revision replay and restore — used across finance and systems.",
            "Set the CRUD page standard — one base component with add, edit, view, history and list modes, permission-aware actions and server validation errors on the right field — and applied it to about 80 screens.",
            "Structured state with NgRx (about 64 feature slices with entity adapters and effects), with Arabic/English and RTL across about 4,100 translation keys kept in parity, on the SkyApps Figma design system.",
            "Wrote the API contracts and module guides that shaped the backend work for purchasing, the chart builder, partners and exchange rates.",
          ],
        },
      ],
      outcome: "I wrote about three-quarters of the codebase's commits. The rebuilt ERP runs today as SkyApps, with a public demo.",
    },
    "skyapps-website": {
      title: "SkyApps website",
      org: "SkyApps",
      role: "Sole developer",
      summary: "The Arabic-first marketing site for the SkyApps cloud ERP — built solo from Figma in Next.js 16, from the first commit to production indexing in about six weeks.",
      problem: "The ERP needed a fast, search-friendly sales site in Arabic and English, with content the marketing team can update without a developer.",
      built: [
        {
          title: "Site & content",
          items: [
            "Built 11 pages from Figma — home (hero, sectors, showcase, assistant, pricing, testimonials), about, pricing with plan comparison and FAQ, sectors, solutions, partners, contact, blog and legal pages.",
            "Arabic at the root and English under /en with next-intl, an accessible language switch, and a lint rule that enforces RTL-safe CSS.",
            "Turned the SkyApps CRM into a headless CMS: content is pulled at build time over the repo's copy, with fallbacks and a version stamp so a CRM edit is picked up by the next build.",
            "Built lead capture that needs no server: the contact and demo forms post straight to the CRM with its validation rules, a honeypot, field-level errors, rate-limit handling and UTM data.",
            "Added a chat widget with suggested questions that guides visitors to book a demo.",
          ],
        },
        {
          title: "Delivery & quality",
          items: [
            "Shipped it as a static export to Apache, with locale flattening and a responsive image pipeline.",
            "SEO: hreflang, JSON-LD (organization, website, software application with offers, breadcrumbs, FAQ), a CRM-driven sitemap and robots, and Google Tag Manager with Consent Mode.",
            "Built a Figma-to-code pipeline with pixel-diff visual regression per page section, plus Lighthouse, axe accessibility, responsive, SEO and form test runners.",
            "Measured 100 for accessibility, best practices and SEO, and 99 for desktop performance, in Lighthouse.",
          ],
        },
      ],
      outcome: "Shipped solo, from design handoff to an indexed production site.",
    },
    leen: {
      title: "Leen — tutoring-center platform",
      org: "Personal product",
      role: "Founder & full-stack engineer",
      summary: "A multi-tenant SaaS for running tutoring centers: scheduling, QR attendance, exams, finance and a parent portal — in Arabic and English.",
      problem: "Tutoring centers juggle schedules, attendance, payments and parent communication across paper, spreadsheets and chat groups.",
      built: [
        {
          title: "Platform",
          items: [
            "Turborepo monorepo: a NestJS 11 API with Swagger, Prisma on PostgreSQL (57 models), Redis with BullMQ, and a Next.js 15 web app — all started with one command.",
            "Multi-tenant access: phone login, JWT, 20+ granular permissions shared by the API and UI, five default roles, custom roles on the top plan, and people who switch between several centers.",
            "Subscription plans with per-plan features, and a super-admin console for centers, plans, trials and feature overrides.",
          ],
        },
        {
          title: "Running a center",
          items: [
            "Academic setup from education presets (Egyptian national, Al-Azhar, IGCSE, American) with stages, grades, subjects and year-end promotion.",
            "A scheduling engine with conflict detection — hard blocks for teacher and room clashes, warnings for students and working hours — and a drag-and-drop weekly calendar.",
            "Center finance: charges and payments with automatic allocation, receipts, reversals, overdue tracking, cash close, expenses, teacher contracts and payroll, P&L, discounts and installments.",
            "QR and barcode attendance that keeps scanning offline, plus make-up sessions and absences.",
            "Exams: a question bank, an exam maker with printable papers, and online exams with automatic grading.",
          ],
        },
        {
          title: "Families & growth",
          items: [
            "A tokenized parent portal with online payment, HMAC-signed monthly reports, and notifications over WhatsApp, SMS and Telegram through BullMQ.",
            "A public page for every center with its open groups and bookings that feed a leads CRM, plus card payments through Paymob.",
            "An honor board with points and certificates, at-risk student detection, homework, a teacher's daily view and a student portal.",
            "Reports with KPIs and CSV export, Arabic and English with RTL, and light, dark and auto themes.",
          ],
        },
      ],
      outcome: "Designed and built end to end by me — architecture, data model, API and UI — plus the launch material: the rebrand, an Arabic sales brochure and competitor research.",
      note: "Private product — screenshots are from a local build with seeded demo data.",
    },
    "etolv-tourism-erp": {
      title: "Tourism ERP — Trio Travel",
      org: "ETOLV",
      role: "Frontend Developer → Senior Frontend Developer",
      summary: "A tourism ERP for travel agencies across MENA — reservations, Hajj and Umrah, hotels, transport, accounting and tax e-invoicing — across the original portal, the accounting app and the new Angular portal.",
      problem: "Travel agencies run bookings, pilgrim groups, suppliers and accounting in one system — the financial records have to stay exact while the booking workflows keep growing.",
      built: [
        {
          title: "Reservations & travel operations",
          items: [
            "Built much of the reservations engine: option bookings and ticket workflows, per-ticket currency rates, reissue profit, refund and void pricing, supplier fees and service charges.",
            "Built customer documents: reservation, visa and transportation proforma invoices with VAT before and after, a KSA-format invoice, and flight invoices and credit notes.",
            "Umrah: trip and room reports, a client-payment report, Excel import of reservations, and the Umrah contract with its print.",
            "Hotels: a children-policy module in hotel pricing, selling prices by market and day, room calculations for hotel contracts, and Excel import and export.",
            "Transportation: operation orders, timetables, odometer readings, commissions, driver tips and a vehicles report.",
            "Incoming tourism: guide, restaurant and sightseeing vouchers and payment orders, plus booking reports with filters and Excel export.",
          ],
        },
        {
          title: "Accounting & tax",
          items: [
            "Built invoicing: invoice types with credit and debit notes, per-line VAT and discounts, templates, receipts from invoices and an invoice account statement.",
            "Integrated tax-authority e-invoicing and POS e-receipts: sending, bulk send, returns, error handling and GS1/EGS item codes.",
            "Built the supplier-payment workflow with VAT, withholding tax, commissions, reverse calculations, server-side pagination and prints.",
            "Reworked the trial balance (tree and group views, opening balances, currency filter, Excel), rewrote profit and loss, and added financial-year closure, treasury reports and ledger prints.",
            "Built vouchers and ledger operations: keyboard-driven receipts and payments, exchange entries, cheques, payment orders, and a new currency-inventory (cash count) module.",
          ],
        },
        {
          title: "Platform",
          items: [
            "Moved modules from the Angular 8 portal to Portal 4 and retired the old booking module (about 46k lines).",
            "Added a shared cache for about 25 reference datasets, used by reports and payment forms.",
            "Arabic and English throughout, with RTL prints.",
          ],
        },
        {
          title: "The new portal (Angular 18)",
          items: [
            "Built modules for the new portal: HR attendance, Umrah trips with buses, contracts and Hajj, a rebuilt reservations flow, accounting reconciliation and cheque templates.",
            "Worked on its Angular/PrimeNG upgrade with OnPush performance work, a shared listing-page library, and Arabic, English and French translations.",
          ],
        },
      ],
      outcome: "Promoted to senior. The portal and the accounting app are in production — the screenshots are from a demo account of the new portal, with staff names blurred.",
    },
    "film-sa-red-sea": {
      title: "Film SA & Red Sea",
      org: "NEXT & Associates",
      role: "Senior Frontend Engineer · lead contributor on Film SA",
      summary: "Film SA's cash-rebate admin — the workflow that reviews and pays out production incentives — and the Red Sea Global analysis portal.",
      problem: "Every cash-rebate application has to be reviewed, scored, awarded and paid out through a controlled multi-stage workflow, with different roles acting at each step.",
      built: [
        {
          title: "Film SA cash-rebate admin",
          items: [
            "Built the app from an empty repository: structure, routing, admin layout, navigation and the dashboard home (request progress, performance leaderboard, task bucket).",
            "Built the permission-driven request workflow: one stepper takes each application from arrival through review, evaluation, requested documents, incentive awarding, progress reports, disbursement documents, rebate evaluation and payout — with steps shown by program type and permission.",
            "Built application review across about 15 sections (company, bank, project, cast, crew, script, budget, financing, locations…) with one-section-at-a-time loading and caching, status and remark modals, and a summary PDF.",
            "Built the cash-rebate evaluation: project and financial details, local and international scoring, evaluation reports and expenditure export.",
            "Built the rebate evaluation almost alone: line-by-line approval of expenses, payroll and wages with comments, completion percentages and final approval.",
            "Built incentive awarding (agreements), the progress-report tracker, disbursement documents, and the Talent & Crew module (lists, block and unblock, profiles, statistics).",
            "Built auth and the HTTP layer — JWT login with stored permissions, token and error interceptors, a role guard — and a shared component set (stepper, accordion, filters, dynamic modals, status buttons).",
          ],
        },
        {
          title: "Red Sea Global portal",
          items: [
            "Set up the Angular 19 base: layouts, routes, auth guard, token interceptor and Arabic/English.",
            "Built the Partnerships explorer: cards that expand on hover and open detail views through Angular page-transition animations.",
          ],
        },
      ],
      outcome: "Lead contributor on the Film SA admin, which runs the program's review and payout workflow. The Red Sea screens and video are from a local build of the frontend.",
    },
    "daem-spi-hwadi": {
      title: "DAEM & Hwadi",
      org: "NEXT & Associates",
      role: "Senior Frontend Engineer · lead contributor",
      summary: "AI-powered GovTech analytics for Saudi clients — the DAEM platform and its compliance spin-offs — and Hwadi, an executive strategy dashboard I built alone.",
      problem: "Government and enterprise leaders needed sector intelligence, compliance tracking and executive dashboards that read the same way across products.",
      built: [
        {
          title: "DAEM platform",
          items: [
            "Built the Entertainment sector module almost alone: an overview with CAGR, benchmarks, global trends, government direction, demographics on a map, X sentiment analysis and a world events calendar.",
            "Built financial benchmarking (country map, comparison view) and financial analysis, on chart-configuration services I wrote for line, multi-line, stacked and horizontal charts.",
            "Built the extractor and archiver — drag-and-drop financial-statement uploads with live progress — plus the landing page, a stock-exchange page with a 3D globe, and the project-management module.",
            "Added text-to-speech reading with the Web Speech API for the virtual advisor and the financial pages.",
          ],
        },
        {
          title: "DAEM – Qiyas & DT Requirements",
          items: [
            "DAEM – Qiyas, an AI compliance platform for the Human Resources Development Fund: built the DGA requirements module, the compliance report with PDF export, and the extractor with chunked uploads and AI-analysis status.",
            "Built its home with department performance and task assignment, auth with permission and role pipes, the issue modal and the notifications panel.",
            "Split DT Requirements out of DAEM into its own app, with color-coded compliance levels, file import and an auto-refreshing processing status.",
          ],
        },
        {
          title: "Hwadi (sole author)",
          items: [
            "Built the whole Hwadi dashboard: external-environment analysis and executive dashboards for the chairman, group CEO, CEO, CFO, PMO and directors.",
            "Built a reusable chart engine on Chart.js — line, bar, doughnut, stacked and combo charts with a shared palette and responsive font sizing — and widgets for cash, customer and vendor balances, budget versus actual, project P&L and resource utilization.",
            "Also built the users module of the Hwadi super-admin with NgRx, a reusable data table and signals-based auth.",
          ],
        },
      ],
      outcome: "Each platform started from patterns that already worked — charts, auth, uploads and tables — instead of a blank repository. The Hwadi screens and video are from a local build with its built-in sample data.",
    },
  },
  ui: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      work: "Work",
      contact: "Contact",
    },
    skipToContent: "Skip to main content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    homeAria: "Abdulrahman Samir — home",
    themeToLight: "Switch to light mode",
    themeToDark: "Switch to dark mode",
    switchLanguage: "العربية",
    switchLanguageAria: "اقرأ الموقع بالعربية",
    downloadCv: "Download CV",
    present: "Present",
    links: {
      suite: "360 suite",
      live: "Live app",
      site: "Website",
      demo: "Live demo",
      preview: "Preview",
    },
    badges: {
      private: "Private product",
      contribution: "Contribution",
    },
    gallery: {
      region: "{title} — screenshots",
      prev: "Previous screenshot",
      next: "Next screenshot",
      showSlide: "Show screenshot {n}",
      hint: "{n} screenshots · swipe or use the arrow keys",
      video: "Video",
    },
    caseStudy: {
      read: "Read case study",
      back: "All work",
      role: "Role",
      period: "Period",
      stack: "Stack",
      problem: "The problem",
      built: "What I built",
      outcome: "Outcome",
      parts: "Products in the suite",
      more: "More work",
    },
  },
} satisfies SiteContent;
