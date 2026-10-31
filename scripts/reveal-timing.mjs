// Natural-scroll reveal-timing check (FX1 scroll-reveal law).
// Scrolls each page top → bottom with small mouse-wheel steps and pauses, and logs, for every
// entrance (an element that gains `.is-in`, or a process card that GSAP reveals), the scroll
// position at which it fires and when its subtree stops changing (its final state).
// Pass rule per entrance:
//   fire   — fires while its top is still in the lower 60 % of the viewport (entrances trigger
//            at `top 85%`; the law's outer bound is 85 %, this keeps a wide margin), or at load;
//   settle — reaches its final state before its top crosses the sticky header;
//   never  — nothing that was in view is left unfired at the bottom of the page.
// Usage: node scripts/reveal-timing.mjs [paths... (default: sitemap + legal)] [--widths=390,768,1440] [--refresh]
//   QA_BASE=http://localhost:4531 overrides the preview origin. --refresh fires a resize ~2 s
//   after load (forces ScrollTrigger.refresh) — the A/B used to prove stale trigger positions.
import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const flag = (n) => args.find((a) => a.startsWith(`--${n}`));
const paths = args.filter((a) => !a.startsWith('--'));
if (!paths.length) {
  // Default: every page in the built sitemap, plus the noindexed legal pages.
  const xml = await readFile('dist/sitemap-0.xml', 'utf8');
  paths.push(...[...xml.matchAll(/<loc>[^<]*?\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]), '/privacy/', '/terms/');
}
const base = process.env.QA_BASE ?? 'http://localhost:4331';
const widths = (flag('widths')?.split('=')[1] ?? '390,768,1440').split(',').map(Number);
const heights = { 390: 844, 768: 1024, 1440: 900 };
const forceRefresh = !!flag('refresh');
const click = flag('click')?.slice('--click='.length); // e.g. --click='.wfilter [data-filter=celebs]'
const STEP = 80; // px per wheel notch
const PAUSE = 160; // ms between notches ≈ 500 px/s, an unhurried read
const FIRE_MIN = 0.4; // fire top must be below 40 % of the viewport height

// Runs in the page before any site script.
const probe = () => {
  const units = new Map();
  const t0 = performance.now();
  const header = () => document.getElementById('site-header')?.getBoundingClientRect().bottom ?? 0;
  const label = (el) => {
    const sec = el.closest('section, footer, header');
    const s = sec ? sec.className.split(' ')[0] || sec.tagName.toLowerCase() : 'page';
    const m = el.dataset.m ? `[${el.dataset.m}]` : '';
    const own = el === sec ? '' : '>' + (el.className.baseVal ?? el.className).split(' ')[0];
    const step = el.dataset.step ? `#${el.dataset.step}` : '';
    return `${s}${own}${m}${step}`;
  };
  const sig = (el) => {
    let s = '';
    for (const n of [el, ...el.querySelectorAll('*')]) {
      if (n.closest('.mq-track, .squiggle')) continue;
      const st = n.getAttribute('style');
      if (st && /opacity|transform|translate|rotate|scale|clip-path|filter/.test(st)) s += st + '|';
      if (n.classList.contains('cu')) s += n.textContent + '|';
    }
    return s;
  };
  const diff = (a, b) => { const A = new Set(a.split('|')); return b.split('|').filter((x) => !A.has(x)).join('|').slice(0, 160); };
  const isCard = (el) => el.classList.contains('pcard2');
  const fired = (el) =>
    isCard(el) ? parseFloat(getComputedStyle(el).opacity) > 0.01 : el.classList.contains('is-in');
  const add = (el) => {
    if (units.has(el) || el.classList.contains('process')) return;
    units.set(el, { label: label(el), fire: null, settle: null, wasHidden: false, lastSig: null, lastChange: 0, lastTop: 0, lastY: 0, late: null });
  };
  // Units = whatever the site's own hidden-state rules (`…:not(.is-in) …`) can hide, plus the
  // process cards (hidden by GSAP, not CSS). CSS-keyframe entrances (hero stickers) are not units.
  const bases = new Set();
  const walk = (rules) => {
    for (const r of rules) {
      if (r.cssRules) walk(r.cssRules);
      if (!r.selectorText?.includes(':not(.is-in)')) continue;
      for (const part of r.selectorText.split(',')) {
        const i = part.indexOf(':not(.is-in)');
        if (i > 0) bases.add(part.slice(0, i).trim());
      }
    }
  };
  const scan = () => {
    if (!bases.size) for (const sh of document.styleSheets) try { walk(sh.cssRules); } catch {}
    for (const b of bases) try { document.querySelectorAll(b).forEach(add); } catch {}
    document.querySelectorAll('.pcard2').forEach(add);
  };
  const frame = () => {
    const now = performance.now() - t0;
    const vh = innerHeight;
    const hb = header();
    for (const [el, u] of units) {
      const r = el.getBoundingClientRect();
      if (!r.height || getComputedStyle(el).display === 'none') continue;
      const on = fired(el);
      if (!on) {
        u.wasHidden = true;
        if (!u.late && r.top < vh * 0.85 - 100 && r.bottom > hb) u.late = { y: scrollY, top: Math.round(r.top) };
        continue;
      }
      if (!u.fire) {
        u.fire = { t: now, y: scrollY, top: Math.round(r.top), vh, hb: Math.round(hb), atLoad: !u.wasHidden || scrollY === 0 };
        u.lastSig = sig(el);
        u.lastChange = now;
        u.lastTop = r.top;
        u.lastY = scrollY;
        continue;
      }
      if (u.settle) continue;
      const s = sig(el);
      if (s !== u.lastSig) {
        if ((u.changes ??= []).length < 40) u.changes.push([scrollY, Math.round(now), diff(u.lastSig, s)]);
        u.lastSig = s;
        u.lastChange = now;
        u.lastTop = r.top;
        u.lastY = scrollY;
      } else if (now - u.lastChange > 400) {
        u.settle = { t: u.lastChange, y: u.lastY, top: Math.round(u.lastTop), hb: Math.round(hb) };
      }
    }
    requestAnimationFrame(frame);
  };
  window.__heights = [];
  document.addEventListener('DOMContentLoaded', () => {
    new ResizeObserver(() => window.__heights.push([Math.round(performance.now() - t0), document.documentElement.scrollHeight])).observe(document.documentElement);
    scan();
    requestAnimationFrame(frame);
  });
  window.__rt = () => {
    scan();
    return [...units.values()];
  };
};

