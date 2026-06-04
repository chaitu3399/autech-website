"use client";

import Label from "@/components/ui/Label";
import Heading from "@/components/ui/Heading";
import Reveal from "@/components/ui/Reveal";

export default function SectionHeader({
  label,
  titleA,
  titleB = null,
  dark = false,
  align = "start",
  variant = "section",
  className = "",
  animate = true,
}) {
  const center = align === "center";

  const header = (
    <header className={`section-header ${center ? "section-header--center" : ""} ${className}`.trim()}>
      {label ? <Label dark={dark} center={center}>{label}</Label> : null}
      <Heading variant={variant} dark={dark} titleA={titleA} titleB={titleB} />
    </header>
  );

  if (!animate) return header;

  return <Reveal>{header}</Reveal>;
}
