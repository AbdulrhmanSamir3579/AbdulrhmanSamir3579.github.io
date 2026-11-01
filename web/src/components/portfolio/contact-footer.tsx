"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { FileDown, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import type { SiteContent } from "@/content/types";
import { localePath } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";
import { PointerGlow } from "@/components/portfolio/pointer-glow";
import {
  containerStagger,
  itemBlurUp,
  viewport,
} from "@/lib/motion-presets";

type Props = { contact: SiteContent["contact"]; name: string; year: number };

/** `year` comes from the server so the static HTML and hydration agree. */
export function ContactFooter({ contact, name, year }: Props) {
  const reduce = useReducedMotion();
  const { lang, ui } = useLocale();

  return (
    <footer id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <PointerGlow className="w-full rounded-[var(--radius-bento)]">
          <motion.div
            variants={containerStagger(!!reduce, 0.12, 0.04)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="glass-surface-strong rounded-[inherit] p-8 md:p-12"
          >
            <motion.p
              variants={itemBlurUp(!!reduce)}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]"
            >
              {contact.kicker}
            </motion.p>
            <motion.h2
              variants={itemBlurUp(!!reduce)}
              className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl rtl:leading-snug"
            >
              {contact.title}
            </motion.h2>
            <motion.p
              variants={itemBlurUp(!!reduce)}
              className="mt-4 max-w-2xl text-[var(--muted)] md:text-lg"
            >
              {contact.description}
            </motion.p>

            <motion.ul
              variants={itemBlurUp(!!reduce)}
              className="mt-8 flex flex-col gap-4 text-sm md:flex-row md:flex-wrap md:gap-8"
            >
              <li className="flex items-center gap-2 text-[var(--foreground)]">
                <Mail className="h-4 w-4 text-[var(--accent)]" />
                <a
                  href={`mailto:${profile.email}`}
                  dir="ltr"
                  className="link-text-muted font-medium text-[var(--foreground)]"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-[var(--muted)]">
                <span
                  className="inline-flex h-4 w-4 items-center justify-center text-[var(--accent)]"
                  aria-hidden
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </span>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-text-muted"
                >
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center gap-2 text-[var(--muted)]">
                <span
                  className="inline-flex h-4 w-4 items-center justify-center text-[var(--accent)]"
                  aria-hidden
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    fill="currentColor"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </span>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-text-muted"
                >
                  GitHub
                </a>
              </li>
            </motion.ul>

            <motion.div
              variants={itemBlurUp(!!reduce)}
              className="mt-10 flex flex-wrap gap-3"
            >
              <a
                href={`mailto:${profile.email}`}
                className="btn-primary inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--background)] shadow-[0_0_32px_-12px_var(--glow)]"
              >
                {contact.emailCta}
              </a>
              <a
                href={profile.cv}
                download
                className="btn-secondary glass-surface inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[var(--foreground)]"
              >
                <FileDown className="h-4 w-4 text-[var(--accent)]" aria-hidden />
                {ui.downloadCv}
              </a>
              <Link
                href={`${localePath(lang, "/")}#work`}
                className="btn-secondary glass-surface inline-flex rounded-full px-6 py-3 text-sm font-semibold text-[var(--foreground)]"
              >
                {contact.backToWork}
              </Link>
            </motion.div>
          </motion.div>
        </PointerGlow>

        <p className="mt-10 text-center text-xs text-[var(--muted)]">
          © {year} {name} · {contact.footerNote}
        </p>
      </div>
    </footer>
  );
}
