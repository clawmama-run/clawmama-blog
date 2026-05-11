---
title: "Use open-slide to Create Agent-Built Presentations"
description: "A first-run guide to open-slide, an agent-oriented slide framework with a CLI, React slides, local build validation, and practical approval boundaries."
pubDate: 2026-05-11
author: "ClawMama Team"
tags: ["agent-skills", "presentations", "open-slide", "ai-agents", "openclaw"]
draft: false
---

Reader persona: a founder, marketer, operator, sales lead, or product manager who needs a useful deck quickly, but wants the result to stay editable instead of becoming a pile of screenshots.

Job to be done: try `open-slide` from a clean first run, understand what files it creates, validate that the deck builds, and decide where a human should approve copy, claims, and visual direction.

Slides are a good agent workflow because the task has a visible artifact.

You can tell whether the agent helped.

But slide generation also goes wrong fast when the agent treats a deck like a generic prompt output.

A better pattern is:

```text
brief → outline → slide workspace → editable deck → human review → final export or publish
```

`open-slide` is useful because it gives the agent a real project structure for decks instead of asking it to freestyle in a chat window.

## Why this topic

During the May 11 heartbeat scan, BrowserMan's X top-mode search surfaced a high-signal thread about `open-slide`:

```text
Introducing open-slide - The slide framework built for agents.

Prompt your agent, get a polished deck.

$ npx @open-slide/cli init
```

A second quote described it as an open-source slide project where an agent plus skills can make slides, with a web app for editing generated slides.

That is a good ClawMama topic because it has concrete external action:

- run an `npx` command;
- scaffold a local workspace;
- author files;
- run a build;
- review visual output before publishing.

## What open-slide is

The npm package describes `@open-slide/cli` as:

```text
Scaffold an open-slide workspace with Claude Code skills preconfigured.
```

The current version checked during validation was:

```text
@open-slide/cli 1.1.1
```

The CLI exposes:

```bash
npx -y @open-slide/cli --help
```

Expected top-level commands include:

```text
open-slide init [dir]  Create a new open-slide workspace
```

The important idea is simple: each deck lives in a project, and each slide deck is editable React code.

That makes it closer to a small design/code project than a one-shot image generator.

## Install and initialize

Create a scratch directory first:

```bash
mkdir open-slide-test
cd open-slide-test
```

Then initialize a workspace:

```bash
npx -y @open-slide/cli init demo-deck
```

If you want to avoid dependency installation during a quick inspection, use:

```bash
npx -y @open-slide/cli init demo-deck --no-install --no-git
```

If you want the CLI to install dependencies with npm:

```bash
npx -y @open-slide/cli init demo-deck --use-npm
```

The init help shows useful options:

```text
-f, --force        overwrite non-empty target directory
-n, --name <name>  override package name
--use-npm          use npm to install dependencies
--use-pnpm         use pnpm to install dependencies
--use-yarn         use yarn to install dependencies
--use-bun          use bun to install dependencies
--no-install       skip dependency installation
--no-git           skip git init and initial commit
--locale <code>    slide UI language (en, zh-TW, zh-CN, ja)
```

## What the first run creates

A validated first run created this structure:

```text
demo-deck/
  AGENTS.md
  README.md
  open-slide.config.ts
  package.json
  slides/
    .folders.json
    getting-started/
      index.tsx
      assets/
  themes/
  tsconfig.json
  vercel.json
  netlify.toml
```

The generated `package.json` included scripts like:

```json
{
  "scripts": {
    "dev": "open-slide dev",
    "build": "open-slide build",
    "preview": "open-slide preview",
    "sync:skills": "open-slide sync:skills"
  }
}
```

The generated `AGENTS.md` also matters because it tells the agent how to work inside the deck project.

It says slides should live under:

```text
slides/<kebab-case-id>/index.tsx
```

And assets should live under:

```text
slides/<id>/assets/
```

This is exactly the kind of constraint that makes agent work easier to review.

## Validate the workspace

After initialization:

```bash
cd demo-deck
npm run build
```

The validation run completed successfully:

```text
vite v5.4.21 building for production...
✓ built in 14.62s
```

There was a normal Vite chunk-size warning, but the production build completed.

One setup note: the CLI attempted Git setup, but the initial commit failed in the test environment because Git user name and email were not configured.

That is not a slide framework failure.

If you want the CLI to skip Git setup, use:

```bash
npx -y @open-slide/cli init demo-deck --no-git
```

Or configure Git identity first:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## Minimal agent usage example

Once the workspace exists, give the agent a narrow brief.

Example:

```text
Use this open-slide workspace.
Create a 7-slide sales discovery deck under slides/sales-discovery-ai-agent/.
Audience: small B2B founder.
Goal: explain how an AI agent can turn call notes into CRM follow-ups.
Tone: practical, not hype.
Do not edit package.json or other existing slides.
After writing, run npm run build and summarize any errors.
```

For a ClawMama-style workflow, keep the agent grounded with source files:

```text
inputs/
  product-facts.md
  audience.md
  example-call-notes.md
  claims-to-avoid.md
```

Then ask for a deck outline first:

```text
Read inputs/.
Propose the slide titles and one-sentence purpose for each slide.
Do not create files yet.
```

Approve the outline before letting the agent write the slides.

## Expected output

A good first deck should produce:

```text
slides/sales-discovery-ai-agent/
  index.tsx
  assets/
```

And the agent's final note should include:

```markdown
## Created
- slides/sales-discovery-ai-agent/index.tsx

## Validation
- npm run build passed

## Needs human review
- pricing claims
- customer quotes
- screenshots
- final CTA wording
```

That is better than a vague “deck is done” message.

You want file paths, validation status, and review boundaries.

## Permission and risk notes

Most `open-slide` work is local file editing, but there are still boundaries.

Low-risk actions:

```bash
npx -y @open-slide/cli init demo-deck --no-git
npm run build
npm run preview
```

Actions that need extra care:

```bash
npm install
npm audit fix
npm run dev -- --host 0.0.0.0
vercel deploy
netlify deploy
```

Externally visible actions need human approval:

- publishing the deck;
- deploying to Vercel or Netlify;
- posting the deck link on social channels;
- using real customer names, logos, or quotes;
- claiming metrics that are not in the source material.

A good operating rule:

```text
The agent may draft and build locally.
The human approves public publishing, customer proof, pricing claims, and final CTA.
```

## Where ClawMama fits

If you already have a local developer setup, `open-slide` is straightforward to try.

If you want this as a repeatable operator workflow, ClawMama can host an OpenClaw or Hermes agent that lives in Telegram and helps run the loop:

```text
send brief in Telegram → agent drafts outline → human approves → agent creates deck workspace → build check → human reviews → publish only after approval
```

That is the practical advantage of a hosted agent: the workflow can be reused without rebuilding the environment every time.

ClawMama gives new users `$2` in starting credits, and the agent can use the latest ChatGPT model through the hosted OpenClaw/Hermes runtime.

Start at:

```text
https://t.me/clawmamarun_bot
```

## First-run checklist

Use this checklist before trusting an agent-generated deck:

```text
[ ] Did the agent use a real source brief?
[ ] Did it create files under slides/<deck-id>/ only?
[ ] Did npm run build pass?
[ ] Are claims tied to source material?
[ ] Are customer names/logos approved?
[ ] Is the CTA accurate?
[ ] Has a human reviewed the final visual flow?
```

Agent-built slides are useful when they stay editable and reviewable.

That is the main reason to prefer a structured workspace over a one-shot generated image deck.
