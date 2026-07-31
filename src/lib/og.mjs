import { chromium } from 'playwright';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

const require = createRequire(import.meta.url);

/**
 * Renders Open Graph cards by screenshotting an HTML template. Reuses the
 * headless browser the mermaid plugin already needs, so this costs no extra
 * dependency and the cards use the real site fonts.
 */

let browserPromise = null;
let fontData = null;

const getBrowser = async () => {
	if (!browserPromise) {
		browserPromise = chromium.launch();
		const close = async () => {
			const browser = await browserPromise.catch(() => null);
			await browser?.close().catch(() => {});
		};
		process.once('exit', close);
		process.once('SIGINT', () => close().then(() => process.exit(0)));
		process.once('SIGTERM', () => close().then(() => process.exit(0)));
	}
	return browserPromise;
};

// Inlined as a data URI: the page is rendered from a string with no server, so
// a relative font URL would not resolve.
const getFont = () => {
	if (!fontData) {
		const path = require.resolve(
			'@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
		);
		fontData = readFileSync(path).toString('base64');
	}
	return fontData;
};

const escapeHtml = (value) =>
	value.replace(
		/[&<>"']/g,
		(char) =>
			({
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#39;',
			})[char],
	);

const template = ({ title, kicker }) => `<!doctype html>
<html>
<head><meta charset="utf-8"><style>
	@font-face {
		font-family: 'Inter';
		src: url(data:font/woff2;base64,${getFont()}) format('woff2-variations');
		font-weight: 100 900;
	}
	* { margin: 0; padding: 0; box-sizing: border-box; }
	body {
		width: 1200px; height: 630px;
		background: #fbfaf8; color: #101010;
		font-family: 'Inter', sans-serif;
		display: flex; flex-direction: column; justify-content: space-between;
		padding: 72px; border-bottom: 12px solid oklch(0.55 0.20 30);
	}
	.mark { width: 28px; height: 28px; background: oklch(0.55 0.20 30); }
	.kicker {
		font-size: 20px; letter-spacing: 0.08em; text-transform: uppercase;
		color: #8f8b85; margin-top: 28px;
	}
	h1 {
		font-size: 76px; line-height: 1.05; font-weight: 700;
		letter-spacing: -0.035em; max-width: 900px; text-wrap: pretty;
		/* Long titles clamp rather than overflowing the card. */
		display: -webkit-box; -webkit-line-clamp: 4;
		-webkit-box-orient: vertical; overflow: hidden;
	}
	.foot {
		display: flex; justify-content: space-between; align-items: baseline;
		font-size: 22px; color: #5c5a56; letter-spacing: -0.01em;
	}
</style></head>
<body>
	<div>
		<div class="mark"></div>
		<div class="kicker">${escapeHtml(kicker)}</div>
	</div>
	<h1>${escapeHtml(title)}</h1>
	<div class="foot">
		<span>timothymarias.com</span>
		<span>Timothy Marias</span>
	</div>
</body>
</html>`;

export const renderOgImage = async ({ title, kicker }) => {
	const browser = await getBrowser();
	const page = await browser.newPage({
		viewport: { width: 1200, height: 630 },
		deviceScaleFactor: 1,
	});

	try {
		await page.setContent(template({ title, kicker }), {
			waitUntil: 'load',
		});
		await page.evaluate(() => document.fonts.ready);
		return await page.screenshot({ type: 'png' });
	} finally {
		await page.close();
	}
};
