# Content source and distribution model

## Canonical public source

Published and draft public blog copy for ClawMama lives in this repository under:

- `src/content/blog/*.md`
- `src/content/blog/*.mdx`

This repository is the source of truth for public blog articles, publication metadata, tags, dates, and Markdown body content.

## Repository boundary

This repository is not the CMO operations workspace.

Internal marketing plans, content calendars, growth strategy, publishing rules, and working notes are managed separately in:

- `/data/openclaw/workspace/clawmama-marketing-ops`

## Distribution to Dev.to

Dev.to is a distribution surface for selected public articles. It is not the source.

Distribution should happen only after the canonical blog post has been deployed and reviewed.

Syndication is currently supported by `scripts/devto-sync.mjs` and/or BrowserMan-assisted publishing.

The sync script currently runs as a safe placeholder that:

- scans for markdown and MDX files,
- defaults to dry-run mode,
- requires `DEVTO_API_KEY` when `DRY_RUN=false`.
