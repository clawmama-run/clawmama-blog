---
title: "Use Warp Oz Skills for SEO and AEO Audits"
description: "A first-run guide to Warp's open-source Oz Skills: install the SEO/AEO audit skill, inspect what it gives your agent, and run a safer search visibility review."
pubDate: 2026-05-15
author: "ClawMama Team"
tags: ["agent-skills", "seo", "aeo", "warp", "openclaw"]
draft: false
---

Reader persona: a founder, marketer, content lead, or growth operator who needs practical SEO and AI-answer visibility checks but does not want to build a full technical audit workflow from scratch.

Job to be done: install one useful Warp Oz Skill, understand what it teaches an agent to check, and run a bounded SEO/AEO audit without giving the agent permission to rewrite or publish blindly.

Search is changing in two directions at once.

You still need the basics:

- crawlable pages
- clear titles
- unique descriptions
- useful headings
- clean canonicals
- working sitemaps
- structured data
- fast pages
- accessible content

But you also need to think about AI answer engines.

If a customer asks ChatGPT, Perplexity, Gemini, or an internal company assistant about your product category, your site needs to be easy to cite. That means your pages should explain who the product is for, what problem it solves, what proof exists, and what the next action is.

Warp's `oz-skills` repository is a useful starting point because it packages production-style skills for agent workflows, including a dedicated SEO/AEO audit skill.

The repo is:

```text
warpdotdev/oz-skills
```

The skill used in this guide is:

```text
seo-aeo-audit
```

## Why this topic is worth trying

A high-signal X post about Warp's open-source skills pointed to this install command:

```bash
npx skills add warpdotdev/oz-skills
```

Local validation found 15 skills in the repository, including:

- `seo-aeo-audit`
- `web-accessibility-audit`
- `web-performance-audit`
- `webapp-testing`
- `docs-update`
- `ci-fix`
- `github-bug-report-triage`
- `mcp-builder`

That makes it more than a prompt collection. It is a practical operator bundle for codebases, websites, docs, QA, and growth work.

For non-technical operators, start with `seo-aeo-audit` because the output is easy to inspect and the risk can be kept low: audit first, change later.

## Install the skill

Create a temporary test folder:

```bash
mkdir warp-oz-seo-test
cd warp-oz-seo-test
```

List the available skills:

```bash
npx -y skills add warpdotdev/oz-skills --list
```

Install only the SEO/AEO skill:

```bash
npx -y skills add warpdotdev/oz-skills --skill seo-aeo-audit --yes
```

Expected result:

```text
.agents/skills/seo-aeo-audit/
  SKILL.md
  references/json-ld-templates.md
  scripts/lighthouse.sh
  scripts/pagespeed.sh
  scripts/search-console-export.mjs
```

The installer may also show a security summary. Read it. Skills run with agent permissions, so you should treat them like code and instructions, not magic content.

## Inspect the skill before using it

Open the main skill file:

```bash
sed -n '1,220p' .agents/skills/seo-aeo-audit/SKILL.md
```

Look for these sections:

- technical SEO
- crawlability
- robots and meta robots
- canonical URLs
- XML sitemap guidance
- URL structure
- title tags
- meta descriptions
- heading structure
- image SEO
- internal linking
- structured data
- AI citation / AEO guidance

The important part is not that the skill knows every SEO trick.

The important part is that it gives your agent a stable checklist. That reduces the chance that each audit becomes a random set of opinions.

## Run a safe first audit

Start with one public page.

Use this prompt with your agent:

```text
Use the seo-aeo-audit skill to review this public page:

URL: https://example.com/

Rules:
- Inspect only public pages.
- Do not log in.
- Do not edit files.
- Do not publish changes.
- Do not submit forms.
- If you need external paid APIs or account access, stop and ask.

Return:
1. Overall SEO/AEO readiness: green / yellow / red
2. Top 5 issues in priority order
3. Missing or weak title/meta/heading items
4. Crawlability and canonical concerns
5. Structured data opportunities
6. AI-answer visibility gaps
7. Exact recommended copy or markup changes, but do not apply them
```

This keeps the task read-only.

For a homepage, ask the agent to pay special attention to:

