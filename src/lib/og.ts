// OG image template (spec §9.3, BUILD.md U10). Builds a satori-compatible plain-object tree
// (no JSX — satori reads { type, props } nodes) and renders it to a 1200×630 PNG with
// @resvg/resvg-js. Fonts and static art are read once per build and cached module-level.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import type { Campaign, Filter } from '../data/types.ts';

const CATEGORY_PILL: Record<Filter, { bg: string; fg: string }> = {
  film: { bg: '#6B3BFF', fg: '#FFFFFF' },
  brands: { bg: '#FF6A1F', fg: '#160A33' },
  celebs: { bg: '#160A33', fg: '#FFFFFF' },
  reddit: { bg: '#FFFFFF', fg: '#160A33' },
};
const FILTER_LABEL: Record<Filter, string> = { film: 'Film & OTT', brands: 'Brands', celebs: 'Celebs', reddit: 'Reddit' };

let cache: { unbounded: Buffer; dmSans: Buffer; bg: string; mark: string; badge: string } | null = null;

async function loadAssets() {
  if (cache) return cache;

  // Resolved relative to the project root (process.cwd() when `astro build` runs), not
  // import.meta.url — the build step bundles this module into dist/.prerender/chunks, which
  // would break a relative-to-source path.
  const root = process.cwd();
  const unboundedPath = path.join(root, 'node_modules/@fontsource/unbounded/files/unbounded-latin-800-normal.woff');
  const dmSansPath = path.join(root, 'node_modules/@fontsource/dm-sans/files/dm-sans-latin-700-normal.woff');
  const bgPath = path.join(root, 'src/assets/og/og-bg.png');
  const markPath = path.join(root, 'src/assets/og/mark.svg');
  const badgePath = path.join(root, 'src/assets/og/badge.svg');

  const [unbounded, dmSans, bgBuf, markSvg, badgeSvg] = await Promise.all([
    readFile(unboundedPath),
    readFile(dmSansPath),
    readFile(bgPath),
    readFile(markPath, 'utf-8'),
    readFile(badgePath, 'utf-8'),
  ]);

  // Rasterize the mark and badge SVGs to PNG data URIs with resvg, so satori only ever has to
  // place <img> bitmaps (its SVG-source image support is not reliable across versions).
  const mark = new Resvg(markSvg, { fitTo: { mode: 'width', value: 64 } }).render().asPng();
  const badge = new Resvg(badgeSvg, { fitTo: { mode: 'width', value: 150 } }).render().asPng();

  cache = {
    unbounded,
    dmSans,
    bg: `data:image/png;base64,${bgBuf.toString('base64')}`,
    mark: `data:image/png;base64,${mark.toString('base64')}`,
    badge: `data:image/png;base64,${badge.toString('base64')}`,
  };
  return cache;
}

// Unbounded is a wide display face; long titles need a smaller size to stay within 2 lines
// across the 720px-wide title box (§9.3 "max 2 lines").
function titleFontSize(title: string): number {
  if (title.length <= 14) return 64;
  if (title.length <= 22) return 52;
  if (title.length <= 30) return 44;
  if (title.length <= 38) return 32;
  return 28;
}

// Satori wraps a single long text node unreliably at these sizes (it has clipped words rather
// than wrapping them cleanly). Word-wrap manually into at most 2 lines instead, so the title
// box never relies on satori's own line-breaking.
function wrapTitle(title: string, fontSize: number, boxWidth = 680): string[] {
  const avgCharWidth = fontSize * 1.05;
  const maxChars = Math.max(6, Math.floor(boxWidth / avgCharWidth));
  const words = title.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  if (lines.length > 2) return [lines[0], lines.slice(1).join(' ')];
  return lines;
}

function buildTree(c: Campaign, assets: Awaited<ReturnType<typeof loadAssets>>) {
  const filter = c.filters[0];
  const pill = CATEGORY_PILL[filter];
  const figureNum = c.figure ? c.figure.num.display : null;
  const figureLabel = c.figure ? c.figure.label : null;
  const titleSize = titleFontSize(c.title);
  const titleLines = wrapTitle(c.title, titleSize);

  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: 1200,
        height: 630,
        position: 'relative',
        backgroundImage: `url(${assets.bg})`,
        backgroundSize: '1200px 630px',
      },
      children: [
        // Top-left: mark + wordmark
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              position: 'absolute',
              top: 56,
              left: 60,
            },
            children: [
              { type: 'img', props: { src: assets.mark, width: 64, height: 64 } },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', fontFamily: 'Unbounded', fontWeight: 800, fontSize: 36, color: '#FFFFFF' },
                  children: 'CreatorsHome',
                },
              },
            ],
          },
        },
        // Campaign title, left 60% of the width, pre-wrapped to at most 2 lines
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 180,
              left: 60,
              width: 680,
              fontFamily: 'Unbounded',
              fontWeight: 800,
              fontSize: titleSize,
              lineHeight: 1.15,
              letterSpacing: -2,
              color: '#FFFFFF',
            },
            children: titleLines.map((line) => ({
              type: 'div',
              props: { style: { display: 'flex' }, children: line },
            })),
          },
        },
        // Category pill, bottom-left
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              position: 'absolute',
              bottom: 56,
              left: 60,
              borderRadius: 999,
              padding: '10px 24px',
              fontFamily: 'DM Sans',
              fontWeight: 700,
              fontSize: 20,
              background: pill.bg,
              color: pill.fg,
            },
            children: FILTER_LABEL[filter],
          },
        },
        // Hero figure / badge sticker, top-right, rotated
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              top: 56,
              right: 60,
              transform: 'rotate(-4deg)',
              borderRadius: 24,
              padding: '20px 28px',
              background: '#FF6A1F',
              color: '#160A33',
            },
            children: figureNum
              ? [
                  { type: 'div', props: { style: { display: 'flex', fontFamily: 'Unbounded', fontWeight: 800, fontSize: 40, lineHeight: 1 }, children: figureNum } },
                  { type: 'div', props: { style: { display: 'flex', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 18, marginTop: 4 }, children: figureLabel ?? '' } },
                ]
              : [
                  { type: 'div', props: { style: { display: 'flex', fontFamily: 'Unbounded', fontWeight: 800, fontSize: 28 }, children: c.badge ?? '' } },
                ],
          },
        },
        // Badge stamp, bottom-right
        {
          type: 'img',
          props: {
            src: assets.badge,
            width: 150,
            height: 150,
            style: { position: 'absolute', bottom: 40, right: 40 },
          },
        },
      ],
    },
  };
}

export async function renderOgPng(campaign: Campaign): Promise<Buffer> {
  const assets = await loadAssets();
  const tree = buildTree(campaign, assets);

  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Unbounded', data: assets.unbounded, weight: 800, style: 'normal' },
      { name: 'DM Sans', data: assets.dmSans, weight: 700, style: 'normal' },
    ],
  });

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  return resvg.render().asPng();
}
