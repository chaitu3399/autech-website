export default function Field({ id, label, dark = false, children }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={`label-pill block mb-1 ${dark ? "text-faint-inverse" : "text-faint"}`}>
        {label}
      </label>
      {children}
    </div>
  );
}
