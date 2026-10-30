# Open items — U12 self-QA

Not fixed in this unit. Step 6 scope is deliberately narrow (colour-contrast token swaps, ARIA/accessible-name/heading
fixes, SEO/BP meta/lang/console/image-aspect-ratio fixes). Everything below is performance, layout, or a design/content
trade-off, or a tooling artifact with no real defect behind it.

## 1. JS budget over by ~7.2 KB (performance)

Home (`/`, 390px) ships **77,171 bytes gzip** of JS vs the ≤ 70 KB budget (spec §5.8). Dominated by `core.D4GNQk2N.js`
(58.7 KB gzip — the GSAP bundle). Second largest is `campaigns.BRd0nkrl.js` (5.5 KB gzip), the full
`src/data/campaigns.ts` module (titles, kickers, `srcRef` strings), statically imported by both
`src/components/home/Work.astro` and `src/components/home/Rooms.astro`'s client scripts (loaded eagerly on `/`, not
behind a dynamic `import()`). Evidence: `docs/qa/budgets.md`.

**Suggested fix** (not applied): split `campaigns.ts` into a small client-safe subset (slug/title/kicker/filters only,
no `srcRef`/body/quotes) for Work's filter UI and Rooms' room-panel chips, importing the full data only where the
server needs it (page generation). Would also shrink the dominant GSAP bundle question is separate — that's a
library-size problem, not a data-shape one.

## 2. Phone page height over by 126 px

`/` at 390×844 measures `scrollHeight = 11,126px` vs the ≤ 11,000px budget — 1.1% over. Evidence: `docs/qa/budgets.md`.

**Suggested fix** (not applied): trim vertical spacing (`--s-*` gaps) in one or two of the taller sections (Work band
or Party grid are the likely candidates given card counts) — a layout change, out of step-6 scope.

## 3. Home mobile Lighthouse performance = 81 (target ≥ 95)

LCP 4.08s (target < 2.0s) on `/` mobile. Not addressed — root-causing and fixing LCP is a performance investigation
(likely render-blocking JS / main-thread work before the H1 paints), not a token swap or ARIA fix. Evidence:
`docs/qa/lighthouse.md`.

## 4. Industries marquee `color-contrast` — tooling artifact, no real defect

Lighthouse and axe both report `div.bar > div.mq-track > div.mq-set > span` (brand/industry names in the marquee) as
`ink (#160a33) on violet (#6b3bff)` = 3.28:1, failing 4.5:1 — but the live computed style of `.bar` after its
scroll-triggered entry (`gsap.fromTo(bar, {opacity:0,...}, {opacity:1,...})`, `src/components/home/Industries.astro`)
is `background: white`, giving a real on-screen contrast of ~16:1 (ink on white). The `.bar` carries
`rotate: -1.5deg`/`-2deg` (spec §5.3-2 tilt-in-`rotate` rule); axe/Lighthouse's contrast check samples the element's
axis-aligned bounding box, which for a long rotated strip extends past the actual rotated rectangle at points away
from centre, landing the sample on the page's violet background instead of the rotated white bar. Verified via
`getComputedStyle` on the live page after the same scroll+wait protocol axe uses (see `axe.md`). No token swap fixes a
measurement artifact; swapping the marquee's real colours would mean color-mismatching the actual rendered design
with no accessibility benefit.

**Suggested fix** (not applied, if ever wanted): give `.bar` a wrapping un-rotated ancestor sized to the rotated
bar's full bounding box with the same white background, purely to close the sampling gap for automated tools — a
layout change, out of step-6 scope.

## 5. Industries languages-note placeholder `color-contrast` — real, but no safe token swap

`main#main > section.industries > p.note > span.ph` ("[PLACEHOLDER: confirm languages served]"): `.note` sets
`color: var(--c-legal)` (#B3A6D6), and `components/Ph.astro`'s shared placeholder style applies `opacity: 0.85` to
every placeholder marker site-wide. Composited over the violet (`--c-violet` #6B3BFF) section background, measured
ratio is 2.18:1 (Lighthouse) / axe agrees. This is real, not an artifact.

Checked every token in `tokens.css` composited through the same 0.85 opacity against violet: only `--c-white`
(#FFFFFF) clears 4.5:1, and only barely (4.54:1 — too thin a margin to trust across browsers/rounding), and it would
turn a deliberately **muted** footnote into full-brightness white text — a visible design-weight change, which is
forbidden for this unit ("no visual redesign"). No existing token passes with a safe margin without that side effect.

**Suggested fix** (not applied): either drop the 0.85 opacity for placeholders sitting on violet backgrounds
specifically, or pick a genuinely higher-contrast muted-on-violet token and add it to `tokens.css` — both are design
calls for whoever owns the token set, not a mechanical swap.

## 6. `label-content-name-mismatch` residual on home "Who's at the party" cards (6 nodes)

Partially fixed (see `axe.md` #3). After adding the platform label into the `.pcard` `aria-label`, axe still reports
a mismatch. Root cause: axe's `visible_virtual` text extraction for this rule counts **all visually-rendered text**
inside the `<a>`, including the `aria-hidden` children (`.cu-wrap`, `.label`, `.seen`) — `aria-hidden` removes them
from the accessible tree but not from the screen, so the rule still "sees" them. The count-up suffix renders as a
bare letter (`suffix: 'M'` → visible "M"), while the card's `aria-label` spells it out ("4.6 **million**" — per spec
§5.5's screen-reader rule: count-ups get a spelled-out `aria-label`, e.g. "9 million plus reach"). Token-by-token,
visible "...page 4 6 m views..." vs label "...page 4 6 **million** views..." breaks the match right at "m" vs
"million" — a structural conflict between this rule and the spec's own deliberate abbreviated-visible /
spelled-out-spoken pattern, not a missing label fragment. Fixing it would mean either abbreviating the spoken value
(contradicts spec §5.5) or restructuring the card markup — a content/spec trade-off, not a mechanical ARIA fix, so
left open.
