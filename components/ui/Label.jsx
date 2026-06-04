export default function Label({ children, dark = false, center = false, className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${center ? "justify-center" : ""} ${className}`.trim()}>
      <span className={dark ? "text-accent-dark" : "text-accent"} aria-hidden="true">
        +
      </span>
      <span className={`label-pill ${dark ? "text-faint-inverse" : "text-faint"}`}>{children}</span>
    </div>
  );
}
