/**
 * Content model. Language-neutral facts live in `profile.ts`, `projects.ts` and `experience.ts`;
 * all copy lives in `en.ts` / `ar.ts` (both `satisfies SiteContent`, so EN/AR stay in parity).
 */

export type ProjectSlug =
  | "comply360"
  | "epath-erp"
  | "skyapps-website"
  | "leen"
  | "etolv-tourism-erp"
  | "film-sa-red-sea"
  | "daem-spi-hwadi";

export type OrgKey = "expanders360" | "next" | "etolv" | "skyapps" | "personal";
export type ExperienceId = "expanders360" | "next" | "etolv";

export type LinkKind = "live" | "site" | "demo" | "preview";
export type ProjectLink = { kind: LinkKind; href: string };

export type ProjectBadge = "private" | "contribution";

export type MediaAsset = {
  id: string;
  src: string;
  width: number;
  height: number;
  device: "desktop" | "mobile";
  scheme: "light" | "dark";
  /** Comply360 suite: which part the shot belongs to */
  part?: string;
  thumb?: string;
};

/** `media.generated.json` — written by tools/screenshots */
export type MediaManifest = Partial<Record<ProjectSlug, MediaAsset[]>>;

export type ProjectPartMeta = {
  id: string;
  name: string;
  contribution: "core" | "contribution";
  links: ProjectLink[];
};

export type ProjectMeta = {
  slug: ProjectSlug;
  kind: "featured" | "earlier";
  orgKey: OrgKey;
  /** ISO `YYYY-MM` */
  start: string;
  end: string | "present";
  stack: string[];
  links: ProjectLink[];
  badge?: ProjectBadge;
  parts?: ProjectPartMeta[];
};

export type ProjectCopy = {
  title: string;
  org: string;
  role: string;
  summary: string;
  problem: string;
  built: string[];
  outcome: string;
  note?: string;
  /** Copy for `ProjectMeta.parts`, keyed by part id */
  partCopy?: Record<string, { summary: string }>;
  /** alt text per media id */
  mediaAlt?: Record<string, string>;
};

export type MediaView = MediaAsset & { alt: string };

/** What the home-page card needs (no long-form fields, so it stays small over the wire). */
export type ProjectCardView = {
  slug: ProjectSlug;
  kind: ProjectMeta["kind"];
  title: string;
  org: string;
  summary: string;
  stack: string[];
  links: ProjectLink[];
  badge?: ProjectBadge;
  period: string;
  href: string;
  media: MediaView[];
  partNames?: string[];
};

export type ExperienceMeta = {
  id: ExperienceId;
  url?: string;
  start: string;
  end: string | "present";
  projects: ProjectSlug[];
};

export type ExperienceCopy = {
  org: string;
  location: string;
  roles: string[];
  highlights: string[];
};

export type ExperienceView = ExperienceMeta &
  ExperienceCopy & {
    period: string;
    projectLinks: { title: string; href: string }[];
  };

export type UiStrings = {
  nav: {
    home: string;
    about: string;
    skills: string;
    experience: string;
    work: string;
    contact: string;
  };
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  homeAria: string;
  themeToLight: string;
  themeToDark: string;
  /** Label of the *other* language, in that language (e.g. "العربية" on the EN site) */
  switchLanguage: string;
  switchLanguageAria: string;
  downloadCv: string;
  present: string;
  links: Record<LinkKind, string>;
  badges: Record<ProjectBadge, string>;
  gallery: {
    /** "{title} — screenshots" */
    region: string;
    prev: string;
    next: string;
    /** "Show screenshot {n}" */
    showSlide: string;
    /** "{n} screenshots · swipe or use the arrow keys" */
    hint: string;
  };
  caseStudy: {
    read: string;
    back: string;
    role: string;
    period: string;
    stack: string;
    problem: string;
    built: string;
    outcome: string;
    parts: string;
    more: string;
  };
};

export type SiteContent = {
  meta: { title: string; description: string; ogAlt: string };
  person: {
    name: string;
    /** Arabic name on the EN site and vice-versa — used for JSON-LD alternateName */
    alternateName: string;
    jobTitle: string;
    headerTagline: string;
    location: string;
  };
  hero: {
    badge: string;
    eyebrow: string;
    title: string;
    lead: string;
    ctaWork: string;
    ctaContact: string;
    panelKicker: string;
    panelLead: string;
    panelCards: { title: string; detail: string }[];
    panelLink: string;
  };
  about: {
    eyebrow: string;
    headline: string;
    paragraphs: string[];
  };
  skills: {
    kicker: string;
    title: string;
    description: string;
    tiers: { name: string; items: string }[];
    domain: {
      kicker: string;
      title: string;
      lead: string;
      bullets: { title: string; body: string }[];
    };
    extras: { label: string; items: { name: string; detail: string }[] };
  };
  experience: {
    kicker: string;
    title: string;
    description: string;
    items: Record<ExperienceId, ExperienceCopy>;
  };
  work: {
    kicker: string;
    title: string;
    description: string;
    earlierTitle: string;
    earlierDescription: string;
  };
  contact: {
    kicker: string;
    title: string;
    description: string;
    emailCta: string;
    backToWork: string;
    footerNote: string;
  };
  projects: Record<ProjectSlug, ProjectCopy>;
  ui: UiStrings;
};
