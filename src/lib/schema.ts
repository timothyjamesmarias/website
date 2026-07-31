/**
 * The site's identity graph. Every page emits these nodes, so the Person is
 * present wherever a crawler lands rather than only on the home page.
 *
 * Nodes carry stable `@id`s and pages refer to them by reference — a
 * BlogPosting's author is `{ '@id': PERSON_ID }`, not a second copy of the
 * Person's fields. Duplicated copies leave a search engine to infer that two
 * nodes are the same entity from matching strings; an `@id` states it.
 */

const SITE = 'https://timothymarias.com';

export const PERSON_ID = `${SITE}/#person`;
export const WEBSITE_ID = `${SITE}/#website`;

const person = {
	'@type': 'Person',
	'@id': PERSON_ID,
	name: 'Timothy Marias',
	url: `${SITE}/`,
	jobTitle: 'Full stack software developer',
	description: 'Full stack software developer in Oregon.',
	email: 'mailto:tim@timothymarias.com',
	image: {
		'@type': 'ImageObject',
		url: `${SITE}/timothymarias.jpeg`,
		width: 1536,
		height: 2048,
	},
	address: {
		'@type': 'PostalAddress',
		addressRegion: 'Oregon',
		addressCountry: 'US',
	},
	// Domains rather than named technologies — true at any depth, and they
	// don't go stale when the stack changes.
	knowsAbout: [
		'Web development',
		'Full stack development',
		'Software architecture',
		'Mobile development',
	],
	// The field search engines use to reconcile profiles across sites. The
	// GitHub profile links back here, so the association is two-directional.
	sameAs: ['https://github.com/timothyjamesmarias'],
};

const website = {
	'@type': 'WebSite',
	'@id': WEBSITE_ID,
	url: `${SITE}/`,
	name: 'Timothy Marias',
	description: 'Timothy Marias — full stack software developer in Oregon.',
	inLanguage: 'en-US',
	publisher: { '@id': PERSON_ID },
};

/**
 * Wraps a page's own node — a BlogPosting, a ProfilePage — into the shared
 * graph. Pages that have no node of their own still get the identity pair.
 */
export const graph = (...nodes: Record<string, unknown>[]) => ({
	'@context': 'https://schema.org',
	'@graph': [person, website, ...nodes],
});