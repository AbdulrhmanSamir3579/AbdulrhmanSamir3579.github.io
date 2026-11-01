export const SITE_URL = "https://abdulrhmansamir3579.github.io";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(lang: Locale): "ltr" | "rtl" {
  return lang === "ar" ? "rtl" : "ltr";
}

export function otherLocale(lang: Locale): Locale {
  return lang === "ar" ? "en" : "ar";
}

/** `localePath("ar", "/work/leen/")` → `/ar/work/leen/` (always trailing slash). */
export function localePath(lang: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const withSlash = clean.endsWith("/") ? clean : `${clean}/`;
  return `/${lang}${withSlash}`;
}
