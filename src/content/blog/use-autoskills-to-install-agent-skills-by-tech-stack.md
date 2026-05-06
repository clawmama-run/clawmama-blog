---
title: "Use autoskills to Install Agent Skills by Tech Stack"
description: "A first-run guide for midudev/autoskills: scan a project, detect the stack, dry-run matching Agent Skills, install them, and review the generated lock file safely."
pubDate: 2026-05-06
author: "ClawMama Team"
tags: ["agent-skills", "developer-tools", "openclaw", "hermes", "workflow"]
draft: false
---

Reader persona: a developer, technical founder, automation operator, or AI-agent power user who wants useful Agent Skills installed for a project without manually searching every framework-specific skill.

Job to be done: run `autoskills` on a real project, inspect what it detects, install the selected skills safely, and understand what changed before letting an agent use them.

Agent Skills are useful, but discovery is messy.

A React project may need React best-practice skills.

An Astro project may need Astro guidance.

A Stripe project may need payment-specific safety notes.

A Playwright project may need browser-testing practices.

You can install all of those manually.

Or you can use a stack scanner.

That is what `autoskills` tries to do:

```bash
npx autoskills
```

It scans your project, detects the tech stack, and installs matching AI Agent Skills from a curated registry.

## What autoskills is

Repository:

```text
https://github.com/midudev/autoskills
```

Website:

```text
https://autoskills.sh
```

Core command:

```bash
npx autoskills
```

The project describes itself as:

```text
One command. Your entire AI skill stack. Installed.
```

The important claim is not just convenience.

The important claim is that it does not install directly from random upstream repositories at runtime.

The GitHub page says skills are synced into an autoskills registry, scanned for risks, recorded with SHA-256 hashes, downloaded from that curated registry, verified, and written with a lock entry.

That is the right direction for agent-skill installation.

Skills influence agent behavior, so provenance and review matter.

## Why this is a strong first-run topic

This workflow has clear external actions:

```bash
npx autoskills --dry-run
npx autoskills --yes
```

It also has clear expected output:

- detected technologies;
- a list of matching skills;
- installed skill files;
- a `skills-lock.json` file;
- security-check notes when applicable.

That makes it easier to validate than vague prompt packs.

## Quick start

From your project root:

```bash
npx autoskills --dry-run
```

Use dry-run first.

Do not skip this step.

It shows what would be installed without writing files.

If the result looks reasonable:

```bash
npx autoskills --yes
```

To see help:

```bash
npx autoskills --help
```

In our validation run, help showed:

```text
npx autoskills                   Detect & install skills
npx autoskills -y                Skip confirmation
npx autoskills --dry-run         Show what would be installed
npx autoskills --clear-cache     Clear downloaded skills cache
npx autoskills -a cursor claude-code Install for specific IDEs only
```

## Validation environment

We tested in an isolated temporary project with this stack:

```json
{
  "dependencies": {
    "astro": "^5.0.0",
    "react": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@astrojs/react": "^4.0.0",
    "stripe": "^18.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vitest": "^3.0.0",
    "playwright": "^1.50.0"
  }
}
```

Then we ran:

```bash
npx -y autoskills --dry-run
```

The tool detected:

```text
React
Astro
Tailwind CSS
TypeScript
Playwright
Stripe
Vitest
```

It proposed 12 skills:

```text
vercel-labs › react-best-practices             ← React
vercel-labs › composition-patterns             ← React
astrolicious › astro                           ← Astro
giuseppe-trisciuoglio › tailwind-css-patterns  ← Tailwind CSS
wshobson › typescript-advanced-types           ← TypeScript
currents-dev › playwright-best-practices       ← Playwright
stripe › stripe-best-practices                 ← Stripe
stripe › upgrade-stripe (security check ⚠)     ← Stripe
antfu › vitest                                 ← Vitest
anthropics › frontend-design                   ← Frontend
addyosmani › accessibility                     ← Frontend
addyosmani › seo                               ← Frontend
```

That is a sensible match for the test project.

## What installation created

After running:

```bash
npx -y autoskills --yes
```

The tool installed skills under the project-local `.agents/skills/` folder.

Examples:

```text
.agents/skills/accessibility/SKILL.md
.agents/skills/astro/SKILL.md
.agents/skills/composition-patterns/SKILL.md
.agents/skills/frontend-design/SKILL.md
.agents/skills/playwright-best-practices/SKILL.md
.agents/skills/react-best-practices/SKILL.md
.agents/skills/seo/SKILL.md
.agents/skills/stripe-best-practices/SKILL.md
.agents/skills/tailwind-css-patterns/SKILL.md
.agents/skills/typescript-advanced-types/SKILL.md
.agents/skills/upgrade-stripe/SKILL.md
.agents/skills/vitest/SKILL.md
```

