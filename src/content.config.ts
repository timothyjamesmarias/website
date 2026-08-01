import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TAG_KEYS } from './lib/tags';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		// Keys into TAGS, not display text — an unknown key fails the build
		// rather than rendering a tag that links nowhere. See src/lib/tags.ts.
		tags: z.array(z.enum(TAG_KEYS)).default([]),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog };
