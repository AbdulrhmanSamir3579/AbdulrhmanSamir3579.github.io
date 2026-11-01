"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { SiteContent } from "@/content/types";
import {
  containerStagger,
  itemBlurUp,
  viewport,
} from "@/lib/motion-presets";
import { useScrollSectionMotion } from "@/lib/use-scroll-section";

export function AboutSection({ about }: { about: SiteContent["about"] }) {
  const reduce = useReducedMotion();
  const { ref, motionStyle } = useScrollSectionMotion();

  return (
    <section
      ref={ref}
      id="about"
      className="border-b border-[var(--card-border)] py-20 md:py-28"
    >
      <motion.div style={motionStyle} className="will-change-transform">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          <motion.div
            variants={containerStagger(!!reduce, 0.1, 0)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <motion.p
              variants={itemBlurUp(!!reduce)}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]"
            >
              {about.eyebrow}
            </motion.p>
            <motion.h2
              variants={itemBlurUp(!!reduce)}
              className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl rtl:leading-snug"
            >
              {about.headline}
            </motion.h2>
          </motion.div>

          <motion.div
            variants={containerStagger(!!reduce, 0.14, 0.04)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="space-y-6 md:text-lg md:leading-relaxed"
          >
            {about.paragraphs.map((text, i) => (
              <motion.p
                key={i}
                variants={itemBlurUp(!!reduce)}
                className={i === 0 ? "text-[var(--foreground)]" : "text-[var(--muted)]"}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
      </motion.div>
    </section>
  );
}