- whether the first screen says who the product is for
- whether the primary use cases are named clearly
- whether the page has a natural one-sentence product definition
- whether pricing, docs, examples, and trust signals are easy to find
- whether the CTA makes sense from search traffic

For AI-answer visibility, the page should make concise facts easy to quote.

Example questions the page should answer directly:

```text
What is the product?
Who is it for?
What job does it help with?
How does a user start?
What are the permission boundaries?
What does it cost?
What proof or examples exist?
```

If the page cannot answer those questions, AI answer engines will struggle too.

## Use the scripts carefully

The installed skill includes helper scripts such as:

```text
scripts/lighthouse.sh
scripts/pagespeed.sh
scripts/search-console-export.mjs
```

Before running any script, inspect it:

```bash
sed -n '1,200p' .agents/skills/seo-aeo-audit/scripts/lighthouse.sh
sed -n '1,200p' .agents/skills/seo-aeo-audit/scripts/pagespeed.sh
sed -n '1,200p' .agents/skills/seo-aeo-audit/scripts/search-console-export.mjs
```

Then decide what is allowed.

Use this rule of thumb:

| Action | Default rule |
| --- | --- |
| Read a public page | Allowed |
| Run Lighthouse locally | Usually allowed |
| Use PageSpeed Insights | Allowed if API/key/rate limits are acceptable |
| Export Search Console data | Approval required |
| Edit website files | Approval required |
| Publish changes | Approval required |
| Change robots, sitemap, or canonical tags | Approval required |

Search Console is sensitive because it may expose real query data. Treat it as private business data.

## Turn the audit into an operator workflow

Create a file called `seo-aeo-audit-brief.md`:

```md
# SEO/AEO audit brief

Site: https://example.com
Date: 2026-05-15

Pages to inspect:
- Homepage: https://example.com/
- Pricing: https://example.com/pricing
- Main product page: https://example.com/product
- Best current blog post: https://example.com/blog/example

Audience:
Non-technical operators who want AI help with research, marketing, sales discovery, or business workflows.

Primary CTA:
Start in Telegram

Do not edit or publish anything. Return recommendations only.
```

Then prompt:

```text
Use the seo-aeo-audit skill and the context in seo-aeo-audit-brief.md.

Run a read-only audit of the listed public pages.

Return a prioritized report with:
- page-by-page issues
- sitewide issues
- recommended title/meta rewrites
- schema opportunities
- AI-answer visibility gaps
- quick wins under 30 minutes
- deeper fixes for later

Do not make changes.
```

This turns SEO from a vague request into a repeatable checklist.

## What a useful output looks like

A good agent report should be specific:

```md
Priority 1: Homepage title is too generic
Current: Example App
Suggested: Example App - AI Research Assistant for Small Teams
Reason: Includes product category, audience, and primary keyword.

Priority 2: Missing product definition above the fold
Suggested copy: Example App helps small teams collect public customer, competitor, and market signals with an AI agent that asks before external actions.
Reason: Easier for humans and AI answer engines to cite.

Priority 3: Add SoftwareApplication schema
Suggested location: homepage
Reason: Helps search engines understand product type, URL, brand, and application category.
```

Avoid reports that only say "improve SEO" or "add keywords." Those are not operator-ready.

## ClawMama path

If you want this workflow without setting up skills, CLIs, and agent permissions yourself, use ClawMama as the operator layer.

A ready-to-use OpenClaw/Hermes agent can:

- read your public site
- run the SEO/AEO checklist
- produce prioritized fixes
- draft title and meta changes
- stop before publishing
- ask before accessing private analytics or Search Console

New users get $2 credits, and the agent can use the latest ChatGPT model for the reasoning-heavy parts of the audit.

The right first task is simple:

```text
Run a read-only SEO/AEO audit of my homepage and pricing page. Do not edit or publish anything. Return the top 10 fixes with exact suggested copy.
```

That is enough to find practical search visibility issues without turning the agent loose on your production site.

## Final checklist

Before you trust the result, confirm:

- the skill was installed from the expected repository
- you inspected `SKILL.md`
- the audit was read-only
- private analytics were not accessed without approval
- recommendations include exact page URLs
- suggested changes are specific enough for a human to review
- publishing remains a separate approval step

Use agent skills to make the checklist repeatable.

Keep approval gates around anything that changes the live site.
