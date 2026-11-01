"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ArrowUpRight, Briefcase } from "lucide-react";
import type { ExperienceView, SiteContent } from "@/content/types";
import {
  containerStagger,
  itemBlurUp,
  itemRise,
  viewport,
} from "@/lib/motion-presets";
import { useScrollSectionMotion } from "@/lib/use-scroll-section";
import { PointerGlow } from "@/components/portfolio/pointer-glow";

type Props = {
  copy: Pick<SiteContent["experience"], "kicker" | "title" | "description">;
  items: ExperienceView[];
};

export function ExperienceSection({ copy, items }: Props) {
  const reduce = useReducedMotion();
  const { ref, motionStyle } = useScrollSectionMotion();

  return (
    <section
      ref={ref}
      id="experience"
      className="border-b border-[var(--card-border)] py-20 md:py-28"
    >
      <motion.div style={motionStyle} className="will-change-transform">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <motion.div
            variants={containerStagger(!!reduce, 0.1, 0)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="max-w-2xl"
          >
            <motion.p
              variants={itemBlurUp(!!reduce)}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]"
            >
              {copy.kicker}
            </motion.p>
            <motion.h2
              variants={itemBlurUp(!!reduce)}
              className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl rtl:leading-snug"
            >
              {copy.title}
            </motion.h2>
            <motion.p variants={itemBlurUp(!!reduce)} className="mt-4 text-[var(--muted)] md:text-lg">
              {copy.description}
            </motion.p>
          </motion.div>

          <motion.ol
            variants={containerStagger(!!reduce, 0.12, 0.06)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="relative mt-14 space-y-8 border-s border-[var(--card-border)] ps-6 md:ps-10"
          >
            {items.map((job) => (
              <motion.li key={job.id} variants={itemRise(!!reduce)} className="relative">
                <span
                  aria-hidden
                  className="absolute -start-[calc(1.5rem+7px)] top-7 h-3.5 w-3.5 rounded-full border-2 border-[var(--accent)] bg-[var(--background)] md:-start-[calc(2.5rem+7px)]"
                />
                <PointerGlow className="w-full rounded-[var(--radius-bento)]">
                  <article className="glass-card rounded-[inherit] p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                      <div className="flex items-start gap-4">
                        <span className="glass-surface flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)]/70 text-[var(--accent)] ring-1 ring-[var(--accent)]/40">
                          <Briefcase className="h-5 w-5" aria-hidden />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--foreground)]">
                            {job.url ? (
                              <a
                                href={job.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-text-muted"
                              >
                                {job.org}
                              </a>
                            ) : (
                              job.org
                            )}
                          </h3>
                          <ul className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-[var(--muted)]">
                            {job.roles.map((role, i) => (
                              <li key={role} className="flex items-center gap-2">
                                {i > 0 ? (
                                  <span aria-hidden className="text-[var(--accent)]">
                                    ·
                                  </span>
                                ) : null}
                                {role}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-[var(--muted)]">
                        {job.period} · {job.location}
                      </p>
                    </div>

                    <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-[var(--muted)] md:text-[0.95rem]">
                      {job.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {job.projectLinks.length ? (
                      <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--card-border)] pt-4">
                        {job.projectLinks.map((p) => (
                          <Link
                            key={p.href}
                            href={p.href}
                            className="btn-secondary glass-surface inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-[var(--foreground)]"
                          >
                            {p.title}
                            <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent)] rtl:-scale-x-100" aria-hidden />
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </article>
                </PointerGlow>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </motion.div>
    </section>
  );
}
