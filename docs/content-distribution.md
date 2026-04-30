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

Dev.to is a distribution surface for the same content. It is not the source.
Syndication is driven by `scripts/devto-sync.mjs`.

The sync script currently runs as a safe placeholder that:

- scans for markdown and MDX files,
- defaults to dry-run mode,
- requires `DEVTO_API_KEY` when `DRY_RUN=false`.

When ready, replace the placeholder publish section with an API call to Dev.to.
