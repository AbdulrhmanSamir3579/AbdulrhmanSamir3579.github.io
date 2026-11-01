import type { SiteContent } from "@/content/types";

export const en = {
  meta: {
    title: "Abdulrahman Samir · Senior Frontend Engineer",
    description:
      "Senior Frontend Engineer specializing in enterprise ERP, FinTech and analytics platforms. Angular expert (v8–22) with production NestJS backend experience. Selected work: Comply360, the SkyApps ERP, and more.",
    ogAlt: "Abdulrahman Samir — Senior Frontend Engineer portfolio",
  },
  person: {
    name: "Abdulrahman Samir",
    alternateName: "عبدالرحمن سمير",
    jobTitle: "Senior Frontend Engineer",
    headerTagline: "Senior Frontend Engineer · Angular · NestJS",
    location: "Cairo, Egypt",
  },
  hero: {
    badge: "Angular expert · ERP & financial systems · data visualization",
    eyebrow: "Portfolio · Senior Frontend Engineer",
    title: "Enterprise products, from the first screen to the API",
    lead:
      "I specialize in enterprise ERP, FinTech and analytics platforms across LegalTech, GovTech and Tourism. I own frontend architecture in Angular, build production backends in NestJS when the product needs it, and keep public sites at 100 on Lighthouse.",
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
        title: "Quality you can measure",
        detail:
          "100 Lighthouse scores, Core Web Vitals, accessibility, and SEO plus generative-engine optimization for AI search.",
      },
    ],
    panelLink: "View skills",
  },
  about: {
    eyebrow: "About",
    headline: "A senior frontend engineer who understands the business behind the screens.",
    paragraphs: [
      "I’m Abdulrahman, a Senior Frontend Engineer based in Cairo. I’ve worked with Angular from v8 to v22 — Signals, NgRx, RxJS, SSR and Nx monorepos — and today I own the frontend architecture of a five-product SaaS suite and lead its frontend team through architecture, code review and mentoring.",
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
        name: "Backend (production)",
        items: "Node.js — NestJS, Express; REST API design, WebSockets, Prisma ORM",
      },
      {
        name: "Proficient",
        items: "React, Next.js (SSR/SSG), Zustand, Redux, Tailwind CSS",
      },
      {
        name: "Data & integrations",
        items:
          "PostgreSQL, SQL Server, MongoDB, Redis · payment gateways (Stripe, multi-gateway) · storage APIs (AWS S3, Google Cloud Storage, Google Drive) · Firebase, JWT auth, Google Maps",
      },
      {
        name: "Testing, delivery & performance",
        items:
          "Jasmine, Karma, Cypress, Vitest · GitHub Actions, Docker · Lighthouse / Core Web Vitals, code splitting, lazy loading, WCAG, SEO & GEO/AEO",
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
          body: "Themeable chart systems on Chart.js, ECharts, ApexCharts and D3 — reusable across products, not one-off widgets.",
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
    extras: {
      label: "Also in the toolbox",
      items: [
        {
          name: "AI-assisted engineering",
          detail: "Claude Code and Cursor in my daily workflow — for refactors, reviews and tests, with a human in charge of the design.",
        },
        {
          name: "Working knowledge",
          detail: ".NET Core with Entity Framework, and Jenkins. I can read and contribute; I don’t present them as production specialties.",
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
          "Own the frontend architecture of a five-product SaaS suite — Comply360, Expand360, Signals360, Masar and Belvro — in one Angular 22 Nx monorepo, and lead a two-engineer frontend team.",
          "Architected the suite’s configuration-driven wizard, dynamic-flow and templating engine.",
          "Built the shared authentication framework, component library and form infrastructure every app consumes.",
          "Sustain 100 Lighthouse scores and implement SEO plus generative-engine optimization (GEO/AEO).",
        ],
      },
      next: {
        org: "NEXT & Associates",
        location: "Cairo, Egypt",
        roles: ["Senior Frontend Engineer"],
        highlights: [
          "Architected frontend infrastructure for eight AI-powered GovTech platforms serving Saudi government agencies and enterprise clients.",
          "Delivered design-intensive public platforms, including Film SA and Red Sea.",
          "Built a Node.js file-processing service for 1 GB+ resumable uploads behind one storage abstraction for AWS S3, Google Cloud Storage and Google Drive.",
          "Standardized analytics dashboards on a unified, themeable data-visualization system.",
        ],
      },
      etolv: {
        org: "ETOLV",
        location: "Giza, Egypt",
        roles: ["Frontend Developer", "Senior Frontend Developer"],
        highlights: [
          "Architected a tourism ERP for travel agencies across MENA — accounting, CRM, CMS and Hajj/Umrah booking.",
          "Built the ERP’s financial core: multi-gateway payments, automated invoicing, reconciliation and audit trails.",
          "Led an 18-month Angular v8 → v18 migration, rebuilding 50+ components.",
          "Promoted to senior; mentored two engineers.",
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
      role: "Senior Frontend Engineer · frontend architecture owner",
      summary:
        "A five-product SaaS suite for market expansion, compliance and economic intelligence — one Angular 22 Nx monorepo, with Comply360 as the core product.",
      problem:
        "Companies entering a new market face licensing, legal-structure, tax and regulatory requirements that differ by country, city and jurisdiction. The suite turns that into guided, step-by-step flows — and has to do it across five products without each one rebuilding its own forms, auth and dashboards.",
      built: [
        "Own the frontend architecture: one Angular 22 Nx monorepo sharing UI, networking and feature libraries across Comply360, Expand360, Signals360, Masar and Belvro.",
        "Architected the configuration-driven wizard, dynamic-flow and templating engine — new multi-step flows and forms ship as configuration, not code, in every product.",
        "Built Comply360’s guided journey: pick a market, describe the business, and get a jurisdiction-specific compliance roadmap and readiness score.",
        "Established the shared authentication framework, component library and form infrastructure.",
        "Built Signals360’s dashboards on a themeable, scalable data-visualization architecture.",
        "Keep the public sites at 100 on Lighthouse, with SEO plus generative-engine optimization (GEO/AEO).",
      ],
      outcome:
        "One codebase, one design language and one flow engine behind every product in the suite. A new workflow is a configuration change instead of a new set of screens.",
      partCopy: {
        comply360: {
          summary:
            "Compliance intelligence for market entry: jurisdiction mapping, licensing, legal structure and tax requirements, a readiness score and a step-by-step roadmap.",
        },
        "360-technologies": {
          summary:
            "The umbrella site for the ecosystem — expansion, compliance and intelligence for multinationals, investment groups and government-linked entities.",
        },
        signals360: {
          summary:
            "Economic intelligence for Egypt: new-company signals, sector performance, regional indicators and investment opportunities in interactive dashboards.",
        },
        "belvro-wealth": {
          summary:
            "Arabic-first financial advisory platform — website, client app and admin. I contributed to its Angular frontend inside the same Nx workspace.",
        },
      },
    },
    "epath-erp": {
      title: "ePath — SkyApps cloud ERP",
      org: "SkyApps",
      role: "Lead frontend engineer",
      summary:
        "A modern Angular 21 rebuild of a cloud accounting ERP — finance, sales, inventory, purchasing and system administration, in Arabic and English.",
      problem:
        "An established accounting ERP needed a modern frontend: dense financial screens, multi-stage approvals and full auditability, rebuilt without losing the domain rules accountants depend on.",
      built: [
        "Journal-entry management with multi-stage approval workflows.",
        "Line-level audit history that tracks edited, added and deleted revisions across accounts and partners.",
        "A shared component library, including a configurable smart table and an ECharts-based chart component.",
        "NgRx state (store, effects, entity) across the finance, sales, inventory, purchasing and systems modules.",
        "Bilingual Arabic/English UI with ngx-translate and Tailwind CSS, tested with Vitest.",
      ],
      outcome:
        "I’m the primary contributor to the rebuild. It runs today as the SkyApps ERP, with a public demo environment.",
    },
    "skyapps-website": {
      title: "SkyApps website",
      org: "SkyApps",
      role: "Sole developer",
      summary:
        "The Arabic-first marketing site for the SkyApps AI-powered cloud ERP, built from Figma in Next.js 16.",
      problem:
        "The ERP needed a fast, search-friendly sales site in Arabic and English, with content the marketing team can update without a developer.",
      built: [
        "Pixel-accurate implementation of the Figma design — Arabic-first RTL with a full English version (next-intl).",
        "Static export, with content managed from a CRM admin.",
        "An AI assistant chat widget.",
        "Automated visual-diff, accessibility, SEO, responsive and Lighthouse checks.",
      ],
      outcome: "Shipped solo, from design handoff to production.",
    },
    leen: {
      title: "Leen — tutoring-center platform",
      org: "Personal product",
      role: "Founder & full-stack engineer",
      summary:
        "A multi-tenant SaaS for running tutoring centers: scheduling, QR attendance, exams, finance and a parent portal — in Arabic and English.",
      problem:
        "Tutoring centers juggle schedules, attendance, payments and parent communication across paper, spreadsheets and chat groups.",
      built: [
        "Turborepo monorepo with a NestJS 11 API (about 35 modules), Prisma (57 models), PostgreSQL 16 and Redis.",
        "Next.js 15 web app (60+ pages) with TanStack Query, Tailwind CSS and next-intl — Arabic RTL and English, light and dark.",
        "Roles and subscription plans, QR-code attendance, exams, a schedule calendar, finance and reports.",
        "A parent portal and a public page for every center.",
      ],
      outcome:
        "Designed and built end to end by me — architecture, data model, API and UI.",
      note: "Private product — screenshots are from a local build with seeded demo data.",
    },
    "etolv-tourism-erp": {
      title: "Tourism ERP — Trio Travel",
      org: "ETOLV",
      role: "Frontend Developer → Senior Frontend Developer",
      summary:
        "A tourism ERP for travel agencies across MENA — accounting, CRM, reservations, HR and Hajj/Umrah — and its new Angular portal, which I helped upgrade and build.",
      problem:
        "Travel agencies run bookings, pilgrim groups, suppliers and accounting in one system — the financial records have to stay exact while the booking workflows keep growing.",
      built: [
        "Architected the platform’s frontend across the accounting, CRM, CMS and Hajj/Umrah booking modules.",
        "Upgraded the portal from Angular 8 to the new Angular 18 portal and built many of its modules: the analytics home, reservations and reports, Hajj & Umrah trips, HR and statistics — and kept contributing after 2024.",
        "Built the financial core: multi-gateway payments, automated invoicing, real-time reconciliation and audit trails.",
        "Designed an HR system from the ground up: payroll calculation, attendance tracking and compliance reporting for a 500+ employee organization.",
        "Led the 18-month Angular v8 → v18 migration, rebuilding 50+ components with a performance-first architecture.",
        "Automated localization across eight languages with a Python + Google Translate pipeline.",
      ],
      outcome:
        "Promoted to senior and mentored two engineers. The new portal and the accounting app are live in production — screenshots are from a demo account, with staff names blurred.",
    },
    "film-sa-red-sea": {
      title: "Film SA & Red Sea",
      org: "NEXT & Associates",
      role: "Senior Frontend Engineer",
      summary:
        "Design-intensive platforms for Saudi clients — the Film SA cash-rebate program and the Red Sea portal.",
      problem:
        "High-visibility public platforms with demanding design systems, plus a cash-rebate program whose applications need structured review and evaluation.",
      built: [
        "The Film SA cash-rebate admin (Angular 18) for reviewing and evaluating applications — I was its lead contributor.",
        "Pixel-perfect, animation-rich Angular implementations of complex design systems.",
        "The Red Sea Global analysis portal (Angular 19): a partnerships explorer where cards expand on hover and open detail views through Angular page-transition animations.",
      ],
      outcome:
        "Both shipped as flagship work for the studio’s Saudi clients. The Red Sea screens and video are from a local build of the frontend.",
    },
    "daem-spi-hwadi": {
      title: "DAEM & Hwadi",
      org: "NEXT & Associates",
      role: "Senior Frontend Engineer",
      summary:
        "GovTech platforms for Saudi government entities: the DAEM platform and the Hwadi strategy dashboard.",
      problem:
        "Government teams needed secure portals and analytics dashboards that share one consistent, themeable visual language.",
      built: [
        "DAEM (SPI) platform frontend in Angular 18 with server-side rendering — I was its lead contributor.",
        "Hwadi strategy dashboard (Angular 19, Chart.js), built solo: external-environment analysis plus executive dashboards for the chairman, group CEO, CFO, PMO and executive director.",
        "A unified, themeable data-visualization system (Chart.js, ECharts, ApexCharts) used across the studio’s platforms.",
        "An enterprise component library — authentication, complex data tables and dynamic form builders.",
        "An NgRx caching layer to cut redundant API traffic.",
      ],
      outcome:
        "Each new platform started from shared, working infrastructure instead of a blank repository. The Hwadi screens and video are from a local build with its built-in sample data.",
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
