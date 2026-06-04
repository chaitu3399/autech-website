import { ArrowUpRight } from "lucide-react";

const VARIANT_CLASS = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  accent: "btn-primary btn--accent",
  inverse: "btn-primary btn-primary--inverse",
};

export default function Button({
  variant = "primary",
  type = "button",
  href,
  children,
  showArrow = false,
  className = "",
  testId,
  ...props
}) {
  const classes = `${VARIANT_CLASS[variant] ?? VARIANT_CLASS.primary} focus-ring touch-manipulation ${className}`.trim();

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <span className="arrow-pill">
          <ArrowUpRight size={16} className="btn-arrow-icon" aria-hidden="true" />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a href={href} data-testid={testId} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} data-testid={testId} className={classes} {...props}>
      {content}
    </button>
  );
}
