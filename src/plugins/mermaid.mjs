import { defineMdastPlugin } from 'satteri';
import { chromium } from 'playwright';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);

/**
 * Renders ```mermaid code blocks to inline SVG at build time, so no Mermaid
 * runtime ships to the browser.
 *
 * Mermaid needs a DOM to measure text before it can lay out a diagram, hence
 * the headless browser. One instance is shared across the whole build — a
 * launch per diagram dominates build time.
 */

let browserPromise = null;
let mermaidSource = null;
let counter = 0;

const getBrowser = async () => {
	if (!browserPromise) {
		browserPromise = chromium.launch();
		// The dev server is long-lived, so the browser has to be closed explicitly.
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

const getMermaidSource = () =>
	(mermaidSource ??= readFileSync(
		require.resolve('mermaid/dist/mermaid.min.js'),
		'utf8',
	));

const render = async (code, id) => {
	const browser = await getBrowser();
	const page = await browser.newPage();

	try {
		await page.setContent('<!doctype html><html><body></body></html>');
		await page.addScriptTag({ content: getMermaidSource() });

		return await page.evaluate(
			async ([code, id]) => {
				// `neutral` bakes in the least color; Prose.astro recolors strokes
				// and text so diagrams follow the site palette in both themes.
				window.mermaid.initialize({
					startOnLoad: false,
					theme: 'neutral',
					fontFamily: 'inherit',
					securityLevel: 'strict',
				});
				const { svg } = await window.mermaid.render(id, code);
				return svg;
			},
			[code, id],
		);
	} finally {
		await page.close();
	}
};

export const mermaidPlugin = () =>
	defineMdastPlugin({
		name: 'mermaid',

		async code(node, ctx) {
			if (node.lang !== 'mermaid') return;

			// Ids must be unique per render; Mermaid injects them into the SVG.
			const id = `mermaid-${counter++}`;

			try {
				const svg = await render(node.value, id);
				// rawHtml, not raw: this is HTML, and it must not be parsed as
				// markdown. mdxExpressions stay off so braces in the SVG survive.
				return { rawHtml: `<figure class="mermaid">${svg}</figure>` };
			} catch (error) {
				// A malformed diagram shouldn't fail the build — leave the source as
				// a code block and report it.
				const where = ctx.fileURL ? fileURLToPath(ctx.fileURL) : 'unknown file';
				ctx.addDiagnostic?.({
					message: `mermaid: diagram failed to render — ${error.message}`,
					severity: 'warning',
					position: node.position,
				});
				console.warn(`[mermaid] ${where}: ${error.message}`);
				return;
			}
		},
	});
