"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { SiteContent } from "@/content/types";
import {
  containerStagger,
  itemBlurUp,
  itemRise,
  viewport,
} from "@/lib/motion-presets";
import { useScrollSectionMotion } from "@/lib/use-scroll-section";
import { PointerGlow } from "@/components/portfolio/pointer-glow";

export function SkillsSection({ skills }: { skills: SiteContent["skills"] }) {
  const reduce = useReducedMotion();
  const { ref, motionStyle } = useScrollSectionMotion();

  return (
    <section
      ref={ref}
      id="skills"
      className="border-b border-[var(--card-border)] py-20 md:py-28"
    >
      <motion.div style={motionStyle} className="will-change-transform">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <motion.div
            variants={containerStagger(!!reduce, 0.12, 0)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="max-w-2xl"
          >
            <motion.p
              variants={itemBlurUp(!!reduce)}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]"
            >
              {skills.kicker}
            </motion.p>
            <motion.h2
              variants={itemBlurUp(!!reduce)}
              className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl rtl:leading-snug"
            >
              {skills.title}
            </motion.h2>
            <motion.p
              variants={itemBlurUp(!!reduce)}
              className="mt-4 text-[var(--muted)] md:text-lg"
            >
              {skills.description}
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger(!!reduce, 0.09, 0.06)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-stretch"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {skills.tiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  variants={itemRise(!!reduce)}
                  className={`min-h-0 ${index === skills.tiers.length - 1 ? "sm:col-span-2" : ""}`}
                >
                  <PointerGlow className="h-full min-h-0 w-full rounded-[var(--radius-bento)]">
                    <div className="glass-card flex h-full min-h-0 flex-col overflow-hidden rounded-[inherit] p-5 shadow-md md:p-6">
                      <h3 className="text-base font-semibold text-[var(--foreground)]">
                        {tier.name}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                        {tier.items}
                      </p>
                    </div>
                  </PointerGlow>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={itemRise(!!reduce)}
              className="min-h-0 lg:flex lg:flex-col"
            >
              <PointerGlow className="h-full min-h-0 w-full rounded-[var(--radius-bento)] lg:flex-1">
                <div className="glass-card flex h-full min-h-0 flex-col overflow-hidden rounded-[inherit] p-6 shadow-md ring-1 ring-[var(--accent)]/10 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--violet)]">
                    {skills.domain.kicker}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight text-[var(--foreground)] md:text-2xl">
                    {skills.domain.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] md:text-base">
                    {skills.domain.lead}
                  </p>
                  <ul className="mt-6 flex flex-1 flex-col gap-4 border-t border-[var(--card-border)] pt-6">
                    {skills.domain.bullets.map((b) => (
                      <li key={b.title}>
                        <p className="text-sm font-semibold text-[var(--foreground)]">
                          {b.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                          {b.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </PointerGlow>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerStagger(!!reduce, 0.1, 0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mt-10"
          >
            <motion.div variants={itemRise(!!reduce)}>
              <PointerGlow className="w-full rounded-[var(--radius-bento)]">
                <div className="glass-card flex min-h-0 flex-col overflow-hidden rounded-[inherit] p-6 shadow-md md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--violet)]">
                    {skills.extras.label}
                  </p>
                  <ul className="mt-6 grid gap-8 md:grid-cols-2 md:gap-10">
                    {skills.extras.items.map((item) => (
                      <li key={item.name}>
                        <h3 className="font-semibold text-[var(--foreground)]">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                          {item.detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </PointerGlow>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
