# timothymarias.com

Personal site and notes. Astro, static output, no client-side framework.

## Running it

Node version is pinned in `.tool-versions` (asdf).

```sh
npm ci
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve the built output
```

The dev server can also run detached, which is useful when the build takes a
browser with it:

```sh
astro dev --background
astro dev status
astro dev logs
astro dev stop
```

## Writing a post

Add a markdown file to `src/content/blog/`. The filename becomes the URL slug.

```yaml
---
title: 'Post title'
description: One or two sentences. Used for meta tags and the RSS entry.
pubDate: 2026-07-30
updatedDate: 2026-07-31 # optional
tags: ['Tag'] # optional, defaults to []
draft: false # optional, defaults to false
---
```

Drafts are excluded from every listing and from production builds, but they do
get a page in `astro dev` so you can preview them. `src/content/blog/kitchen-sink.md`
is a permanent draft exercising every element the styles cover — useful when
changing anything in `Prose.astro`.

Mermaid blocks render to inline SVG at build time:

````md
```mermaid
graph TD
  A --> B
```
````

## Layout of the source

| Path                    | What's in it                                             |
| ----------------------- | -------------------------------------------------------- |
| `src/pages/`            | Routes. `blog/[...slug].astro` renders posts.             |
| `src/layouts/`          | `BaseLayout.astro` — the page shell.                      |
| `src/components/`       | `Prose.astro` holds all rendered-markdown styling.        |
| `src/styles/global.css` | Design tokens, palettes, fonts. The whole design system.  |
| `src/plugins/`          | `mermaid.mjs` — build-time diagram rendering.             |
| `src/lib/`              | `og.mjs` — build-time social card rendering.              |
| `src/content/blog/`     | Posts.                                                    |

## Things worth knowing before changing them

**Styling lives in two places, deliberately.** `global.css` holds tokens under
Tailwind v4's CSS-first config — there is no `tailwind.config.js`. Rendered
markdown has no classes to target, so `Prose.astro` styles it with element
selectors. Those selectors must be wrapped in `:global()`; Astro scopes
component styles, and slotted content is not in scope.

**Both palettes are the same token names.** Dark mode remaps
`--color-ink`, `--color-page`, etc. under `:root[data-theme='dark']`. Anything
referencing tokens themes automatically; anything hardcoding a hex will not.

**The build needs a browser.** Mermaid and the OG cards both render through
headless Chromium, so `npx playwright install chromium` is required for a
clean build, and CI installs it explicitly. If that step fails, the build
fails — this is not a graceful degradation path.

**Dates need `timeZone: 'UTC'`.** Frontmatter dates parse as UTC midnight,
which renders as the previous day in any negative offset.

**Content cache is in `node_modules`.** If a deleted post keeps rebuilding,
remove `node_modules/.astro/data-store.json`, not `.astro/`.

## Deploying

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages. The custom domain comes from `public/CNAME`, which
has to live in `public/` to survive each deploy.

## Metadata

`SiteMeta.astro` emits Open Graph, Twitter Card, canonical, and discovery
links for every page. Social cards are generated per page into `/og/` at build
time from a template in `src/lib/og.mjs`. Posts also carry `BlogPosting`
JSON-LD; the home page carries `Person`.

Feed at `/feed.xml`, sitemap at `/sitemap-index.xml`.
