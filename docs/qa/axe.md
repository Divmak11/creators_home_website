# axe-core — U12 self-QA

`@axe-core/playwright` on `/`, all 8 `/work/<slug>/`, `/privacy/`, `/terms/`, `/nope/` at 1440×900 and 390×844, after
scrolling the page through in 600px steps (150ms pause each) then back to top, waiting 3s (so scroll-triggered entries
have played). Raw output: `.qa/U12/axe-results.json` (gitignored).

## Violations by impact (node-instance counts)

| Impact | Before fixes (all 22 page/width combos) | After fixes — `/work/chhedas/` @390 | After fixes — `/` @390 |
|---|---|---|---|
| critical | 0 | 0 | 0 |
| serious | 147 | 0 | 40 (34 `color-contrast` + 6 `label-content-name-mismatch` — both documented as not a safe mechanical fix, see below and `open.md`) |
| moderate | 0 | 0 | 0 |
| minor | 0 | 0 | 0 |

`aria-prohibited-attr` (the one rule chhedas had) and the `.bg-orange .kicker` `color-contrast` instances are fully
resolved everywhere. The 40 remaining on `/` are the industries-marquee tooling artifact, the placeholder-note
contrast, and the "who's at the party" label residual — none of which fit step 6's fix categories; see `open.md`.

## Rules, before fixes

| Rule id | Impact | Node count (all pages/widths) | First 3 target selectors |
|---|---|---|---|
| `aria-prohibited-attr` | serious | 92 | `span[aria-label="6 million plus reach"]`, `span[aria-label="2 million plus views"]`, `span[aria-label="1.4 million reach on X"]` — all `.cu-wrap` count-up spans |
| `color-contrast` | serious | 43 | `div[data-filters="celebs"] > .bg-orange > .kicker`, `div[data-filters="film"] > .bg-orange > .kicker`, `.note > .ph[data-placeholder=""]` |
| `label-content-name-mismatch` | serious | 12 | `.bg-orange.pcard[href$="raghav-juyal/"]`, `.pcard.bg-white[href$="raghav-juyal/"]:nth-child(2)`, `.bg-ink.pcard[href$="raghav-juyal/"]` — "who's at the party" cards |

Per-page breakdown (rule count, not node count):
- `/` @1440 and @390: 3 rules (`aria-prohibited-attr`, `color-contrast`, `label-content-name-mismatch`)
- `/work/raghav-juyal/`, `/work/chhedas/`, `/work/district-batwara-awarapan/`, `/work/manu-singh-interrogation/`: 1 rule (`aria-prohibited-attr`) each width
- `/work/samsung-galaxy-z-fold8/`: 1 rule (`color-contrast`) each width
- `/work/dhamaal-4-reddit/`: 2 rules (`aria-prohibited-attr` + `color-contrast`) each width
- `/work/fancode-ind-vs-zim/`, `/work/district-odyssey-filter/`, `/privacy/`, `/terms/`, `/nope/`: 0 rules, both widths

## Fixes applied (see root `docs/units/U12.md` for commits)

1. `aria-prohibited-attr` (all 92 nodes): `<span class="cu-wrap" aria-label="...">` has no implicit role, and axe/ARIA 1.2
   forbid `aria-label` on role=generic. Added `role="img"` (the children are already `aria-hidden`, matching the
   accessible-image pattern) in `src/components/WorkCard.astro`, `src/components/home/Numbers.astro`,
   `src/components/case/CaseNumbers.astro`, `src/components/case/PlatformSplit.astro` (×2 occurrences),
   `src/components/case/Leaderboard.astro`.
2. `color-contrast` on `.bg-orange .kicker` (WorkCard + its re-use in `case/NextRoom.astro`): kicker text used
   `--c-muted-light` (#4A3B73) on `--c-orange` (#FF6A1F) = 3.39:1, failing 4.5:1, and against BUILD.md §3 ("Text on
   orange is ALWAYS ink `--c-ink`"). Split the rule so `.bg-orange .kicker` uses `--c-ink` (#160A33) = 6.52:1 (pass);
   `.bg-white .kicker` keeps `--c-muted-light` (9.70:1, unaffected).
3. `label-content-name-mismatch` (12 nodes, home "Who's at the party" `.pcard` links) — **partially fixed, residual
   documented in `open.md`**: the `aria-label` omitted the visible, non-`aria-hidden` `<span class="platform">` text
   ("Instagram page"), the first point the rule's token match broke on. Added `platformLabel(card.platform)` into the
   `aria-label` and a literal space between `.name`/`.platform` in the markup (`src/components/home/Party.astro`) so
   that run matches. The rule still reports 6 nodes afterwards for a deeper reason — see `open.md` — rooted in the
   spec's own count-up accessible-name pattern (§5.5), not something this edit can safely resolve.

## Not fixed — see `open.md`

- `color-contrast` on the industries marquee (`div.bar > div.mq-track > div.mq-set > span`, 390-width only, 33 nodes):
  axe/Lighthouse both report `bgColor=#6b3bff` (violet, the page background), but the live computed
  style of `.bar` after its scroll-triggered entry is `background: white` (verified via `getComputedStyle`). This is
  a measurement artifact of the `.bar`'s `rotate: -1.5deg`/`-2deg` tilt — axe/Lighthouse sample the element's
  axis-aligned bounding box, which for a rotated strip extends past the actual rotated white rectangle at the ends of
  a long marquee row, landing the sample on the violet page background instead. Real on-screen contrast (ink `#160a33`
  on white) is ~16:1. No token swap changes this (there is no real defect to fix).
- `color-contrast` on `.note > .ph` (industries languages placeholder, violet bg): real, not an artifact. See `open.md`
  for why no existing token passes without a visual-weight change.
