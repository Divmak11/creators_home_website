// Verifies every data/*.ts module traces back to docs/research/campaigns.json.
// Run with: node scripts/verify-data.ts   (from creatorshome/, Node >= 22.6 for type stripping)
// @ts-nocheck — no @types/node in this project (adding one is outside U2's scope); Node's own
// type-stripping runtime only strips types, it doesn't need them, so this still runs correctly.
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Num, Src } from '../src/data/types.ts';
import { campaigns } from '../src/data/campaigns.ts';
import { siteStats } from '../src/data/site-stats.ts';
import { pagesWall } from '../src/data/pages-wall.ts';
import { services } from '../src/data/services.ts';
import { getSlot } from '../src/data/assets.ts';
// Imported for load-smoke-test purposes (every data module must load without throwing).
import '../src/data/quotes.ts';
import '../src/data/brands.ts';
import '../src/data/industries.ts';
import '../src/data/faq.ts';
import '../src/data/process.ts';
import '../src/data/why.ts';
import '../src/data/toggle.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const campaignsJsonPath = join(__dirname, '..', '..', 'docs', 'research', 'campaigns.json');
const dataDir = join(__dirname, '..', 'src', 'data');

interface CjMetric {
  label: string;
  value: number | null;
}
interface CjRecord {
  id: string;
  metrics: CjMetric[];
}
interface CjFile {
  campaigns: CjRecord[];
}

const cj: CjFile = JSON.parse(readFileSync(campaignsJsonPath, 'utf-8'));
const byId = new Map<string, CjRecord>();
for (const rec of cj.campaigns) byId.set(rec.id, rec);

let pass = 0;
let fail = 0;
const failures: string[] = [];
const derivedNotes: string[] = [];

function ok(_label: string): void {
  pass++;
}
function bad(label: string): void {
  fail++;
  failures.push(label);
}

function unitFor(suffix: string): number {
  if (/M/.test(suffix)) return 1_000_000;
  if (/K/.test(suffix)) return 1_000;
  return 1;
}
function precisionUnit(n: Num): number {
  return unitFor(n.suffix) / Math.pow(10, n.decimals);
}
function floorToPrecision(x: number, p: number): number {
  return Math.floor(Math.round(x * 1e6) / 1e6 / p) * p;
}

// Candidate values for a (cj, label) pair — a record's metrics array can repeat a label
// (campaigns.json data-quality wart), so every value sharing the label is a candidate.
function candidatesFor(src: Src): number[] | null {
  const rec = byId.get(src.cj);
  if (!rec) return null;
  const matches = rec.metrics.filter((m) => m.label === src.metric && typeof m.value === 'number');
  if (matches.length === 0) return null;
  return matches.map((m) => m.value as number);
}

function checkNum(context: string, n: Num): void {
  if (!Array.isArray(n.src)) {
    derivedNotes.push(`${context}: ${n.display} — derived: ${n.src.derived}`);
    ok(context);
    return;
  }
  const candidateLists: number[][] = [];
  for (const s of n.src) {
    const cands = candidatesFor(s);
    if (cands === null) {
      bad(`${context}: missing metric "${s.metric}" on cj:${s.cj}`);
      return;
    }
    candidateLists.push(cands);
  }
  const target = Math.round(n.value * unitFor(n.suffix));
  const p = precisionUnit(n);

  function search(i: number, acc: number): boolean {
    if (i === candidateLists.length) return floorToPrecision(acc, p) === target;
    for (const c of candidateLists[i] ?? []) {
      if (search(i + 1, acc + c)) return true;
    }
    return false;
  }

  if (search(0, 0)) {
    ok(context);
  } else {
    bad(`${context}: no combination of ${JSON.stringify(n.src)} floors to ${n.display} (target ${target})`);
  }
}

// --- Walk every Num in the campaign/site-stats/pages-wall data ---
for (const c of campaigns) {
  if (c.figure) checkNum(`${c.slug} figure`, c.figure.num);
  for (const s of c.stats) checkNum(`${c.slug} stat "${s.label}"`, s.num);
  for (const l of c.leaderboard) checkNum(`${c.slug} leaderboard "${l.name}"`, l.num);
  if (c.platformSplit) {
    for (const card of c.platformSplit.cards) {
      checkNum(`${c.slug} platformSplit ${card.platform} headline`, card.headline.num);
      for (const r of card.rows) checkNum(`${c.slug} platformSplit ${card.platform} row "${r.label}"`, r.num);
    }
  }
}
for (const [i, s] of siteStats.entries()) checkNum(`site-stats card ${i + 1}`, s.num);
for (const p of pagesWall) checkNum(`pages-wall "${p.name}"`, p.num);

// --- campaigns.length === 8 ---
if (campaigns.length === 8) ok('campaigns.length === 8');
else bad(`campaigns.length === 8 (got ${campaigns.length})`);

// --- site-stats card 5 value === campaigns.length ---
const card5 = siteStats[4];
if (card5 && card5.num.value === campaigns.length) ok('site-stats card 5 value === campaigns.length');
else bad(`site-stats card 5 value === campaigns.length (got ${card5?.num.value})`);

// --- cards 5-8 (order 5-8) have figure null ---
for (const c of campaigns) {
  if (c.order >= 5 && c.order <= 8) {
    if (c.figure === null) ok(`${c.slug} (card ${c.order}) figure === null`);
    else bad(`${c.slug} (card ${c.order}) figure === null (got a figure)`);
  }
}

// --- every seenIn / pages-wall slug exists ---
const slugs = new Set(campaigns.map((c) => c.slug));
for (const svc of services) {
  for (const s of svc.seenIn) {
    if (slugs.has(s)) ok(`services "${svc.id}" seenIn "${s}" exists`);
    else bad(`services "${svc.id}" seenIn "${s}" — no such campaign slug`);
  }
}
for (const p of pagesWall) {
  if (slugs.has(p.campaign)) ok(`pages-wall "${p.name}" campaign "${p.campaign}" exists`);
  else bad(`pages-wall "${p.name}" campaign "${p.campaign}" — no such campaign slug`);
}

// --- every wall slot resolves to an A1 manifest entry (getSlot throws when it does not) ---
for (const c of campaigns) {
  for (const w of c.wall) {
    try { getSlot(w.slot); ok(`${c.slug} wall slot "${w.slot}" resolves in the A1 manifest`); }
    catch (e) { bad(`${c.slug} wall slot "${w.slot}" — ${(e as Error).message}`); }
  }
}

// --- no string anywhere in src/data contains /impression/i (source-text grep) ---
const dataFiles = readdirSync(dataDir).filter((f) => f.endsWith('.ts'));
let impressionHits = 0;
for (const f of dataFiles) {
  const text = readFileSync(join(dataDir, f), 'utf-8');
  const lines = text.split('\n');
  lines.forEach((line, idx) => {
    if (/impression/i.test(line)) {
      impressionHits++;
      bad(`src/data/${f}:${idx + 1} contains "impression" — ${line.trim()}`);
    }
  });
}
if (impressionHits === 0) ok('no string in src/data contains /impression/i');

// --- summary ---
console.log(`PASS ${pass} / FAIL ${fail}`);
if (derivedNotes.length > 0) {
  console.log('\nDerived (not summed from campaigns.json metrics):');
  for (const d of derivedNotes) console.log(`  - ${d}`);
}
if (failures.length > 0) {
  console.log('\nFailures:');
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
