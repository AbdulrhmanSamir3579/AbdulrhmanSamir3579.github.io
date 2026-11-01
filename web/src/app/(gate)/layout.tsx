import type { Metadata } from "next";
import { SITE_URL } from "@/i18n/config";
import { outfit } from "@/app/fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Abdulrahman Samir · عبدالرحمن سمير",
  robots: { index: false, follow: true },
  alternates: {
    languages: { en: "/en/", ar: "/ar/", "x-default": "/en/" },
  },
};

/**
 * `/` on static hosting: no server redirects, so pick the language in the browser
 * (saved choice → navigator.languages → en). Without JS, the <noscript> refresh sends to /en/.
 */
const pickLanguage = `(function(){var l='en';try{var s=localStorage.getItem('lang');if(s==='en'||s==='ar'){l=s}else{var a=navigator.languages||[navigator.language||''];for(var i=0;i<a.length;i++){var c=String(a[i]).slice(0,2).toLowerCase();if(c==='ar'||c==='en'){l=c;break}}}}catch(e){}location.replace('/'+l+'/'+location.search+location.hash)})()`;

export default function GateLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: pickLanguage }} />
        <noscript>
          <meta httpEquiv="refresh" content="0; url=/en/" />
        </noscript>
      </head>
      <body className="min-h-full flex flex-col text-[var(--foreground)]">{children}</body>
    </html>
  );
}
