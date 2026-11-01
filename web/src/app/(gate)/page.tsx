export default function LanguageGate() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="glass-surface flex gap-3 rounded-full p-2">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- crosses root layouts, needs a full page load */}
        <a
          href="/en/"
          hrefLang="en"
          className="btn-primary rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--background)]"
        >
          English
        </a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- crosses root layouts, needs a full page load */}
        <a
          href="/ar/"
          hrefLang="ar"
          lang="ar"
          className="btn-secondary rounded-full px-6 py-3 text-sm font-semibold"
        >
          العربية
        </a>
      </div>
    </main>
  );
}
