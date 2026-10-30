# CreatorsHome build contract (B2)

The design contract is `../docs/design/creatorshome_spec.md` (cited `§n`). Founder rulings at the bottom of
`../docs/plan.md` override it. This file fixes HOW the build is done so every unit looks like one hand wrote it.

## 1. Stack and commands
- Astro (latest stable), static output, TypeScript strict, npm. Everything lives in `creatorshome/`.
- **Node**: Astro 7.4 needs Node ≥ 22.23.4; the machine's nvm default is 22.22.1. Run every npm/node command with
  `PATH=/opt/homebrew/bin:$PATH` (Homebrew Node 23.11) — e.g. `PATH=/opt/homebrew/bin:$PATH npm run build`.
- `npm run dev` → `astro dev --port 4331` · `npm run build` · `npm run preview` → `astro preview --port 4331`.
- Libraries: `gsap` (core + ScrollTrigger + Flip + SplitText + CustomEase), `@astrojs/sitemap`, fontsource packages
  (`@fontsource-variable/unbounded`, `@fontsource-variable/dm-sans`, `@fontsource/noto-sans-{devanagari,tamil,telugu,bengali}` 700),
  `satori` + `@resvg/resvg-js` (OG, U10). Dev only: `playwright`. Nothing else without the parent's OK.
- Site URL lives ONLY in `src/config.ts` (`SITE_URL = 'https://creatorshome.example'`). `trailingSlash: 'always'`, `<html lang="en-IN">`.

## 2. Layout of `src/`
```
config.ts                  SITE_URL, SITE_NAME, FORM_ENDPOINT, WEB3FORMS_ACCESS_KEY, ANALYTICS_ENABLED, LEGAL_READY,
                           IG_FOLLOWERS_CONFIRMED, INSTAGRAM_URL, SHOW_OVERHEARD, CONTACT (email/phone/city = null → placeholder)
styles/tokens.css          every token of §7.3 + §5.2 (colours, type, spacing, radii, shadows, eases, durations)
styles/global.css          reset, base type, focus ring, utilities (.vh visually-hidden, .container, .tilt), ch-* keyframes,
                           js-motion initial states, reduced-motion + paused rules, view-transition rules
layouts/Base.astro         <head> (meta slots, fonts preload, head script §4), skip link, Header, <main id="main">, Footer
components/                Header, Footer, Logo, Ph (placeholder marker), Icon (inline SVG set), Slot (asset slot, §5)
components/home/*.astro    one file per home section (Hero, Ribbons, Numbers, Party, Work, Toggle, Process, Why, Rooms,
                           Industries, Overheard, Faq, Contact)
components/case/*.astro    case-study blocks
data/*.ts                  campaigns, site-stats, pages-wall, services, quotes, assets (slot map)
scripts/motion/*.ts        core (GSAP setup, onEnter, ready, eases), countup, marquee, pause; one file per section (home-*.ts, case-*.ts)
pages/                     index, work/[slug], privacy, terms, 404, og/[slug].png.ts, robots.txt.ts
```
Component styles: scoped `<style>` in the `.astro` file. Never copy the design's inline styles; translate them to classes
using tokens. Breakpoints: phone `max-width: 767.98px`, tablet `768px–1199.98px`, desktop `min-width: 1200px`.

## 3. CSS rules (spec §5.3, §7.3)
- **Tilt lives in the `rotate` property**: `.tilt { rotate: calc(var(--r, 0deg) * var(--tilt-k, 1)); }`, `--tilt-k: .5` on phones.
  Entry/hover motion uses `translate` / `scale` / `transform` only. Never animate width/height/top/left/margin.
- One `transition` list per element (F-05): `transition: opacity, translate, scale, rotate, background-color, color` with
  durations/eases from tokens. Hover changes values only.
- Hover effects only inside `@media (hover: hover) and (pointer: fine)`.
- Text on orange is ALWAYS ink `--c-ink` (F-10). Muted on violet = `--c-muted-violet`. Hard shadows only, never blurred.
- Focus ring on every interactive element: `outline: 3px solid #fff; outline-offset: 2px; box-shadow: 0 0 0 6px var(--c-ink);` (`:focus-visible`).
- No `href="#"` anywhere. Socials without a URL are not rendered.

## 4. Motion contract (spec §5)
- Head script (inline, in `Base.astro`, before CSS):
  ```js
  (function(d){var e=d.documentElement,p=false;e.classList.add('js');
  try{p=localStorage.getItem('ch-motion')==='paused'}catch(_){}
  if(p)e.dataset.motion='paused';
  if(!p&&!matchMedia('(prefers-reduced-motion: reduce)').matches){e.classList.add('js-motion');
  setTimeout(function(){if(!window.__chReady)e.classList.remove('js-motion')},2500)}})(document);
  ```
