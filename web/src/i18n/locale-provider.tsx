"use client";

import { createContext, use, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { UiStrings } from "@/content/types";

type LocaleValue = { lang: Locale; dir: "ltr" | "rtl"; ui: UiStrings };

const LocaleContext = createContext<LocaleValue | null>(null);

/** Carries only short UI labels — long-form copy is passed as props from server pages. */
export function LocaleProvider({
  value,
  children,
}: {
  value: LocaleValue;
  children: ReactNode;
}) {
  return <LocaleContext value={value}>{children}</LocaleContext>;
}

export function useLocale(): LocaleValue {
  const value = use(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside <LocaleProvider>");
  return value;
}

/** +1 in LTR, -1 in RTL — multiply horizontal motion offsets by this. */
export function useDirSign(): 1 | -1 {
  return useLocale().dir === "rtl" ? -1 : 1;
}

/** `fill("Show slide {n}", { n: 2 })` */
export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
}
