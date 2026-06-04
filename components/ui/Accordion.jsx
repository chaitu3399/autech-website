"use client";

import { Check, Minus, Plus } from "lucide-react";
import Media from "@/components/ui/Media";

export default function Accordion({ items, openIndex, onToggle, images = [] }) {
  return (
    <div className="border-t border-default">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `accordion-panel-${i}`;
        const headerId = `accordion-header-${i}`;

        return (
          <div key={i} data-testid={`service-row-${i}`} className="border-b border-default">
            <button
              type="button"
              id={headerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onToggle(isOpen ? -1 : i)}
              className="w-full text-left grid grid-cols-[auto_1fr_auto] md:grid-cols-12 grid-section items-center py-5 group focus-ring rounded-sm touch-manipulation"
            >
              <div className="md:col-span-1">
                <span className="index-num tabular-nums">0{i + 1}</span>
              </div>
              <div className="min-w-0 md:col-span-5">
                <span className="text-display-card text-primary group-hover:text-accent transition-colors duration-300">
                  {item.t}
                </span>
                <p className="md:hidden text-body-sm text-muted mt-1 line-clamp-2">{item.d}</p>
              </div>
              <div className="hidden md:block md:col-span-5 text-body-sm text-muted max-w-md">{item.d}</div>
              <div className="md:col-span-1 flex justify-end">
                <span
                  className={`accordion-toggle w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isOpen ? "bg-accent" : "bg-dark"}`}
                  aria-hidden="true"
                >
                  {isOpen ? <Minus size={16} color="#fff" /> : <Plus size={16} color="#fff" />}
                </span>
              </div>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              aria-hidden={!isOpen}
              className={`accordion-panel ${isOpen ? "accordion-panel--open" : ""}`}
            >
              <div className="accordion-panel__inner">
                <div className="accordion-panel__content grid lg:grid-cols-12 grid-section items-start">
                  {images[i] ? (
                    <div className="lg:col-start-2 lg:col-span-5">
                      <Media src={images[i]} alt="" variant="card" />
                    </div>
                  ) : null}
                  <div className={`min-w-0 ${images[i] ? "lg:col-span-5" : "lg:col-span-10 lg:col-start-2"}`}>
                    <p className="hidden md:block text-body-sm text-muted mb-4">{item.d}</p>
                    <ul className="space-y-2">
                      {item.feats?.map((f, j) => (
                        <li key={j} className="flex items-start gap-3 text-primary">
                          <span className="mt-1 w-5 h-5 rounded-full bg-[color-mix(in_srgb,var(--autech-burnt)_12%,transparent)] flex items-center justify-center shrink-0">
                            <Check size={12} className="text-accent" aria-hidden="true" />
                          </span>
                          <span className="text-body">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
