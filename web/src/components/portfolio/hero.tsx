"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ArrowDownRight, ArrowRight, FileDown, Sparkles } from "lucide-react";
import { TechMarquee } from "@/components/portfolio/tech-marquee";
import { profile } from "@/content/profile";
import type { SiteContent } from "@/content/types";
import { useDirSign, useLocale } from "@/i18n/locale-provider";
import {
  containerStagger,
  itemBlurUp,
  itemRise,
} from "@/lib/motion-presets";

function HeroOrbs({ reduce }: { reduce: boolean }) {
  const { scrollY } = useScroll();
  const ySlow = useTransform(scrollY, [0, 800], reduce ? [0, 0] : [0, 90]);
  const yFast = useTransform(scrollY, [0, 800], reduce ? [0, 0] : [0, -70]);
  const yMid = useTransform(scrollY, [0, 800], reduce ? [0, 0] : [0, 55]);
  const meshOpacity = useTransform(
    scrollY,
    [0, 600],
    reduce ? [1, 1] : [1, 0.4]
  );

  return (
    <>
      <motion.div
        style={{ opacity: meshOpacity }}
        className="mesh-hero pointer-events-none absolute inset-0 opacity-90"
      />
      <div className="bg-grid-faint pointer-events-none absolute inset-0 opacity-40 dark:opacity-25" />

      {!reduce && (
        <>
          <motion.div
            style={{ y: ySlow }}
            className="hero-orb pointer-events-none absolute -start-24 top-[10%] h-80 w-80 rounded-full bg-[var(--glow)] blur-3xl dark:opacity-70"
          />
          <motion.div
            style={{ y: yFast }}
            className="hero-orb pointer-events-none absolute -end-20 top-[24%] h-72 w-72 rounded-full bg-[var(--violet-soft)] blur-3xl"
          />
          <motion.div
            style={{ y: yMid }}
            className="hero-orb pointer-events-none absolute bottom-[12%] start-[42%] h-60 w-60 rounded-full bg-[var(--accent-soft)] blur-3xl"
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute start-[6%] top-[38%] h-2 w-2 rounded-full bg-[var(--accent)]"
            animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.4, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute end-[18%] top-[20%] h-1.5 w-1.5 rounded-full bg-[var(--violet)]"
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.6, 1] }}
            transition={{
              duration: 4.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
          />
        </>
      )}
    </>
  );
}

