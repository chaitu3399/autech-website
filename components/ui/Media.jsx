import Image from "next/image";

const VARIANT_CLASS = {
  hero: "media-frame--hero",
  banner: "media-frame--banner",
  card: "media-frame--card",
  panel: "media-frame--panel",
  stat: "media-frame--stat",
};

export default function Media({
  src,
  alt = "",
  variant = "card",
  priority = false,
  className = "",
  children,
  ...props
}) {
  return (
    <div
      className={`media-frame ${VARIANT_CLASS[variant] ?? VARIANT_CLASS.card} noise-bg rounded-sm overflow-hidden ${className}`.trim()}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={
          variant === "hero"
            ? "(max-width: 768px) 100vw, 90rem"
            : variant === "panel"
              ? "(max-width: 1024px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, 50vw"
        }
        className="media-frame__img object-cover"
        priority={priority}
      />
      {children}
    </div>
  );
}
