/**
 * The tag vocabulary. One record per tag, and the only place a tag's display
 * text or URL is written down.
 *
 * This exists because nothing here is backed by a CMS: without a fixed
 * vocabulary, `Typescript` in a project row and `TypeScript` in a post's
 * frontmatter are two different tags, and one of them links nowhere. Posts and
 * projects reference tags by key, the content schema validates against those
 * keys, and a typo fails the build instead of shipping a dead page.
 *
 * `kind` separates the two axes that would otherwise sit in one alphabetical
 * list — `tech` is a technology or discipline, `project` names a body of work
 * that both projects and notes can belong to.
 */

export interface Tag {
	/** How the tag renders. Free to change; nothing keys off it. */
	label: string;
	/** URL segment. Changing one breaks existing links, so treat as permanent. */
	slug: string;
	kind: 'tech' | 'project';
	/** Shown on the tag's own page. Optional — most tags don't need one. */
	description?: string;
}

/**
 * Types every value as `Tag` while still inferring the literal key union.
 * A bare `as const` would narrow each entry to its own shape, leaving tags
 * without a `description` with no such property to read.
 */
const defineTags = <T extends Record<string, Tag>>(tags: T): { [K in keyof T]: Tag } =>
	tags;

export const TAGS = defineTags({
	// Projects — a body of work, spanning however many notes and repos.
	familyArchive: {
		label: 'Family Archive',
		slug: 'family-archive',
		kind: 'project',
		description:
			"An archive for my family's genealogy, built from primary sources.",
	},
	caelus: {
		label: 'Caelus',
		slug: 'caelus',
		kind: 'project',
		description:
			"A routing architecture library for exposing a program's API across keybindings, CLI, MCP, and web.",
	},

	// Tech — languages, platforms, disciplines.
	typescript: { label: 'TypeScript', slug: 'typescript', kind: 'tech' },
	kotlin: { label: 'Kotlin', slug: 'kotlin', kind: 'tech' },
	postgres: { label: 'Postgres', slug: 'postgres', kind: 'tech' },
	nixos: { label: 'NixOS', slug: 'nixos', kind: 'tech' },
	crossPlatform: { label: 'Cross-Platform', slug: 'cross-platform', kind: 'tech' },
	mcp: { label: 'MCP', slug: 'mcp', kind: 'tech' },
	cli: { label: 'CLI', slug: 'cli', kind: 'tech' },
	typography: { label: 'Typography', slug: 'typography', kind: 'tech' },
	reference: { label: 'Reference', slug: 'reference', kind: 'tech' },
});

export type TagKey = keyof typeof TAGS;

/**
 * `z.enum` needs a non-empty tuple of literals, which `Object.keys` can't
 * produce on its own. The assertion is safe as long as TAGS is non-empty.
 */
export const TAG_KEYS = Object.keys(TAGS) as [TagKey, ...TagKey[]];

export const tag = (key: TagKey): Tag => TAGS[key];

export const tagHref = (key: TagKey): string => `/tags/${TAGS[key].slug}/`;

/** Reverse lookup for `getStaticPaths`, which hands back a slug, not a key. */
export const keyBySlug = Object.fromEntries(
	TAG_KEYS.map((key) => [TAGS[key].slug, key]),
) as Record<string, TagKey>;

/** Alphabetical by label — `TAGS` is ordered for reading, not for display. */
export const sortedKeys = (keys: readonly TagKey[]): TagKey[] =>
	[...keys].sort((a, b) => TAGS[a].label.localeCompare(TAGS[b].label));

/* -------------------------------------------------------------------------
   Sorting for the tag index.

   Each order is a separate pre-built page rather than a client-side control:
   the site is static, so the build already knows every ordering, and shipping
   a comparator to the browser would only re-derive what it computed. Three
   plain pages need no JS, keep DOM order correct for keyboard and screen
   readers, and are shareable as URLs.

   The comparators take a plain row shape rather than reading TAGS directly,
   so if this ever does need to move client-side — faceted filtering being the
   realistic trigger — the logic moves without being rewritten.
   ------------------------------------------------------------------------- */

/** The per-tag totals the index ranks by. Computed in the page. */
export interface TagStats {
	key: TagKey;
	posts: number;
	projects: number;
	/** Notes + projects. */
	weight: number;
	/** Most recent post carrying the tag; null when it has none. */
	latest: Date | null;
}

export interface TagSort {
	/** URL segment under /tags/. Empty string is the canonical default. */
	segment: string;
	/** Control label, per the design. */
	label: string;
	compare: (a: TagStats, b: TagStats) => number;
}

const byLabel = (a: TagStats, b: TagStats) =>
	TAGS[a.key].label.localeCompare(TAGS[b.key].label);

export const TAG_SORTS: TagSort[] = [
	{
		segment: '',
		label: 'Weight',
		// Alphabetical within a tie, so the order is stable build to build
		// rather than following registry declaration order.
		compare: (a, b) => b.weight - a.weight || byLabel(a, b),
	},
	{
		segment: 'a-z',
		label: 'A–Z',
		compare: byLabel,
	},
	{
		segment: 'recent',
		label: 'Recent',
		// Tags with no posts have no date to sort by and sink to the bottom,
		// where they order alphabetically among themselves.
		compare: (a, b) => {
			if (!a.latest && !b.latest) return byLabel(a, b);
			if (!a.latest) return 1;
			if (!b.latest) return -1;
			return b.latest.valueOf() - a.latest.valueOf() || byLabel(a, b);
		},
	},
];

export const sortHref = (segment: string): string =>
	segment === '' ? '/tags/' : `/tags/${segment}/`;

/*
	The sort orders are static routes under /tags/, and so are the tag pages.
	A tag slugged "a-z" would quietly shadow one of them — Astro prefers the
	static route and the tag page would never build. Cheaper to fail loudly
	here than to wonder later why one tag 404s.
*/
{
	const reserved = new Set(
		TAG_SORTS.map((s) => s.segment).filter((s) => s !== ''),
	);
	const clash = TAG_KEYS.filter((key) => reserved.has(TAGS[key].slug));
	if (clash.length > 0) {
		throw new Error(
			`Tag slug collides with a sort route: ${clash
				.map((key) => `"${TAGS[key].slug}" (${key})`)
				.join(', ')}. Rename the slug in src/lib/tags.ts.`,
		);
	}

	// Two tags sharing a slug would collapse into one route, and keyBySlug
	// would silently resolve to whichever was declared last.
	const seen = new Set<string>();
	const dupes = TAG_KEYS.filter((key) => {
		const slug = TAGS[key].slug;
		if (seen.has(slug)) return true;
		seen.add(slug);
		return false;
	});
	if (dupes.length > 0) {
		throw new Error(
			`Duplicate tag slug: ${dupes
				.map((key) => `"${TAGS[key].slug}" (${key})`)
				.join(', ')}. Slugs must be unique in src/lib/tags.ts.`,
		);
	}
}
