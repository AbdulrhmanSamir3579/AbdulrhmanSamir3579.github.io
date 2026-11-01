import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/case-study/case-study";
import { ContactFooter } from "@/components/portfolio/contact-footer";
import { JsonLd } from "@/components/seo/json-ld";
import { getContent, getProject, getProjectCards, projectSlugs } from "@/content";
import { isLocale } from "@/i18n/config";
import { alternatesFor, caseStudyGraph } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const p = getProject(lang, slug);
  if (!p) notFound();
  return {
    title: p.title,
    description: p.summary,
    alternates: alternatesFor(lang, `/work/${slug}/`),
    openGraph: {
      title: p.title,
      description: p.summary,
      images: p.media[0] ? [p.media[0].src] : [`/og/${lang}.png`],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const p = getProject(lang, slug);
  if (!p) notFound();
  const c = getContent(lang);
  const more = getProjectCards(lang).filter((card) => card.slug !== p.slug);

  return (
    <>
      <JsonLd data={caseStudyGraph(lang, p)} />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <CaseStudy project={p} ui={c.ui} lang={lang} more={more} />
        <ContactFooter contact={c.contact} name={c.person.name} year={new Date().getFullYear()} />
      </main>
    </>
  );
}