It also created:

```text
skills-lock.json
```

That lock file recorded the installed skills, their registry source, and computed hashes.

A sample entry looked like:

```json
"astro": {
  "source": "astrolicious/agent-skills",
  "sourceType": "autoskills-registry",
  "computedHash": "2afd3a02edf4374598ce471dabb1ab5638851dbf7b82d0bb36f1019331eafb54"
}
```

That is useful because it gives you something concrete to review and commit.

## Security-check output

In our validation run, autoskills printed one warning for `upgrade-stripe`:

```text
The skill is generally on-topic and safe, but it contains Stripe secret-key-like placeholders and external links that merit a quick human review. Embedded example secret pattern (`sk_test_xxx`) appears multiple times; External documentation links should be verified for legitimacy and necessity.
```

This is exactly the kind of warning you should slow down for.

A placeholder test key is not automatically dangerous.

But any skill about payments deserves human review before use.

## Review checklist before using installed skills

After install, run:

```bash
find .agents/skills -maxdepth 2 -name 'SKILL.md' -print
```

Then inspect the skills that matter most:

```bash
sed -n '1,160p' .agents/skills/stripe-best-practices/SKILL.md
sed -n '1,160p' .agents/skills/upgrade-stripe/SKILL.md
sed -n '1,160p' .agents/skills/playwright-best-practices/SKILL.md
```

Review:

- what the skill tells the agent to do;
- whether it suggests external commands;
- whether it references secrets;
- whether it changes deployment behavior;
- whether it contains external links;
- whether it matches your project;
- whether it should be committed to the repo.

Do not treat an installed skill as automatically safe just because it installed successfully.

## A practical first-run workflow

Use this sequence:

```text
dry-run → inspect proposed skills → install → inspect files → commit lockfile → ask agent to use one skill at a time
```

Do not immediately ask your agent to use all installed skills on a big refactor.

Start narrow.

Example:

```text
Use the Astro and accessibility skills to review this landing page.
Do not edit files yet.
Return the top 10 issues with file references.
```

Then:

```text
Apply only the first two low-risk accessibility fixes.
Do not change routing, analytics, billing, environment variables, or deployment configuration.
Show the diff before finalizing.
```

That makes the workflow controlled.

## Good use cases

`autoskills` is useful when:

- you have a real project with recognizable dependencies;
- you want framework-specific agent guidance;
- you want a quick baseline skill stack;
- you maintain several projects with different technologies;
- you want a lock file for installed skills;
- you want to test Agent Skills without manually browsing registries.

It is less useful when:

- your project has no dependency files;
- your stack is unusual or internal;
- you need a very strict security review before any generated guidance is installed;
- you already curate skills manually;
- you do not want project-local `.agents/` files.

## Permissions and risk notes

`autoskills` writes files into your project.

That is a normal part of its job.

But treat those files as code-adjacent configuration.

Recommended rules:

```text
- Run --dry-run first.
- Review proposed skills before install.
- Review SKILL.md files after install.
- Commit skills-lock.json if your team wants reproducibility.
- Do not let an agent deploy, push, rotate secrets, change billing, or run migrations just because a skill suggests a workflow.
```

Skills are instructions.

They can improve an agent.

They can also steer an agent in ways you did not expect.

## Where ClawMama fits

You can use `autoskills` locally with coding agents.

ClawMama is useful when you want a ready-to-use OpenClaw or Hermes agent available from Telegram without maintaining your own server.

Start here:

```text
https://t.me/clawmamarun_bot
```

Create a managed agent, then use it to review a project after you have installed and inspected skills.

New users get $2 of AI credits and access to the latest ChatGPT model, enough to test a small review workflow.

A safe first instruction is:

```text
You may inspect this project and the installed .agents/skills files.
You may recommend which skills are relevant.
You may not install packages, push, deploy, change secrets, alter billing, or modify production settings without my approval.
```

That keeps the agent useful without giving it uncontrolled power.

## Final takeaway

`autoskills` is useful because it turns skill discovery into a repeatable workflow:

```text
scan project → detect stack → propose skills → install locally → lock hashes → review → use carefully
```

The best habit is simple:

Run dry-run first.

Inspect what changed.

Then let your agent use one skill-driven workflow at a time.
