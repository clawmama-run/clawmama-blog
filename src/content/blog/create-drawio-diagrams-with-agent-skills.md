---
title: "Create Draw.io Diagrams with an Agent Skill"
description: "A first-run guide for Agents365-ai/drawio-skill: install the skill, understand the draw.io desktop dependency, generate editable diagrams, and use the browser fallback safely."
pubDate: 2026-05-07
author: "ClawMama Team"
tags: ["agent-skills", "diagrams", "drawio", "openclaw", "workflow"]
draft: false
---

Reader persona: a founder, developer, solutions engineer, product manager, technical marketer, or AI-agent operator who often needs architecture diagrams, flowcharts, ERDs, or customer workflow visuals but does not want to draw every box manually.

Job to be done: install and test the Draw.io Agent Skill, understand what it writes to disk, know when the draw.io desktop CLI is required, and use the browser fallback when export tooling is unavailable.

Diagrams are one of the best uses for an AI agent.

A good diagram turns a messy system into something a teammate can question, correct, and share.

But diagram generation has a trap.

If the agent only produces an image, the result is hard to edit.

If it only produces Mermaid, the result is easy to version but not always ideal for product docs, sales decks, architecture reviews, or stakeholder presentations.

Draw.io sits in a useful middle ground.

It is editable.

It is familiar.

It can export PNG, SVG, PDF, and JPG.

And with an Agent Skill, an AI agent can generate the `.drawio` source file directly.

This guide walks through `Agents365-ai/drawio-skill`.

Repository:

```text
https://github.com/Agents365-ai/drawio-skill
```

Skill package source used by the install command:

```text
https://github.com/Agents365-ai/365-skills
```

## What the skill does

The skill generates `.drawio` XML files from natural language and can export them with the native draw.io desktop CLI.

According to the project README, it supports:

- architecture diagrams;
- flowcharts;
- UML class diagrams;
- sequence diagrams;
- ER diagrams;
- ML and deep-learning diagrams;
- PNG, SVG, PDF, and JPG export;
- browser fallback through diagrams.net URLs when the desktop CLI is unavailable;
- built-in style presets;
- custom output directories.

The important part: this is not just a prompt.

It is a repeatable file workflow.

The agent writes `.drawio` files, optionally exports images, and keeps the source editable.

## Why this was a strong topic today

During the daily skill/topic scan, BrowserMan's X/Twitter script catalog was available, but the delegated browser extension was offline, so the X top-mode search could not run.

The direct command failed with:

```text
Extension is offline
```

To avoid pretending we completed an unavailable browser action, we used adjacent public signal sources instead:

- GitHub repository search for Agent Skills;
- npm package search around agent skills.

A high-signal repository appeared in GitHub search:

```text
Agents365-ai/drawio-skill — drawio-skill — From Text to Professional Diagrams. An Agent Skill (SKILL.md) that generates draw.io diagrams from natural language and exports to PNG/SVG/PDF. Works with Claude Code, OpenClaw, Hermes Agent, OpenAI Codex, and SkillsMP.
```

That made it worth validating because it has concrete external actions:

```bash
npx skills add Agents365-ai/365-skills --yes --global
```

and a concrete output path:

```text
~/.agents/skills/drawio-skill/SKILL.md
```

## Prerequisites

You can install the skill with Node.js and `npx`.

For full export, you also need draw.io desktop installed and available on the command line.

The skill documentation lists:

```bash
# macOS
brew install --cask drawio
draw.io --version

# Linux
# install draw.io desktop from the official .deb or .rpm release
# then verify:
draw.io --version
# or:
drawio --version
```

On Linux servers without a display, the README notes that headless export may require:

```bash
xvfb-run -a drawio --version
```

If draw.io desktop is not installed, the skill can still write `.drawio` XML and use its diagrams.net browser URL fallback.

That fallback is useful for quick review, but full local export requires the desktop CLI.

## Install command

From any working directory:

```bash
npx skills add Agents365-ai/365-skills --yes --global
```

Why the flags matter:

- `--yes` avoids the interactive selection prompt;
- `--global` installs into the global agent skills directory.

In our isolated validation run, we used a temporary HOME so nothing touched the real workspace:

```bash
mkdir -p /tmp/drawio-skill-validate/project /tmp/drawio-skill-validate/home
cd /tmp/drawio-skill-validate/project

HOME=/tmp/drawio-skill-validate/home \
  npm_config_cache=/tmp/drawio-skill-validate/npm-cache \
  npx -y skills add Agents365-ai/365-skills --yes --global
```

Expected result:

```text
Done!  Review skills before use; they run with full agent permissions.
```

Installed files included:

```text
/tmp/drawio-skill-validate/home/.agents/skills/drawio-skill/SKILL.md
/tmp/drawio-skill-validate/home/.agents/skills/drawio-skill/references/diagram-types.md
/tmp/drawio-skill-validate/home/.agents/skills/drawio-skill/references/style-extraction.md
/tmp/drawio-skill-validate/home/.agents/skills/drawio-skill/references/style-presets.md
/tmp/drawio-skill-validate/home/.agents/skills/drawio-skill/references/troubleshooting.md
/tmp/drawio-skill-validate/home/.agents/skills/drawio-skill/scripts/encode_drawio_url.py
/tmp/drawio-skill-validate/home/.agents/skills/drawio-skill/scripts/repair_png.py
/tmp/drawio-skill-validate/home/.agents/skills/drawio-skill/styles/built-in/corporate.json
/tmp/drawio-skill-validate/home/.agents/skills/drawio-skill/styles/built-in/default.json
/tmp/drawio-skill-validate/home/.agents/skills/drawio-skill/styles/built-in/handdrawn.json
```

