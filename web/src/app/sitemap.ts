import type { MetadataRoute } from "next";
import { projectMeta } from "@/content/projects";
import { locales, SITE_URL } from "@/i18n/config";

/** Required under `output: 'export'` — route handlers don't inherit static params. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...projectMeta.map((p) => `/work/${p.slug}/`)];
  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${path}`,
          ar: `${SITE_URL}/ar${path}`,
          "x-default": `${SITE_URL}/en${path}`,
        },
      },
    }))
  );
}