export function Hero({ hero, name }: { hero: SiteContent["hero"]; name: string }) {
  const reduce = useReducedMotion();
  const sign = useDirSign();
  const { ui } = useLocale();
  const { scrollY } = useScroll();
  const heroLift = useTransform(
    scrollY,
    [0, 720],
    reduce ? [0, 0] : [0, -40]
  );
  const decoPathY = useTransform(
    scrollY,
    [0, 600],
    reduce ? [0, 0] : [0, 14]
  );

  const words = name.split(" ");

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[var(--card-border)]"
    >
      <HeroOrbs reduce={!!reduce} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/18 via-transparent to-violet-500/22 mix-blend-overlay dark:from-cyan-400/[0.1] dark:to-violet-600/18"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]/80"
      />

      <motion.div
        style={{ y: decoPathY }}
        className="pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden opacity-40 mix-blend-multiply dark:mix-blend-soft-light dark:opacity-35"
      >
        <svg
          viewBox="0 0 1200 120"
          className="h-14 w-[140%] ltr:-translate-x-[8%] rtl:translate-x-[8%] md:h-20"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d="M0,90 C320,20 520,120 790,55 C950,15 1080,80 1200,40"
            fill="none"
            stroke="currentColor"
            className="text-[var(--accent)]"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{
              pathLength: { duration: 2.1, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.8, delay: 0.2 },
            }}
          />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: heroLift }}
        className="relative z-10 mx-auto max-w-6xl px-4 pb-14 pt-14 md:px-6 md:pb-20 md:pt-20 lg:pb-24 lg:pt-24"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <motion.div
            variants={containerStagger(!!reduce, 0.09, 0.06)}
            initial="hidden"
            animate="show"
            className="lg:col-span-7"
          >
            <motion.div
              variants={itemBlurUp(!!reduce)}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[color-mix(in_srgb,var(--card)_88%,transparent)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] shadow-sm backdrop-blur-md dark:bg-[color-mix(in_srgb,var(--card)_55%,transparent)]"
            >
              <motion.span
                animate={reduce ? {} : { rotate: [0, 12, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
              </motion.span>
              {hero.badge}
            </motion.div>

            <motion.p
              variants={itemBlurUp(!!reduce)}
              className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]"
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              variants={containerStagger(!!reduce, 0.06, 0.02)}
              initial="hidden"
              animate="show"
              className="mt-3 font-display text-[2.125rem] font-semibold leading-[1.08] tracking-tight text-[var(--foreground)] rtl:leading-[1.3] sm:text-5xl lg:text-6xl lg:leading-[1.06] rtl:lg:leading-[1.3]"
            >
              <span className="block">
                {words.map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    variants={itemRise(!!reduce)}
                    className="inline-block pe-[0.2em] last:pe-0"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <motion.span
                variants={itemBlurUp(!!reduce)}
                className="mt-3 block max-w-[22ch] bg-clip-text pb-0.5 text-transparent rtl:pb-2 sm:max-w-none"
                style={{
                  backgroundImage:
                    "linear-gradient(105deg, var(--accent) 0%, #5eead4 34%, var(--violet) 66%, var(--accent) 100%)",
                  backgroundSize: "220% 100%",
                }}
                animate={
                  reduce
                    ? {}
                    : {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }
                }
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {hero.title}
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemBlurUp(!!reduce)}
              className="mt-7 max-w-xl text-base leading-relaxed text-[var(--muted)] md:mt-8 md:max-w-2xl md:text-lg"
            >
              {hero.lead}
            </motion.p>

            <motion.div
              variants={itemBlurUp(!!reduce)}
              className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10"
            >
              <Link
                href="#work"
                className="btn-primary inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-[var(--background)] shadow-[0_0_40px_-8px_var(--glow)] md:px-7"
              >
                {hero.ctaWork}
                <motion.span
                  animate={reduce ? {} : { x: [0, 4 * sign, 0], y: [0, -2, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowDownRight className="h-4 w-4 rtl:-scale-x-100" />
                </motion.span>
              </Link>
              <Link
                href="#contact"
                className="btn-secondary glass-surface inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] md:px-7"
              >
                {hero.ctaContact}
                <ArrowRight className="h-4 w-4 opacity-80 rtl:-scale-x-100" aria-hidden />
              </Link>
              <a
                href={profile.cv}
                download
                className="btn-secondary glass-surface inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] md:px-7"
              >
                <FileDown className="h-4 w-4 text-[var(--accent)]" aria-hidden />
                {ui.downloadCv}
              </a>
            </motion.div>
          </motion.div>

          <motion.aside
            variants={itemBlurUp(!!reduce)}
            initial="hidden"
            animate="show"
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-[var(--radius-bento)] border border-[var(--card-border)] bg-[color-mix(in_srgb,var(--card)_75%,transparent)] p-6 shadow-lg backdrop-blur-xl dark:bg-[color-mix(in_srgb,var(--card)_45%,transparent)] md:p-7">
              {!reduce && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -end-12 -top-12 h-40 w-40 rounded-full bg-[var(--accent-soft)] blur-3xl dark:opacity-80"
                  animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
              <div className="relative">
                <div className="flex items-start justify-between gap-3 border-b border-[var(--card-border)] pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--violet)]">
                      {hero.panelKicker}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {hero.panelLead}
                    </p>
                  </div>
                  <span className="glass-surface flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold tracking-tight text-[var(--accent)] ring-1 ring-[var(--accent)]/25">
                    {profile.monogram}
                  </span>
                </div>
                <ul className="mt-5 space-y-3">
                  {hero.panelCards.map((card) => (
                    <li
                      key={card.title}
                      className="rounded-xl border border-[var(--card-border)] bg-[color-mix(in_srgb,var(--background)_40%,transparent)] px-4 py-3.5 dark:bg-[color-mix(in_srgb,var(--background)_22%,transparent)]"
                    >
                      <p className="text-sm font-semibold text-[var(--foreground)]">
                        {card.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--muted)] md:text-sm">
                        {card.detail}
                      </p>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#skills"
                  className="link-text mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]"
                >
                  {hero.panelLink}
                  <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>

        <motion.div
          variants={itemBlurUp(!!reduce)}
          initial="hidden"
          animate="show"
          className="mt-14 border-t border-[var(--card-border)] pt-10 md:mt-16 md:pt-12"
        >
          <TechMarquee />
        </motion.div>
      </motion.div>
    </section>
  );
}