The install also created a lock file:

```text
/tmp/drawio-skill-validate/home/.agents/.skill-lock.json
```

The lock entry for `drawio-skill` included:

```json
{
  "source": "Agents365-ai/365-skills",
  "sourceType": "github",
  "sourceUrl": "https://github.com/Agents365-ai/365-skills.git",
  "skillPath": "plugins/drawio/skills/drawio-skill/SKILL.md",
  "skillFolderHash": "5a22326231fc6eb79b3606b442a4fc043352fbdf"
}
```

Review the lock file before trusting the install in a real environment.

Skills influence agent behavior and can trigger file writes and command execution.

## Minimal usage example

After installation, ask your agent:

```text
Create a draw.io flowchart showing how a customer note becomes a proof-library entry.
Use three steps: Customer note, AI agent, Proof library.
Save the editable source as ./diagrams/customer-proof-flow.drawio.
If draw.io desktop is available, export a PNG too.
```

Expected behavior:

1. The agent checks whether `draw.io` or `drawio` is available.
2. It writes a `.drawio` XML file.
3. If the desktop CLI exists, it exports a preview PNG.
4. If export fails or the CLI is missing, it should keep the `.drawio` source and may generate a diagrams.net fallback URL.

## Validation result

In the validation container, the skill installed successfully.

The draw.io desktop command was not installed:

```text
Drawio command check:
```

No `drawio` or `draw.io` command was found.

That means full PNG/SVG/PDF export was not available in this environment.

But the browser fallback script worked.

We created a simple `.drawio` XML file and ran:

```bash
python3 /tmp/drawio-skill-validate/home/.agents/skills/drawio-skill/scripts/encode_drawio_url.py \
  /tmp/drawio-skill-validate/project/simple-flow.drawio
```

It returned a diagrams.net viewer URL beginning with:

```text
https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&edit=_blank#R...
```

That is enough to confirm the fallback path can turn a `.drawio` file into an inspectable browser link when the desktop CLI is absent.

For production use, install draw.io desktop so exports can be generated locally and checked before sharing.

## A practical first prompt

Try this:

```text
Create an architecture diagram in draw.io format for this workflow:

- Telegram operator sends weekly customer notes
- AI agent extracts risk signals
- renewal-risk folder stores accounts, risk-signals, weekly-review, follow-up-actions
- human owner approves follow-up actions
- approved actions become customer emails or account tasks

Use left-to-right layout.
Group inputs, agent processing, storage, human approval, and outbound action.
Save it to ./diagrams/renewal-risk-agent.drawio.
Export PNG if draw.io desktop is available.
If export is unavailable, provide a diagrams.net fallback URL.
```

This prompt is specific enough for the agent to act without asking many questions.

It names:

- diagram type;
- components;
- direction;
- grouping;
- output path;
- export fallback.

## Permission and risk notes

This skill is powerful because it writes files and may execute local export commands.

Use these rules:

```text
[ ] Review the installed SKILL.md before first use.
[ ] Install into a test HOME or project first if you are unsure.
[ ] Keep generated .drawio files in your repo or docs folder so changes are visible.
[ ] Do not paste secrets into diagrams.
[ ] Treat diagrams as documents that may be shared outside the team.
[ ] Verify exported images before publishing.
[ ] On servers, install draw.io desktop from official releases; avoid random binaries.
```

Also remember that the skill can generate polished-looking diagrams from incomplete information.

A polished diagram is not automatically correct.

Use it as a review artifact.

Ask teammates to challenge components, arrows, boundaries, and labels.

## Good use cases

This skill is especially useful for:

- onboarding diagrams;
- sales engineering diagrams;
- product workflow diagrams;
- internal architecture reviews;
- data-flow diagrams;
- support escalation maps;
- customer journey maps;
- AI-agent operating procedures;
- investor or board update visuals.

For ClawMama-style operators, diagrams can explain an agent workflow before the agent is built.

That reduces confusion and makes approval easier.

## Where ClawMama fits

ClawMama can give a non-technical operator a hosted OpenClaw or Hermes bot in Telegram.

That operator can ask the bot to draft workflow diagrams, review generated `.drawio` files, and keep diagram sources in a project folder.

The useful path is:

```text
Telegram request → hosted agent → .drawio source → PNG/SVG/PDF export or diagrams.net fallback → human review
```

ClawMama starts new users with $2 credits and access to the latest ChatGPT model through the managed runtime.

That makes this workflow approachable for teams that want agent-generated diagrams without maintaining a VPS or local agent environment.

## Final checklist

Before you rely on the diagram:

```text
[ ] Is the .drawio source saved?
[ ] Are the main components correct?
[ ] Are arrows directionally accurate?
[ ] Are data or approval boundaries labeled?
[ ] Did export succeed, or are you using a fallback URL?
[ ] Did a human review the diagram before sharing externally?
[ ] Are there no secrets, credentials, private customer names, or misleading claims?
```

The best diagram is not the prettiest one.

It is the one your team can edit, verify, and use to make a better decision.
