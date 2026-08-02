import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { allPosts } from '../lib/posts';
import { TAGS } from '../lib/tags';

export const GET: APIRoute = async (context) => {
	const posts = await allPosts();

	return rss({
		title: 'Timothy Marias',
		description: 'Notes on software, mostly.',
		// Set from `site` in astro.config.mjs.
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
			// Display labels, not internal keys — a reader shows these verbatim.
			categories: post.data.tags.map((key) => TAGS[key].label),
		})),
		customData: '<language>en-us</language>',
	});
};
