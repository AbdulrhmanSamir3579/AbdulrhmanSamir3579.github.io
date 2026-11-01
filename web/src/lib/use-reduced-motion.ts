"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * Hydration-safe replacement for framer-motion's `useReducedMotion`.
 * The static HTML is rendered with motion on; framer's hook returns the real preference on the
 * client's first render, so reduced-motion users got a different tree (React error #418).
 * `useSyncExternalStore` uses the server snapshot while hydrating, then re-renders with the real value.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
