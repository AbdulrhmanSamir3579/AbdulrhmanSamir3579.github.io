import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { geistMono, outfit, plexArabic } from "@/app/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/portfolio/site-header";
import { getContent } from "@/content";
import { dirOf, isLocale, locales, SITE_URL } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/locale-provider";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: c.meta.title, template: `%s · ${c.person.name}` },
    description: c.meta.description,
    applicationName: c.person.name,
    authors: [{ name: c.person.name, url: `${SITE_URL}/${lang}/` }],
    creator: c.person.name,
    openGraph: {
      type: "website",
      siteName: c.person.name,
      locale: lang === "ar" ? "ar_EG" : "en_US",
      images: [{ url: `/og/${lang}.png`, width: 1200, height: 630, alt: c.meta.ogAlt }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  const dir = dirOf(lang);

  return (
    <html
      lang={lang}
      dir={dir}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${outfit.variable} ${geistMono.variable} ${lang === "ar" ? plexArabic.variable : ""} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-[var(--foreground)]">
        <ThemeProvider>
          <LocaleProvider value={{ lang, dir, ui: c.ui }}>
            <SiteHeader name={c.person.name} tagline={c.person.headerTagline} />
            {children}
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
