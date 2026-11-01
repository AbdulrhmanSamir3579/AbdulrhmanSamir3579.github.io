"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { MediaView } from "@/content/types";
import { fill, useDirSign, useLocale } from "@/i18n/locale-provider";
import { springSnappy } from "@/lib/motion-presets";

type Props = {
  title: string;
  media: MediaView[];
  /** Taller frame for case-study pages */
  size?: "card" | "page";
};

const swipeConfidence = 80;

export function ProjectMediaGallery({ title, media, size = "card" }: Props) {
  const reduce = useReducedMotion();
  const { ui } = useLocale();
  // In RTL "next" sits on the left: flip keys, drag and slide direction.
  const sign = useDirSign();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.3, margin: "-8%" });

  const len = media.length;
  const clamped = len === 0 ? 0 : ((index % len) + len) % len;
  const item = len ? media[clamped] : null;
  const hasMany = len > 1;

  const go = useCallback(
    (delta: number) => {
      if (len < 2) return;
      setDirection(delta);
      setIndex((i) => (len + i + delta) % len);
    },
    [len]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!containerRef.current || !hasMany || !inView) return;
      if (!containerRef.current.contains(document.activeElement)) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-sign);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(sign);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, hasMany, inView, sign]);

  if (!item) return null;

  const variants = reduce
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        enter: (dir: number) => ({
          x: (dir > 0 ? 72 : -72) * sign,
          opacity: 0,
          filter: "blur(12px)",
          scale: 0.96,
        }),
        center: {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          transition: springSnappy,
        },
        exit: (dir: number) => ({
          x: (dir < 0 ? 72 : -72) * sign,
          opacity: 0,
          filter: "blur(8px)",
          scale: 0.98,
          transition: { duration: 0.35, ease: "easeIn" as const },
        }),
      };

  const frame = size === "page" ? "aspect-[16/10] md:aspect-[16/9]" : "aspect-[16/10]";
  const isMobileShot = item.device === "mobile";
  const isVideo = item.type === "video";

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={fill(ui.gallery.region, { title })}
      onPointerDown={() => containerRef.current?.focus({ preventScroll: true })}
      className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card)]"
    >
      {/* Browser chrome: frames the shot and shows where it was captured */}
      <div
        dir="ltr"
        className="flex items-center gap-3 border-b border-[var(--card-border)] bg-[color-mix(in_srgb,var(--card)_80%,transparent)] px-3.5 py-2"
      >
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/85" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/85" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/85" />
        </span>
        {item.host ? (
          <span className="mx-auto max-w-[60%] truncate rounded-md bg-[color-mix(in_srgb,var(--foreground)_6%,transparent)] px-3 py-0.5 text-center font-mono text-[11px] text-[var(--muted)]">
            {item.host}
          </span>
        ) : null}
        <span aria-hidden className="w-[42px]" />
      </div>
      <motion.div
        className={`relative overflow-hidden border-b border-white/20 backdrop-blur-[2px] dark:border-white/10 ${
          isMobileShot
            ? "bg-gradient-to-br from-[var(--accent-soft)] via-transparent to-[var(--violet-soft)]"
            : "bg-black/35 dark:bg-black/50"
        }`}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={clamped}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className={`${frame} w-full cursor-grab active:cursor-grabbing`}
            drag={reduce || !hasMany || isVideo ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              const off = info.offset.x * sign;
              const vel = info.velocity.x * sign;
              if (off < -swipeConfidence || vel < -280) go(1);
              if (off > swipeConfidence || vel > 280) go(-1);
            }}
          >
            {isVideo ? (
              <video
                key={item.src}
                src={item.src}
                poster={item.poster}
                aria-label={item.alt}
                width={item.width}
                height={item.height}
                controls
                muted
                loop
                playsInline
                preload="none"
                className="h-full w-full bg-black object-contain"
              />
            ) : isMobileShot ? (
              // Phone frame for mobile captures instead of a letterbox
              <div className="flex h-full w-full items-center justify-center p-[4%]">
                <div className="h-full overflow-hidden rounded-[1.4rem] border-[5px] border-[#0b0d12] bg-black shadow-2xl ring-1 ring-white/15">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    draggable={false}
                    className="h-full w-auto select-none object-cover object-top"
                    loading={clamped === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                draggable={false}
                className="h-full w-full select-none object-cover object-top"
                loading={clamped === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {hasMany ? (
          <>
            <button
              type="button"
              aria-label={ui.gallery.prev}
              className="btn-gallery-arrow absolute start-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-white/20 text-[var(--foreground)] shadow-lg backdrop-blur-xl dark:bg-black/45 dark:text-white md:start-3"
              onClick={() => go(-1)}
            >
              <ChevronLeft className="h-5 w-5 rtl:-scale-x-100" />
            </button>
            <button
              type="button"
              aria-label={ui.gallery.next}
              className="btn-gallery-arrow absolute end-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-white/20 text-[var(--foreground)] shadow-lg backdrop-blur-xl dark:bg-black/45 dark:text-white md:end-3"
              onClick={() => go(1)}
            >
              <ChevronRight className="h-5 w-5 rtl:-scale-x-100" />
            </button>
          </>
        ) : null}

        <div
          dir="ltr"
          className="glass-surface pointer-events-none absolute bottom-2 end-2 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--foreground)] mix-blend-normal dark:text-white/95"
        >
          {clamped + 1} / {len}
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40"
          animate={reduce ? {} : { opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {hasMany ? (
        <div className="glass-surface no-scrollbar flex gap-1.5 overflow-x-auto border-b border-white/20 px-2 py-2.5 dark:border-white/10">
          {media.map((m, i) => (
            <button
              key={m.id}
              type="button"
              aria-label={fill(ui.gallery.showSlide, { n: i + 1 })}
              aria-current={i === clamped}
              onClick={() => {
                setDirection(i > clamped ? 1 : -1);
                setIndex(i);
              }}
              className={`btn-gallery-thumb relative h-12 w-[4.5rem] shrink-0 overflow-hidden rounded-lg ring-2 ring-offset-2 ring-offset-transparent mix-blend-normal ${
                i === clamped ? "ring-[var(--accent)]" : "ring-transparent opacity-80"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.thumb ?? m.poster ?? m.src}
                alt=""
                loading="lazy"
                decoding="async"
                className={`h-full w-full ${m.device === "mobile" ? "object-contain bg-black/40" : "object-cover object-top"}`}
              />
              {m.type === "video" ? (
                <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                  <Play className="h-4 w-4 fill-white text-white drop-shadow" aria-label={ui.gallery.video} />
                </span>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
