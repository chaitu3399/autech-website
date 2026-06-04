# UI audit (post-rebuild)

Guidelines: [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines). Status after parallel rebuild and full-page design review.

## Hydration fix (Services / Industries)

Root cause: `useSearchParams` inside `<Suspense>` hydrated **after** `LanguageProvider` ran `useEffect` and switched to English from `localStorage`, while SSR had Spanish.

Fixes applied:
- Server reads `autech_lang` cookie in `app/layout.js` and passes `initialLang`
- Removed `<Suspense>` around Services/Industries; pass `searchParams` from `app/page.js`
- Language sync deferred with `setTimeout(0)` after mount
- Inline script syncs cookie from `localStorage` before React (helps on full reload)

## Design review (Playwright)

Full-page visual audit script captures every section, scroll slices (mobile), and ES + EN passes.

```bash
npm run dev   # port 3000
npm run design:review
```

Outputs (gitignored):
- `docs/review-screenshots/{home|careers}/{mobile|desktop}/{es|en}/{full,sections,scroll}/`
- `docs/design-review-report.md`

Uses bundled Chromium (`playwright` devDependency). Cursor MCP Playwright may still require system Chrome.

### UX fixes from review (2026-06)

- Mobile hero stats: extra bottom/end padding so WhatsApp FAB does not cover stats
- Language switcher: 44×44px minimum touch targets
- Header CTA: hidden below `lg` (wrapper avoids `.btn-primary` overriding `hidden`)
- Industries tabs: contained horizontal scroll (no page overflow)
- Marquee: slower animation on viewports under 768px
- Services: first accordion opens on mobile when no `?service=` param
- Footer social icons: 44×44px hit area (URLs still placeholder `#`)

## Fixed in rebuild

- Semantic design tokens in `app/globals.css` (no hex in new JSX)
- `components/ui/*` primitives + `components/sections/*` + `components/pages/*`
- Nav uses `<Link href>` for in-page and cross-route anchors
- Contact + careers forms use `<label htmlFor>`, `name`, `autocomplete`
- `aria-pressed` on language switcher; `aria-live` on form success
- Marquee strip: `aria-label` instead of `aria-hidden`
- `?service=` and `?industry=` URL state
- `next/image` + `remotePatterns` for Pexels/Unsplash
- Preconnect for image CDNs in `app/layout.js`
- `color-scheme: dark` on `.section--dark` / `.bg-dark`
- Careers copy i18n (`back`, `established`, stats tags)
- Section `data-testid` for design-review selectors (strip, careers blocks)

## Remaining (low priority)

```text
## components/layout/FooterShell.jsx

FooterShell.jsx - social links still href="#" (placeholder until real URLs)

## lib/constants.js / translations

Placeholder phone +1 (787) 000-0000 and WA_NUMBER until client provides real values

## app/layout.js

html lang synced after mount when stored preference differs (brief flash possible; avoids hydration mismatch)
```

## Pass

- Skip link, scroll-margin, focus-ring, reduced motion
- Hero image `priority`, dimensions via fill + aspect ratio
- Decorative images `alt=""`
- testId attributes preserved on main flows
- Full-page review: no horizontal overflow, no console errors, h1 clears fixed header (ES + EN)
