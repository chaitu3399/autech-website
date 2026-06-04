export default function StatCard({ tag, value, label, variant = "dark", className = "" }) {
  const variants = {
    dark: "bg-elevated border border-inverse stat-tile stat-tile--round",
    accent: "bg-accent stat-tile stat-tile--round shadow-lg shadow-[color-mix(in_srgb,var(--autech-burnt)_20%,transparent)]",
  };

  const tagClass = variant === "accent" ? "text-white/70" : "text-faint-inverse";
  const labelClass = variant === "accent" ? "text-white/90" : "text-faint-inverse";

  return (
    <div
      className={`media-frame media-frame--stat flex flex-col items-center justify-center text-center p-[var(--card-pad)] ${variants[variant] ?? variants.dark} ${className}`.trim()}
    >
      {tag ? <div className={`label-pill ${tagClass}`}>{tag}</div> : null}
      <div className="text-display-stat text-inverse mt-1 tabular-nums">{value}</div>
      <p className={`text-body-sm mt-3 max-w-[14rem] text-pretty ${labelClass}`}>{label}</p>
    </div>
  );
}
