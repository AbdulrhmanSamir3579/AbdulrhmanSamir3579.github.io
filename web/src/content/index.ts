import "server-only";
import { localePath, type Locale } from "@/i18n/config";
import { formatPeriod } from "@/lib/format";
import { ar } from "@/content/ar";
import { en } from "@/content/en";
import { experienceMeta } from "@/content/experience";
import manifest from "@/content/media.generated.json";
import { projectMeta } from "@/content/projects";
import type {
  ExperienceView,
  MediaManifest,
  MediaView,
  ProjectCardView,
  ProjectCopy,
  ProjectMeta,
  ProjectSlug,
  SiteContent,
} from "@/content/types";

const dictionaries: Record<Locale, SiteContent> = { en, ar };
const media = manifest as MediaManifest;

export function getContent(lang: Locale): SiteContent {
  return dictionaries[lang];
}

function mediaFor(lang: Locale, slug: ProjectSlug, title: string): MediaView[] {
  const alt = dictionaries[lang].projects[slug].mediaAlt ?? {};
  return (media[slug] ?? []).map((m, i) => ({
    ...m,
    alt: alt[m.id] ?? `${title} — ${i + 1}`,
  }));
}

export type ProjectView = ProjectMeta &
  ProjectCopy & { href: string; period: string; media: MediaView[] };

export function getProject(lang: Locale, slug: string): ProjectView | undefined {
  const meta = projectMeta.find((p) => p.slug === slug);
  if (!meta) return undefined;
  const c = dictionaries[lang];
  const copy = c.projects[meta.slug];
  return {
    ...meta,
    ...copy,
    href: localePath(lang, `/work/${meta.slug}/`),
    period: formatPeriod(lang, meta.start, meta.end, c.ui.present),
    media: mediaFor(lang, meta.slug, copy.title),
  };
}

export function getProjectCards(lang: Locale): ProjectCardView[] {
  return projectMeta.map((meta) => {
    const p = getProject(lang, meta.slug)!;
    return {
      slug: p.slug,
      kind: p.kind,
      title: p.title,
      org: p.org,
      summary: p.summary,
      stack: p.stack,
      links: p.links,
      badge: p.badge,
      period: p.period,
      href: p.href,
      media: p.media,
      partNames: p.parts?.map((part) => part.name),
    };
  });
}

export function getExperience(lang: Locale): ExperienceView[] {
  const c = dictionaries[lang];
  return experienceMeta.map((meta) => ({
    ...meta,
    ...c.experience.items[meta.id],
    period: formatPeriod(lang, meta.start, meta.end, c.ui.present),
    projectLinks: meta.projects.map((slug) => ({
      title: c.projects[slug].title,
      href: localePath(lang, `/work/${slug}/`),
    })),
  }));
}

export const projectSlugs = projectMeta.map((p) => p.slug);
