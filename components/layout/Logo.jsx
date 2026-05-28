export default function Logo({ variant = "dark" }) {
  const main = variant === "dark" ? "#151515" : "#F6F6F6";
  const accent = "#C8370B";

  return (
    <svg viewBox="0 0 220 56" className="h-7 w-auto" xmlns="http://www.w3.org/2000/svg" aria-label="Autech LLC">
      <g fontFamily="Archivo, sans-serif" fontWeight="900" fontSize="48" letterSpacing="-1">
        <text x="0" y="44" fill={main}>
          AU
        </text>
        <text x="74" y="44" fill={main}>
          TE
        </text>
        <text x="148" y="44" fill={main}>
          H
        </text>
        <text x="120" y="44" fill={accent}>
          C
        </text>
      </g>
      <circle cx="138" cy="28" r="3" fill={accent} />
    </svg>
  );
}
