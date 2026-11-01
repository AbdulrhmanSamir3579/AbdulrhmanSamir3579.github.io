"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ArrowRight } from "lucide-react";
import type { ProjectCardView } from "@/content/types";
import { StackChips } from "@/components/portfolio/project-links";
import { PointerGlow } from "@/components/portfolio/pointer-glow";
import { useLocale } from "@/i18n/locale-provider";
import { containerStagger, itemRise, viewport } from "@/lib/motion-presets";

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
        <motion.li key={p.slug} variants={itemRise(!!reduce)} className="min-h-0">
          <PointerGlow className="h-full w-full rounded-[var(--radius-bento)]">
            <article className="glass-card flex h-full flex-col rounded-[inherit] p-6">
              <p className="text-xs font-medium text-[var(--muted)]">
                {p.org} · {p.period}
              </p>
              <h4 className="mt-2 font-semibold text-[var(--foreground)]">
                <Link href={p.href} className="link-text-muted">
                  {p.title}
                </Link>
              </h4>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">{p.summary}</p>
              <div className="mt-4">
                <StackChips stack={p.stack} />
              </div>
              <Link
                href={p.href}
                className="link-text mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)]"
              >
                {ui.caseStudy.read}
                <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              </Link>
            </article>
          </PointerGlow>
        </motion.li>
      ))}
    </motion.ul>
  );
}
