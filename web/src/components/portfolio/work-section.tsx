"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { ProjectCardView, SiteContent } from "@/content/types";
import { ProjectCard } from "@/components/portfolio/project-card";
import { EarlierWorkList } from "@/components/portfolio/earlier-work-list";
import {
  containerStagger,
  itemBlurUp,
  viewport,
} from "@/lib/motion-presets";
import { useScrollSectionMotion } from "@/lib/use-scroll-section";

type Props = {
  work: SiteContent["work"];
  featured: ProjectCardView[];
  earlier: ProjectCardView[];
};

export function WorkSection({ work, featured, earlier }: Props) {
  const reduce = useReducedMotion();
  const { ref, motionStyle } = useScrollSectionMotion();

  return (
    <section
      ref={ref}
      id="work"
      className="border-b border-[var(--card-border)] py-20 md:py-28"
    >
      <motion.div style={motionStyle} className="will-change-transform">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          variants={containerStagger(!!reduce, 0.11, 0)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="max-w-2xl"
        >
          <motion.p
            variants={itemBlurUp(!!reduce)}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]"
          >
            {work.kicker}
          </motion.p>
          <motion.h2
            variants={itemBlurUp(!!reduce)}
            className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl rtl:leading-snug"
          >
            {work.title}
          </motion.h2>
          <motion.p variants={itemBlurUp(!!reduce)} className="mt-4 text-[var(--muted)] md:text-lg">
            {work.description}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerStagger(!!reduce, 0.15, 0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-8 md:grid-cols-2"
        >
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} wide={i === 0} />
          ))}
        </motion.div>

        {earlier.length ? (
          <div className="mt-20">
            <h3 className="font-display text-2xl font-semibold tracking-tight">{work.earlierTitle}</h3>
            <p className="mt-2 max-w-2xl text-[var(--muted)]">{work.earlierDescription}</p>
            <EarlierWorkList projects={earlier} />
          </div>
        ) : null}
      </div>
      </motion.div>
    </section>
  );
}
