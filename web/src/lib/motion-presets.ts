import type { Transition, Variants } from "framer-motion";

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 28,
  mass: 0.9,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 1,
};

/** Parent-only stagger: does not fade the container (avoids flashing whole headings). */
export function containerStagger(
  reduce: boolean,
  stagger = 0.085,
  delay = 0.12
): Variants {
  if (reduce) {
    return {
      hidden: {},
      show: {
        transition: { staggerChildren: 0, delayChildren: 0 },
      },
    };
  }
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

/**
 * Reduced variants reset every property the full variants animate: the static HTML is rendered
 * with motion on (see use-reduced-motion.ts), so leftover blur/offsets must be cleared explicitly.
 */
const settled = { y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" } as const;

export function itemBlurUp(reduce: boolean): Variants {
  if (reduce) {
    return {
      hidden: { opacity: 0, ...settled },
      show: { opacity: 1, ...settled, transition: { duration: 0.25 } },
    };
  }
  return {
    hidden: { opacity: 0, y: 32, filter: "blur(12px)", rotateX: -6 },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      rotateX: 0,
      transition: springSnappy,
    },
  };
}

export function itemRise(reduce: boolean): Variants {
  if (reduce) {
    return {
      hidden: { opacity: 0, ...settled },
      show: { opacity: 1, ...settled, transition: { duration: 0.2 } },
    };
  }
  return {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: springSnappy,
    },
  };
}

/** Project / bento cards — stronger 3D entrance. */
export function cardTheater(reduce: boolean): Variants {
  if (reduce) {
    return {
      hidden: { opacity: 0, ...settled },
      show: { opacity: 1, ...settled, transition: { duration: 0.25 } },
    };
  }
  return {
    hidden: { opacity: 0, y: 64, rotateX: -12, scale: 0.94, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 280, damping: 26, mass: 0.85 },
    },
  };
}

export const viewport = {
  once: true,
  margin: "-10% 0px -8% 0px",
  amount: 0.2,
} as const;