- `html.js` = JS ran (gate for JS-only UI: filters, room panel default). `html.js-motion` = entries will animate.
  **Initial hidden states are written ONLY under `html.js-motion`** (usually `opacity: 0`). Without it everything is at rest.
- `scripts/motion/core.ts` exports `gsap, ScrollTrigger, Flip, SplitText`, eases `'ch-smooth'` = cubic-bezier(.2,.7,.2,1),
  `'ch-spring'` = (.34,1.56,.64,1), `'ch-out'` = (.16,1,.3,1) (via CustomEase), `motionOn()`, `isPaused()`,
  `onEnter(el, fn, start='top 85%')` (ScrollTrigger, `once: true`; no-op when `!motionOn()`), and `ready()` (sets `window.__chReady`).
  Every section script: on `!motionOn()` do nothing (content is already at rest). Every GSAP entry ends with `clearProps` for what it set.
- Infinite loops (rotator, bob, spin, marquee) are CSS animations carrying class `.loop`. `@media (prefers-reduced-motion: reduce)`
  and `html[data-motion="paused"]` → `.loop { animation: none !important }`. Off-screen → `.loop.is-off { animation-play-state: paused }` (IO in core).
- Count-up markup: `<span class="cu-wrap" aria-label="9 million plus reach"><span class="cu" data-to="9" data-dec="0" aria-hidden="true">9</span><span class="sfx" aria-hidden="true">M+</span></span>`.
  HTML always holds the FINAL value; JS sets the start value only when motion is on. `font-variant-numeric: tabular-nums`, `min-width: <len>ch`.
- Pause toggle: any `[data-pause-toggle]` button (`aria-pressed`). Sets/removes `html[data-motion="paused"]` + `localStorage['ch-motion']` (try/catch).

## 5. Asset slots (A1 landed — U11)
- `src/data/assets.ts` maps every `SlotId` to a key in `src/data/a1-manifest.json` (a copy of A1's
  `brand-assets/creatorshome/manifest.json`); `getSlot(id)` resolves that key to the manifest's AVIF/WebP
  files, width/height, `lqip`, `objectPosition` and `alt`, and throws at build time if a key is missing.
- `components/Slot.astro` renders a hand-written `<picture>` (avif + webp `<source>`, sized `<img>`) straight
  from `getSlot(id)` — no `astro:assets` re-encode. A missing slot is a build error, not a placeholder.
- Full slot → manifest-key table, file counts and the samsung cover/wall override: `docs/ASSET_SLOTS.md`.

## 6. Placeholders
`components/Ph.astro` renders `[PLACEHOLDER: text]` visibly (dashed outline, `data-placeholder`). JSON-LD/meta never contain placeholders
(omit the field). Every placeholder used is listed in `docs/PLACEHOLDERS.md` (spec §11.1 id + file).

## 7. Rulings applied (plan.md log, 2026-10-30) — these beat the spec
- Forms: Web3Forms. `FORM_ENDPOINT = 'https://api.web3forms.com/submit'`, `WEB3FORMS_ACCESS_KEY = '[PLACEHOLDER]'` constant, hidden `access_key` field.
- 60.4K @thecreatorhome IS CreatorsHome: `IG_FOLLOWERS_CONFIRMED = true`, Instagram link `https://www.instagram.com/thecreatorhome/` rendered.
- No testimonials at launch: the Overheard sections (home §3.1-12 and case-page block 7) are built but hidden by `SHOW_OVERHEARD = false`.
- Analytics: Vercel Web Analytics component built, `ANALYTICS_ENABLED = false` until deploy (F1).
- With-caution screenshots: used (blur done by A1). Names "CreatorsHome" one word everywhere.

## 8. QA
- `scripts/qa.mjs` (Playwright): `node scripts/qa.mjs <unit> [paths…] [--nojs] [--reduced]` against `npm run preview` on :4331.
  Full-page screenshots at 390×844, 768×1024, 1440×900 into `.qa/<unit>/`, prints console errors and
  `scrollWidth === innerWidth` per width. `.qa/` is gitignored.
- Unit receipts: `docs/units/U<n>.md` (≤ 30 lines: what landed, checks run + results, deviations).

- Preview server: Astro 7 `astro preview` runs as a daemon. Start: `npm run preview`; stop: `npx astro preview stop` (pkill does not stop it). Always stop it at the end of a unit.

## 9. Commits
One commit per unit (more if a unit is large), staged by explicit path, message says why, ends with
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Never push.
