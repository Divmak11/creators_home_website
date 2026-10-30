# Asset slots (U1)

`src/data/assets.ts` is the single slot map (BUILD.md §5). Every value is `null` until A1 lands (U11 swap).

| slot id | spec ref | size / widths | current state |
|---|---|---|---|
| `cover:chhedas` | §8.2 Cover · chhedas | 1200×1500 src; 400, 800, 1200 | placeholder |
| `cover:district-batwara-awarapan` | §8.2 Cover · district-batwara-awarapan | 590×1280 src, ≈4:5 crop; 400, 590 | placeholder |
| `cover:fancode-ind-vs-zim` | §8.2 Cover · fancode | 1080×1230 src; 400, 800, 1080 | placeholder |
| `cover:samsung-galaxy-z-fold8` | §8.2 Cover · samsung | 1080×705 src; 400, 800, 1080 | placeholder |
| `cover:district-odyssey-filter` | §8.2 Cover · odyssey | 1080×1065 src; 400, 800, 1080 | placeholder |
| `cover:dhamaal-4-reddit` | §8.2 Cover · dhamaal | 949×1600 src, ≈4:5 crop; 400, 800 | placeholder |
| `wall:chhedas:1` … `wall:chhedas:5` | §4.5 proof wall — chhedas (5 items) | 360, 720 (phones); full ≤1600 for lightbox | placeholder |
| `wall:district-batwara-awarapan:1` … `:3` | §4.5 proof wall — district × Batwara/Awarapan (3 items) | 360, 720; full ≤1600 | placeholder |
| `wall:fancode-ind-vs-zim:1` … `:2` | §4.5 proof wall — FanCode IND vs ZIM (2 items) | 360, 720; full ≤1600 | placeholder |
| `wall:dhamaal-4-reddit:1` | §4.5 proof wall — Dhamaal 4 (1 item) | 360, 720; full ≤1600 | placeholder |
| `sticker:A-01` | §8 asset list — disco ball house | 1:1, 800 master; 160, 320 | placeholder |
| `sticker:A-02` | §8 asset list — party popper | 1:1; 160, 320 | placeholder |
| `sticker:A-03` | §8 asset list — speech bubble + heart | 1:1; 160, 320 | placeholder |
| `sticker:A-04` | §8 asset list — doormat "welcome" | 3:2, 1200 master; 240, 480 | placeholder |
| `sticker:A-05` | §8 asset list — 404 illustration (door ajar) | 1:1, 1200 master; 320, 640, 960 | placeholder |
| `og-bg` | §8 asset list A-06 / §9.3 OG generator | 1200×630 exact | placeholder |

## TEMP files (marked `TEMP-A1`, swap when A1 lands)
- `public/favicon.svg` — L57 house-heart mark on a `#6B3BFF` rounded square (rx 22%).
- `src/components/Logo.astro` — inline SVG mark (house + heart paths from L57, 3px ink stroke on the house).
