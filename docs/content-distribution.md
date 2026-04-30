# Content source and distribution model

## Canonical source

All published and draft copy for ClawMama marketing lives in the repository under:

- `src/content/blog/*.md`
- `src/content/blog/*.mdx`

This repository is the single source of truth for:

- campaign copy
- publication metadata
- tags and dates
- markdown body content

## Distribution to Dev.to

Dev.to is a distribution surface for selected content. It is not the source and it should not mirror every blog post.

The blog can publish at a higher pace because it is ClawMama's owned asset. Dev.to must stay selective to avoid low-quality distribution and platform risk.

Default rules:

- Blog: minimum 2 posts/day; ideal 3 posts/day when quality is high.
- Dev.to: 2-3 posts in the first week, about 3 posts/week afterward, hard cap 1 post/day.
- Only publish Dev.to articles that provide standalone value to readers.
- Always deploy the canonical blog post first.

Syndication is currently driven by `scripts/devto-sync.mjs` and/or BrowserMan-assisted publishing.

The sync script currently runs as a safe placeholder that:

- scans for markdown and MDX files,
- defaults to dry-run mode,
- requires `DEVTO_API_KEY` when `DRY_RUN=false`.

BrowserMan publishing should follow `docs/devto-publishing-rules.md`.
