# ClawMama Marketing Blog

This repository contains an Astro-powered static blog for ClawMama marketing content.
The project is designed to be lightweight, version-controlled, and deployable to GitHub Pages.

## Prerequisites

- Node.js 20+
- npm

## Setup

```bash
npm install
npm run dev
```

The local dev server runs on port 4321 by default.

## Scripts

- `npm run dev`: start local Astro dev server
- `npm run build`: build static output into `dist`
- `npm run check`: type checks and content collection validation
- `npm run sync:devto`: prepare markdown posts for Dev.to sync (dry-run by default)

## Content model

Posts live in `src/content/blog` as `.md` or `.mdx` files.
The collection schema is declared in `src/content.config.ts`.

Supported frontmatter:

- `title`: string
- `description`: string
- `pubDate`: date
- `updatedDate` (optional): date
- `author` (default: `ClawMama Team`)
- `tags` (default: `[]`)
- `draft` (default: `false`)

## Publishing flow

1. Author updates happen in this repository first.
2. Merge content changes to the canonical source branch.
3. Run `npm run check` and `npm run build`.
4. Deploy via GitHub Pages workflow.

## Maintenance workflow

- Keep branding styles in `src/styles/global.css`.
- Keep route behavior in `src/pages` and collection logic in `src/content.config.ts`.
- If the homepage or links change, update the canonical brand copy and metadata there first.
- Use `content-index.md` to track draft/index status when preparing editorial releases.
- Run periodic maintenance by:

```bash
npm run check
npm run build
```

## Canonical source and Dev.to distribution

The repository’s markdown files are the **canonical source** for all marketing copy.
Dev.to is intentionally treated as a **distribution channel only**.

Use `scripts/devto-sync.mjs` to push content after GitHub Pages checks pass. The sync script:

- reads files from `src/content/blog`,
- defaults to a dry run,
- only publishes when `DRY_RUN=false` and `DEVTO_API_KEY` is set.

This keeps the source of truth in Git while allowing easy syndication to Dev.to.

## Notes

This setup avoids custom external publishing actions.
