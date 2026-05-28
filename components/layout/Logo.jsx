import Image from "next/image";

export default function Logo() {
  return (
    <span className="inline-flex items-center" aria-label="Autech LLC">
      <Image src="/logo-wordmark.png" alt="Autech" width={240} height={56} className="h-10 w-auto" priority />
    </span>
  );
}
