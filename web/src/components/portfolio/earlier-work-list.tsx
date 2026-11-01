"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ArrowRight } from "lucide-react";
import type { ProjectCardView } from "@/content/types";
import { ProjectLinks, StackChips } from "@/components/portfolio/project-links";
import { PointerGlow } from "@/components/portfolio/pointer-glow";
import { useLocale } from "@/i18n/locale-provider";
import { containerStagger, itemRise, viewport } from "@/lib/motion-presets";

/** First still (a video's poster counts) — the compact cards show one image, not a gallery. */
function cover(p: ProjectCardView): string | undefined {
  const m = p.media.find((x) => x.device === "desktop");
  return m ? (m.type === "video" ? m.poster : m.src) : undefined;
}

export function EarlierWorkList({ projects }: { projects: ProjectCardView[] }) {
  const reduce = useReducedMotion();
  const { ui } = useLocale();

  return (
    <motion.ul
      variants={containerStagger(!!reduce, 0.1, 0.04)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="mt-8 grid gap-5 md:grid-cols-3"
    >
      {projects.map((p) => (
        <motion.li
          key={p.slug}
          variants={itemRise(!!reduce)}
          className="min-h-0"
        >
          <PointerGlow className="h-full w-full rounded-[var(--radius-bento)]">
            <article className="glass-card flex h-full flex-col overflow-hidden rounded-[inherit]">
              {cover(p) ? (
                <Link
                  href={p.href}
                  tabIndex={-1}
                  aria-hidden
                  className="block border-b border-white/20 dark:border-white/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cover(p)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover object-top"
                  />
                </Link>
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium text-[var(--muted)]">
                  {p.org} · {p.period}
                </p>
                <h4 className="mt-2 font-semibold text-[var(--foreground)]">
                  <Link href={p.href} className="link-text-muted">
                    {p.title}
                  </Link>
                </h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {p.summary}
                </p>
                <div className="mt-4">
                  <StackChips stack={p.stack} />
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <Link
                    href={p.href}
                    className="link-text inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--foreground)]"
                  >
                    {ui.caseStudy.read}
                    <ArrowRight
                      className="h-3.5 w-3.5 rtl:-scale-x-100"
                      aria-hidden
                    />
                  </Link>
                  <ProjectLinks links={p.links} />
                </div>
              </div>
            </article>
          </PointerGlow>
        </motion.li>
      ))}
    </motion.ul>
  );
}
