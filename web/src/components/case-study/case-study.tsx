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

export function CaseStudy({ project: p, ui, lang, more }: Props) {
  const mainMedia = p.media.filter((m) => !m.part || m.part === p.parts?.[0]?.id);

  return (
    <article className="border-b border-[var(--card-border)] py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <Link
          href={`${localePath(lang, "/")}#work`}
          className="link-text-muted inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)]"
        >
          <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          {ui.caseStudy.back}
        </Link>

        <header className="mt-8">
          <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-[var(--muted)]">
            <span>{p.org}</span>
            <span aria-hidden>·</span>
            <span>{p.period}</span>
            {p.badge ? (
              <span className="rounded-full border border-[var(--card-border)] px-2.5 py-0.5 text-xs text-[var(--foreground)]">
                {ui.badges[p.badge]}
              </span>
            ) : null}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-5xl rtl:leading-tight">
            {p.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">{p.summary}</p>
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
          <div className="glass-card mt-10 overflow-hidden rounded-[var(--radius-bento)]">
            <ProjectMediaGallery title={p.title} media={mainMedia} size="page" />
          </div>
        ) : null}

        <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <section>
            <SectionTitle>{ui.caseStudy.problem}</SectionTitle>
            <p className="mt-4 leading-relaxed text-[var(--foreground)]">{p.problem}</p>
          </section>
          <section>
            <SectionTitle>{ui.caseStudy.built}</SectionTitle>
            <ul className="mt-4 space-y-3 leading-relaxed text-[var(--muted)]">
              {p.built.map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="glass-surface mt-12 rounded-[var(--radius-bento)] p-6 md:p-8">
          <SectionTitle>{ui.caseStudy.outcome}</SectionTitle>
          <p className="mt-4 text-lg leading-relaxed text-[var(--foreground)]">{p.outcome}</p>
          {p.note ? <p className="mt-3 text-sm text-[var(--muted)]">{p.note}</p> : null}
        </section>

        {p.parts?.length ? (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-semibold tracking-tight">{ui.caseStudy.parts}</h2>
            <div className="mt-8 grid gap-8">
              {p.parts.map((part, i) => {
                const partMedia = i === 0 ? [] : p.media.filter((m) => m.part === part.id);
                return (
                  <section
                    key={part.id}
                    id={part.id}
                    className="glass-card scroll-mt-28 overflow-hidden rounded-[var(--radius-bento)]"
                  >
                    {partMedia.length ? (
                      <ProjectMediaGallery title={part.name} media={partMedia} />
                    ) : null}
                    <div className="p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold text-[var(--foreground)]">
                          <bdi>{part.name}</bdi>
                        </h3>
                        {part.contribution === "contribution" ? (
                          <span className="rounded-full border border-[var(--card-border)] px-2.5 py-0.5 text-xs font-medium text-[var(--foreground)]">
                            {ui.badges.contribution}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 leading-relaxed text-[var(--muted)]">
                        {p.partCopy?.[part.id]?.summary}
                      </p>
                      <ProjectLinks links={part.links} className="mt-4" />
                    </div>
                  </section>
                );
              })}
            </div>
          </section>
        ) : null}

        <nav aria-label={ui.caseStudy.more} className="mt-20">
          <h2 className="font-display text-2xl font-semibold tracking-tight">{ui.caseStudy.more}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {more.map((m) => (
              <li key={m.slug}>
                <Link
                  href={m.href}
                  className="btn-secondary glass-surface flex items-center justify-between gap-4 rounded-2xl px-5 py-4"
                >
                  <span>
                    <span className="block font-semibold text-[var(--foreground)]">{m.title}</span>
                    <span className="block text-xs text-[var(--muted)]">
                      {m.org} · {m.period}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[var(--accent)] rtl:-scale-x-100" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  );
}
