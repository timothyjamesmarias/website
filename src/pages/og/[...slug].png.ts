import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderOgImage } from '../../lib/og.mjs';
import { TAGS, TAG_KEYS } from '../../lib/tags';

/**
 * Renders a 1200x630 card per page at build time. Uses the same headless
 * browser as the mermaid plugin rather than a separate image library, so the
 * cards use the real site fonts and palette.
 */

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getCollection('blog', ({ data }) => !data.draft);

	return [
		{
			params: { slug: 'default' },
			props: { title: 'Timothy Marias', kicker: 'Full stack software developer' },
		},
		{
			params: { slug: 'contact' },
			props: { title: 'Get in touch', kicker: 'Contact' },
		},
		{
			params: { slug: 'blog' },
			props: { title: 'Notes', kicker: 'Writing' },
		},
		{
			params: { slug: 'tags' },
			props: { title: 'Tags', kicker: 'Index' },
		},
		...TAG_KEYS.map((key) => ({
			params: { slug: `tags/${TAGS[key].slug}` },
			props: { title: TAGS[key].label, kicker: 'Tag' },
		})),
		...posts.map((post) => ({
			params: { slug: `blog/${post.id}` },
			props: {
				title: post.data.title,
				kicker: post.data.pubDate.toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					timeZone: 'UTC',
				}),
			},
		})),
	];
};

export const GET: APIRoute = async ({ props }) => {
	const png = await renderOgImage({
		title: props.title as string,
		kicker: props.kicker as string,
	});

	return new Response(new Uint8Array(png), {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
};
