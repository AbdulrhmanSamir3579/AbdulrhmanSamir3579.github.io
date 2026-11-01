"use client";

import { ExternalLink } from "lucide-react";
import type { ProjectLink } from "@/content/types";
import { useLocale } from "@/i18n/locale-provider";

export function ProjectLinks({ links, className = "" }: { links: ProjectLink[]; className?: string }) {
  const { ui } = useLocale();
  if (!links.length) return null;
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-text inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)]"
        >
          {ui.links[l.kind]}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      ))}
    </div>
  );
}

export function StackChips({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((t) => (
        <li
          key={t}
          dir="ltr"
          className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}
