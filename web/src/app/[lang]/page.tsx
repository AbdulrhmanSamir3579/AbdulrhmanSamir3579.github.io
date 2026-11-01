import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/portfolio/hero";
import { AboutSection } from "@/components/portfolio/about-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { WorkSection } from "@/components/portfolio/work-section";
import { ContactFooter } from "@/components/portfolio/contact-footer";
import { JsonLd } from "@/components/seo/json-ld";
import { getContent, getExperience, getProjectCards } from "@/content";
import { isLocale } from "@/i18n/config";
import { alternatesFor, personGraph } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return { alternates: alternatesFor(lang, "/") };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  const cards = getProjectCards(lang);

  return (
    <>
      <JsonLd data={personGraph(lang, c)} />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Hero hero={c.hero} name={c.person.name} />
        <AboutSection about={c.about} />
        <SkillsSection skills={c.skills} />
        <ExperienceSection copy={c.experience} items={getExperience(lang)} />
        <WorkSection
          work={c.work}
          featured={cards.filter((p) => p.kind === "featured")}
          earlier={cards.filter((p) => p.kind === "earlier")}
        />
        <ContactFooter contact={c.contact} name={c.person.name} year={new Date().getFullYear()} />
      </main>
    </>
  );
}
