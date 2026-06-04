export default function Textarea({ dark = false, className = "", ...props }) {
  return (
    <textarea
      className={`${dark ? "autech-input-dark" : "autech-input"} resize-none focus-ring ${className}`.trim()}
      {...props}
    />
  );
}
