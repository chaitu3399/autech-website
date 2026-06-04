"use client";

import { useRef } from "react";
import { useInView } from "@/lib/hooks/useInView";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  immediate = false,
  as: Tag = "div",
}) {
  const ref = useRef(null);
  const inView = useInView(ref);

  if (immediate) {
    return (
      <Tag
        ref={ref}
        className={`reveal reveal--immediate ${className}`.trim()}
        style={{ "--reveal-delay": `${delay}ms` }}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "reveal--visible" : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
