import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ProjectView } from "@/content";
import type { ProjectCardView, UiStrings } from "@/content/types";
import { ProjectMediaGallery } from "@/components/portfolio/project-media-gallery";
import { ProjectLinks, StackChips } from "@/components/portfolio/project-links";
import { localePath, type Locale } from "@/i18n/config";

type Props = {
  project: ProjectView;
  ui: UiStrings;
  lang: Locale;
  more: ProjectCardView[];
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
      {children}
    </h2>
  );
}

/** First desktop still (a video's poster counts) for the "more work" thumbnails. */
function coverOf(card: ProjectCardView): string | undefined {
  const m = card.media.find((x) => x.device === "desktop");
  return m ? (m.type === "video" ? m.poster : (m.thumb ?? m.src)) : undefined;
}

export function CaseStudy({ project: p, ui, lang, more }: Props) {
  const mainMedia = p.media.filter((m) => !m.part || m.part === p.parts?.[0]?.id);

  return (
    <article className="relative overflow-hidden border-b border-[var(--card-border)] pb-16 md:pb-24">
      <div aria-hidden className="mesh-hero pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-70" />
      <div aria-hidden className="bg-grid-faint pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-30 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />

      <div className="relative mx-auto max-w-5xl px-4 pt-12 md:px-6 md:pt-16">
        <Link
          href={`${localePath(lang, "/")}#work`}
          className="link-text-muted inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)]"
        >
          <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          {ui.caseStudy.back}
        </Link>

        <header className="mt-8">
          <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-[var(--muted)]">
            <span className="text-[var(--accent)]">{p.org}</span>
            <span aria-hidden>·</span>
            <span>{p.period}</span>
            {p.badge ? (
              <span className="rounded-full border border-[var(--card-border)] px-2.5 py-0.5 text-xs text-[var(--foreground)]">
                {ui.badges[p.badge]}
              </span>
            ) : null}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-6xl rtl:leading-tight">
            {p.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[var(--muted)] md:text-xl">{p.summary}</p>
          <ProjectLinks links={p.links} className="mt-6" />
        </header>

        <dl className="glass-card mt-10 grid gap-6 rounded-[var(--radius-bento)] p-6 md:grid-cols-[1fr_1fr_2fr] md:p-8">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-[var(--violet)]">
              {ui.caseStudy.role}
            </dt>
            <dd className="mt-2 text-sm text-[var(--foreground)]">{p.role}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-[var(--violet)]">
              {ui.caseStudy.period}
            </dt>
            <dd className="mt-2 text-sm text-[var(--foreground)]">{p.period}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-[var(--violet)]">
              {ui.caseStudy.stack}
            </dt>
            <dd className="mt-2">
              <StackChips stack={p.stack} />
            </dd>
          </div>
        </dl>

        {mainMedia.length ? (
          <div className="glass-card mt-10 overflow-hidden rounded-[var(--radius-bento)] shadow-2xl">
            <ProjectMediaGallery title={p.title} media={mainMedia} size="page" />
          </div>
        ) : null}

        <section className="mt-16 max-w-3xl">
          <SectionTitle>{ui.caseStudy.problem}</SectionTitle>
          <p className="mt-4 text-lg leading-relaxed text-[var(--foreground)] md:text-xl">{p.problem}</p>
        </section>

        <section className="mt-16">
          <SectionTitle>{ui.caseStudy.built}</SectionTitle>
          {/* Grouped so long contribution lists stay scannable; columns keep cards at their natural height */}
          <div className="mt-6 gap-6 md:columns-2">
            {p.built.map((group, i) => (
              <div
                key={group.title}
                className="glass-card mb-6 break-inside-avoid rounded-[var(--radius-bento)] p-6 md:p-7"
              >
                <div className="flex items-baseline gap-3">
                  <span dir="ltr" className="font-mono text-xs font-semibold text-[var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">
                    <bdi>{group.title}</bdi>
                  </h3>
                </div>
                <ul className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-[var(--muted)]">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mt-10 overflow-hidden rounded-[var(--radius-bento)] border border-[var(--card-border)] bg-gradient-to-br from-[var(--accent-soft)] via-transparent to-[var(--violet-soft)] p-6 md:p-10">
          <SectionTitle>{ui.caseStudy.outcome}</SectionTitle>
          <p className="mt-4 text-lg leading-relaxed text-[var(--foreground)] md:text-xl">{p.outcome}</p>
          {p.note ? <p className="mt-3 text-sm text-[var(--muted)]">{p.note}</p> : null}
        </section>

        {p.parts?.length ? (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{ui.caseStudy.parts}</h2>
            <div className="mt-8 grid gap-8">
              {p.parts.map((part, i) => {
                const partMedia = i === 0 ? [] : p.media.filter((m) => m.part === part.id);
                return (
                  <section
                    key={part.id}
                    id={part.id}
                    className="glass-card scroll-mt-28 overflow-hidden rounded-[var(--radius-bento)] md:grid md:grid-cols-[1.3fr_1fr]"
                  >
                    {partMedia.length ? (
                      <ProjectMediaGallery title={part.name} media={partMedia} />
                    ) : null}
                    <div className={`flex flex-col justify-center p-6 md:p-8 ${partMedia.length ? "" : "md:col-span-2"}`}>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold text-[var(--foreground)]">
                          <bdi>{part.name}</bdi>
                        </h3>
                        {part.contribution === "contribution" ? (
                          <span className="rounded-full border border-[var(--card-border)] px-2.5 py-0.5 text-xs font-medium text-[var(--foreground)]">
                            {ui.badges.contribution}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-3 leading-relaxed text-[var(--muted)]">
                        {p.partCopy?.[part.id]?.summary}
                      </p>
                      <ProjectLinks links={part.links} className="mt-5" />
                    </div>
                  </section>
                );
              })}
            </div>
          </section>
        ) : null}

        <nav aria-label={ui.caseStudy.more} className="mt-20">
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{ui.caseStudy.more}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {more.map((m) => {
              const cover = coverOf(m);
              return (
                <li key={m.slug}>
                  <Link
                    href={m.href}
                    className="btn-secondary glass-surface flex items-center gap-4 overflow-hidden rounded-2xl p-3 pe-5"
                  >
                    {cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={cover}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-16 w-24 shrink-0 rounded-xl object-cover object-top"
                      />
                    ) : (
                      <span aria-hidden className="h-16 w-24 shrink-0 rounded-xl bg-gradient-to-br from-[var(--accent-soft)] to-[var(--violet-soft)]" />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-[var(--foreground)]">{m.title}</span>
                      <span className="block truncate text-xs text-[var(--muted)]">
                        {m.org} · {m.period}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[var(--accent)] rtl:-scale-x-100" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </article>
  );
}
