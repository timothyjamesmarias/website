import { getCollection, type CollectionEntry } from 'astro:content';
import type { TagKey } from './tags';
import { projectsByTag } from './projects';

/**
 * Post queries. Shared so that a tag's post count and the list beneath it are
 * always computed the same way.
 *
 * Drafts stay out of every listing in both dev and production — the same rule
 * the blog index and home page already followed. Only the post route itself
 * includes them, so a draft is previewable by URL but never linked.
 */

export type Post = CollectionEntry<'blog'>;

const byNewest = (a: Post, b: Post) =>
	b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

/** Listed posts, newest first. Never includes drafts. */
export const allPosts = async (): Promise<Post[]> =>
	(await getCollection('blog', ({ data }) => !data.draft)).sort(byNewest);

export const postsByTag = async (key: TagKey): Promise<Post[]> =>
	(await allPosts()).filter((post) => post.data.tags.includes(key));

/**
 * Tags that appear alongside `key`, most frequent first — the "Often with"
 * rail. Counts projects as well as notes, since both carry tags and a
 * co-occurrence that only shows up in project metadata is still real.
 */
export const relatedTags = async (
	key: TagKey,
	limit = 6,
): Promise<{ key: TagKey; count: number }[]> => {
	const tagSets: readonly (readonly TagKey[])[] = [
		...(await postsByTag(key)).map((post) => post.data.tags),
		...projectsByTag(key).map((project) => project.tags ?? []),
	];

	const counts = new Map<TagKey, number>();
	for (const tags of tagSets) {
		for (const other of tags) {
			if (other === key) continue;
			counts.set(other, (counts.get(other) ?? 0) + 1);
		}
	}

	return [...counts.entries()]
		.map(([k, count]) => ({ key: k, count }))
		.sort((a, b) => b.count - a.count)
		.slice(0, limit);
};
