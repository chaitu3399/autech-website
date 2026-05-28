"use client";

import { useLang } from "@/components/language-provider";
import { WA_NUMBER } from "@/components/shared/constants";

export default function WhatsAppFloat() {
  const { t } = useLang();
  const msg = encodeURIComponent("Hola Autech, me interesa solicitar información sobre sus servicios.");
  const href = `https://wa.me/${WA_NUMBER}?text=${msg}`;

  return (
    <a data-testid="whatsapp-float" href={href} target="_blank" rel="noopener noreferrer" aria-label={t.whatsapp} className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-40 group">
      <span className="relative inline-flex items-center justify-center">
        <span className="absolute inset-0 rounded-full wa-pulse" />
        <span className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl shadow-[#25D366]/30">
          <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff" aria-hidden="true">
            <path d="M19.11 17.21c-.27-.14-1.61-.79-1.86-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.35-1.61-1.51-1.88-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16 0-.34-.02-.52-.02-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.66.21 1.25.18 1.72.11.52-.08 1.61-.66 1.84-1.29.23-.63.23-1.17.16-1.29-.07-.12-.25-.18-.52-.32zM16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.46 1.66 6.34L3 29l6.84-1.79A12.94 12.94 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z" />
          </svg>
        </span>
      </span>
      <span className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#151515] text-white text-xs font-medium px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        {t.whatsapp}
      </span>
    </a>
  );
}
