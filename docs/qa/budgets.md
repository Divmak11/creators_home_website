# Performance budgets — U12 self-QA

Measured on `/` at 390×844 via Playwright, `page.on('response')` over every request matching `/_astro/*.js` and
`/_astro/*.css`, networkidle; size = `gzip -9` of the matching `dist/_astro/*` file (transferred-size estimate, spec
§5.8 / BUILD.md method).

## JS total

**77,171 bytes gzip (≈ 75.4 KB) vs budget ≤ 70 KB — OVER by ~7.2 KB (10%).** 22 JS files requested on `/`. Not fixed
(performance, out of scope for step 6 — see `open.md`).

5 largest JS files:

| File | Gzip bytes | Contains |
|---|---|---|
| `core.D4GNQk2N.js` | 58,742 | GSAP core + ScrollTrigger/Flip/SplitText bundle (`scripts/motion/core.ts`) — the motion library, no site copy |
| `campaigns.BRd0nkrl.js` | 5,493 | Full `src/data/campaigns.ts` — grepped identifiers `Chheda`, `District`, `Odyssey`, `kicker`, `srcRef` are all present, i.e. **campaign copy and `srcRef` strings ship client-side**. Statically imported by `src/components/home/Work.astro`'s client script (filter/Flip logic) and `src/components/home/Rooms.astro`'s client script, both of which load eagerly (`<script type="module">`, not a dynamic `import()`) on `/`. |
| `Contact.astro_astro_type_script_index_0_lang.0_HcoKYo.js` | 2,381 | Contact form client logic (Web3Forms submit, validation, confetti trigger) |
| `Work.astro_astro_type_script_index_0_lang.Dmpzitin.js` | 1,750 | Work band filter/Flip/rail/peek logic (imports the `campaigns.BRd0nkrl.js` chunk above) |
| `Process.astro_astro_type_script_index_0_lang.C8QmuJQV.js` | 1,075 | How-it-works scroll-scrubbed path draw (ScrollTrigger scrub) |

## CSS total

**14,432 bytes gzip (≈ 14.1 KB) vs budget ≤ 30 KB — PASS**, comfortable margin. 3 CSS files on `/`:
`index.XlbheSpG.css` (6,814 B), `Base.BGt7DGMJ.css` (5,979 B), `QuoteCard.Cnc7v6VX.css` (1,639 B).

## Fonts requested on `/` at load

**6 WOFF2 files**: `unbounded-latin-wght-normal` (variable, preloaded), `dm-sans-latin-wght-normal` (variable,
preloaded), plus 4 on-demand via `unicode-range` match (not preloaded): `noto-sans-devanagari-devanagari-700-normal`,
`noto-sans-tamil-tamil-700-normal`, `noto-sans-telugu-telugu-700-normal`, `noto-sans-bengali-bengali-700-normal`. Only
2 are `<link rel="preload">` (within spec §5.8's "3 WOFF2 files preloaded at most"); the 4 Indic subsets load
on-demand because the home Industries/languages ribbon renders native-script text in those languages — matches the
spec's "Indic subsets load on demand via `unicode-range`" intent, not a budget violation.

## Phone page height

`document.documentElement.scrollHeight` at 390×844 on `/`: **11,126 px vs budget ≤ 11,000 px — OVER by 126 px (1.1%)**.
Not fixed (layout, out of scope for step 6 — see `open.md`).
