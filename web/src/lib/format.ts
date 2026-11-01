import "server-only";
import type { Locale } from "@/i18n/config";

/** Format on the server only — Node's ICU and the browser's can disagree and break hydration. */
function month(lang: Locale, iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(lang === "ar" ? "ar" : "en-US", {
    month: lang === "ar" ? "long" : "short",
    year: "numeric",
    numberingSystem: "latn",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, (m ?? 1) - 1, 1)));
}

export function formatPeriod(
  lang: Locale,
  start: string,
  end: string | "present",
  presentLabel: string
): string {
  const to = end === "present" ? presentLabel : month(lang, end);
  return `${month(lang, start)} – ${to}`;
}
