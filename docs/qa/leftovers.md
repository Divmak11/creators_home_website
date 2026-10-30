# Leftovers, adjacency, screenshot sweep — U12 self-QA

## Grep checks (against `dist/`, build from this branch)

| Check | Command | Result |
|---|---|---|
| Leftover placeholder/A1 markers | `grep -rIl "slot-ph\|A1 ·\|TEMP-A1" dist` | 0 files |
| Original JPG/JPEG in dist | `find dist -iname "*.jpg" -o -iname "*.jpeg"` | 0 files |
| Dead anchors | `grep -rIl 'href="#"' dist` | 0 files |
| "impression" string | `grep -rIli impression dist --include="*.html"` | 0 files |

## `[PLACEHOLDER` occurrences per page (intentional, tracked in `docs/PLACEHOLDERS.md`)

| Page | Count |
|---|---|
| `/` | 9 |
| `/privacy/` | 11 |
| `/terms/` | 7 |
| `/work/chhedas/` | 3 |
| `/work/dhamaal-4-reddit/` | 3 |
| `/work/district-batwara-awarapan/` | 3 |
| `/work/district-odyssey-filter/` | 3 |
| `/work/fancode-ind-vs-zim/` | 3 |
| `/work/manu-singh-interrogation/` | 3 |
| `/work/raghav-juyal/` | 3 |
| `/work/samsung-galaxy-z-fold8/` | 3 |

## Motion adjacency (home, DOM order, live page)

| Order | Section | `data-m` |
|---|---|---|
| 1 | `.hero` | `card` |
| 2 | `.ribbons` | `tape` |
| 3 | `.numbers` (#numbers) | `pop` |
| 4 | `.party` (#party) | `deal` |
| 5 | `.work` (#work) | `door` |
| 6 | `.who` (#who) | `rise` |
| 7 | `.process` | `path` |
| 8 | `.why` | `spot` |
| 9 | `.rooms` (#services) | `tumble` |
| 10 | `.industries` | `swing` |
| 11 | `.faq` (#faq) | `stack` |
| 12 | `.contact` (#contact) | `door2` |

**Verdict: PASS.** No two adjacent sections share a `data-m` value (all 12 values are in fact globally distinct).
Overheard (home §3.1-12) is absent from the DOM — `SHOW_OVERHEARD=false` (BUILD.md §7) — so its would-be neighbours
are `.industries` (`swing`) and `.faq` (`stack`), which differ, so adjacency still holds with Overheard hidden.

## Screenshot set (`node scripts/qa.mjs U12 <11 paths>`, 390/768/1440, full page)

| Mode | Command suffix | Result |
|---|---|---|
| plain | (none) | rc 0 — 33/33 `ok`, 0 overflow, 0 console errors |
| no-JS | `--nojs` | rc 0 — 33/33 `ok`, 0 overflow, 0 console errors |
| reduced motion | `--reduced` | rc 0 — 33/33 `ok`, 0 overflow, 0 console errors |

Screenshots: `.qa/U12/*.png` (gitignored, not committed).
