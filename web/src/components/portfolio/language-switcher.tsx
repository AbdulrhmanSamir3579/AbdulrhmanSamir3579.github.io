"use client";

import { Languages } from "lucide-react";
import { usePathname } from "next/navigation";
import { otherLocale } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";

/**
 * Plain <a>, not next/link: switching language must reload so `<html dir>`, the Arabic font
 * and the theme script all apply from first paint. Keeps the current path and hash.
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, ui } = useLocale();
  const pathname = usePathname() ?? `/${lang}/`;
  const target = otherLocale(lang);
  const rest = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
  const href = `/${target}${rest.endsWith("/") ? rest : `${rest}/`}`;

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={ui.switchLanguageAria}
      onClick={(e) => {
        try {
          localStorage.setItem("lang", target);
        } catch {}
        if (window.location.hash) {
          e.preventDefault();
          window.location.assign(href + window.location.hash);
        }
      }}
      className={`btn-icon glass-surface inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-[var(--foreground)] sm:px-3.5 ${className}`}
    >
      <Languages className="h-4 w-4 text-[var(--accent)]" aria-hidden />
      {ui.switchLanguage}
    </a>
  );
}
