import type { Metadata } from "next";
import { SITE_URL, type Locale } from "@/i18n/config";
import { profile } from "@/content/profile";
import type { SiteContent } from "@/content/types";

/** Per-page canonical + hreflang. Set on pages, not layouts (layouts would leak them to children). */
export function alternatesFor(lang: Locale, path = "/"): Metadata["alternates"] {
  const p = path.endsWith("/") ? path : `${path}/`;
  return {
    canonical: `/${lang}${p}`,
    languages: { en: `/en${p}`, ar: `/ar${p}`, "x-default": `/en${p}` },
  };
}

const personId = `${SITE_URL}/#person`;

export function personGraph(lang: Locale, c: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: c.person.name,
        alternateName: c.person.alternateName,
        jobTitle: c.person.jobTitle,
        url: `${SITE_URL}/${lang}/`,
        email: `mailto:${profile.email}`,
        address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
        worksFor: { "@type": "Organization", name: "Expanders 360" },
        sameAs: [profile.linkedin, profile.github],
        knowsLanguage: ["en", "ar"],
        knowsAbout: [
          "Angular",
          "TypeScript",
          "NgRx",
          "Nx",
          "NestJS",
          "Node.js",
          "Next.js",
          "ERP systems",
          "Financial accounting software",
          "Data visualization",
          "Web performance",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: c.person.name,
        inLanguage: ["en", "ar"],
      },
      {
        "@type": "ProfilePage",
        url: `${SITE_URL}/${lang}/`,
        inLanguage: lang,
        mainEntity: { "@id": personId },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
    ],
  };
}

export function caseStudyGraph(
  lang: Locale,
  p: { title: string; summary: string; href: string; stack: string[] }
) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.summary,
    url: `${SITE_URL}${p.href}`,
    inLanguage: lang,
    keywords: p.stack.join(", "),
    author: { "@id": personId },
  };
}
