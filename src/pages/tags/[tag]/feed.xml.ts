import rss from '@astrojs/rss';
import type { APIRoute, GetStaticPaths } from 'astro';
import { postsByTag } from '../../../lib/posts';
import { TAGS, TAG_KEYS, type TagKey } from '../../../lib/tags';

/**
 * One feed per tag, so a reader can subscribe to a single subject rather than
 * everything. Built for every tag in the registry — including empty ones, so
 * a subscription taken out early starts delivering once the tag has posts.
 */

export const getStaticPaths: GetStaticPaths = async () =>
	TAG_KEYS.map((key) => ({
		params: { tag: TAGS[key].slug },
		props: { tagKey: key },
	}));

export const GET: APIRoute = async (context) => {
	const { tagKey } = context.props as { tagKey: TagKey };
	const tag = TAGS[tagKey];
	const posts = await postsByTag(tagKey);

	return rss({
		title: `Timothy Marias — ${tag.label}`,
		description: tag.description ?? `Notes tagged ${tag.label}.`,
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
			categories: post.data.tags.map((key) => TAGS[key].label),
		})),
		customData: '<language>en-us</language>',
	});
};
