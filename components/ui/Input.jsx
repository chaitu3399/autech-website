export default function Input({ dark = false, className = "", ...props }) {
  return <input className={`${dark ? "autech-input-dark" : "autech-input"} focus-ring ${className}`.trim()} {...props} />;
}
