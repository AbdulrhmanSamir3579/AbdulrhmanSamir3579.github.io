"use client";

import Link from "next/link";
import { FileDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/portfolio/language-switcher";
import { profile } from "@/content/profile";
import { localePath } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";

export function SiteHeader({ name, tagline }: { name: string; tagline: string }) {
  const { lang, ui } = useLocale();
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerShadow = useTransform(
    scrollY,
    [0, 48],
    [
      "0 0 0 0 rgba(0,0,0,0)",
      "0 12px 40px -20px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
    ]
  );

  // The header also renders on case-study pages, so section links point at the home page.
  const home = localePath(lang, "/");
  const nav = [
    { href: `${home}#about`, label: ui.nav.about },
    { href: `${home}#skills`, label: ui.nav.skills },
    { href: `${home}#experience`, label: ui.nav.experience },
    { href: `${home}#work`, label: ui.nav.work },
    { href: `${home}#contact`, label: ui.nav.contact },
  ];

  return (
    <motion.header
      style={{ boxShadow: headerShadow }}
      className="sticky top-0 z-50 glass-surface rounded-b-2xl border-b border-white/30 dark:border-white/10"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--accent)] focus:px-3 focus:py-2 focus:text-[var(--background)]"
      >
        {ui.skipToContent}
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 md:px-6">
        <Link
          href={home}
          className="group flex items-center gap-3 rounded-xl outline-none transition-opacity duration-200 hover:opacity-95 focus-visible:opacity-100"
          aria-label={ui.homeAria}
        >
          <span className="glass-surface flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)]/80 text-sm font-bold tracking-tight text-[var(--accent)] ring-1 ring-[var(--accent)]/35">
            {profile.monogram}
          </span>
          <span className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold leading-tight text-[var(--foreground)]">
              {name}
            </span>
            <span className="text-xs text-[var(--muted)]">{tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-nav-muted block rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.cv}
            download
            aria-label={ui.downloadCv}
            title={ui.downloadCv}
            className="btn-icon glass-surface hidden h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)] sm:inline-flex"
          >
            <FileDown className="h-5 w-5" aria-hidden />
          </a>
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            className="btn-icon glass-surface inline-flex h-10 w-10 items-center justify-center rounded-xl lg:hidden"
            aria-expanded={open}
            aria-label={open ? ui.closeMenu : ui.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass-surface-strong overflow-hidden border-t border-white/20 dark:border-white/10 lg:hidden"
          >
            <nav className="flex flex-col gap-0.5 px-4 py-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="link-nav-muted rounded-lg px-3 py-3 text-sm font-medium text-[var(--foreground)] mix-blend-normal focus-visible:bg-black/[0.05] dark:focus-visible:bg-white/[0.07]"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={profile.cv}
                download
                className="link-nav-muted inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-[var(--foreground)]"
              >
                <FileDown className="h-4 w-4 text-[var(--accent)]" aria-hidden />
                {ui.downloadCv}
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
