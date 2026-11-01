"use client";

import { useCallback, useState } from "react";
import { techStack, type TechBrand } from "@/content/profile";
import { useReducedMotion } from "@/lib/use-reduced-motion";

function BrandGlyph({ slug, name, darkColor }: { slug: string; name: string; darkColor?: string }) {
  const [broken, setBroken] = useState(false);
  const onErr = useCallback(() => setBroken(true), []);

  if (broken) {
    return (
      <span
        aria-hidden
        className="flex h-7 min-w-7 items-center justify-center rounded-md bg-[var(--accent-soft)] px-1 text-[10px] font-bold leading-none text-[var(--accent)]"
      >
        {name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase() || "—"}
      </span>
    );
  }

  const glyph = (src: string, className: string) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={24}
      height={24}
      loading="lazy"
      decoding="async"
      className={`h-6 w-6 shrink-0 object-contain opacity-90 dark:opacity-95 ${className}`}
      onError={onErr}
    />
  );

  const base = `https://cdn.simpleicons.org/${slug}`;
  if (!darkColor) return glyph(base, "");
  return (
    <>
      {glyph(base, "dark:hidden")}
      {glyph(`${base}/${darkColor}`, "hidden dark:block")}
    </>
  );
}

function MarqueeChip({ item }: { item: TechBrand }) {
  return (
    <div className="glass-surface flex shrink-0 items-center gap-2.5 rounded-full border border-[var(--card-border)] py-2 ps-2.5 pe-4 text-sm font-medium text-[var(--foreground)] shadow-sm">
      <BrandGlyph slug={item.iconSlug} name={item.name} darkColor={item.darkColor} />
      <span>{item.name}</span>
    </div>
  );
}

export function TechMarquee() {
  const reduce = useReducedMotion();
  const row: TechBrand[] = [...techStack, ...techStack];

  return (
    // Brand names are Latin and the loop animates translateX(-50%), so keep this strip LTR.
    <div dir="ltr" className="tech-marquee relative">
      <div className="tech-marquee__mask overflow-hidden py-1">
        {reduce ? (
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {techStack.map((item) => (
              <MarqueeChip key={item.iconSlug} item={item} />
            ))}
          </div>
        ) : (
          <div className="tech-marquee__track flex w-max items-center gap-3 md:gap-4">
            {row.map((item, i) => (
              <MarqueeChip key={`${item.iconSlug}-${i}`} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
