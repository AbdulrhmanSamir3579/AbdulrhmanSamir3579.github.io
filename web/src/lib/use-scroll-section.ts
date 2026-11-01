"use client";

import { useRef } from "react";
import {
  useScroll,
  useTransform,
} from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Light vertical drift only — no 3D tilt, scale, or opacity pumping (reads calmer while scrolling). */
export function useScrollSectionMotion() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "end 0.12"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [22, -22]
  );

  return {
    ref,
    motionStyle: { y },
  };
}
