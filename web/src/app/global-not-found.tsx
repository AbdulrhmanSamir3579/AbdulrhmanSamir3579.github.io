import type { Metadata } from "next";
import { outfit, plexArabic } from "@/app/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 · Abdulrahman Samir",
};

/** Unmatched URLs across both root layouts → out/404.html. Bilingual, no JS needed. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${outfit.variable} ${plexArabic.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col items-center justify-center gap-8 px-4 py-24 text-center text-[var(--foreground)]">
        <p className="font-display text-7xl font-semibold text-[var(--accent)]">404</p>
        <div className="space-y-2">
          <p className="text-lg font-semibold">This page doesn’t exist.</p>
          <p lang="ar" dir="rtl" className="text-lg font-semibold">
            هذه الصفحة غير موجودة.
          </p>
        </div>
        <div className="flex gap-3">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- crosses root layouts, needs a full page load */}
          <a
            href="/en/"
            hrefLang="en"
            className="btn-primary rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--background)]"
          >
            Home
          </a>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- crosses root layouts, needs a full page load */}
          <a
            href="/ar/"
            hrefLang="ar"
            lang="ar"
            className="btn-secondary glass-surface rounded-full px-6 py-3 text-sm font-semibold"
          >
            الرئيسية
          </a>
        </div>
      </body>
    </html>
  );
}
