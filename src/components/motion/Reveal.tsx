"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "./useReveal";

/**
 * Generic scroll/mount reveal: fade + small upward move, once, driven by
 * the [data-reveal] CSS in globals.css. Use `delay` (ms) to stagger a
 * group of siblings.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  const [ref, revealed] = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-reveal={revealed}
      style={{ ...style, transitionDelay: revealed ? `${delay}ms` : "0ms" }}
      className={className}
    >
      {children}
    </Tag>
  );
}
