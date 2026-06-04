const VARIANT_CLASS = {
  hero: "text-display-hero",
  page: "text-display-page",
  section: "text-display-section",
  cta: "text-display-cta",
  card: "text-display-card",
  stat: "text-display-stat",
  panel: "text-display-panel",
};

export default function Heading({
  as: Tag = "h2",
  variant = "section",
  titleA,
  titleB = null,
  dark = false,
  className = "",
}) {
  const base = dark ? "text-inverse" : "text-primary";
  const accent = dark ? "text-accent-dark" : "text-accent";

  return (
    <Tag
      className={`font-display text-balance ${VARIANT_CLASS[variant] ?? VARIANT_CLASS.section} ${base} ${className}`.trim()}
    >
      {titleA}
      {titleB != null && titleB !== "" ? (
        <>
          <br />
          <span className={accent}>{titleB}</span>
        </>
      ) : null}
    </Tag>
  );
}
