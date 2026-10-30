// QA screenshot + overflow/console-error sweep (BUILD.md §8).
// Usage: node scripts/qa.mjs <unit> [paths...] [--nojs] [--reduced]
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const unit = args.find((a) => !a.startsWith('--'));
const flagArgs = args.filter((a) => a.startsWith('--'));
const pathArgs = args.slice(1).filter((a) => !a.startsWith('--'));

if (!unit) {
	console.error('Usage: node scripts/qa.mjs <unit> [paths...] [--nojs] [--reduced]');
	process.exit(1);
}

const noJs = flagArgs.includes('--nojs');
const reduced = flagArgs.includes('--reduced');
const paths = pathArgs.length ? pathArgs : ['/'];
const base = 'http://localhost:4331';
const widths = [
	{ w: 390, h: 844 },
	{ w: 768, h: 1024 },
	{ w: 1440, h: 900 },
];

const suffix = (noJs ? '-nojs' : '') + (reduced ? '-reduced' : '');

function slugify(p) {
	const s = p.replace(/^\/|\/$/g, '').replace(/\//g, '-');
	return s || 'home';
}

const outDir = path.join('.qa', unit);
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
let hadFailure = false;

for (const p of paths) {
	for (const { w, h } of widths) {
		const context = await browser.newContext({
			viewport: { width: w, height: h },
			javaScriptEnabled: !noJs,
			reducedMotion: reduced ? 'reduce' : 'no-preference',
		});
		const page = await context.newPage();
		const consoleErrors = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') consoleErrors.push(msg.text());
		});
		page.on('pageerror', (err) => {
			consoleErrors.push(String(err));
		});

		await page.goto(base + p, { waitUntil: 'load' });
		await page.waitForTimeout(1500);

		// Scroll to bottom in steps, then back to top, so scroll-triggered entries fire.
		// Timing lives on the Node side (page.waitForTimeout), not in an in-page setTimeout,
		// so this also works under --nojs (javaScriptEnabled: false disables page-context timers).
		const max = await page.evaluate(() => document.documentElement.scrollHeight);
		for (let y = 600; y < max; y += 600) {
			await page.evaluate((y) => window.scrollTo(0, y), y);
			await page.waitForTimeout(150);
		}
		await page.evaluate(() => window.scrollTo(0, 0));
		await page.waitForTimeout(150);

		const { scrollW, innerW } = await page.evaluate(() => ({
			scrollW: document.documentElement.scrollWidth,
			innerW: window.innerWidth,
		}));

		const slug = slugify(p);
		const file = path.join(outDir, `${slug}-${w}${suffix}.png`);
		await page.screenshot({ path: file, fullPage: true });

		const overflow = scrollW > innerW;
		if (overflow || consoleErrors.length > 0) hadFailure = true;

		console.log(
			`${p} ${w} scrollW=${scrollW} innerW=${innerW} ${overflow ? 'OVERFLOW' : 'ok'} consoleErrors=${consoleErrors.length}`
		);
		for (const err of consoleErrors) {
			console.log(`  ${err}`);
		}

		await context.close();
	}
}

await browser.close();
process.exit(hadFailure ? 1 : 0);
