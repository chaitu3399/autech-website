import Image from "next/image";

export default function Logo() {
  return (
    <span className="inline-flex items-center" aria-label="Autech LLC">
      <Image src="/logo-wordmark.png" alt="Autech" width={180} height={44} className="h-7 w-auto" priority />
    </span>
  );
}
