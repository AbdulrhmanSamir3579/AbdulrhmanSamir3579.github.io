"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ArrowRight } from "lucide-react";
import type { ProjectCardView } from "@/content/types";
import { ProjectMediaGallery } from "@/components/portfolio/project-media-gallery";
import { ProjectLinks, StackChips } from "@/components/portfolio/project-links";
import { PointerGlow } from "@/components/portfolio/pointer-glow";
import { fill, useLocale } from "@/i18n/locale-provider";
import { cardTheater } from "@/lib/motion-presets";

/** Shown until real screenshots land in `media.generated.json`. */
function ProjectCover({ title, org }: { title: string; org: string }) {
  return (
    <div className="mesh-hero relative flex aspect-[16/10] w-full flex-col justify-end overflow-hidden border-b border-white/20 bg-gradient-to-br from-[var(--accent-soft)] to-[var(--violet-soft)] p-6 dark:border-white/10">
      <div aria-hidden className="bg-grid-faint absolute inset-0 opacity-50" />
      <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
        {org}
      </p>
      <p className="relative mt-2 font-display text-2xl font-semibold text-[var(--foreground)]">
        {title}
      </p>
    </div>
  );
}

export function ProjectCard({ project }: { project: ProjectCardView }) {
  const reduce = useReducedMotion();
  const { ui } = useLocale();
  const articleRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start end", "end start"],
  });

  const mediaY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [18, -18]
  );

  // Cards show desktop shots; the case-study page shows everything.
  const media = project.media.filter((m) => m.device === "desktop").slice(0, 6);

  return (
    <PointerGlow className="h-full min-h-0 w-full rounded-[var(--radius-bento)]">
      <motion.article
        ref={articleRef}
        variants={cardTheater(!!reduce)}
        className="glass-card flex h-full min-h-0 flex-col overflow-hidden rounded-[inherit] shadow-lg"
      >
        <motion.div className="will-change-transform" style={{ y: mediaY }}>
          {media.length ? (
            <ProjectMediaGallery title={project.title} media={media} />
          ) : (
            <ProjectCover title={project.title} org={project.org} />
          )}
        </motion.div>

        <div className="flex flex-1 flex-col p-6 md:p-7">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[var(--muted)]">
            <span>{project.org}</span>
            <span aria-hidden>·</span>
            <span>{project.period}</span>
            {project.badge ? (
              <span className="rounded-full border border-[var(--card-border)] px-2.5 py-0.5 text-[var(--foreground)]">
                {ui.badges[project.badge]}
              </span>
            ) : null}
          </div>

          <h3 className="mt-3 text-lg font-semibold text-[var(--foreground)]">
            <Link href={project.href} className="link-text-muted">
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
            {project.summary}
          </p>

          {project.partNames?.length ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.partNames.map((n) => (
                <li
                  key={n}
                  dir="ltr"
                  className="glass-surface rounded-full px-2.5 py-0.5 text-xs font-semibold text-[var(--foreground)]"
                >
                  {n}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-4">
            <StackChips stack={project.stack} />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[var(--card-border)] pt-4">
            <Link
              href={project.href}
              className="link-text inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--foreground)]"
            >
              {ui.caseStudy.read}
              <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
            </Link>
            <ProjectLinks links={project.links} />
            {media.length > 1 ? (
              <span className="text-xs text-[var(--muted)]">
                {fill(ui.gallery.hint, { n: media.length })}
              </span>
            ) : null}
          </div>
        </div>
      </motion.article>
    </PointerGlow>
  );
}
