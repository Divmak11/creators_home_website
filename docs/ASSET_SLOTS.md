# Asset slots (U11 — A1 landed)

`src/data/assets.ts` is the single slot map (BUILD.md §5). Every `SlotId` maps to a key in
`src/data/a1-manifest.json` (copy of A1's `brand-assets/creatorshome/manifest.json`); `getSlot(id)`
resolves that key to AVIF/WebP file lists under `public/img/...` and throws at build time if the
manifest is missing the key. A missing slot is a build error now, not a placeholder.

| slot id | manifest key | files | state |
|---|---|---|---|
| `cover:chhedas` | `cover/chhedas` | 6 (400, 800, 1200 × avif/webp) | A1 — served as-is |
| `cover:district-batwara-awarapan` | `cover/district-batwara-awarapan` | 4 (400, 522 × avif/webp) | A1 — served as-is |
| `cover:fancode-ind-vs-zim` | `cover/fancode-ind-vs-zim` | 6 (400, 800, 1080 × avif/webp) | A1 — served as-is |
| `cover:district-odyssey-filter` | `cover/district-odyssey-filter` | 6 (400, 800, 1080 × avif/webp) | A1 — served as-is |
| `cover:dhamaal-4-reddit` | `cover/dhamaal-4-reddit` | 4 (400, 800 × avif/webp) | A1 — served as-is |
| `wall:chhedas:1` | `wall/chhedas/p04_i8` | 4 (360, 498 × avif/webp) | A1 — served as-is |
| `wall:chhedas:2` | `wall/chhedas/p04_i9` | 6 (360, 720, 744 × avif/webp) | A1 — served as-is |
| `wall:chhedas:3` | `wall/chhedas/p04_i10` | 6 (360, 720, 855 × avif/webp) | A1 — served as-is |
| `wall:chhedas:4` | `wall/chhedas/p03_i5` | 6 (360, 720, 883 × avif/webp) | A1 — served as-is |
| `wall:chhedas:5` | `wall/chhedas/p05_i11` | 6 (360, 720, 914 × avif/webp) | A1 — served as-is |
| `wall:district-batwara-awarapan:1` | `wall/district-batwara-awarapan/p01_i2` | 4 (360, 590 × avif/webp) | A1 — served as-is |
| `wall:district-batwara-awarapan:2` | `wall/district-batwara-awarapan/p02_i5` | 4 (360, 590 × avif/webp) | A1 — served as-is |
| `wall:district-batwara-awarapan:3` | `wall/district-batwara-awarapan/p07_i8` | 4 (360, 590 × avif/webp) | A1 — served as-is |
| `wall:fancode-ind-vs-zim:1` | `wall/fancode-ind-vs-zim/s06_i4` | 6 (360, 720, 1080 × avif/webp) | A1 — served as-is |
| `wall:fancode-ind-vs-zim:2` | `wall/fancode-ind-vs-zim/s06_i5` | 6 (360, 720, 1080 × avif/webp) | A1 — served as-is |
| `wall:dhamaal-4-reddit:1` | `wall/dhamaal-4-reddit/s09_i3` | 6 (360, 720, 949 × avif/webp) | A1 — served as-is |
| `wall:samsung-galaxy-z-fold8:1` | `cover/samsung-galaxy-z-fold8` (shown large as a print, not a small card cover — parent ruling) | 6 (400, 800, 1080 × avif/webp) | A1 — served as-is |
| `sticker:A-01` | `A-01` | 4 (160, 320 × avif/webp) | A1 — served as-is |
| `sticker:A-02` | `A-02` | 4 (160, 320 × avif/webp) | A1 — served as-is |
| `sticker:A-03` | `A-03` | 4 (160, 320 × avif/webp) | A1 — served as-is |
| `sticker:A-04` | `A-04` | 4 (240, 480 × avif/webp) | A1 — served as-is |
| `sticker:A-05` | `A-05` | 6 (320, 640, 960 × avif/webp) | A1 — served as-is |
| `og-bg` | `A-06` | 1 (png, 1200×630) | A1 — served as-is |

Logo/mark/badge SVGs (`public/brand/*.svg`) and icons (`public/favicon.svg`, `favicon.ico`,
`apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`) are A1 output
too, copied byte-identical from `brand-assets/creatorshome/{brand,icons}/` — not part of the
`SlotId` map, referenced directly by `Logo.astro`/`Base.astro`.

## TEMP files (marked `TEMP-A1`, swap when A1 lands)
None.
