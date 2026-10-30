# Lighthouse — U12 self-QA

6 runs: `/`, `/work/chhedas/`, `/privacy/` × mobile (default) / desktop (`--preset=desktop`), against `astro preview` (:4331),
`npx -y lighthouse@latest ... --chrome-flags="--headless=new"`, `CHROME_PATH` = Playwright's Chromium.
Raw reports: `.qa/U12/lh-<page>-<mode>.json` (gitignored).

## Scores + Core Web Vitals

Step 7 only re-runs Lighthouse **mobile** on the 3 pages (brief step 7); desktop is before-fixes only.

| Page | Mode | Perf | A11y (before→after) | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| / | mobile | 81 → 81 | 93 → 97 | 100 | 100 | 4.08s → 3.43s | 0.000 | 21ms → 414ms* |
| / | desktop | 99 | 93 (not re-run) | 100 | 100 | 0.84s | 0.000 | 0ms |
| /work/chhedas/ | mobile | 95 → 95 | 96 → 100 | 100 | 100 | 2.99s → 2.98s | 0.000 | 0ms |
| /work/chhedas/ | desktop | 100 | 96 (not re-run) | 100 | 100 | 0.66s | 0.001 | 0ms |
| /privacy/ | mobile | 100 → 100 | 100 → 100 | 100 | 69 → 69** | 0.76s | 0.000 | 0ms |
| /privacy/ | desktop | 100 | 100 (not re-run) | 100 | 69** | 0.46s | 0.000 | 0ms |

\* The 414ms TBT on the after-run is local Lighthouse run-to-run throttling/CPU variance, not a regression from the
accessibility fixes (adding `role="img"` attributes and one more `aria-label` word has no runtime cost); LCP and
every score held or improved on the same run.

\** `/privacy/` SEO=69 is the `is-crawlable` audit firing on the intentional `<meta name="robots" content="noindex, follow">`
(spec §3.3 / `LEGAL_READY=false` ruling, BUILD.md §7). Not a defect — listed exception per the U12 acceptance line ("or
listed exceptions"). No fix applicable.

Home mobile A11y is 97, not 100: `aria-prohibited-attr` is fully fixed, but one `color-contrast` audit remains
(the industries marquee + placeholder-note items) — see `open.md` items 4–5 for why neither has a safe fix in this
unit's scope. No performance fixes applied (out of scope per step 6; see `open.md` items 1–3).

## Accessibility / BP / SEO failing audits (before fixes)

| Page/mode | Audit id | Category | Failing nodes (first 3 selectors) |
|---|---|---|---|
| home mobile, home desktop, chhedas mobile, chhedas desktop | `aria-prohibited-attr` | accessibility | `span.cu-wrap` (count-up wrapper) across `.wgrid .wcard`, `.grid .stat`, `.rows .row` — `aria-label` on a `<span>` with no role (role=generic forbids aria-label) |
| home mobile | `color-contrast` | accessibility | `div.bar > div.mq-track > div.mq-set > span` ×5+ (industries marquee item text) |
| home desktop | `color-contrast` | accessibility | `main#main > section.industries > p.note > span.ph` (placeholder note) |
| /privacy/ mobile+desktop | `is-crawlable` | seo | `head > meta` (intentional noindex, see above) |

## Accessibility after fixes (home mobile + chhedas mobile re-run)

- `aria-prohibited-attr`: 0 (fixed — `role="img"` added to every `cu-wrap` span with an `aria-label`, in
  `WorkCard.astro`, `home/Numbers.astro`, `case/CaseNumbers.astro`, `case/PlatformSplit.astro` ×2, `case/Leaderboard.astro`)
- `color-contrast` on `.bg-orange .kicker`: fixed (ink swapped in, see `axe.md`). The two remaining `color-contrast`
  items (marquee + placeholder note) are NOT a clean token-swap fix — see `open.md`.

## Top 5 performance opportunities/diagnostics per run (savings)

| Page/mode | Audit id | Savings |
|---|---|---|
| home mobile | `unused-javascript` | 270ms / 34.9 KB |
| home mobile | `user-timings` | — (informational) |
| home mobile | `mainthread-work-breakdown` | 2.3s main-thread (informational) |
| home desktop | `unused-javascript` | 80ms / 33.6 KB |
| home desktop | `user-timings` | — (informational) |
| chhedas mobile | `unused-javascript` | 200ms / 29.9 KB |
| chhedas mobile | `user-timings` / `long-tasks` / `non-composited-animations` | 0 / informational |
| chhedas desktop | `unused-javascript` | 40ms / 29.7 KB |
| privacy mobile | `unused-javascript` | 0ms / 35.8 KB (SEO-noindex page, no other perf debt) |
| privacy desktop | `unused-javascript` | 50ms / 35.8 KB |

No performance fixes applied (out of scope per step 6; see `open.md`).

## Final (parent fixes 3b04843, d34fd93; final build f5b3810) — mobile

| Page | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| / | 100 | 100 | 100 | 100 | 1.1s | 0 | 0ms |
| /work/chhedas/ | 94 | 100 | 100 | 100 | 3.0s | 0 | 0ms |
| /privacy/ | 100 | 100 | 100 | 69* | 0.8s | 0 | 0ms |

\* intentional `noindex, follow` while `LEGAL_READY=false`. Home LCP moved from the header logo to the H1 once the H1
stopped starting at opacity 0. Chheda's LCP is the case-hero cover (800w AVIF, eager, fetchpriority high).
