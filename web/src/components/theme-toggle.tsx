"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/i18n/locale-provider";

const subscribeNoop = () => () => {};

export function ThemeToggle() {
  const { ui } = useLocale();
  const { theme, setTheme, resolvedTheme } = useTheme();
  // false during SSR/static HTML, true once hydrated — avoids a theme-icon mismatch
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <span className="glass-surface inline-flex h-10 w-10 items-center justify-center rounded-full" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      type="button"
      aria-label={isDark ? ui.themeToLight : ui.themeToDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="btn-icon glass-surface inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)]"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="inline-flex"
      >
        {isDark ? (
          <Sun className="h-5 w-5 text-amber-300" />
        ) : (
          <Moon className="h-5 w-5 text-slate-700" />
        )}
      </motion.span>
    </motion.button>
  );
}
