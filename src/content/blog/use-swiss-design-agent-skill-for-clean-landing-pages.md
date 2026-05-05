---
title: "Use a Swiss Design Agent Skill to Clean Up Landing Pages"
description: "A first-run guide for trying zeke/swiss-design-skill with an AI coding agent, including install commands, expected files, safety notes, and a practical landing-page cleanup workflow."
pubDate: 2026-05-05
author: "ClawMama Team"
tags: ["agent-skills", "design", "landing-pages", "openclaw", "frontend"]
draft: false
---

Reader persona: a founder, marketer, indie hacker, or frontend operator who has a rough landing page and wants an AI agent to make it cleaner without turning it into a generic SaaS template.

Job to be done: install and test a concrete Agent Skill that gives an AI coding agent a Swiss International Style design system for practical landing-page cleanup.

A lot of AI-generated landing pages look the same.

Big gradient.

Rounded cards everywhere.

Too many colors.

Too much copy.

No real grid.

That is why this skill caught our attention:

```bash
npx skills add zeke/swiss-design-skill
```

It gives an agent a compact design system rooted in Swiss International Style: grid-first layout, restrained color, typography, whitespace, and a single accent color.

This is useful because it is not just "make it pretty."

It gives the agent specific constraints.

## What the skill is

Repository:

```text
https://github.com/zeke/swiss-design-skill
```

Install command:

```bash
npx skills add zeke/swiss-design-skill
```

The skill installs as:

```text
~/.agents/skills/swiss-design/SKILL.md
~/.agents/skills/swiss-design/references/components.md
~/.agents/skills/swiss-design/references/design-system.md
~/.agents/skills/swiss-design/references/prompting.md
~/.agents/skills/swiss-design/references/tailwind-config.md
```

Its stated purpose is to help an agent apply a Swiss International Style design system using Tailwind CSS.

It is especially relevant when you ask an agent to:

- clean up a UI;
- style a landing page;
- apply a design system;
- use Swiss design;
- improve typography;
- build with grid systems;
- make a page feel more modernist and disciplined.

## Why this is a good Agent Skill test

Some skills are hard to evaluate because they need credentials, paid APIs, or a complex app.

This one is easy to test.

You can install it, inspect the files, and ask an agent to apply it to a small Tailwind page.

That makes it a good first-run skill for operators who want to understand how Agent Skills work.

The external action is concrete:

```bash
npx skills add zeke/swiss-design-skill
```

The expected output is concrete:

```text
one installed skill folder with design-system references
```

And the workflow is easy to review visually.

## Quick install

From any environment with Node and npm:

```bash
npx skills add zeke/swiss-design-skill
```

For non-interactive installation:

```bash
npx -y skills add zeke/swiss-design-skill --yes --global
```

To list what the package exposes before installing:

```bash
npx -y skills add zeke/swiss-design-skill --list
```

In our validation run, the list command found one skill:

```text
swiss-design
```

The installer reported that it installed to:

```text
~/.agents/skills/swiss-design
```

It also showed security assessment output from the installer:

```text
Gen: Safe
Socket: 0 alerts
Snyk: Low Risk
```

Still, you should inspect any installed skill before using it.

Skills influence agent behavior, and agents may run with broad file permissions.

## What to inspect after install

Run:

```bash
find ~/.agents/skills/swiss-design -maxdepth 3 -type f -print
```

Then open:

```bash
cat ~/.agents/skills/swiss-design/SKILL.md
```

Look for:

- the skill name;
- the description;
- when the agent should use it;
- design rules;
- referenced files;
- any scripts or commands;
- any external network/API behavior.

For this skill, the important files are mostly design guidance.

That is a good sign for a low-risk first test.

## Minimal usage example

Use the skill with a coding agent in a small frontend project.

Example prompt:

```text
Use the swiss-design skill to clean up this landing page.

Goals:
- keep the existing product message;
- improve typography and grid;
- reduce visual clutter;
- use one accent color only;
- make the page work on mobile and desktop;
- do not add new dependencies unless necessary;
- show me the diff before finalizing.
```

