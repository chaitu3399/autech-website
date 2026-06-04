export default function Select({ dark = false, className = "", children, ...props }) {
  return (
    <select className={`${dark ? "autech-input-dark" : "autech-input"} focus-ring ${className}`.trim()} {...props}>
      {children}
    </select>
  );
}
