import type { TagKey } from './tags';

/**
 * Projects. Lifted out of the home page because tag pages list them too — a
 * tag like `caelus` names both a project and the notes written about it, and
 * that connection is the reason tag pages exist.
 *
 * Current work only. The full history lives in the résumé.
 */

export interface ProjectLink {
	/** Short label — "Repo", "Live", "Docs". */
	label: string;
	href: string;
}

export interface Project {
	index: string;
	title: string;
	summary: string;
	/** Stack or domain, as keys into TAGS. */
	tags?: TagKey[];
	/** Single year, or a range for things with duration worth showing. */
	year: string;
	/** Zero or more destinations. Nothing linkable renders as "Private". */
	links?: ProjectLink[];
}

export const projects: Project[] = [
	{
		index: '001',
		title: 'Marias Family Archive',
		summary:
			"My WIP project to act as an archive for my family's genealogy from our primary sources." +
			' Originally built out in Spring Boot with Kotlin, moving it now to Adonis JS. ' +
			'SSR MPA with TS islands. Self hosted on my NixOS box.',
		tags: ['familyArchive', 'typescript', 'postgres', 'nixos'],
		year: '2025—present',
		links: [
			{ label: 'Live', href: 'https://mariasfamilyarchive.com' },
			{
				label: 'Repo',
				href: 'https://github.com/timothyjamesmarias/familyArchive',
			},
			{
				label: 'Old',
				href: 'https://github.com/timothyjamesmarias/familyArchiveV1',
			},
		],
	},
	{
		index: '002',
		title: 'Caelus',
		summary:
			"A routing architecture library for being able to expose a program's API across multiple surfaces: keybindings and overrides, CLI, MCP, and web. " +
			"Originally prototyped as a Kotlin Multiplatform Library, I'm in the process of porting this to TypeScript to be able to provide better web support.",
		tags: ['caelus', 'typescript', 'crossPlatform'],
		year: '2026—present',
		links: [
			{ label: 'Repo', href: 'https://github.com/ufo-soft/caelus' },
			{ label: 'Old', href: 'https://github.com/ufo-soft/caelus-old' },
		],
	},
];

export const projectsByTag = (key: TagKey): Project[] =>
	projects.filter((project) => project.tags?.includes(key));