If the project uses Tailwind, the skill is especially relevant.

If the project does not use Tailwind, ask the agent to adapt the principles instead of forcing a full migration.

```text
Apply the Swiss design principles, but do not migrate this project to Tailwind unless I approve it.
```

That one sentence prevents unnecessary churn.

## A practical landing-page cleanup workflow

Use this sequence:

```text
audit → propose visual direction → small diff → preview → refine
```

### Step 1: Ask for a design audit

```text
Audit this landing page using the swiss-design skill.

Return:
1. layout issues;
2. typography issues;
3. color and hierarchy issues;
4. mobile responsiveness risks;
5. the smallest set of changes that would improve the page.

Do not edit files yet.
```

This makes the agent explain its judgment first.

### Step 2: Ask for a constrained proposal

```text
Propose a Swiss-design cleanup plan.

Constraints:
- keep current sections;
- keep current copy unless a line is clearly redundant;
- use one accent color;
- body text max width around 60 characters;
- prefer grid and whitespace over decorative elements;
- no animations in the first pass.
```

This keeps the work practical.

### Step 3: Let the agent make a small diff

```text
Apply only the first pass:
- typography;
- spacing;
- grid;
- button hierarchy;
- mobile layout.

Do not rewrite the whole page.
```

Small diffs are easier to review.

### Step 4: Preview before merging

Run your normal frontend checks:

```bash
npm run check
npm run build
npm run dev
```

Then inspect the page in a browser.

Look for:

- readable mobile hero;
- clear CTA hierarchy;
- no overflow at 320px;
- enough contrast;
- no tiny text;
- no broken dark mode if your site supports it;
- no accidental copy deletion.

## Expected output

For a landing page, a good result should look like:

```text
before: scattered spacing, generic cards, inconsistent text sizes
 after: disciplined grid, calmer hierarchy, cleaner type, fewer colors
```

The skill should not magically decide your positioning.

It helps with presentation discipline.

You still need a strong product message.

## API keys and permissions

This skill does not require an API key for installation.

It does not need production credentials.

The main permission risk is not the skill itself.

The risk is the coding agent you use it with.

If your agent can edit files, run commands, or access private repos, review diffs carefully.

Recommended boundary:

```text
You may edit frontend styling files for this branch.
You may not deploy, push, install new packages, change analytics, change billing code, or modify environment variables without approval.
```

For marketing teams, that boundary matters.

A design cleanup should not accidentally become a production deployment.

## When to use this skill

Use it when:

- your page feels visually noisy;
- the layout lacks a clear grid;
- the page has too many colors;
- typography looks inconsistent;
- the CTA is buried;
- AI-generated design needs stronger constraints;
- you want a cleaner editorial/modernist feel.

Do not use it when:

- you need playful illustration-heavy branding;
- the product already has a strict design system;
- your team has not approved a visual direction;
- conversion copy is the real problem;
- you need accessibility fixes more than visual restyling.

## Soft ClawMama path

You can run this kind of workflow with a local coding agent.

ClawMama is useful if you want a ready-to-use OpenClaw or Hermes agent available from Telegram without maintaining your own server.

Start here:

```text
https://t.me/clawmamarun_bot
```

Create a managed agent, give it a repo or exported page files, and ask it to review the landing page before editing.

New users get $2 of AI credits and access to the latest ChatGPT model, enough to test a small design-audit workflow.

A good first instruction:

```text
You are helping me review and improve a landing page.
You may inspect files and draft design recommendations.
You may not push, deploy, change billing, install dependencies, or publish changes without my approval.
```

That keeps the workflow safe.

## Final takeaway

The useful part of `zeke/swiss-design-skill` is constraint.

Instead of asking an agent to "make the page better," you give it a clear design language:

```text
grid-first layout
restrained color
strong typography
generous whitespace
one accent
mobile-first responsiveness
```

That is exactly where Agent Skills are valuable.

They turn vague taste into repeatable operating instructions an agent can actually follow.
