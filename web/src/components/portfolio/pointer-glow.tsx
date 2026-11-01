"use client";

import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type PointerGlowProps = {
  children: ReactNode;
  /** e.g. rounded-[var(--radius-bento)] — overlay matches this radius via inherit */
  className?: string;
  /**
   * Cursor-following border glow. Use `false` for static layout wrappers, or when
   * children include plain text — put glow only on interactive targets and use
   * `.btn-*` / `.link-*` classes from globals.css for hovers instead.
   * @default true
   */
  pointerGlow?: boolean;
};

const shellClass =
  "relative isolate box-border flex min-h-0 min-w-0 flex-col";

/**
 * Optional radial border glow that follows the cursor. The ring shares the same
 * box as the content when `pointerGlow` is true.
 */
export function PointerGlow({
  children,
  className = "",
  pointerGlow = true,
}: PointerGlowProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 0, y: 0, active: false });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setGlow({
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      active: true,
    });
  }, []);

  const onLeave = useCallback(() => {
    setGlow((g) => ({ ...g, active: false }));
  }, []);

  const overlayStyle: CSSProperties = {
    opacity: glow.active ? 1 : 0,
    background: `radial-gradient(320px circle at ${glow.x}px ${glow.y}px, color-mix(in srgb, var(--accent) 50%, transparent), color-mix(in srgb, var(--violet) 35%, transparent) 38%, transparent 68%)`,
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "exclude",
    padding: "2px",
  };

  if (!pointerGlow) {
    return (
      <div ref={rootRef} className={`${shellClass} ${className}`}>
        <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col rounded-[inherit]">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`${shellClass} ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        aria-hidden
        className="pointer-glow-ring pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
        style={overlayStyle}
      />
      <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col rounded-[inherit]">
        {children}
      </div>
    </div>
  );
}