const browser = await chromium.launch();
const results = [];
for (const p of paths) {
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: heights[w] ?? 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(probe);
    await page.goto(base + p, { waitUntil: 'load' });
    await page.waitForTimeout(1200);
    if (click) {
      await page.evaluate((sel) => document.querySelector(sel)?.click(), click);
      await page.waitForTimeout(1200);
    }
    if (forceRefresh) {
      await page.evaluate(() => window.dispatchEvent(new Event('resize')));
      await page.waitForTimeout(800);
    }
    await page.mouse.move(1, (heights[w] ?? 900) / 2); // page gutter: keeps hover effects out of the timing
    for (let i = 0; i < 2000; i++) {
      const done = await page.evaluate(() => scrollY + innerHeight >= document.documentElement.scrollHeight - 2);
      if (done) break;
      await page.mouse.wheel(0, STEP);
      await page.waitForTimeout(PAUSE);
    }
    await page.waitForTimeout(1500);
    const units = await page.evaluate(() => window.__rt());
    const heightsLog = await page.evaluate(() => window.__heights);
    for (const u of units) {
      const vh = heights[w] ?? 900;
      const issues = [];
      if (!u.fire) {
        if (u.late) issues.push(`never fired (in view at y=${u.late.y})`);
        else continue; // display:none / zero-size the whole run (hidden variants, filtered cards)
      } else if (!u.fire.atLoad) {
        if (u.fire.top < vh * FIRE_MIN) issues.push(`late fire: top ${u.fire.top}px (${Math.round((u.fire.top / vh) * 100)}%)`);
        if (u.settle && u.settle.top < u.settle.hb) issues.push(`settled under header: top ${u.settle.top}px`);
        if (!u.settle) issues.push('never settled');
      }
      results.push({ page: p, w, ...u, issues, heights: undefined });
    }
    results.push({ page: p, w, label: '__heights', heightsLog });
    await ctx.close();
  }
}
await browser.close();

const rows = results.filter((r) => r.label !== '__heights');
const fails = rows.filter((r) => r.issues.length);
const pct = (top, vh) => (top == null ? '—' : `${Math.round((top / vh) * 100)}%`);
let md = `| page | w | entrance | fire y | fire top | settle y | settle top | result |\n|---|---|---|---|---|---|---|---|\n`;
for (const r of rows) {
  const vh = heights[r.w] ?? 900;
  md += `| ${r.page} | ${r.w} | ${r.label} | ${r.fire?.y ?? '—'} | ${r.fire ? (r.fire.atLoad ? 'at load' : pct(r.fire.top, vh)) : '—'} | ${r.settle?.y ?? '—'} | ${r.settle ? pct(r.settle.top, vh) : '—'} | ${r.issues.length ? 'FAIL: ' + r.issues.join('; ') : 'pass'} |\n`;
}
const outDir = path.join('.qa', 'reveal-timing');
await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, 'results.json'), JSON.stringify(results, null, 1));
await writeFile(path.join(outDir, 'table.md'), md);
for (const r of fails) console.log(`FAIL ${r.page} ${r.w} ${r.label}: ${r.issues.join('; ')}`);
console.log(`reveal-timing: ${rows.length} entrances, ${fails.length} fail${forceRefresh ? ' (--refresh)' : ''}${click ? ` (--click=${click})` : ''}`);
process.exit(fails.length ? 1 : 0);
