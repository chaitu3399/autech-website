const VARIANT_CLASS = {
  default: "section-pad",
  dark: "section-pad section--dark",
  white: "section-pad section--white",
  page: "section-pad section--page",
  tight: "section-pad--tight section--page",
  hero: "hero-section section--page",
  strip: "bg-strip strip-pad border-y border-inverse overflow-hidden",
};

export default function Section({
  id,
  variant = "default",
  children,
  className = "",
  testId,
  ariaLabel,
}) {
  return (
    <section
      id={id}
      data-testid={testId}
      aria-label={ariaLabel}
      className={`${VARIANT_CLASS[variant] ?? VARIANT_CLASS.default} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
